import urls from '../src/main/resources/urls.json'
import types from "@/store/user/types";
import globalVariables from '@/root/globalVariables.json';

const neatUpZonedDateTime = (datingLastVisitDate) => {
    if (datingLastVisitDate) {
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
    } else {
        return fields.reduce((acc, current) => ({
            ...acc,
            [current.formikRef]: current.valueByDefault
        }), {})
    }
}


const stompNotifier = (data) => {
    if (!data?.client) {
        console.log("message cannot be delivered.  WS connection lost!");
        return;
    }

    // console.log("stompClient.publish: ", data.msg)
    const message = data.msg;
    const stompClient = data.client;
    let notifierTimer = setTimeout(() => {
// console.log("stompNotifier-> ")
// console.log("message: ", message)
// console.log("client: ", stompClient)
        stompClient.publish({
            destination: message.destination,
            body:
                JSON.stringify(message),
            headers: {'Content-Type': 'application/json'},
            skipContentLengthHeader: true,
        });
        clearTimeout(notifierTimer);
    }, globalVariables.notifierDelay)

};


export default {
    forwardForUdProfileId,
    prepareFormData,
    neatUpZonedDateTime,
    getPeriod,
    stompNotifier
}
