import { FormikHelpers, useFormik } from "formik";
import * as yup from "yup";
import { ax } from "../../../axios.config";
import { useNavigate } from "react-router-dom";

interface GroupsControllerProps {
  toggle: () => void;
}

interface FormValues {
  key: string;
}

const key_Regex = /^[0-9a-fA-F]{24}$/;
const key_Schema = yup.object().shape({
  key: yup.string().required().matches(key_Regex),
});

export default function GroupsController({ toggle }: GroupsControllerProps) {
  const navigate = useNavigate();
  const { values, errors, handleChange, isSubmitting, handleSubmit } = useFormik({
    initialValues: {
      key: "",
    },
    validationSchema: key_Schema,
    onSubmit: async (values: FormValues, actions: FormikHelpers<FormValues>) => {
      try {
        await ax.post(`groups/${values.key}/join`);
        navigate(`/group?key=${values.key}`);
        actions.resetForm();
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="relative z-10 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
      <p className="text-2xl font-medium w-32 mb-4 md:mb-0 min-w-32">My Groups</p>

      <div className="flex md:justify-end w-full gap-3 ">
        <form className="relative w-full" onSubmit={handleSubmit}>
          <p className=" absolute bottom-12 text-red-500 text-[13px]">{errors.key}</p>
          <input className={`p-2 border w-3/4 rounded-lg rounded-r-none ${errors.key ? " border-red-500" : ""}`} placeholder="Enter group key" id="key" onChange={handleChange} value={values.key} type="text" />
          <button className={`py-2 w-1/4 rounded-lg rounded-l-none bg-orange-500 text-white duration-300 hover:bg-orange-600 ${isSubmitting ? "bg-orange-300" : ""}`} type="submit" disabled={isSubmitting}>
            Join
          </button>
        </form>
        <button onClick={toggle} className="py-2 w-36 rounded-lg bg-blue-600 text-white duration-300 hover:bg-blue-700">
          Create
        </button>
      </div>
    </div>
  );
}
