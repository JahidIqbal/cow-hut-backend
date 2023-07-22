// express.d.ts

import { IUser } from "../modules/user/user.interface"; // Adjust the path based on your project structure

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Assuming the user object has a type of IUser
    }
  }
}
