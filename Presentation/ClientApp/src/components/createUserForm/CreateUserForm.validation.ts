import * as Yup from "yup";

export const CreateUserFormValidation = Yup.object().shape({
  username: Yup.string().required("Required").max(20, "Max 20 characters"),
  password: Yup.string()
    .required("Required")
    .min(8, "Min 8 charachters")
    .max(100, "Max 100 characters")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,100}$/,
      "At least 1 lowercase, 1 uppercase, 1 number en 1 special character"
    ),
  email: Yup.string()
    .required("Required")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Must be valid email"),
});
