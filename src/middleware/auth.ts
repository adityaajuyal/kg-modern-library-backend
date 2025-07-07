import { Request, Response, NextFunction } from 'express';
import { verifyToken, JwtPayload } from '../utils/jwt';
import prisma from '../lib/prisma';
import { Role } from '@prisma/client';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: Role;
  };
}

export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({ 
        success: false,
        error: 'Access token is required' 
      });
      return;
    }

    const decoded = verifyToken(token) as JwtPayload;
    
    // Get user from database to ensure they still exist and are active
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, role: true, isActive: true },
    });

    if (!user || !user.isActive) {
      res.status(401).json({ 
        success: false,
        error: 'User not found or inactive' 
      });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ 
      success: false,
      error: 'Invalid or expired token' 
    });
  }
};

export const requireRole = (roles: Role[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ 
        success: false,
        error: 'Authentication required' 
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ 
        success: false,
        error: 'Insufficient permissions' 
      });
      return;
    }

    next();
  };
};

// Convenience middleware for admin-only routes
export const requireAdmin = requireRole([Role.ADMIN]);

// Convenience middleware for user-only routes  
export const requireUser = requireRole([Role.USER]);

// Convenience middleware for both admin and user routes
export const requireUserOrAdmin = requireRole([Role.USER, Role.ADMIN]);

// Optional authentication - adds user to request if token is valid, but doesn't fail if no token
export const optionalAuth = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      next();
      return;
    }

    const decoded = verifyToken(token) as JwtPayload;
    
    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, role: true, isActive: true },
    });

    if (user && user.isActive) {
      req.user = user;
    }

    next();
  } catch (error) {
    // If token is invalid, just continue without user
    next();
  }
};
