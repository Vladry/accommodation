import React, {useEffect, useRef, useState} from 'react';
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
import BackButton from "../../components/BackButton";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {useRouter} from "next/router";
import DatingSubWrapper from "./DatingSubWrapper";

// const dotenv = require('dotenv');
// dotenv.config();
// const cloudName = process.env.CLOUD_NAME;
// const cloudinaryApi = process.env.ClOUDINARY_URL;
// const apiKey = process.env.API_KEY;

const apiKey = "158443368157872";
const cloudinary_env_variable = `cloudinary://158443368157872:P6FFb0lbPJkqkIR-9FshinRLNKo@vladry`;
const cloudName = "vladry";
const datingImgFolderPrefix = "dating";
const CLOUDINARY_RETRIEVE_URL = ` `;
// const cloudinaryApi = `https://api.cloudinary.com/v1_1/${cloudName}/${datingImgFolderPrefix}/upload`;
const cloudinaryApi = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
const unsigned_upload_preset_name = `huwiaiss`;
// const unsigned_upload_preset_name = `huwiaiss/${datingImgFolderPrefix}/upload`;


const persistPhotoData = async (userId, storeToDatabase) => {
    console.log("persistPhotoData-> storeToDatabase: ",storeToDatabase);
    console.log("userId: ", userId);
    try {
        api.post(`/users/photos/${userId}?serviceGroup=DATING`, [storeToDatabase]).then(() => console.log("pictureUrlsSuccessfullyStoredToDatabase"));
    } catch (e) {
        console.log("error storing photos to database!  \n", e.message);
    }
};

const sendPhotosToCloudinary = async (userId, persistable) => {
// вообще нужно использовать REACT SDK, а не писать это все вручную как здесь:
    persistable.forEach((file, index) => {
        console.log("index: ", index);
        const formData = new FormData();
        formData.append(`file`, file);
        formData.append('upload_preset', unsigned_upload_preset_name);
        formData.append("cloud_name", cloudName);

        axios.post(cloudinaryApi, formData).then((res) => {
            // console.log("fetched a file, res:", res.data);
/*
res.data содержит потенциально  интересные мне данные:
access_mode: "public"
asset_id: "274775799956e3d9c33abc8070660462"
bytes: 137091
created_at: "2022-11-21T22:23:55Z"
folder: "dating"
height: 1000
width: 750
original_filename: "IMG_20210910_154113"
public_id: "dating/mmkk8a1mq7mpschcum5n"
secure_url: "https://res.cloudinary.com/vladry/image/upload/v1669069435/dating/mmkk8a1mq7mpschcum5n.jpg"
signature: "631d5e0fa976f3d660019a190259be7cea4070b5"
url: "http://res.cloudinary.com/vladry/image/upload/v1669069435/dating/mmkk8a1mq7mpschcum5n.jpg"
*/
            persistPhotoData(userId, res.data);
        }).catch((e) => {
            console.log("error fetching a file: ", e.message)
        });

   /*
   // более мудрёный вариант применения axios:

        const axiosInstance = axios.create(); //-чтобы быть уверенным, что имеем новейший инстанс, кот.не вносит никаких своих headers
        axiosInstance({
            url: cloudinaryApi,
            method: "POST",
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin',
                'Access-Control-Allow-Credentials': true,
            }
        }).then((res) => {
            console.log("fetched a file, res:", res)
        }).catch((e) => {
            console.log("error fetching a file: ", e.message)
        });*/
    })
}


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
    const storedPhotoUrls = useRef([]);
    const user = useSelector(sel.user);
    const [existingPhotoUrls, setExistingPhotoUrls] = useState([]);
    const isPhotosFetching = useSelector(sel.isPhotosFetching);
    const dispatch = useDispatch();
    const fetchingFlag = useRef(false);

    const fetchExistingPhotos = (queriedUserId) => {
        fetchingFlag.current = true;
        dispatch({type: types.FETCHING_PHOTOS, payload: true});
        api.get(`/users/photos/all/${queriedUserId}?serviceGroup=DATING`).then((urls) => {
            dispatch({type: types.FETCHING_PHOTOS, payload: false});
            setExistingPhotoUrls(() => urls);
            // console.log("fetched existing photoUrls from DB:", urls)
            fetchingFlag.current = false;
        });
    }




    useEffect(() => {
        if (!fetchingFlag.current && !isPhotosFetching && existingPhotoUrls.length === 0 && user && user.id) {
            fetchExistingPhotos(user.id);
        }
    }, [user])

    const handleSubmit = (e) => {
        console.log("submitting photos: ", validPhotos);

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

    const handlePhotosOnScreen = (e) => {
        let validFiles = [...e.target.files];
        validFiles = validFiles.filter((f) => f.size <= sizeLimBytes);
        let overSizedFiles = [...e.target.files];
        overSizedFiles = overSizedFiles.filter((f) => f.size > sizeLimBytes);
        const persistable = [...validPhotos, ...validFiles];
        setValidPhotos((validPhotos) => persistable);
        setOversizedPhotos([...overSizedFiles]);
        return persistable;
    };

    const onInputPhotoChange = (e) => {
        const persistable = handlePhotosOnScreen(e);
        sendPhotosToCloudinary(user.id, persistable).then(() => {});
    }

    useEffect(() => {
        // console.log("fileInput.current.files: ", fileInput.current.files);
        const validPhotoUrls = [];
        validPhotos.forEach(img => validPhotoUrls.push({
            url: URL.createObjectURL(img),
            name: img.name,
            size: img.size / 1024 / 1024
        }));
        setValidUrls(() => validPhotoUrls);

        const oversizedPhotoUrls = [];
        oversizedPhotos.forEach(img => oversizedPhotoUrls.push({
            url: URL.createObjectURL(img),
            name: img.name,
            size: img.size / 1024 / 1024
        }));
        setOversizedUrls(() => oversizedPhotoUrls);

    }, [oversizedPhotos, validPhotos])


    const addPhotosPage = (
        <form onSubmit={handleSubmit} method={'post'} encType={'multipart/form-data'}>
            <FlexContainer>
                <h3>Manage your photos</h3>
                <FormItem>
                    <AddAPhotoIcon/>
                    <Label> Select your photos here:
                        <input ref={fileInput} type={'file'} multiple accept={"/image/*"} name={'uploaded'}
                               onChange={onInputPhotoChange}/>
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

                    {goodPhotos.length > 0 && <h4>Uploaded photos / Загруженные фото:</h4>}
                    <Paper sx={{
                        display: 'flex', alignItems: 'flex-start', flexFlow: 'wrap',
                        ...theme.paperProps
                    }}>

                        {goodPhotos}
                    </Paper>
                    {rejectedPhotos.length > 0 &&
                        <h4 style={{marginTop: '60px'}}>Rejected photos (larger than {photoSizeLimit} mBts )
                            /
                            Не принятые фото (более {photoSizeLimit} Мбт )</h4>}
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


    return (
        <DatingSubWrapper>
            {addPhotosPage}
        </DatingSubWrapper>
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

