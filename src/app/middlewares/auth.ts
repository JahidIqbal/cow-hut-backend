import { Request, Response, NextFunction } from 'express';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import config from '../../config';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get authorization token from request headers
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized. No token provided.');
      }

      // Verify the token
      let verifiedUser: JwtPayload; // Provide the type assertion here
      try {
        verifiedUser = jwt.verify(token, config.jwt.secret as Secret) as JwtPayload;
      } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token.');
      }

      req.user = verifiedUser; // Store user details in the request for further use (e.g., user role and id)

      // Check if requiredRoles are specified and user role is allowed
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden. You are not authorized to access this route.');
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
