import * as yup from "yup";
import {isValidUrl} from "../../utils/validators";

export const userFormValidation = yup.object().shape({
    name: yup.string().min(3, "слишком короткое имя").max(20, "укоротите имя"),
    lastName: yup.string().min(3, "слишком короткая фамилия").max(20, "укоротите фамилию"),
    email: yup.string()/*.matches(EMAIL_REGEXP, "incorrect email")*/.required("действительный имейл обязателен"),
    password: yup.string().min(8, "пароль -не менее 8ми знаков").max(20, "пароль - не боле 20ти знаков"),
    phoneNumber: yup.string()/*.phoneNumber()*/.required(true),
    hideSocialContactData: yup.boolean(),
    city: yup.string().required("Required"),
    country: yup.string().required("Required"),
    datingServiceParticipation: yup.boolean().required("Required"),

    urlSocial1: yup.string()
        .test("is-url-valid", "URL is not valid", (value) => {
            return isValidUrl(value);
        }),
    urlSocial2: yup.string().nullable()
        .test("is-url-valid", "URL is not valid", (value) => {
            return isValidUrl(value);
        }),
    messenger1: yup.string().min(5).required("at least one messenger required (telegram, viber, instagram or similar)/Требуется как минимум один мессенджер"),

});

export const accommodationFormValidation = yup.object().shape(
    {
        country: yup.number().integer().positive().required("обязательно для ввода!"),
        street: yup.string().required("обязательно для ввода!"),
        accommodationType: yup.number().integer().positive().required("обязательно для ввода!"),
        numberOfRooms: yup.number().integer().positive(),
        numberOfBeds: yup.number().integer().positive(),
        priceTotal: yup.number().integer().positive(),
        pricePerRoom: yup.number().integer().positive(),
        pricePerPerson: yup.number().integer().positive(),
        helpWithWork: yup.boolean(),
        helpWithFood: yup.boolean(),
        status: yup.number().integer().positive().default(0),
        userId: yup.number().min(1).positive().required("обязательно для ввода!"),
        disabilityOrElderlySupport: yup.boolean(),
        childCareSupport: yup.boolean(),
        petsAllowed: yup.number().integer().positive().default(0).required("обязательно для ввода!")
    }
);
export const tenantFormValidation = null;
export const datingFormValidation = null;
