import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ax } from "../../axios.config";
import background from "../assets/bg.webp";
import { registerSchema } from "../schemas/authSchemas";
import { FormikHelpers, useFormik } from "formik";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const [isPassword, setIsPassword] = useState(true);
  const navigate = useNavigate();
  const { values, errors, status, touched, handleChange, isSubmitting, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values: FormValues, actions: FormikHelpers<FormValues>) => {
      try {
        await ax.post("/auth/signup", { username: values.username, email: values.email, password: values.password });
        navigate("/");
        actions.resetForm();
      } catch (err: unknown) {
        console.log(err);
        actions.setStatus("Register Failed");
      }
    },
  });

  return (
    <div className="flex items-center  h-dvh ">
      <h2 className=" block  md:hidden w-full p-8 absolute top-2 modak text-orange-500 text-center text-5xl">Foodbase</h2>
      <form onSubmit={handleSubmit} className="w-full h-fit flex items-center justify-center md:w-3/5">
        <div className="px-8 w-fit md:w-1/2 md:px-0">
          <div className="flex flex-col gap-3 mb-6 ">
            <label className="flex gap-1 items-center" htmlFor="username">
              <PersonOutlineOutlinedIcon fontSize="inherit" />
              <span>Username</span>
              {errors.username && touched.username && <ErrorOutlineOutlinedIcon fontSize="inherit" className="text-red-500" />}
            </label>
            <input onBlur={handleBlur} onChange={handleChange} value={values.username} id="username" type="text" placeholder="foody420" className={` ${errors.username && touched.username ? " border-red-500" : ""} border rounded focus:outline-blue-300 py-2 px-3`} />
            <p className="text-red-500 text-[12px] h-4">{errors.username && touched.username && errors.username}</p>
          </div>
          <div className="flex flex-col gap-3 mb-6 ">
            <label className="flex gap-1 items-center" htmlFor="email">
              <AlternateEmailIcon fontSize="inherit" />
              <span>Email</span>
              {errors.email && touched.email && <ErrorOutlineOutlinedIcon fontSize="inherit" className="text-red-500" />}
            </label>
            <input onBlur={handleBlur} onChange={handleChange} value={values.email} id="email" type="text" placeholder="example@mail.com" className={` ${errors.email && touched.email ? " border-red-500" : ""} border rounded focus:outline-blue-300 py-2 px-3`} />
            <p className="text-red-500 text-[12px] h-4">{errors.email && touched.email && errors.email}</p>
          </div>
          <div className="flex flex-col gap-3 mb-6">
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
          <div className="flex flex-col gap-3 mb-6">
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
          <p className="text-center text-red-500 text-sm mb-2 h-8">{status}</p>
          <p className="text-center text-sm text-gray-600 border-t p-6">
            You already have an account?{" "}
            <Link to="/login" className=" cursor-pointer duration-300 text-blue-500 hover:text-blue-800">
              Login
            </Link>
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
