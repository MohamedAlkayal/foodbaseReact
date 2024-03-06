import * as yup from "yup";

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const passwordErrMsg = "Your password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@, $, !, %, *, ?, or &).";

export const loginSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Please enter a valid email"),
  password: yup.string().required("Password is required").matches(passwordRegex, { message: "Please Enter a valid password" }),
});

export const registerSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Please enter a valid email"),
  password: yup.string().required("Password is required").matches(passwordRegex, { message: passwordErrMsg }),
  confirmPassword: yup
    .string()
    .required("Please rewrite your password for confirmation")
    .oneOf([yup.ref("password")], "Password must match"),
});
