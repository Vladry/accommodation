

export const accommodationFormFields = [

    {
        id: "location",
        name: "location",
        formikRef: "location",
        label: "location/место",
        valueByDefault: "",
        type: "text"
    },

    {
        id: "accommodation-type",
        name: "accommodation-type",
        formikRef: "accommodation-type",
        label: "select accommodation type/ выбрать тип жилья",
        valueByDefault: "",
        type: "number",
    },
    {
        id: "status",
        name: "status",
        formikRef: "status",
        label: "status/текущий статус",
        valueByDefault: "",
        type: "number",
    },
    {
        id: "number-of-rooms",
        name: "number-of-rooms",
        formikRef: "number-of-rooms",
        label: "number of rooms/количество комнат",
        valueByDefault: "",
        type: "number",
    },


/*
    {
        id: "price-per-room",
        name: "price-per-room",
        formikRef: "price-per-room",
        label: "price per room/цена за комнату",
        valueByDefault: "",
        type: "number",
    },
    {
        id: "price-per-person",
        name: "price-per-person",
        formikRef: "price-per-person",
        label: "price per person/цена с человека",
        valueByDefault: "",
        type: "number",
    },
    {
        id: "price-total",
        name: "price-total",
        formikRef: "price-total",
        label: "price overall/общая стоимость",
        valueByDefault: "",
        type: "number",
    },
      {
        id: "user-id",
        name: "user-id",
        formikRef: "user-id",
        label: "user id/ id пользователя",
        valueByDefault: "",
        type: "number",
    },*/

    {
        id: "help-with-food",
        name: "help-with-food",
        formikRef: "help-with-food",
        label: "help with food possible/возможна помощь с едой",
        valueByDefault: false,
        type: "checkbox",
    },
    {
        id: "disability-or-elderly-support",
        name: "disability-or-elderly-support",
        formikRef: "disability-or-elderly-support",
        label: "disability or elderly support possible/помощь пристарелым/инвалидам",
        valueByDefault: false,
        type: "checkbox",
    },
    {
        id: "number-of-beds",
        name: "number-of-beds",
        formikRef: "number-of-beds",
        label: "number of beds/количество кроватей",
        valueByDefault: "",
        type: "number",
    },
    {
        id: "pets-allowed",
        name: "pets-allowed",
        formikRef: "pets-allowed",
        label: "pets allow conditions/условия приема домашних животных",
        valueByDefault: "",
        type: "number",
    },

    {
        id: "help-with-work",
        name: "help-with-work",
        formikRef: "help-with-work",
        label: "help with finding work possible/помощь с трудоустройством",
        valueByDefault: false,
        type: "checkbox",
    },

    {
        id: "child-care-support",
        name: "child-care-support",
        formikRef: "child-care-support",
        label: "child care support possible/возможна помощь по уходу за детьми",
        valueByDefault: false,
        type: "checkbox",
    },


];

