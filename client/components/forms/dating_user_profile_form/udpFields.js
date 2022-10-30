export const udpFields = [

    {
        id: "name",
        name: "name",
        formikRef: "name",
        label: "name",
        profileLabel: "name",
        valueByDefault: "n/a",
        type: "name"
    },
    {
        id: "location",
        name: "location",
        formikRef: "location",
        label: "autodetermined location",
        profileLabel: "autodetermined location",
        valueByDefault: "n/a",
        type: "location"
    },
    {
        id: "lastVisit",
        name: "lastVisit",
        formikRef: "lastVisit",
        label: "last visit",
        profileLabel: "last visit",
        valueByDefault: "lastVisit",
        type: "lastVisit"
    },
    {
        id: "age",
        name: "age",
        formikRef: "age",
        label: "your age",
        profileLabel: "age",
        valueByDefault: 0,
        type: "age"
    },

    {
        id: "mySex",
        name: "mySex",
        formikRef: "mySex",
        label: "your sex",
        profileLabel: "sex",
        valueByDefault: "OTHER",
        type: "select_sex"
    },
    {
        id: "seekAPersonOfSex",
        name: "seekAPersonOfSex",
        formikRef: "seekAPersonOfSex",
        label: "you seek of sex",
        profileLabel: "seeks",
        valueByDefault: "ANY",
        type: "select_sex"
    },
    {
        id: "ageRange",
        name: "ageRange",
        formikRef: "ageRange",
        label: "you seek of age in range",
        profileLabel: "age range",
        valueByDefault: [16, 60],
        type: "range"
    },
    {
        id: "heightRange",
        name: "heightRange",
        formikRef: "heightRange",
        label: "your seek of height in range, cm",
        profileLabel: "desires of height in range, cm",
        valueByDefault: [150, 190],
        type: "range"
    },
    {
        id: "myHeight",
        name: "myHeight",
        formikRef: "myHeight",
        label: "your height",
        profileLabel: "height",
        valueByDefault: 0,
        type: "number"
    },
    {
        id: "minHeightIWant",
        name: "minHeightIWant",
        formikRef: "minHeightIWant",
        label: "candidate's min. height, cm",
        profileLabel: "candidate's min. height, cm",
        valueByDefault: 0,
        type: "--number"
    },
    {
        id: "maxHeightIWant",
        name: "maxHeightIWant",
        formikRef: "maxHeightIWant",
        label: "candidate's max. height, cm",
        profileLabel: "candidate's max. height, cm",
        valueByDefault: 200,
        type: "--number"
    },

    {
        id: "minPreferredAge",
        name: "minPreferredAge",
        formikRef: "minPreferredAge",
        label: "candidate's min age",
        profileLabel: "candidate's min age",
        valueByDefault: 0,
        type: "--number"
    },

    {
        id: "maxPreferredAge",
        name: "maxPreferredAge",
        formikRef: "maxPreferredAge",
        label: "candidate's max age",
        profileLabel: "candidate's max age",
        valueByDefault: 0,
        type: "--number"
    },
    {
        id: "countryINowLiveIn",
        name: "countryINowLiveIn",
        formikRef: "countryINowLiveIn",
        label: "country you now live in",
        profileLabel: "lives now in",
        valueByDefault: "UKRAINE",
        type: "select_country"
    },
    {
        id: "myCitizenship",
        name: "myCitizenship",
        formikRef: "myCitizenship",
        label: "your citizenship",
        profileLabel: "citizenship",
        valueByDefault: "UKRAINE",
        type: "select_country"
    },
    {
        id: "wantFromCountry",
        name: "wantFromCountry",
        formikRef: "wantFromCountry",
        label: "you seek from country",
        profileLabel: "wants from country",
        valueByDefault: "ANY_COUNTRY",
        type: "select_country"
    },
    {
        id: "numberOfMyChildren",
        name: "numberOfMyChildren",
        formikRef: "numberOfMyChildren",
        label: "number of your children",
        profileLabel: "has children",
        valueByDefault: 0,
        type: "number"
    },
    {
        id: "maxNumberOfChildrenAllowed",
        name: "maxNumberOfChildrenAllowed",
        formikRef: "maxNumberOfChildrenAllowed",
        label: "you'd agree to maximum children",
        profileLabel: "agrees to maximum children",
        valueByDefault: 1,
        type: "number"
    },

    {
        id: "myGoals",
        name: "myGoals",
        formikRef: "myGoals",
        label: "your goals",
        profileLabel: "has goals",
        valueByDefault: [],
        type: "select_goals",
    },
    {
        id: "myInterests",
        name: "myInterests",
        formikRef: "myInterests",
        label: "your interests",
        profileLabel: "has interests",
        valueByDefault: [],
        type: "select_interests",
    },
    {
        id: "birthday",
        name: "birthday",
        formikRef: "birthday",
        label: "your birthday: (format 'dd.mm.yyyy')",
        profileLabel: "birthday",
        valueByDefault: "01.01.2000",
        type: "birthday"
    },
    /*
     {
     id: "photos",
     name: "photos",
     formikRef: "photos",
     label: "upload photos/ загрузка фото",
     profileLabel: "upload photos/ загрузка фото",
     valueByDefault: "",
     type: "photos"
 },

{
      id: "selfDescription",
      name: "selfDescription",
      formikRef: "selfDescription",
      label: "selfDescription/Кратко о себе ( не более ... знаков):",
      profileLabel: "selfDescription/Кратко о себе ( не более ... знаков):",
      valueByDefault: "about myself freely: ...",
      type: "text"
  },
  {
      id: "traitsIWouldLoveInYou",
      name: "traitsIWouldLoveInYou",
      formikRef: "traitsIWouldLoveInYou",
      label: "traitsIWouldLoveInYou/Искомые черты характера ( не более ... знаков):",
      profileLabel: "traitsIWouldLoveInYou/Искомые черты характера ( не более ... знаков):",
      valueByDefault: "Traits I Would Love In You: ...",
      type: "text"
  },
  {
      id: "traitsIWouldHateInYou",
      name: "traitsIWouldHateInYou",
      formikRef: "traitsIWouldHateInYou",
      label: "traitsIWouldHateInYou/Мы точно не пара, если Вы/у Вас: ( не более ... знаков):",
      profileLabel: "traitsIWouldHateInYou/Мы точно не пара, если Вы/у Вас: ( не более ... знаков):",
      valueByDefault: "Traits I Would Hate In You: ...",
      type: "text"
  },
  {
      id: "desiredWithInterests",
      name: "desiredWithInterests",
      formikRef: "desiredWithInterests",
      label: "desiredWithInterests/Желаю человека с интересами/увлечениями",
      profileLabel: "desiredWithInterests/Желаю человека с интересами/увлечениями",
      valueByDefault: "desiredWithInterests: ...",
      type: "text"
  },*/



];

