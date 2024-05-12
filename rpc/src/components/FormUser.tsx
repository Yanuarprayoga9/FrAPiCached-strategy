import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { addUser } from "../hooks/usePostUser";


const validation = yup.object().shape({
  first_name: yup.string().min(3, "It's too short").required("Required"),
  last_name: yup.string().min(3, "It's too short").required("Required"),
  email: yup.string().email().min(3, "It's too short").required("Required"),
  gender: yup
    .string()
    .oneOf(["Male", "Female"], "Required")
    .required("Required"),
});


interface FormValues {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
}
const initialValues:FormValues = {
  first_name: "",
  last_name: "",
  email: "",
  gender: "",
};

export const FormUser = () => {

  const onSubmit = async (values:object, props:FormikHelpers<FormValues>) => {
    if(!values) return props.resetForm();
    await addUser(values)
    alert("berhasil membuat user")
    props.setSubmitting(false);
  };

  return (
    <div className="">
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={onSubmit}
      >
        {(props) => (
          <Form>
            <Field
              as={TextField}
              fullWidth
              name="first_name"
              placeholder="Enter your first name"
              helperText={<ErrorMessage name="first_name" />}
            />
            <Field
              as={TextField}
              fullWidth
              name="last_name"
              placeholder="Enter your last name"
              helperText={<ErrorMessage name="last_name" />}
            />

            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <Field
                as={RadioGroup}
                aria-label="gender"
                name="gender"
                style={{ display: "initial" }}
              >
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />
              </Field>
            </FormControl>
            <Field
              as={TextField}
              fullWidth
              name="email"
              type="email"
              placeholder="Enter your Email"
              helperText={<ErrorMessage name="email" />}
            />
            <Grid item xs={8}>
              <Button
                type="submit"
                variant="contained"
                disabled={props.isSubmitting}
                color="primary"
              >
                {props.isSubmitting ? "Loading" : "Create User"}
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};
