import * as yup from "yup";

const createGroupSchema = yup.object().shape({
  name: yup.string().required().min(3).max(16),
  description: yup.string().required().min(10).max(100),
  editInfo: yup.boolean().default(false),
  createOrderList: yup.boolean().default(false),
});

export default createGroupSchema;
