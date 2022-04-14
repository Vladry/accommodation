export const userFormFields = [
    {
        id: "name",
        name: "name",
        formikRef: "name",
        label: "First name/имя",
        valueByDefault: "",
        type: "text"
    },
    {
        id: "lastName",
        name: "lastName",
        formikRef: "lastName",
        label: "Last name/фамилия",
        valueByDefault: "",
        type: "text"
    },

    {
        id: "email",
        name: "email",
        formikRef: "email",
        label: "Email",
        valueByDefault: "",
        type: "text"
    },
    {
        id: "password",
        name: "password",
        formikRef: "password",
        label: "Password/пароль",
        valueByDefault: "",
        type: "text"
    },
    {
        id: "phoneNumber",
        name: "phoneNumber",
        formikRef: "phoneNumber",
        label: "Phone number/телефон",
        valueByDefault: "+380",
        type: "tel"
    },
    {
        id: "urlSocial1",
        name: "urlSocial1",
        formikRef: "urlSocial1",
        label: "urlSocial1/адрес соцсети",
        valueByDefault: "https://",
        type: "text",
    },
    {
        id: "urlSocial2",
        name: "urlSocial2",
        formikRef: "urlSocial2",
        label: "urlSocial2/адрес соцсети",
        valueByDefault: "",
        type: "text",
    },

    {
        id: "messenger1",
        name: "messenger1",
        formikRef: "messenger1",
        label: "Your nick and name of messenger1/Ваш ник и название мессенджера1",
        valueByDefault: "",
        type: "text",
    },
    {
        id: "messenger2",
        name: "messenger2",
        formikRef: "messenger2",
        label: "Your nick and name of messenger2/Ваш ник и название мессенджера2",
        valueByDefault: "",
        type: "text",
    },
    // {
    //     id: "messenger3",
    //     name: "messenger3",
    //     formikRef: "messenger3",
    //     label: "Your nick and name of messenger1/Ваш ник и название мессенджера1",
    //     valueByDefault: "",
    //     type: "text",
    // },
    // {
    //     id: "city",
    //     name: "city",
    //     formikRef: "city",
    //     label: "City/город",
    //     valueByDefault: "",
    //     type: "text",
    // },
    // {
    //     id: "country",
    //     name: "country",
    //     formikRef: "country",
    //     label: "Country/страна",
    //     valueByDefault: "",
    //     type: "text",
    // },
    {
        id: "location",
        name: "location",
        formikRef: "location",
        label: "Location",
        valueByDefault: "",
        type: "autocompleteFromMapBox",
    },
    {
        id: "datingServiceParticipation",
        name: "datingServiceParticipation",
        formikRef: "datingServiceParticipation",
        label: "include to our Dating Service/включить в сайт 'военные знакомства'",
        valueByDefault: true,
        type: "checkbox",
    },
    {
        id: "hideSocialContactData",
        name: "hideSocialContactData",
        formikRef: "hideSocialContactData",
        label: "Hide social contact data/скрыть адреса соцсетец",
        valueByDefault: false,
        type: "checkbox",
    },
];