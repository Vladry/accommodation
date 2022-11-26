export const searchCriteriaFields = [
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
        id: "minHeightIWant",
        name: "minHeightIWant",
        formikRef: "minHeightIWant",
        label: "candidate's min. height, cm",
        profileLabel: "candidate's min. height, cm",
        valueByDefault: 150,
        type: "--number"
    },
    {
        id: "maxHeightIWant",
        name: "maxHeightIWant",
        formikRef: "maxHeightIWant",
        label: "candidate's max. height, cm",
        profileLabel: "candidate's max. height, cm",
        valueByDefault: 190,
        type: "--number"
    },

    {
        id: "minPreferredAge",
        name: "minPreferredAge",
        formikRef: "minPreferredAge",
        label: "candidate's min age",
        profileLabel: "candidate's min age",
        valueByDefault: 16,
        type: "--number"
    },

    {
        id: "maxPreferredAge",
        name: "maxPreferredAge",
        formikRef: "maxPreferredAge",
        label: "candidate's max age",
        profileLabel: "candidate's max age",
        valueByDefault: 60,
        type: "--number"
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
        id: "maxNumberOfChildrenAllowed",
        name: "maxNumberOfChildrenAllowed",
        formikRef: "maxNumberOfChildrenAllowed",
        label: "you'd agree to maximum children",
        profileLabel: "agrees to maximum children",
        valueByDefault: 100,
        type: "number"
    },
];

