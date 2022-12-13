export const error = (message: string) => {
  return {
    status: false,
    message,
  };
};

export const success = (data?, message?: string) => {
  return {
    data,
    status: true,
    message,
  };
};
