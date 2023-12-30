const emailValidation = (errorMessage) => (val) =>
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    val
  ) || errorMessage;

const passwordValidation = (errorMessage) => (val) =>
  (val && val.length >= 6) || errorMessage;

const usernameValidation = (errorMessage) => (val) =>
  (val && val.length >= 1) || errorMessage;

export { emailValidation, passwordValidation, usernameValidation };
