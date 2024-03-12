import { Group } from "../../types/Group";
import { useUser } from "../../context/UserContext";
import { FormikHelpers, useFormik } from "formik";
import { ax } from "../../../axios.config";
import { useNavigate } from "react-router-dom";

interface EditGroupSettingsModalProps {
  isOpened: boolean;
  elementRef: React.RefObject<HTMLDivElement>;
  toggle: () => void;
  group: Group | null;
  updateGroupData: () => void;
}

interface FormValues {
  editInfo: boolean | undefined;
  createOrderList: boolean | undefined;
}

export function EditGroupSettingsModal({ isOpened, elementRef, toggle, group, updateGroupData }: EditGroupSettingsModalProps) {
  const { updateUser } = useUser();
  const navigate = useNavigate();
  const { values, status, handleChange, isSubmitting, handleSubmit } = useFormik({
    initialValues: {
      editInfo: group?.usersPermission?.editInfo,
      createOrderList: group?.usersPermission?.createOrderList,
    },
    onSubmit: async (values: FormValues, actions: FormikHelpers<FormValues>) => {
      try {
        const newGroup = {
          usersPermission: {
            editInfo: values.editInfo,
            createOrderList: values.createOrderList,
          },
        };
        await ax.patch(`/group/${group?._id}`, newGroup);
        await updateGroupData();
        toggle();
      } catch (err) {
        actions.setStatus("Oops, something went wrong");
        console.log(err);
      }
    },
  });
  const deleteGroup = async () => {
    try {
      await ax.delete(`/group/${group?._id}`);
      await updateUser();
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`  ${isOpened ? "" : "hidden"}`}>
      <div className="top-0 left-0 absolute z-40 h-full w-full bg-black opacity-20"></div>
      <div ref={elementRef} className=" z-40 w-5/6 lg:w-1/3 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] absolute bg-white p-8 pb-4 rounded-xl shadow-md">
        <p className="mb-6 text-lg font-semibold">Owner's settings</p>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-3 mb-4">
            <input id="editInfo" type="checkbox" onChange={handleChange} checked={values.editInfo} />
            <label htmlFor="editInfo">Users can edit group info</label>
          </div>
          <div className="flex items-center gap-3 mb-8">
            <input id="createOrderList" type="checkbox" onChange={handleChange} checked={values.createOrderList} />
            <label htmlFor="createOrderList">Users can create order List</label>
          </div>
          <button disabled={isSubmitting} type="submit" className={`w-full mb-6 bg-orange-500 text-white py-2 rounded duration-300 hover:bg-orange-600 ${isSubmitting ? " opacity-60" : ""}`}>
            Update Settings
          </button>
          <div className="flex items-center justify-between gap-4 p-4 border border-red-500 rounded-lg mb-6">
            <p className="text-sm">By Deleteing the group all data will be lost</p>
            <button type="button" onClick={deleteGroup} className="min-w-28 h-fit p-2 bg-red-500 rounded-lg text-white duration-300 hover:bg-red-600">
              Delete Group
            </button>
          </div>
          <p className="text-center text-red-500 text-sm h-8">{status}</p>
        </form>
      </div>
    </div>
  );
}
