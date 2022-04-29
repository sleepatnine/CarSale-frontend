import * as Yup from "yup";

const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const RegFormShema = Yup.object({
  firstName: Yup.string()
    .max(15, "Должно быть 15 символов или меньше ")
    .min(2, "Имя не может быть из 1 буквы")
    .required(" Обязательное поле "),
  email: Yup.string()
    .email("Недействительный адрес электронной почты")
    .required("Обязательное поле"),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, "Номер неправильно введён")
    .required("Обязательное поле")
    .min(13, "Короткий номер")
    .max(13, "Слишком длинный номер"),
  password: Yup.string()
    .max(20, "Должно быть 20 символов или меньше ")
    .min(8, "Пароль должен содержать не менее 8 символов")
    .required(" Обязательное поле "),
  secPassword: Yup.string()
    .required("Обязательное поле")
    .oneOf([Yup.ref("password")], "Пароли не совпадают"),
});

export default RegFormShema;
