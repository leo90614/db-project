export const error = (message: string) => {
  return {
    status: false,
    message,
  };
};

export const success = (message: string) => {
  return {
    status: true,
    message,
  };
};
