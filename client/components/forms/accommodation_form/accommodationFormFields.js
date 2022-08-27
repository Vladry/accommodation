

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
        id: "accommodationType",
        name: "accommodationType",
        formikRef: "accommodationType",
        label: "select accommodation types/ выбрать тип жилья",
        valueByDefault: "",
        type: "text",
    },
    {
        id: "status",
        name: "status",
        formikRef: "status",
        label: "status/текущий статус",
        valueByDefault: "",
        type: "text",
    },
    {
        id: "numberOfRooms",
        name: "numberOfRooms",
        formikRef: "numberOfRooms",
        label: "number of rooms/количество комнат",
        valueByDefault: "",
        type: "number",
    },
    {
        id: "helpWithFood",
        name: "helpWithFood",
        formikRef: "helpWithFood",
        label: "help with food possible/возможна помощь с едой",
        valueByDefault: false,
        type: "checkbox",
    },
    {
        id: "disabilityOrElderlySupport",
        name: "disabilityOrElderlySupport",
        formikRef: "disabilityOrElderlySupport",
        label: "disability or elderly support possible/помощь пристарелым/инвалидам",
        valueByDefault: false,
        type: "checkbox",
    },
    {
        id: "numberOfBeds",
        name: "numberOfBeds",
        formikRef: "numberOfBeds",
        label: "number of beds/количество кроватей",
        valueByDefault: "",
        type: "number",
    },
    {
        id: "petsAllowed",
        name: "petsAllowed",
        formikRef: "petsAllowed",
        label: "pets allow conditions/условия приема домашних животных",
        valueByDefault: "",
        type: "number",
    },
    {
        id: "helpFindWork",
        name: "helpFindWork",
        formikRef: "helpFindWork",
        label: "help with finding work possible/помощь с трудоустройством",
        valueByDefault: false,
        type: "checkbox",
    },
    {
        id: "childCareSupport",
        name: "childCareSupport",
        formikRef: "childCareSupport",
        label: "child care support possible/возможна помощь по уходу за детьми",
        valueByDefault: false,
        type: "checkbox",
    },



    /*
        {
            id: "price-per-room",
            name: "price-per-room",
            formikRef: "price-per-room",
            label: "price per room/цена за комнату",
            valueByDefault: "",
            types: "number",
        },
        {
            id: "price-per-person",
            name: "price-per-person",
            formikRef: "price-per-person",
            label: "price per person/цена с человека",
            valueByDefault: "",
            types: "number",
        },
        {
            id: "price-total",
            name: "price-total",
            formikRef: "price-total",
            label: "price overall/общая стоимость",
            valueByDefault: "",
            types: "number",
        },
          {
            id: "user-id",
            name: "user-id",
            formikRef: "user-id",
            label: "user id/ id пользователя",
            valueByDefault: "",
            types: "number",
        },*/


];

