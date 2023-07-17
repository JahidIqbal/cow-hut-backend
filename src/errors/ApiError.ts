class ApiError extends Error {
    statusCode: number;
  
    constructor(stausCode: number, message: string | undefined, stack = '') {
      super(message);
      this.statusCode = stausCode;
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor); 
      }
    }
  }
  
  export default ApiError;
  