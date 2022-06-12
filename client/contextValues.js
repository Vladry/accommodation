const getDatingUserProfile = (event) => {
    const {target} = event;
    console.log('target.dataset.name: ', target.dataset.name);
    console.log('target.name: ', target.name);
    const id = Number(target.name);
    console.log("id: ", id);
    return {id} ;
}

export default {
    getDatingUserProfile,
}
