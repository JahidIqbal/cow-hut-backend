// import { Response, Request } from 'express';
// import catchAsync from '../../../shared/catchAsync';
// import httpStatus from 'http-status';
// import { IRefreshTokenResponse } from './auth.interface';
// import config from '../../../config';
// import sendResponse from '../../../shared/sendResponse';
// import { AuthService } from './auth.service';

// const loginUser = async (req: Request, res: Response) => {
//   const { ...loginData } = req.body;
//   const result = await AuthService.loginUser(loginData);
//  const {refreshToken,...others}=result;

//   //set refresh token
//   const cookieOptions = {
//     secure: config.env === 'production',
//     httpOnly: true,
//   };

//   res.cookie('refreshToken', refreshToken, cookieOptions);

//   delete result.refreshToken;

// //   if (!ILoginUserResponse) {
// //     return res.status(400).json({
// //       success: false,
// //       message: 'Cow data is missing',
// //       data: null,
// //     });
// //   }
  
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'User login successfully!',
//     data: others,
//   });
// };

// //refreshToken
// const refreshToken = async (req: Request, res: Response) => {
//   const { refreshToken } = req.cookies;
//   const result = await AuthService.refreshToken(refreshToken);
// //  const {refreshToken}=result;

//   //set refresh token
//   const cookieOptions = {
//     secure: config.env === 'production',
//     httpOnly: true,
//   };

//   res.cookie('refreshToken', refreshToken, cookieOptions);

//   // delete result.refreshToken;

//   sendResponse<IRefreshTokenResponse>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'User login successfully!',
//     data: result,
//   });
// };

// export const AuthController = {
//   loginUser,
//   refreshToken
// };
