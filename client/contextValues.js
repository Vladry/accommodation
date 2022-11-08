import urls from '../src/main/resources/urls.json'
import types from "./store/types";
import {stompClient} from "./pages/_app";

const neatUpZonedDateTime = (datingLastVisitDate)=>{
    if (datingLastVisitDate !== null) {
        let index = datingLastVisitDate.indexOf("[");
        return datingLastVisitDate.slice(0, index); // убираем в конце:  [Europe/Helsinki]
    }
}
const getPeriod = (visitDateMs)=> {
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
    // console.log('queriedUser: ', queriedUserId);
    const {target} = event;// не используем, т.к. мы получили прямо айдишку queriedUserId
    // const targetUserId = Number(target.dataset.id);
    // console.log('target: ', target);
    // console.log('target.name: ', target.name);
    // console.log('target.dataset.id: ', queriedUserId);
    // console.log("router: ", router);

    //поместим просматриваемого юзера в стор, чтобы использовать его данные при рендере его профайла:
    dispatch({type: types.SHELF_REVIEWED_USER_DATA, payload: user});

    router.push(`${urls.queriedCandidateProfile}${queriedUserId}`);
}


const prepareFormData = (fields, persistedValues) => {
    // console.log("persistedValues: ", persistedValues);
    if (persistedValues) {
        return {
            initialValues: fields.reduce((acc, current) => ({     //https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
                ...acc,
                [current.formikRef]: persistedValues[current.formikRef]  //заполняем только значениями полученными из fetched from persistedValues
            }), {})
        }
    } else { // иначе заполняем только дефолтными значениями
        // console.log("persistedValues not found, using dafaultValues. ");

        return {

            initialValues: fields.reduce((acc, current) => ({
                ...acc,
                [current.formikRef]: (persistedValues && persistedValues[current.formikRef]) ? persistedValues[current.formikRef] : current.valueByDefault //заполняем дефолтными значениями полученными либо из fetched from persistedValues, либо из заданных по дефолту
//старая версия, когда если текущее поле берется persistedValues (если оно там есть), либо из fields:
// [current.formikRef]: (persistedValues && persistedValues[current.formikRef]) ? persistedValues[current.formikRef] : current.valueByDefault //заполняем дефолтными значениями полученными либо из fetched from persistedValues, либо из заданных по дефолту
            }), {})
        };
    }
}

// эту функцию уже установил в package.json по:  npm install classnames
export function classNames (classes) {
// https://overcoder.net/q/3782/%D0%BA%D0%B0%D0%BA-%D0%B4%D0%BE%D0%B1%D0%B0%D0%B2%D0%B8%D1%82%D1%8C-%D0%BD%D0%B5%D1%81%D0%BA%D0%BE%D0%BB%D1%8C%D0%BA%D0%BE-%D0%BA%D0%BB%D0%B0%D1%81%D1%81%D0%BE%D0%B2-%D0%B2-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82-reactjs
// https://ru.stackoverflow.com/questions/857171/react-js-%D0%92%D1%8B%D0%B7%D0%BE%D0%B2-%D0%BD%D0%B5%D1%81%D0%BA%D0%BE%D0%BB%D1%8C%D0%BA%D0%B8%D1%85-%D0%BA%D0%BB%D0%B0%D1%81%D1%81%D0%BE%D0%B2-%D0%B2-classname
    if(classes && classes.constructor === Array) {
        return classes.join(' ');
    } else if(arguments[0] !== undefined) {
        return [...arguments].join(' ');
    }
    return '';
}

const setSubscriptions = (stompClient, currentSubscriptions)=>{
    // console.log("in setSubscriptions, currentSubscriptions:", currentSubscriptions);
    const subscribeMe =(destination)=> stompClient.subscribe(destination, function (msg) {
        console.log("Received: ", JSON.parse(msg.body))
        if (msg.body) {
            const jsonBody = JSON.parse(msg.body);
            if (jsonBody.message) {
                // setMessages(prev => [...prev, jsonBody.message])
            }
        }
    });

    currentSubscriptions.forEach(destination=>{
        console.log("subscribed to: ", destination);
        subscribeMe(destination);
    });



};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    forwardForUdProfileId,
    prepareFormData,
    neatUpZonedDateTime,
    getPeriod,
    setSubscriptions,
}
