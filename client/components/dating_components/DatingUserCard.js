import React, {useContext} from 'react';
import {Context} from '../../context';
import {Box, ListItem} from "@mui/material";
import Image from "next/image";
import {useRouter} from "next/router";

const DatingUserCard = ({user}) => {
    const {forwardForUdProfileId} = useContext(Context);
    const router = useRouter();
    if (!user) return null;
    let avatarCssParam;

    if (!user.avatar) {
        avatarCssParam = {filter: 'opacity(0.2)'}
    } else {
        avatarCssParam = {}
    }
    let index, visitDateConvertedStr;
    if (user.datingLastVisitDate !== null) {
        index = user.datingLastVisitDate.indexOf("[");
        visitDateConvertedStr = user.datingLastVisitDate.slice(0, index); // убираем в конце:  [Europe/Helsinki]
    }
    const visitDateMs = Date.parse(visitDateConvertedStr);

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
// TODO:  тут же, текстовую переменную 'period' можно писать в поле datingLastVisitDate для возможности последующей фильтрации по периоду отсутствия на сайте


    const lastVisitedIndication = (
        <>
            <span style={{marginLeft: '12px', fontSize: '12px'}}>lastVisit:</span>
            <span style={{marginLeft: '6px', fontSize: '14px', color: 'darkgoldenrod', fontWeight: 600}}>
            {period}</span>
        </>);

    return (
        <Box id='card' name={user.name} data-id={String(user.id)}
             onClick={forwardForUdProfileId.bind(null, router, user.id)}>
            <div style={{marginLeft: '18px', position: 'relative'}}>
                <span style={{color: 'darkred', fontWeight: 900}}> {user.name}</span>
                {!!user.datingLastVisitDate && ","}
                {!!user.datingLastVisitDate && lastVisitedIndication}
            </div>
            <Box
                sx={{border: '2px solid blue', borderRadius: '12px', width: '250px', height: '250px', padding: '10px'}}>

                <div style={{position: 'relative', top: '-0.1em', ...avatarCssParam}}>
                    <Image src={user.avatar ? user.avatar : '/images/users.png'}
                           alt={'user-image'} width={250} height={250}
                    />
                </div>
            </Box>
        </Box>
    );


};

export default DatingUserCard;

