import * as yup from 'yup';

export const userSchema = yup.object().shape({
  first_name: yup.string().min(3, "It's too short").required("Required"),
  last_name: yup.string().min(3, "It's too short").required("Required"),
  email: yup.string().email().min(3, "It's too short").required("Required"),
  gender: yup
    .string()
    .oneOf(["Male", "Female"], "Required")
    .required("Required"),
});