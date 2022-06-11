const getDatingUserProfile = (event) => {
    const {target} = event;
    console.log('target: ', target);
    console.log('target.dataset: ', target.dataset);
    console.log('target.dataset.name: ', target.dataset.name);
    console.log('target.name: ', target.name);
    console.log('event.nativeEvent.target.name: ', event.nativeEvent.target.name);
    console.log('event.nativeEvent.target.dataset.name: ', event.nativeEvent.target.dataset.name);
    const id = Number(target.name);
    console.log("id: ", id);
    return {id} ;
}

export default {
    getDatingUserProfile,
}
