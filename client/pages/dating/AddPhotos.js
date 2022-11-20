import React, {useEffect, useMemo, useRef, useState} from 'react';
import DatingMenuWrapper from "./DatingMenuWrapper";
import {datingMenu} from "../../public/menuConfig";
import styled from "@emotion/styled";
import {Box, Button, Paper} from "@mui/material";
import {FormItem, Label} from '../../utils/typography.jsx';
import {useTheme} from "@mui/material/styles";
import {v4 as uuidv4} from 'uuid';
import api from "../../lib/API";
import axios from "axios";
import urls from '../../../src/main/resources/urls.json';
import {useDispatch, useSelector} from "react-redux";
import sel from '../../store/selectors.js';
import types from "../../store/types";
import {router} from "next/client";
import BackButton from "../../components/BackButton";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {useRouter} from "next/router";


const getPresignedUrl = async (fileNameKey, duration) => {
    return await api.get(`/presigned-url?fileNameKey=${fileNameKey}&duration=${duration}`,)
        .then(r => r);
}

let storedPhotoUrlArr = [];
const putPhoto = async (url, file) => {
    if (!url) return;

    // console.log("in putPhoto, url: ", url, "\n photo: ", file);
    await axios.put(url, {
        method: "PUT",
        headers: {
            "Content-Type": "multipart/form-data"
            // "Content-Type": "application/octet-stream"
        },
        body: file
    }).then(r => {
        storedPhotoUrlArr.push(url.split("?")[0])
    });
}

const sendPhotos = async (validPhotos) => {
    // console.log("in sendPhotos->");
    for (let file of validPhotos) {
        let fileNameKey = uuidv4();
        let url = await getPresignedUrl(fileNameKey, 60);
        await putPhoto(url, file).then();

    }
}

const storeToDatabase = async (userId, storeToDatabase) => {
    try {
        api.post(`/users/photos/${userId}?serviceGroup=DATING`, storeToDatabase).then(() => console.log("pictureUrlsSuccessfullyStoredToDatabase"));
    } catch (e) {
        console.log("error storing photos to database!  \n", e.message);
    }
};


const AddPhotos = () => {
    const theme = useTheme();
    const [validPhotos, setValidPhotos] = useState([]);
    const [oversizedPhotos, setOversizedPhotos] = useState([]);
    const [validUrls, setValidUrls] = useState([]);
    const [oversizedUrls, setOversizedUrls] = useState([]);
    const photoSizeLimit = 3; //Mbts
    const sizeLimBytes = photoSizeLimit * 1024 ** 2;
    let nameLengthLim = 50;
    const fileInput = useRef(null);
    const [storedPhotoUrls, setStoredPhotoUrls] = useState([]);
    const user = useSelector(sel.user);
    const [existingPhotoUrls, setExistingPhotoUrls] = useState([]);
    const isPhotosFetching = useSelector(sel.isPhotosFetching);
    const dispatch = useDispatch();
    const fetchingFlag = useRef(false);
    const datingServiceParticipation = useSelector(sel.datingServiceParticipation);
    const router = useRouter();

    const fetchExistingPhotos = (queriedUserId) => {
        fetchingFlag.current = true;
        dispatch({type: types.FETCHING_PHOTOS, payload: true});
        api.get(`/users/photos/all/${queriedUserId}?serviceGroup=DATING`).then((urls) => {
            dispatch({type: types.FETCHING_PHOTOS, payload: false});
            setExistingPhotoUrls(urls);
            // console.log("fetched photoUrls:", urls)
            fetchingFlag.current = false;
        });
    }

    const storePhotos =
        (validPhotos) => {
            sendPhotos(validPhotos).then(() => {
                setStoredPhotoUrls(storedPhotoUrlArr);
                storeToDatabase(user.id, storedPhotoUrlArr).then();
            });
        };

    useEffect(() => {
        if (validPhotos.length === 0) return;
        storePhotos(validPhotos);
    }, [validPhotos]);


    useEffect(() => {

        if (!datingServiceParticipation){router.push(`${urls.hostPrefix}${urls.dating}`).then();}

        if (!fetchingFlag.current && !isPhotosFetching && existingPhotoUrls.length === 0 && user && user.id) {
            fetchExistingPhotos(user.id);
        }
    }, [user])

    const handleSubmit = (e) => {
        console.log("submitting photos: ", validPhotos)
    }

    const totalPhotos = validPhotos.length + oversizedPhotos.length;
    let width = 0;
    if (totalPhotos < 2) {
        width = 600 / totalPhotos;
        nameLengthLim = 40;
    } else if (totalPhotos < 3) {
        width = 900 / totalPhotos;
        nameLengthLim = 38;
    } else if (totalPhotos < 6) {
        width = 1200 / totalPhotos;
        nameLengthLim = 20;
    } else if (totalPhotos < 12) {
        width = 1800 / totalPhotos;
        nameLengthLim = 10;
    } else if (totalPhotos < 20) {
        width = 2400 / totalPhotos;
        nameLengthLim = 8;
    } else {
        width = 100;
        nameLengthLim = 6;
    }


    const existingPhotos = existingPhotoUrls.map((url, ind) =>
        <ContainerPhotos key={ind} borderColor={'yellow'}>
            <img src={url} alt={`existing photo under ${ind}`}
                 width={200} height={'auto'}/>
            {/*<p>{data.name.slice(0, nameLengthLim)}, {Number(data.size).toFixed(1)}MBt</p>*/}
        </ContainerPhotos>);

    const goodPhotos = validUrls.map((data, ind) =>
        <ContainerPhotos key={ind} borderColor={'green'}>
            <img src={data.url} alt={`accepted photo under ${data.name}`}
                 width={width} height={'auto'}/>
            {/*<p>{data.name.slice(0, nameLengthLim)}, {Number(data.size).toFixed(1)}MBt</p>*/}
        </ContainerPhotos>);

    const rejectedPhotos = oversizedUrls.map((data, ind) =>
        <ContainerPhotos key={ind} borderColor={'red'}>
            <img src={data.url} alt={`denied photo under ${data.name}`}
                 width={width} height={'auto'}/>
            <p>{data.name.slice(0, nameLengthLim)}, {Number(data.size).toFixed(1)}MBt</p>
        </ContainerPhotos>);


    const onPhotoChange = (e) => {
        let validFiles = [...e.target.files];
        validFiles = validFiles.filter((f) => f.size <= sizeLimBytes);
        let overSizedFiles = [...e.target.files];
        overSizedFiles = overSizedFiles.filter((f) => f.size > sizeLimBytes);

        setValidPhotos([...validFiles]);
        setOversizedPhotos([...overSizedFiles]);
    }

    useEffect(() => {
        // console.log("fileInput.current.files: ", fileInput.current.files);
        const validPhotoUrls = [];
        validPhotos.forEach(img => validPhotoUrls.push({
            url: URL.createObjectURL(img),
            name: img.name,
            size: img.size / 1024 / 1024
        }));
        setValidUrls(validPhotoUrls);

        const oversizedPhotoUrls = [];
        oversizedPhotos.forEach(img => oversizedPhotoUrls.push({
            url: URL.createObjectURL(img),
            name: img.name,
            size: img.size / 1024 / 1024
        }));
        setOversizedUrls(oversizedPhotoUrls);

    }, [oversizedPhotos, validPhotos])


    return (
        <form onSubmit={handleSubmit} method={'post'} encType={'multipart/form-data'}>
            <FlexContainer>
                <h3>Manage your photos</h3>
                <FormItem>
                    <AddAPhotoIcon/>
                    <Label> Select your photos here:
                        <input ref={fileInput} type={'file'} multiple accept={"/image/*"} name={'uploaded'}
                               onChange={onPhotoChange}/>
                        <p>maximum size of each photo: {photoSizeLimit}MBt</p>
                    </Label>
                </FormItem>
                <Button type={"submit"} variant={'contained'} color={"primary"}
                        disabled={(totalPhotos <= 0)}>submit</Button>
                <Box sx={{position: "relative", top: '55px', left: '20px'}}>
                    {/*//----------------------------------------------*/}

                    {existingPhotos.length > 0 && <h4>Manage your current photos: / Редактируйте Ваши фотографии:</h4>}
                    <Paper sx={{
                        display: 'flex', alignItems: 'flex-start', flexFlow: 'wrap',
                        ...theme.paperProps
                    }}>

                        {existingPhotos}
                    </Paper>
                    {/*//----------------------------------------------*/}

                    {goodPhotos.length > 0 && <h4>Accepted photos / Принятые фото:</h4>}
                    <Paper sx={{
                        display: 'flex', alignItems: 'flex-start', flexFlow: 'wrap',
                        ...theme.paperProps
                    }}>

                        {goodPhotos}
                    </Paper>
                    {rejectedPhotos.length > 0 &&
                        <h4 style={{marginTop: '60px'}}>The following photos larger than limit of: {photoSizeLimit} mBts
                            /
                            Размер фото выше ограничения в: {photoSizeLimit} Мбт </h4>}
                    <Paper sx={{
                        display: 'flex', flexWrap: 'wrap',
                        ...theme.paperProps
                    }}>

                        {rejectedPhotos}
                    </Paper>
                    {/*<h5>image from aws   s3 bucket:</h5>*/}
                    {/*<img width={300} height={300} src={"https://accommodation-ukraine.s3.eu-west-2.amazonaws.com/22b0e8c5-9296-4c8a-88b4-3c828bd00d4d"} />*/}
                </Box>
            </FlexContainer>
            <BackButton/>
        </form>
    );
};

export default AddPhotos;


const FlexContainer = styled.div`
position: relative;
display: flex;
align-items: flex-start;
max-width: 95%
 `;

const ContainerPhotos = styled(Box)(
    (props) => ({
        border: `${props.theme.cardBoxParams.border}`,
        borderRadius: `${props.theme.cardBoxParams.borderRadius}`,
        padding: `${props.theme.cardBoxParams.padding}`,
        borderColor: `${props.borderColor}`,
        margin: '10px',
        alignSelf: 'center',
    })
);

