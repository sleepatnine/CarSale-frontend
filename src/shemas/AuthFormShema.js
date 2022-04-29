import * as Yup from "yup";

const AuthFormShema = Yup.object({
  email: Yup.string()
    .email("Недействительный адрес электронной почты")
    .required("Обязательное поле"),
  password: Yup.string().required(" Обязательное поле "),
});

export default AuthFormShema;
