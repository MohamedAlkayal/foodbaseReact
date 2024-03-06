import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { registerSchema } from "../schemas";
import background from "../assets/bg.webp";
import { useState } from "react";
import { FormikHelpers, useFormik } from "formik";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import { useAuth } from "../context/authContext";

interface FormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const onSubmit = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
  try {
    // await doCreateUserWithEmailAndPassword(values.email, values.password);

    actions.resetForm();
  } catch (err: unknown) {
    console.log(err);
    actions.setStatus("test");
  }
};

export function Register() {
  const { userLoggedIn } = useAuth();
  const [isPassword, setIsPassword] = useState(true);
  const { values, errors, status, touched, handleChange, isSubmitting, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit,
  });

  if (userLoggedIn) {
    return <h1>loggedin</h1>;
  }

  return (
    <div className="flex h-dvh ">
      <h2 className=" block  md:hidden w-full p-8 absolute top-2 modak text-orange-500 text-center text-5xl">Foodbase</h2>
      <form onSubmit={handleSubmit} className="w-full h-full flex items-center justify-center md:w-3/5">
        <div className="px-8 w-full md:w-1/2 md:px-0">
          <div className="flex flex-col gap-3 mb-8 ">
            <label className="flex gap-1 items-center" htmlFor="email">
              <AlternateEmailIcon fontSize="inherit" />
              <span>Email</span>
              {errors.email && touched.email && <ErrorOutlineOutlinedIcon fontSize="inherit" className="text-red-500" />}
            </label>
            <input onBlur={handleBlur} onChange={handleChange} value={values.email} id="email" type="text" placeholder="example@mail.com" className={` ${errors.email && touched.email ? " border-red-500" : ""} border rounded focus:outline-blue-300 py-2 px-3`} />
            <p className="text-red-500 text-[12px] h-4">{errors.email && touched.email && errors.email}</p>
          </div>
          <div className="flex flex-col gap-3 mb-8">
            <div className="flex justify-between items-center">
              <label className="flex gap-1 items-center" htmlFor="password">
                <LockOutlinedIcon fontSize="inherit" />
                <span>Password</span>
                {errors.password && touched.password && <ErrorOutlineOutlinedIcon fontSize="inherit" className="text-red-500" />}
              </label>
            </div>
            <div className="w-full relative">
              <input
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                id="password"
                type={isPassword ? "password" : "text"}
                placeholder="********"
                className={` ${errors.password && touched.password ? " border-red-500" : ""} mb-2 w-full border rounded focus:outline-blue-300 py-2 px-3`}
              />
              {isPassword ? (
                <VisibilityOutlinedIcon onClick={() => setIsPassword((p) => !p)} fontSize="inherit" className=" absolute right-3 top-[14px] cursor-pointer" />
              ) : (
                <VisibilityOffOutlinedIcon onClick={() => setIsPassword((p) => !p)} fontSize="inherit" className=" absolute right-3 top-[14px] cursor-pointer" />
              )}
              <p className="text-red-500 text-[12px] h-4">{errors.password && touched.password && errors.password}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 mb-8">
            <div className="flex justify-between items-center">
              <label className="flex gap-1 items-center" htmlFor="confirmPassword">
                <LockOutlinedIcon fontSize="inherit" />
                <span>Confirm Password</span>
                {errors.confirmPassword && touched.confirmPassword && <ErrorOutlineOutlinedIcon fontSize="inherit" className="text-red-500" />}
              </label>
            </div>
            <div className="w-full relative">
              <input
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPassword}
                id="confirmPassword"
                type={isPassword ? "password" : "text"}
                placeholder="********"
                className={` ${errors.confirmPassword && touched.confirmPassword ? " border-red-500" : ""} mb-2 w-full border rounded focus:outline-blue-300 py-2 px-3`}
              />
              {isPassword ? (
                <VisibilityOutlinedIcon onClick={() => setIsPassword((p) => !p)} fontSize="inherit" className=" absolute right-3 top-[14px] cursor-pointer" />
              ) : (
                <VisibilityOffOutlinedIcon onClick={() => setIsPassword((p) => !p)} fontSize="inherit" className=" absolute right-3 top-[14px] cursor-pointer" />
              )}
              <p className="text-red-500 text-[12px] h-4">{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</p>
            </div>
          </div>
          <button disabled={isSubmitting} type="submit" className={`w-full mb-4 bg-orange-500 text-white py-2 rounded duration-300 hover:bg-orange-600 ${isSubmitting ? "hover:bg-orange-300 bg-orange-300" : ""}`}>
            Register
          </button>
          <p className="text-center text-red-500 text-sm mb-4 h-8">{status}</p>
          <p className="text-center text-sm text-gray-600 border-t p-12">
            You already have an account? <span className=" cursor-pointer duration-300 text-blue-500 hover:text-blue-800">Login</span>
          </p>
        </div>
      </form>
      <div style={{ backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundPosition: "center" }} className=" login w-2/5 h-full hidden md:flex flex-col items-center justify-center">
        <h1 className="modak text-white text-6xl lg:text-7xl mb-2">Foodbase</h1>
        <p className=" text-white text-center mb-32 opacity-80">Where Sharing Meals Sparks Joy and Flavor</p>
      </div>
    </div>
  );
}
