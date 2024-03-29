import urls from '../../src/main/resources/urls.json'

export const mainMenu = [

        {
            url: "/",
            linkName: "Homepage",
            title: "",
        },
        {
            url: urls.dating,
            linkName: "Знакомства",
            title: "Подбор кандидатов основан на вашем профайле и Ваших предпочтениях к кандидатам.",
            inactiveLinkName: "ЗНАКОМСТВА: регистрация",
            inactiveTitle: "Заходи сюда для создания профайла в службе знакомств. Подбор кандидатов производится на основании этого профайла.",
        },
        {
            url: urls.accommodationList,
            linkName: "Предложить жильё",
            title: "Fill in the form bellow describing in details the accommodation that you are offering. That data is required for our search algorithms. Tenants seeking accommodation will be finding your offers based on the data you've provided./  Заполните форму. Детально опишите предлагаемое жильё. Претенденты будут искать себе жильё на основании Ваших данных, поэтому они требуются для более эффективного подбора жилья для нуждающихся претендентов.",
        },
        {
            url: urls.tenantFormPage,
            linkName: "Подать заявку на жильё",
            title: "Если Вам требуется жилье - вам сюда!  Заполните заявку, чтобы люди предоставляющие жильё смогли Вас не только найти в нашей базе данных и связаться с Вами с предложениями, но и понять, на сколько срочно Вам требуется их помощь. Чем подробнее Ваша заявка заполнена (желательно с фотографиями), тем эффективнее работают наши поисковые алгоритмы, позволяющие найти Вас тому, кто желает Вам помочь. Фотографии можно прикреплять любые, как членов семьи, так и подтверждающие степень того, на сколько Ваша семья пострадала от рашистских варваров. Ведь люди тоже смотрят кому отдать приоритет - то ли Вы 'военный турист' выехавший из относительно безопасного места и у Вас осталось целое жильё. А другое дело, если Вас действительно разбомбили или Вы беженец из зоны активных боёв и разрушений.  Мы боремся за справедливость, чтобы наискорейшая помощь была предоставлена нашим самым пострадавшим Украинцам!",
        },
        {
            url: "/",
            linkName: "Волонтерская помощь",
            title: "Здесь мы совместно попытаемся найти решения как помочь нуждающимся украинцам. Раздел для нуждающихся в помощи и волонтеров, желающих предложить помощь и найти запросы помощи.",
        },

    ]
;

export const datingMenu = [
    {
        url: `${urls.dating}`,
        linkName: "знакомства",
        title: "Найденные кандидаты",
    },
    {
        url: `${urls.dating}${urls.likedYou}`,
        linkName: "вы нравитесь",
        title: "Вы им понравились",
    },
    {
        url: `${urls.dating}${urls.inbox}`,
        linkName: "сообщения",
        title: "Ваши сообщения",
    },

    {
        url: `${urls.dating}${urls.favorites}`,
        linkName: "избранные",
        title: "Избранные",
    },
    {
        url: `${urls.dating}${urls.mutualLikes}`,
        linkName: "просмотр",
        title: "Просмотр и выбор симпатий",
    },
    {
        url: `${urls.dating}${urls.searchCriteria}`,
        linkName: "настр.поиска",
        title: "Ваши предпочтения к кандидатам",
    },
    {
        url: `${urls.dating}${urls.udpFormPage}`,
        linkName: "Ваш профайл",
        title: "Редактировать Ваш профайл",
        notRegistered: "Создание профайла",
    },
    {
        url: `${urls.dating}${urls.addPhotos}`,
        linkName: "Ваши фото",
        title: "Управление Вашими фотографиями",
        inactiveTitle: "Управление вашими фотографиями, добавление/удаление",
    },
    {
        url: "/",
        linkName: "homepage",
    },
    {
        url: `${urls.dating}${urls.datingChatMessages}`,
        linkName: "datingChatMessages",
        title: "datingChatMessages",
    },
];