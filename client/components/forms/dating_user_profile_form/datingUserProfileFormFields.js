export const userDatingProfileFormFields = [

    {
        id: "mySex",
        name: "mySex",
        formikRef: "mySex",
        label: "mySex/мой пол",
        valueByDefault: "OTHER",
        type: "text"
    },
    {
        id: "birthday",
        name: "birthday",
        formikRef: "birthday",
        label: "birthday/Дата Рождения",
        valueByDefault: "",
        type: "text"
    },
    {
        id: "seekAPersonOfSex",
        name: "seekAPersonOfSex",
        formikRef: "seekAPersonOfSex",
        label: "seekAPersonOfSex/Я ищу",
        valueByDefault: "ANY",
        type: "text"
    },
    {
        id: "myHeight",
        name: "myHeight",
        formikRef: "myHeight",
        label: "myHeight/Ваш рост:",
        valueByDefault: 0,
        type: "number"
    },
    {
        id: "minHeightIWant",
        name: "minHeightIWant",
        formikRef: "minHeightIWant",
        label: "minHeightIWant/Ищу ростом ОТ, см:",
        valueByDefault: 0,
        type: "number"
    },
    {
        id: "maxHeightIWant",
        name: "maxHeightIWant",
        formikRef: "maxHeightIWant",
        label: "maxHeightIWant/Ищу ростом ДО, см:",
        valueByDefault: 200,
        type: "number"
    },

    {
        id: "minPreferedAge",
        name: "minPreferedAge",
        formikRef: "minPreferedAge",
        label: "minPreferedAge/Возрастом ОТ:",
        valueByDefault: 20,
        type: "number"
    },

    {
        id: "maxPreferedAge",
        name: "maxPreferedAge",
        formikRef: "maxPreferedAge",
        label: "maxPreferedAge/Возрастом ДО:",
        valueByDefault: 30,
        type: "number"
    },
    {
        id: "countryINowLiveIn",
        name: "countryINowLiveIn",
        formikRef: "countryINowLiveIn",
        label: "countryINowLiveIn/Я, сейчас в стране:",
        valueByDefault: "UNITED_KINGDOM",
        type: "text"
    },
    {
        id: "myCitizenship",
        name: "myCitizenship",
        formikRef: "myCitizenship",
        label: "myCitizenship/Я гражданин страны:",
        valueByDefault: "UKRAINE",
        type: "text"
    },
    {
        id: "wantFromCountry",
        name: "wantFromCountry",
        formikRef: "wantFromCountry",
        label: "wantFromCountry/Желаю найти человека гражданства страны:",
        valueByDefault: "UNITED_KINGDOM",
        type: "text"
    },
    {
        id: "numberOfMyChildren",
        name: "numberOfMyChildren",
        formikRef: "numberOfMyChildren",
        label: "numberOfMyChildren/У меня детей:",
        valueByDefault: 0,
        type: "number"
    },
    {
        id: "maxNumberOfChildrenAllowed",
        name: "maxNumberOfChildrenAllowed",
        formikRef: "maxNumberOfChildrenAllowed",
        label: "maxNumberOfChildrenAllowed/Желаю найти человека с детьми, не более чем:",
        valueByDefault: 1,
        type: "number"
    },
    {
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
        id: "myInterests",
        name: "myInterests",
        formikRef: "myInterests",
        label: "myInterests/Мои интересы/увлечения",
        valueByDefault: "myInterests: ...",
        type: "text"
    },
    {
        id: "desiredWithInterests",
        name: "desiredWithInterests",
        formikRef: "desiredWithInterests",
        label: "desiredWithInterests/Желаю человека с интересами/увлечениями",
        valueByDefault: "desiredWithInterests: ...",
        type: "text"
    },
    {
        id: "myGoals",
        name: "myGoals",
        formikRef: "myGoals",
        label: "myGoals/Цели моего знакомства",
        valueByDefault: "myGoals: ...",
        type: "text"
    },
    {
        id: "pictures",
        name: "pictures",
        formikRef: "pictures",
        label: "pictures/Загрузить еще одну мою фотографию",
        valueByDefault: "load your pictures here",
        type: "image"
    },


];

