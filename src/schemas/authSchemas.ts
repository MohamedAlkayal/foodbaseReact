import * as yup from "yup";

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;

const passwordErrMsg = "Your password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@, $, !, %, *, ?, or &).";
const usernameErrorMessage = "Username must be between 3 and 16 characters long and can contain only alphanumeric characters, underscores, or hyphens.";

export const loginSchema = yup.object().shape({
  email: yup.string().required().email("Please enter a valid email"),
  password: yup.string().required().matches(passwordRegex, { message: "Please Enter a valid password" }),
});

export const registerSchema = yup.object().shape({
  username: yup.string().required().matches(usernameRegex, { message: usernameErrorMessage }),
  email: yup.string().required().email(),
  password: yup.string().required().matches(passwordRegex, { message: passwordErrMsg }),
  confirmPassword: yup
    .string()
    .required("Please rewrite your password for confirmation")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
