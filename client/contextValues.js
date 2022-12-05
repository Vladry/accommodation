import urls from '../src/main/resources/urls.json'
import destinations from '../src/main/resources/destinations.json'
import types from "@/store/user/types";

const neatUpZonedDateTime = (datingLastVisitDate) => {
    if (datingLastVisitDate !== null) {
        let index = datingLastVisitDate.indexOf("[");
        return datingLastVisitDate.slice(0, index); // убираем в конце:  [Europe/Helsinki]
    }
}
const getPeriod = (visitDateMs) => {
    let period;
    const visitPeriodMs = Date.now() - visitDateMs;
    if (visitPeriodMs < 3600 * 1000) {
        period = `${Math.round(visitPeriodMs / 60 / 1000)} minutes`;

    } else if (visitPeriodMs < 24 * 3600 * 1000) {
        period = `${Math.round(visitPeriodMs / 3600 / 1000)} hours`;

    } else if (visitPeriodMs < 7 * 24 * 3600 * 1000) {
        period = `${Math.round(visitPeriodMs / 24 / 3600 / 1000)} days`;

    } else if (visitPeriodMs < 30 * 24 * 3600 * 1000) {
        period = `${Math.round(visitPeriodMs / 7 / 24 / 3600 / 1000)} weeks`;

    } else if (visitPeriodMs < 365 * 24 * 3600 * 1000) {
        period = `${Math.round(visitPeriodMs / 30 / 24 / 3600 / 1000)} months`;

    } else {
        period = `${Math.round(visitPeriodMs / 365 / 24 / 3600 / 1000)} years`;
    }
    return period;
}


const forwardForUdProfileId = (router, queriedUserId, user, dispatch, event) => {
    //поместим просматриваемого юзера в стор, чтобы использовать его данные при рендере его профайла:
    dispatch({type: types.SHELF_REVIEWED_USER_DATA, payload: user});

    router.push(`${urls.queriedCandidateProfile}${queriedUserId}`);
}


const prepareFormData = (fields, profile) => {
    if (profile) {
        return fields.reduce((acc, current) => ({
            ...acc,
            [current.formikRef]: profile[current.formikRef]
        }), {})
    } else  {
        return fields.reduce((acc, current) => ({
            ...acc,
            [current.formikRef]: current.valueByDefault
        }), {})
    }
}

// эту функцию уже установил в package.json по:  npm install classnames
export function classNames(classes) {
// https://overcoder.net/q/3782/%D0%BA%D0%B0%D0%BA-%D0%B4%D0%BE%D0%B1%D0%B0%D0%B2%D0%B8%D1%82%D1%8C-%D0%BD%D0%B5%D1%81%D0%BA%D0%BE%D0%BB%D1%8C%D0%BA%D0%BE-%D0%BA%D0%BB%D0%B0%D1%81%D1%81%D0%BE%D0%B2-%D0%B2-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82-reactjs
// https://ru.stackoverflow.com/questions/857171/react-js-%D0%92%D1%8B%D0%B7%D0%BE%D0%B2-%D0%BD%D0%B5%D1%81%D0%BA%D0%BE%D0%BB%D1%8C%D0%BA%D0%B8%D1%85-%D0%BA%D0%BB%D0%B0%D1%81%D1%81%D0%BE%D0%B2-%D0%B2-classname
    if (classes && classes.constructor === Array) {
        return classes.join(' ');
    } else if (arguments[0] !== undefined) {
        return [...arguments].join(' ');
    }
    return '';
}



const stompMessenger = (stompClient, messengerArgs) => {
    const {
        destination, type, value, fromId = null, toId = null, subject = null, date = null, time = null, ...rest
    } = messengerArgs;

    /********************** возможные типы сообщений вебсокетов ********************/
    const msgTypes = ["DATING_NOTIFICATION", "DATING_ANNOUNCEMENT", "PRIVATE_MESSAGE", "GENERAL_ANNOUNCEMENT", "GROUP_MESSAGE"]
    /*
    Обязательные args функции  stompPublisher:      destination, type, value
    Остальные args зависят от типа сообщения: доп.параметры:
    Типы: LIKED, BOOKMARKED  - для уведомлений isLiked или isBookmarked хранящихся в БД. args: type, fromId, toId.

        DATING_NOTIFICATION  - доп.args нету. value будет содержать кол-во накопившегося, о чем уведомляется, а subject -то, о чем уведомляется (полученные сообщения, полученные лайки, комментарии, необходимость пополнить баланс оплаты)
            likedNotification: value =currentUserProfileUrl(who liked)  subject= "{name} has liked you!"
            unLikedNotification: value =currentUserProfileUrl(who unLiked)  subject= "{name} has disliked you!"
            эти уведомления показываются в 2х местах: в ToolBar - в виде количества поступивших лайков и  дизлайков
            и в виде pop-up уведомлений, в виде двухстрочной надписи:  1."Name has liked/unliked you!" 2."profileURL кто лайкнул"
        DATING_ANNOUNCEMENT - доп.args нету. value будет содержать текст общего обьявления для всех dating-кандидатов
        GENERAL_ANNOUNCEMENT - тоже ,что для dating
        PRIVATE_MESSAGE     - fromId, toId
        GROUP_MESSAGE       - fromId

 Domain-cущность StompMessage:
    private String destination;
    private String type;
    private String value;
    private Long fromId;
    private Long toId;
    private String subject;
    */

    const publisher = (destination, type, value, fromId, toId, subject, date, time, rest) => {


        if (!stompClient) {
            console.log("message cannot be delivered.  WS connection lost!");
            return;
        }

        // собираем из пропсов тело сообщения
        const message = {
            "type": type, "value": value, "fromId": fromId,
            "toId": toId, "subject": subject, "seen": false, ...rest
        };

console.log("stompClient.publish: ", message)
        console.log("destination: ", destination)
        stompClient.publish({
            destination: destination,
            body:
                JSON.stringify(message)
            ,
            headers: {'Content-Type': 'application/json'},
            skipContentLengthHeader: true,
        });
    }

    publisher(destination, type, value, fromId, toId, subject, date, time, rest);
};


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    forwardForUdProfileId,
    prepareFormData,
    neatUpZonedDateTime,
    getPeriod,
    stompMessenger,
}
