//  https://formik.org/docs/api/field

import React, {useState} from 'react';
import {Form, Formik, Field, ErrorMessage} from 'formik';
import * as yup from 'yup';
import {EMAIL_REGEXP} from "../utils/regexp";
import MuiPhoneNumber from 'material-ui-phone-number';

const UserForm = () => {


    const [tel, setTel] = useState("");

    const initialValues =
        {
            name: "",
            lastName: "",
            email: "",
            password: "",
            phoneNumber: "",
            hideSocialContactData: false,
            urlSocial1: "",
            urlSocial2: "",
            messenger1: "",
            messenger2: "",
            city: "",
            country: "",
            datingServiceParticipation: false
        }

    const formValidationSchema = yup.object().shape({
        name: yup.string().min(3, "слишком короткое имя").max(20, "укоротите имя"),
        lastName: yup.string().min(3, "слишком короткая фамилия").max(20, "укоротите фамилию"),
        email: yup.string()/*.matches(EMAIL_REGEXP, "incorrect email")*/.required("действительный имейл обязателен"),
        password: yup.string().min(8, "пароль -не менее 8ми знаков").max(20, "пароль - не боле 20ти знаков"),
        phoneNumber: yup.string()/*.phoneNumber()*/.required(true),
        hideSocialContactData: yup.boolean(),
        city: yup.string().required("Required"),
        country: yup.string().required("Required"),
        datingServiceParticipation: yup.boolean().required("Required")
    })

    const handleSubmit = (values) => {
        console.log("in handleSubmit()")
        console.log(JSON.stringify(values, null, 2));
    }

    const handlePhoneInput = (pNumber) => {
        setTel(pNumber);
    }

    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={formValidationSchema}>
                {
                    ({isSubmitting, errors, touched}) =>
                        (<Form>
                                <Field name='name' type='text' placeholder='your name/ введите имя'/>
                                {touched.name && errors.name && <ErrorMessage name='name'/>}
                                <br/>
                                <Field name='lastName' type='text' placeholder='your last name/ введите фамилию'/>
                                {touched.lastName && errors.lastName && <ErrorMessage name='lastName'/>}
                                <br/>
                                <Field name='email' type='email' placeholder='email@'/>
                                {touched.email && errors.email && <ErrorMessage name='email'/>}
                                <br/>
                                <Field name='password' type='password'
                                       placeholder='make up a new password/придумайте пароль'/>
                                {touched.password && errors.password && <ErrorMessage name='password'/>}
                                <br/>
                                <Field name='phoneNumber' type='text' placeholder='input phone#/ номер телефона'/>
                                {touched.phoneNumber && errors.phoneNumber && <ErrorMessage name='phoneNumber'/>}
                                <br/>

                                <MuiPhoneNumber defaultCountry={'ua'} onChange={handlePhoneInput}/>

                                <Field as="select" name='hideSocialContactData' type='boolean'>
                                    {/*<option value=true>yes, hide/ Да, скрыть</option>*/}
                                    {/*<option value=false selected>no, don't hide/ Не скрывать контакты</option>*/}

                                </Field>
                                {touched.hideSocialContactData && errors.hideSocialContactData &&
                                    <ErrorMessage name='hideSocialContactData'/>}
                                <br/>
                                <Field name='urlSocial1' type='text'/>
                                {touched.urlSocial1 && errors.urlSocial1 && <ErrorMessage name='urlSocial1'/>}
                                <br/>
                                <Field name='urlSocial2' type='text'/>
                                {touched.urlSocial2 && errors.urlSocial2 && <ErrorMessage name='urlSocial2'/>}
                                <br/>
                                <Field name='messenger1' type='text'/>
                                {touched.messenger1 && errors.messenger1 && <ErrorMessage name='messenger1'/>}
                                <br/>
                                <Field name='messenger2' type='text'/>
                                {touched.messenger2 && errors.messenger2 && <ErrorMessage name='messenger2'/>}
                                <br/>
                                <Field name='city' type='text'/>
                                {touched.city && errors.city && <ErrorMessage name='city'/>}
                                <br/>
                                <Field name='country' type='text'/>
                                {touched.country && errors.country && <ErrorMessage name='country'/>}
                                <br/>
                                <Field name='datingServiceParticipation' type='checkbox' checked
                                       value='leave checked if want to participate/ оставьте галочку, если желаете участвовать'
                                />
                                {touched.datingServiceParticipation && errors.datingServiceParticipation
                                    && <ErrorMessage name='datingServiceParticipation'/>}
                                <br/>

                                <Field name='submit' type='submit' value='submit' disabled={isSubmitting}/>

                            </Form>
                        )

                }

            </Formik>
        </div>
    );
};

export default UserForm;