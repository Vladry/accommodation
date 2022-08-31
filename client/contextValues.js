import api from "./lib/API";
import types from "./store/types";

const getUserDatingProfileId = (router, queriedUserId, event) => {
    console.log('queriedUser: ', queriedUserId);
    const {target} = event;// не используем, т.к. мы получили прямо айдишку queriedUserId
    // const targetUserId = Number(target.dataset.id);
    // console.log('target: ', target);
    // console.log('target.name: ', target.name);
    // console.log('target.dataset.id: ', queriedUserId);
    // console.log("router: ", router);
    router.push(`/profiles/UserDatingProfile/?queriedUserId=${queriedUserId}`);
}


const prepareFormData = (fields, persistedValues) => {

    return {
        initialValues: fields.reduce((acc, current, index, array) => ({     //https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
            ...acc,
            [current.formikRef]: (persistedValues && persistedValues[current.formikRef]) ? persistedValues[current.formikRef] : current.valueByDefault //заполняем дефолтными значениями полученными либо из fetched from persistedValues, либо из заданных по дефолту
        }), {})
    };
}

const fetchInitFormValues = (URL, loadingAct, successAct, failAct, callback, dispatch) => {
    dispatch({type: loadingAct});
    api.get(URL).then((res) => {
        dispatch({type: successAct, payload: res});
    }).catch(err => {
        console.log(err)
        dispatch({type: failAct});
    }).finally(
        ()=>callback()
    );
}

export default {
    getUserDatingProfileId,
    prepareFormData,
    fetchInitFormValues,
}
