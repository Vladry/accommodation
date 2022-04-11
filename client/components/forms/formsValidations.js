import * as yup from "yup";
import {isValidUrl} from "../../utils/validators";

export const userFormValidation = yup.object().shape({
    name: yup.string().min(3, "too short!/ Слишком короткое имя")
        .max(20, "too long!/ Соратите имя").required("name required/ Имя обязательно"),
    lastName: yup.string().min(3, "too short!/ Слишком короткая фамилия")
        .max(20, "too long!/ Сократите фамилию").required("lastName required/ Фамилия обязательна"),
    email: yup.string().email().required("email required/ Имейл обязателен"),
    password: yup.string().min(8, "at least 8 characters!/ Не менее 8ми знаков!")
        .max(20, "not more than 20 characters!/ Не боле 20ти знаков!")
        .required("password required!/ Создайте пароль"),
    phoneNumber: yup.string().min(10, "incomplete!/ Номер не полный").required("required"),
    hideSocialContactData: yup.boolean(),
    city: yup.string().required("Required"),
    country: yup.string().required("Required"),
    datingServiceParticipation: yup.boolean().required("Required"),

    urlSocial1: yup.string()
        .test("is-url-valid", "URL is not valid", (value) => {
            return isValidUrl(value);
        }),
/*    urlSocial2: yup.string().nullable()
        .test("is-url-valid", "URL is not valid", (value) => {
            return isValidUrl(value);
        }),*/
    messenger1: yup.string().min(5).required("at least one messenger required (telegram, viber, instagram or similar)/Требуется как минимум один мессенджер"),

});

export const accommodationFormValidation = yup.object().shape(
    {
        country: yup.number().integer().min(0).required("обязательно!"),
        city: yup.string().min(3, "must be a valid name/ некорректный город").required("обязательно!"),
        street: yup.string().required("обязательно!"),
        accommodationType: yup.number().integer().min(0).required("обязательно!"),
        numberOfRooms: yup.number().integer().min(0),
        numberOfBeds: yup.number().integer().min(0),
        priceTotal: yup.number().integer().min(0),
        pricePerRoom: yup.number().integer().min(0),
        pricePerPerson: yup.number().integer().min(0),
        helpWithWork: yup.boolean(),
        helpWithFood: yup.boolean(),
        status: yup.number().integer().min(0).default(0),
        userId: yup.number().min(1).min(0).required("обязательно!"),
        disabilityOrElderlySupport: yup.boolean(),
        childCareSupport: yup.boolean(),
        petsAllowed: yup.number().integer().min(0).default(0).required("обязательно!")
    }
);
export const tenantFormValidation = yup.object().shape(
    {
        desiredCity: yup.string(),
        desiredCountry: yup.string(),
        numberOfOlderChildren: yup.number().integer().min(0).default(0)  ,
        numberOfYoungerChildren: yup.number().integer().min(0).default(0)  ,
        adultsYounger60: yup.number().integer().min(0).min(1).required("хотя бы один взрослый должен быть"),
        adultsOver60: yup.number().integer().min(0).default(0) ,
        numberOfDogs: yup.number().integer().min(0).default(0) ,
        numberOfCats: yup.number().integer().min(0).default(0) ,
        numberOfOtherPets: yup.number().integer().min(0).default(0) ,
        desiredLengthOfStay: yup.number().integer().min(0) ,
        familyMembersRequiringSpecialCare: yup.number().integer().min(0).default(0) ,
        additionalInfo: yup.string().max(150),
    }
);
export const datingFormValidation  = yup.object().shape(
    {

    }
);
