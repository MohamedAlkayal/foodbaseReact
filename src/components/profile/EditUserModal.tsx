import * as yup from "yup";
import { FormikHelpers, useFormik } from "formik";
import { ax } from "../../../axios.config";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

interface EditUserModalProps {
  isOpened: boolean;
  elementRef: React.RefObject<HTMLDivElement>;
  toggle: () => void;
}

interface FormValues {
  username: string | undefined;
  email: string | undefined;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;

const updateUserSchema = yup.object().shape({
  username: yup.string().max(16).min(3).matches(usernameRegex),
  email: yup.string().email(),
});

export default function EditUserModal({ isOpened, elementRef, toggle }: EditUserModalProps) {
  const { user, updateUser } = useUser();
  const navigae = useNavigate();

  const { values, errors, status, touched, handleChange, isSubmitting, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      username: user?.username,
      email: user?.email,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: updateUserSchema,
    onSubmit: async (values: FormValues, actions: FormikHelpers<FormValues>) => {
      try {
        await ax.patch("/user", { username: values.username, email: values.email });
        await updateUser();
        navigae(`/profile?user=${values.username}`);
        toggle();
      } catch (err) {
        actions.setStatus("Oops, something went wrong");
        console.log(err);
      }
    },
  });

  return (
    <div className={isOpened ? "" : "hidden "}>
      <div className="top-0 left-0 z-40 absolute h-dvh w-full bg-black opacity-20"></div>
      <div ref={elementRef} className=" z-50 w-4/5 lg:w-1/3 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] absolute bg-white p-8 pb-4 rounded-xl shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="username">Username</label>
            <input className={` ${errors.username && touched.username ? " border-red-500" : ""} border rounded focus:outline-blue-300 py-2 px-3`} type="text" onBlur={handleBlur} onChange={handleChange} value={values.username} id="username" placeholder="Choose new username" />
            <p className="text-red-500 text-[12px] h-4">{errors.username && touched.username && errors.username}</p>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="email">Email</label>
            <input id="email" className={` ${errors.email && touched.email ? " border-red-500" : ""} border rounded focus:outline-blue-300 py-2 px-3`} onBlur={handleBlur} onChange={handleChange} value={values.email} placeholder="Choose new email" />
            <p className="text-red-500 text-[12px] h-4">{errors.email && touched.email && errors.email}</p>
          </div>
          <button disabled={isSubmitting} type="submit" className={`w-full mb-3 bg-orange-500 text-white py-2 rounded duration-300 hover:bg-orange-600 ${isSubmitting ? " opacity-60" : ""}`}>
            Update
          </button>
          <p className="text-center text-red-500 text-sm h-8">{status}</p>
        </form>
      </div>
    </div>
  );
}
