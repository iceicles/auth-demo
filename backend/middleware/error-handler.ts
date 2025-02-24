
export const errorHandlerMW = (err: any, req: any, res: any, next: any) => {
    let customError = {
      // set default
      statusCode: err.statusCode || 500,
      msg: err.message || 'Something went wrong try again later',
    };
    if (err.name === 'ValidationError') {
      customError.msg = Object.values(err.errors)
        .map((item: any) => item.message)
        .join(',');
      customError.statusCode = 400;
    }
    if (err.code && err.code === 11000) {
      customError.msg = `The chosen ${Object.keys(
        err.keyValue
      )} is in use. Please enter a different email`;
      customError.statusCode = 400;
    }
    if (err.name === 'CastError') {
      customError.msg = `No item found with id : ${err.value}`;
      customError.statusCode = 404;
    }
  
    return res.status(customError.statusCode).json({ msg: customError.msg });
  };