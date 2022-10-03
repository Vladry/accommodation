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
    let visitDateStr;

    if (user.datingLastVisitDate !== null) {
        visitDateStr = user.datingLastVisitDate.toLocaleString();
    }

    // visitDateStr:  2022-10-03T09:59:29.503359+03:00[Europe/Helsinki]
    const visitDateMs = Date.parse("2022-08-03T11:20:29");
    // const visitDateDate = new Date(visitDateMs);
    // console.log("visitDate: ", visitDateDate);
    // const dateStr = visitDateDate.toLocaleDateString(); // 03.08.2022
    // const timeStr = visitDateDate.toLocaleTimeString(); // 11:20:29
    // const localeStr = visitDateDate.toLocaleString();   // 03.08.2022, 11:20:29
    //
    // console.log("dateStr: ", dateStr);
    // console.log("timeStr: ", timeStr);
    // console.log("localeStr: ", localeStr);

    let period;
    const visitPeriodMs = Date.now() - visitDateMs;
    if (visitPeriodMs < 3600 * 1000) {
        period = `${Math.round(visitPeriodMs/60/1000)} minutes`;

    } else if (visitPeriodMs < 24 * 3600 * 1000) {
        period = `${Math.round(visitPeriodMs/3600/1000)} hours`;

         } else if (visitPeriodMs < 7 * 24 * 3600 * 1000) {
             period = `${Math.round(visitPeriodMs/24/3600/1000)} days`;

    } else if (visitPeriodMs < 30 * 24 * 3600 * 1000) {
        period = `${Math.round(visitPeriodMs/7/24/3600/1000)} weeks`;

    } else if (visitPeriodMs < 365 * 24 * 3600 * 1000) {
        period = `${Math.round(visitPeriodMs/30/24/3600/1000)} months`;

    } else {
        period = `${Math.round(visitPeriodMs/365/24/3600/1000)} years`;
    }


    console.log("period: ", period);
    // console.log("seconds: ", visitPeriodMs/1000);
    return (
        <Box id='card' name={user.name} data-id={String(user.id)}
             onClick={forwardForUdProfileId.bind(null, router, user.id)}>
            <div style={{marginLeft: '18px', position: 'relative'}}>
                <span style={{color: 'darkred', fontWeight: 900}}> {user.name}</span>,
                <span style={{marginLeft: '12px', fontSize: '12px'}}>lastVisit:</span>
                <span style={{marginLeft: '6px', fontSize: '14px', color: 'darkgoldenrod', fontWeight: 600}}>{period}</span>
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

