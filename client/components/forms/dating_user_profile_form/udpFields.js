export const udpFields = [

    {
        id: "name",
        name: "name",
        formikRef: "name",
        label: "name",
        profilelabel: "name",
        valueByDefault: "n/a",
        type: "name"
    },
    {
        id: "location",
        name: "location",
        formikRef: "location",
        label: "autodetermined location",
        profilelabel: "autodetermined location",
        valueByDefault: "n/a",
        type: "location"
    },
    {
        id: "lastVisit",
        name: "lastVisit",
        formikRef: "lastVisit",
        label: "last visit",
        profilelabel: "last visit",
        valueByDefault: "n/a",
        type: "lastVisit"
    },
    {
        id: "age",
        name: "age",
        formikRef: "age",
        label: "your age",
        profilelabel: "age",
        valueByDefault: 0,
        type: "age"
    },

    {
        id: "mySex",
        name: "mySex",
        formikRef: "mySex",
        label: "your sex",
        profilelabel: "sex",
        valueByDefault: "OTHER",
        type: "select_sex"
    },
    {
        id: "seekAPersonOfSex",
        name: "seekAPersonOfSex",
        formikRef: "seekAPersonOfSex",
        label: "you seek of sex",
        profilelabel: "seeks",
        valueByDefault: "ANY",
        type: "select_sex"
    },
    {
        id: "myHeight",
        name: "myHeight",
        formikRef: "myHeight",
        label: "your height",
        profilelabel: "height",
        valueByDefault: 0,
        type: "number"
    },
    {
        id: "ageRange",
        name: "ageRange",
        formikRef: "ageRange",
        label: "you seek of age in range",
        profilelabel: "age range",
        valueByDefault: [16, 60],
        type: "range"
    },
    {
        id: "countryINowLiveIn",
        name: "countryINowLiveIn",
        formikRef: "countryINowLiveIn",
        label: "country you now live in",
        profilelabel: "lives now in",
        valueByDefault: "UKRAINE",
        type: "select_country"
    },
    {
        id: "heightRange",
        name: "heightRange",
        formikRef: "heightRange",
        label: "your seek of height in range, cm",
        profilelabel: "desires of height in range, cm",
        valueByDefault: [150, 190],
        type: "range"
    },

    {
        id: "minHeightIWant",
        name: "minHeightIWant",
        formikRef: "minHeightIWant",
        label: "candidate's min. height, cm",
        profilelabel: "candidate's min. height, cm",
        valueByDefault: 0,
        type: "--number"
    },
    {
        id: "maxHeightIWant",
        name: "maxHeightIWant",
        formikRef: "maxHeightIWant",
        label: "candidate's max. height, cm",
        profilelabel: "candidate's max. height, cm",
        valueByDefault: 200,
        type: "--number"
    },

    {
        id: "minPreferredAge",
        name: "minPreferredAge",
        formikRef: "minPreferredAge",
        label: "candidate's min age",
        profilelabel: "candidate's min age",
        valueByDefault: 0,
        type: "--number"
    },

    {
        id: "maxPreferredAge",
        name: "maxPreferredAge",
        formikRef: "maxPreferredAge",
        label: "candidate's max age",
        profilelabel: "candidate's max age",
        valueByDefault: 60,
        type: "--number"
    },

    {
        id: "myCitizenship",
        name: "myCitizenship",
        formikRef: "myCitizenship",
        label: "your citizenship",
        profilelabel: "citizenship",
        valueByDefault: "UKRAINE",
        type: "select_country"
    },
    {
        id: "wantFromCountry",
        name: "wantFromCountry",
        formikRef: "wantFromCountry",
        label: "you seek from country",
        profilelabel: "wants from country",
        valueByDefault: "ANY_COUNTRY",
        type: "select_country"
    },
    {
        id: "numberOfMyChildren",
        name: "numberOfMyChildren",
        formikRef: "numberOfMyChildren",
        label: "number of your children",
        profilelabel: "has children",
        valueByDefault: 0,
        type: "number"
    },
    {
        id: "maxNumberOfChildrenAllowed",
        name: "maxNumberOfChildrenAllowed",
        formikRef: "maxNumberOfChildrenAllowed",
        label: "you'd agree to maximum children",
        profilelabel: "agrees to maximum children",
        valueByDefault: 100,
        type: "number"
    },

    {
        id: "myGoals",
        name: "myGoals",
        formikRef: "myGoals",
        label: "your goals",
        profilelabel: "has goals",
        valueByDefault: [],
        type: "select_goals",
    },
    {
        id: "myInterests",
        name: "myInterests",
        formikRef: "myInterests",
        label: "your interests",
        profilelabel: "has interests",
        valueByDefault: [],
        type: "select_interests",
    },
    {
        id: "birthday",
        name: "birthday",
        formikRef: "birthday",
        label: "your birthday: (format 'dd.mm.yyyy')",
        profilelabel: "birthday",
        valueByDefault: "01.01.2000",
        type: "birthday"
    },
    /*
     {
     id: "photos",
     name: "photos",
     formikRef: "photos",
     label: "upload photos/ загрузка фото",
     profilelabel: "upload photos/ загрузка фото",
     valueByDefault: "",
     type: "photos"
 },

{
      id: "selfDescription",
      name: "selfDescription",
      formikRef: "selfDescription",
      label: "selfDescription/Кратко о себе ( не более ... знаков):",
      profilelabel: "selfDescription/Кратко о себе ( не более ... знаков):",
      valueByDefault: "about myself freely: ...",
      type: "text"
  },
  {
      id: "traitsIWouldLoveInYou",
      name: "traitsIWouldLoveInYou",
      formikRef: "traitsIWouldLoveInYou",
      label: "traitsIWouldLoveInYou/Искомые черты характера ( не более ... знаков):",
      profilelabel: "traitsIWouldLoveInYou/Искомые черты характера ( не более ... знаков):",
      valueByDefault: "Traits I Would Love In You: ...",
      type: "text"
  },
  {
      id: "traitsIWouldHateInYou",
      name: "traitsIWouldHateInYou",
      formikRef: "traitsIWouldHateInYou",
      label: "traitsIWouldHateInYou/Мы точно не пара, если Вы/у Вас: ( не более ... знаков):",
      profilelabel: "traitsIWouldHateInYou/Мы точно не пара, если Вы/у Вас: ( не более ... знаков):",
      valueByDefault: "Traits I Would Hate In You: ...",
      type: "text"
  },
  {
      id: "desiredWithInterests",
      name: "desiredWithInterests",
      formikRef: "desiredWithInterests",
      label: "desiredWithInterests/Желаю человека с интересами/увлечениями",
      profilelabel: "desiredWithInterests/Желаю человека с интересами/увлечениями",
      valueByDefault: "desiredWithInterests: ...",
      type: "text"
  },*/



];

