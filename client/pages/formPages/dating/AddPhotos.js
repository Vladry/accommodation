import React, {useEffect, useState} from 'react';
import DatingMenuWrapper from "./DatingMenuWrapper";
import {datingMenu} from "../../../public/menuConfig";
import styled from "@emotion/styled";
import stylingConfig from "../../../stylingConfig";
import Image from "next/image";
import {Box} from "@mui/material";

const AddPhotos = () => {

    const [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    let width = 0;
    if (images.length < 2) {
        width  = 400 / images.length;
    } else if (images.length < 3) {
        width  = 600 / images.length;
    } else if(images.length < 6){
        width  = 900 / images.length;
    } else if(images.length < 12){
        width  = 1400 / images.length;
    } else if(images.length < 20){
        width  = 2400 / images.length;
    }

        let photos = imageUrls.map((url, ind) =>
            <Box key={ind} sx={{margin: '10px', alignSelf: 'center'}}>
                <img src={url} alt={`photo under ${url}`}
                     width={width} height={'auto'}/>
            </Box>);

    const onPhotoChange = (e) => {
        setImages([...e.target.files]);
    }

    useEffect(() => {
        const newImageUrls = [];
        images.forEach(img => newImageUrls.push(URL.createObjectURL(img)));
        setImageUrls(newImageUrls);
    }, [images])

    return (
        <FlexContainer>
            <Box><DatingMenuWrapper>
                {datingMenu[6].linkName}
            </DatingMenuWrapper>
                <h3>Manage your photos</h3>
                <FormItem>
                    <input type={'file'} multiple accept={"/image/*"} onChange={onPhotoChange}/>
                </FormItem>
            </Box>
            <Box sx={{position: "relative", top: '80px', left: '20px', display: 'flex', flexWrap: 'wrap'}}>
                {photos}
            </Box>
        </FlexContainer>
    );
};

export default AddPhotos;


const FlexContainer = styled.div`
position: relative;
display: flex;
align-items: flex-start;
max-width: 95%
 `;

const FormItem = styled.div`
max-width: 400px;
border: ${stylingConfig.formItem.border};
border-radius: ${stylingConfig.formItem.borderRadius};
margin: ${stylingConfig.formItem.blockMargin};
min-height: ${stylingConfig.formItem.minHeight};
`;