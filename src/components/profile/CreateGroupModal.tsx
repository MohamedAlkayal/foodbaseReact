import { FormikHelpers, useFormik } from "formik";
import createGroupSchema from "../../schemas/groupSchemas";
import { ax } from "../../../axios.config";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

interface CreateGroupModalProps {
  isOpened: boolean;
  elementRef: React.RefObject<HTMLDivElement>;
  toggle: () => void;
}

interface FormValues {
  name: string;
  description: string;
  editInfo: boolean;
  createOrderList: boolean;
}

export default function CreateGroupModal({ isOpened, elementRef, toggle }: CreateGroupModalProps) {
  const navigate = useNavigate();
  const { updateUser } = useUser();

  const { values, errors, status, touched, handleChange, isSubmitting, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      description: "",
      editInfo: false,
      createOrderList: false,
    },
    validationSchema: createGroupSchema,
    onSubmit: async (values: FormValues, actions: FormikHelpers<FormValues>) => {
      try {
        const newGroup = {
          name: values.name,
          description: values.description,
          usersPermission: {
            editInfo: values.editInfo,
            createOrderList: values.createOrderList,
          },
        };
        const res = await ax.post("/group", newGroup);
        updateUser();
        navigate(`/group?key=${res.data.data._id}`);
        toggle();
      } catch (err) {
        actions.setStatus("Oops, something went wrong");
        console.log(err);
      }
    },
  });

  return (
    <div className={`  ${isOpened ? "" : "hidden"}`}>
      <div className="top-0 absolute z-40 h-full w-full bg-black opacity-20"></div>
      <div ref={elementRef} className=" z-40 w-5/6 lg:w-1/3 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] absolute bg-white p-8 pb-4 rounded-xl shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="name">Group Name</label>
            <input className={` ${errors.name && touched.name ? " border-red-500" : ""} border rounded focus:outline-blue-300 py-2 px-3`} type="text" onBlur={handleBlur} onChange={handleChange} value={values.name} id="name" placeholder="Enter group name" />
            <p className="text-red-500 text-[12px] h-4">{errors.name && touched.name && errors.name}</p>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="description">Group Description</label>
            <textarea
              className={` ${errors.description && touched.description ? " border-red-500" : ""} border rounded focus:outline-blue-300 py-2 px-3 resize-none h-32 `}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.description}
              id="description"
              placeholder="Enter group description"
            />
            <p className="text-red-500 text-[12px] h-4">{errors.description && touched.description && errors.description}</p>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <input id="editInfo" type="checkbox" onChange={handleChange} checked={values.editInfo} />
            <label htmlFor="editInfo">Users can edit group info</label>
          </div>
          <div className="flex items-center gap-3 mb-8">
            <input id="createOrderList" type="checkbox" onChange={handleChange} checked={values.createOrderList} />
            <label htmlFor="createOrderList">Users can create order List</label>
          </div>
          <button disabled={isSubmitting} type="submit" className={`w-full mb-3 bg-orange-500 text-white py-2 rounded duration-300 hover:bg-orange-600 ${isSubmitting ? " opacity-60" : ""}`}>
            Create
          </button>
          <p className="text-center text-red-500 text-sm h-8">{status}</p>
        </form>
      </div>
    </div>
  );
}
