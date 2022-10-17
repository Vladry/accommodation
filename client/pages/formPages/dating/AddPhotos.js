import React, {useEffect, useState} from 'react';
import DatingMenuWrapper from "./DatingMenuWrapper";
import {datingMenu} from "../../../public/menuConfig";
import styled from "@emotion/styled";
import {Box, Button} from "@mui/material";
import {FormItem, Label} from '../../../components/styledCompGlobal.jsx';
import stylingConfig from "../../../stylingConfig";

const AddPhotos = () => {

    const [validPhotos, setValidPhotos] = useState([]);
    const [oversizedPhotos, setOversizedPhotos] = useState([]);
    const [validUrls, setValidUrls] = useState([]);
    const [oversizedUrls, setOversizedUrls] = useState([]);
    const photoSizeLimit = 3; //Mbts
    const sizeLimBytes = photoSizeLimit * 1024 ** 2;
    let nameLengthLim = 50;

    const handleSubmit = (e) => {
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
                <Box><DatingMenuWrapper>
                    {datingMenu[6].linkName}
                </DatingMenuWrapper>
                    <h3>Manage your photos</h3>
                    <FormItem>
                        <Label>
                            <input type={'file'} multiple min={0} max={2} accept={"/image/*"} name={'uploaded'}
                                   onChange={onPhotoChange}/>
                            {/*<p>maximum photos in one batch: 20</p>*/}
                            <p>maximum size of each photo: {photoSizeLimit}MBt</p>
                        </Label>
                    </FormItem>
                    <Button type={"submit"} variant={'contained'} color={"primary"} disable>submit</Button>
                </Box>
                <Box sx={{position: "relative", top: '55px', left: '20px'}}>
                    {!!goodPhotos && <h4>Accepted photos / Принятые фото:</h4>}
                    <Box sx={{display: 'flex', alignItems: 'flex-start', flexFlow: 'wrap'}}>

                        {goodPhotos}
                    </Box>
                    <hr/>
                    {!!rejectedPhotos &&
                        <h4 style={{marginTop: '60px'}}>The following photos larger than limit of: {photoSizeLimit} mBts
                            /
                            Размер фото выше ограничения в: {photoSizeLimit} Мбт </h4>}
                    <Box sx={{display: 'flex', flexWrap: 'wrap'}}>

                        {rejectedPhotos}
                    </Box>
                </Box>
            </FlexContainer></form>
    );
};

export default AddPhotos;


const FlexContainer = styled.div`
position: relative;
display: flex;
align-items: flex-start;
max-width: 95%
 `;

const ContainerPhotos = styled(Box)`
margin: 10px;
align-self: center;
border: ${stylingConfig.cardBoxParams.border};
border-radius: ${stylingConfig.cardBoxParams.borderRadius};
padding: ${stylingConfig.cardBoxParams.padding};
border-color: ${props => props.borderColor};
`
;


