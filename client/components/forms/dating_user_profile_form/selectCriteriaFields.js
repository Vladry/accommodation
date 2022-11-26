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

