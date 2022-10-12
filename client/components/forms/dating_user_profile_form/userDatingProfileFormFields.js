export const userDatingProfileFormFields = [

    {
        id: "ageRange",
        name: "ageRange",
        formikRef: "ageRange",
        label: "ageRange/возраст от.. до..",
        valueByDefault: [18, 60],
        type: "range"
    },
    {
        id: "mySex",
        name: "mySex",
        formikRef: "mySex",
        label: "mySex/мой пол",
        valueByDefault: "OTHER",
        type: "select_sex"
    },
    {
        id: "seekAPersonOfSex",
        name: "seekAPersonOfSex",
        formikRef: "seekAPersonOfSex",
        label: "seekAPersonOfSex/Я ищу",
        valueByDefault: "ANY",
        type: "select_sex"
    },
    {
        id: "myHeight",
        name: "myHeight",
        formikRef: "myHeight",
        label: "my height /мой рост",
        valueByDefault: 0,
        type: "number"
    },
    {
        id: "minHeightIWant",
        name: "minHeightIWant",
        formikRef: "minHeightIWant",
        label: "minHeightIWant/Ищу ростом ОТ, см",
        valueByDefault: 0,
        type: "number"
    },
    {
        id: "maxHeightIWant",
        name: "maxHeightIWant",
        formikRef: "maxHeightIWant",
        label: "maxHeightIWant/Ищу ростом ДО, см",
        valueByDefault: 200,
        type: "number"
    },

    {
        id: "minPreferedAge",
        name: "minPreferedAge",
        formikRef: "minPreferedAge",
        label: "minPreferedAge/Возрастом ОТ",
        valueByDefault: 0,
        type: "number"
    },

    {
        id: "maxPreferedAge",
        name: "maxPreferedAge",
        formikRef: "maxPreferedAge",
        label: "maxPreferedAge/Возрастом ДО",
        valueByDefault: 0,
        type: "number"
    },
    {
        id: "countryINowLiveIn",
        name: "countryINowLiveIn",
        formikRef: "countryINowLiveIn",
        label: "countryINowLiveIn/Я, сейчас в стране",
        valueByDefault: "UKRAINE",
        type: "select_country"
    },
    {
        id: "myCitizenship",
        name: "myCitizenship",
        formikRef: "myCitizenship",
        label: "myCitizenship/Я гражданин",
        valueByDefault: "UKRAINE",
        type: "select_country"
    },
    {
        id: "wantFromCountry",
        name: "wantFromCountry",
        formikRef: "wantFromCountry",
        label: "wantFromCountry/Желаю найти из",
        valueByDefault: "UNITED_KINGDOM",
        type: "select_country"
    },
    {
        id: "numberOfMyChildren",
        name: "numberOfMyChildren",
        formikRef: "numberOfMyChildren",
        label: "numberOfMyChildren/У меня детей",
        valueByDefault: 0,
        type: "number"
    },
    {
        id: "maxNumberOfChildrenAllowed",
        name: "maxNumberOfChildrenAllowed",
        formikRef: "maxNumberOfChildrenAllowed",
        label: "max.children accepted/детей не более",
        valueByDefault: 1,
        type: "number"
    },

    {
        id: "myGoals",
        name: "myGoals",
        formikRef: "myGoals",
        label: "myGoals/Цели знакомства",
        valueByDefault: [],
        type: "select_goals",
    },
    {
        id: "myInterests",
        name: "myInterests",
        formikRef: "myInterests",
        label: "myInterests/Мои интересы/увлечения",
        valueByDefault: [],
        type: "select_interests",
    },
    {
        id: "birthday",
        name: "birthday",
        formikRef: "birthday",
        label: "birthday /ДР:  ('dd.mm.yyyy')",
        valueByDefault: "01.01.2000",
        type: "text"
    },
    /*    {
        id: "pictures",
        name: "pictures",
        formikRef: "pictures",
        label: "pictures/Загрузить еще одну мою фотографию",
        valueByDefault: "load your pictures here",
        type: "image"
    },*/

    /* {
         id: "selfDescription",
         name: "selfDescription",
         formikRef: "selfDescription",
         label: "selfDescription/Кратко о себе ( не более ... знаков):",
         valueByDefault: "about myself freely: ...",
         type: "text"
     },
     {
         id: "traitsIWouldLoveInYou",
         name: "traitsIWouldLoveInYou",
         formikRef: "traitsIWouldLoveInYou",
         label: "traitsIWouldLoveInYou/Искомые черты характера ( не более ... знаков):",
         valueByDefault: "Traits I Would Love In You: ...",
         type: "text"
     },
     {
         id: "traitsIWouldHateInYou",
         name: "traitsIWouldHateInYou",
         formikRef: "traitsIWouldHateInYou",
         label: "traitsIWouldHateInYou/Мы точно не пара, если Вы/у Вас: ( не более ... знаков):",
         valueByDefault: "Traits I Would Hate In You: ...",
         type: "text"
     },
     {
         id: "desiredWithInterests",
         name: "desiredWithInterests",
         formikRef: "desiredWithInterests",
         label: "desiredWithInterests/Желаю человека с интересами/увлечениями",
         valueByDefault: "desiredWithInterests: ...",
         type: "text"
     },*/



];

