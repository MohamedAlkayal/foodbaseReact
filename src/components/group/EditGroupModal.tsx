import * as yup from "yup";
import { FormikHelpers, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { ax } from "../../../axios.config";
import { Group } from "../../types/Group";
import { useUser } from "../../context/UserContext";

interface EditGroupModalProps {
  isOpened: boolean;
  elementRef: React.RefObject<HTMLDivElement>;
  toggle: () => void;
  group: Group | null;
  updateGroupData: () => void;
}

interface FormValues {
  name: string | undefined;
  description: string | undefined;
}

const updateGrouprSchema = yup.object().shape({
  name: yup.string().max(16).min(3),
  description: yup.string().max(100).min(10),
});

export default function EditGroupModal({ isOpened, elementRef, toggle, group, updateGroupData }: EditGroupModalProps) {
  const navigae = useNavigate();
  const { updateUser } = useUser();
  const { values, errors, status, touched, handleChange, isSubmitting, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      name: group?.name,
      description: group?.description,
    },
    validationSchema: updateGrouprSchema,
    onSubmit: async (values: FormValues, actions: FormikHelpers<FormValues>) => {
      try {
        await ax.patch(`/group/${group?._id}`, values);
        updateGroupData();
        await updateUser();
        navigae(`/group?key=${group?._id}`);
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
            <label htmlFor="name">Name</label>
            <input className={` ${errors.name && touched.name ? " border-red-500" : ""} border rounded focus:outline-blue-300 py-2 px-3`} type="text" onBlur={handleBlur} onChange={handleChange} value={values.name} id="name" placeholder="Choose new name" />
            <p className="text-red-500 text-[12px] h-4">{errors.name && touched.name && errors.name}</p>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="description">Description</label>
            <textarea id="description" className={` ${errors.description && touched.description ? " border-red-500" : ""} border rounded focus:outline-blue-300 py-2 px-3 h-60 resize-none`} onBlur={handleBlur} onChange={handleChange} value={values.description} placeholder="Choose new description" />
            <p className="text-red-500 text-[12px] h-4">{errors.description && touched.description && errors.description}</p>
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
