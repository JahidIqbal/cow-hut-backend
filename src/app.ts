import express, { Application, NextFunction, Request, Response } from "express";
// import usersRouter from "./app/modules/user/user.route";
import routes from './app/routes';
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import httpStatus from "http-status";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
// app.use("/api/v1/users", usersRouter); // For user routes
app.use('/api/v1/', routes);

app.get("/", async (req: Request, res: Response) => {
  res.send("Welcome to the API");
});

// Error handling middleware
app.use(globalErrorHandler);

// global error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export default app;
