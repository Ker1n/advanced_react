export const rules = {
  required: (message: string = "incorrect data"): Object => ({
    required: true,
    message: message,
  }),
};
