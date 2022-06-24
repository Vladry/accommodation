import api from "./lib/API";

const getDatingUserProfile = (event) => {
    const {target} = event;
    console.log('target.dataset.name: ', target.dataset.name);
    console.log('target.name: ', target.name);
    const id = Number(target.name);
    console.log("id: ", id);
    return {id};
}

const prepareFormData = (fields, persistedValues) => {

    return {
        initialValues: fields.reduce((acc, current, index, array) => ({     //https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
            ...acc,
            [current.formikRef]: (persistedValues && persistedValues[current.formikRef]) ? persistedValues[current.formikRef] : current.valueByDefault //заполняем дефолтными значениями полученными либо из fetched from persistedValues, либо из заданных по дефолту
        }), {})
    };
}

const fetchInitFormValues = (URL, actionType, callback, dispatch) => {
    api.get(URL).then((res) => {
        dispatch({type: actionType, payload: res});
        callback();
    }).catch(err => {
        console.log(err)
    });
}

export default {
    getDatingUserProfile,
    prepareFormData,
    fetchInitFormValues,
}
