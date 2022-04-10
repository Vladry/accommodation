import * as yup from "yup";

export const userFormValidation = yup.object().shape({
    name: yup.string().min(3, "слишком короткое имя").max(20, "укоротите имя"),
    lastName: yup.string().min(3, "слишком короткая фамилия").max(20, "укоротите фамилию"),
    email: yup.string()/*.matches(EMAIL_REGEXP, "incorrect email")*/.required("действительный имейл обязателен"),
    password: yup.string().min(8, "пароль -не менее 8ми знаков").max(20, "пароль - не боле 20ти знаков"),
    phoneNumber: yup.string()/*.phoneNumber()*/.required(true),
    hideSocialContactData: yup.boolean(),
    city: yup.string().required("Required"),
    country: yup.string().required("Required"),
    datingServiceParticipation: yup.boolean().required("Required")
});

export const accommodationFormValidation = null;
export const tenantFormValidation = null;
export const datingFormValidation = null;
