import React, {useContext} from 'react';
import {Context} from "@/root/context.js";
import {Box, Paper} from "@mui/material";
import Image from "next/image";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {useTheme} from "@mui/material/styles";


const DatingUserCard = ({user}) => {
    const {forwardForUdProfileId} = useContext(Context);
    const dispatch = useDispatch();
    const router = useRouter();
    const {neatUpZonedDateTime, getPeriod} = useContext(Context);
    const theme = useTheme();
    if (!user) return null;

    let avatarCssParam;
    if (!user.avatar) {
        avatarCssParam = {filter: 'opacity(0.2)'}
    } else {
        avatarCssParam = {}
    }


    let visitDateConvertedStr = neatUpZonedDateTime(user.datingLastVisitDate);
    const visitDateMs = Date.parse(visitDateConvertedStr);
    const period = getPeriod(visitDateMs);
    const periodArr = getPeriod(visitDateMs).split(" ");
    let isOnline = false;
    if (periodArr[0] >= 0 && periodArr[0] < 25 && periodArr[1] === "minutes") {
        isOnline = true;
    }
// TODO:  тут же, текстовую переменную 'period' можно писать в поле datingLastVisitDate для возможности последующей фильтрации по периоду отсутствия на сайте


    let lastVisitedIndication = isOnline ?
        (<>
            {/*<span style={{marginLeft: '20px', fontSize: '18px', color: 'green', fontWeight: 900}}>Online</span>*/}
            <div style={{display: 'inline-block', position: 'relative', top: '5px', marginLeft: '20px', height: '25px', width: '25px', backgroundColor: 'green', border: '4px solid lightgray', borderRadius: '50%'}}></div>
        </>)

        :

        (<>
            <span style={{marginLeft: '12px', fontSize: '12px'}}>lastVisit:</span>
            <span style={{marginLeft: '6px', fontSize: '14px', color: 'darkgoldenrod', fontWeight: 600}}>
            {period}</span>
        </>);


    return (
        <Paper sx={{borderRadius: `${theme.cardBoxParams.borderRadius}`, ...theme.paperProps }} id='card' name={user.name} data-id={String(user.id)}
             onClick={forwardForUdProfileId.bind(null, router, user.id, user, dispatch)}>
            <div style={{marginLeft: '18px', position: 'relative', marginTop: '12px'}}>
                <span style={{
                    color: 'darkred',
                    fontSize: 18,
                    fontWeight: 400,
                    textShadow: '1px 1px #1d3557'
                }}> {user.name},</span>
                <span style={{color: '#281714', fontWeight: 500, marginLeft: '16px',}}>  {user.location}</span>
                <br/>
                <span style={{marginLeft: '1px', fontSize: '12px'}}>age: </span>
                <span style={{color: 'gray', fontWeight: 900}}>{user.age}</span>
                {!!user.datingLastVisitDate && ","}
                {!!user.datingLastVisitDate && lastVisitedIndication}
            </div>
            <Box
                sx={{
                    border: `${theme.cardBoxParams.border}`, borderRadius: `${theme.cardBoxParams.borderRadius}`,
                    padding: `${theme.cardBoxParams.padding}`, width: '250px', height: '250px'
                }}>
                <div style={{position: 'relative', top: '-0.1em', ...avatarCssParam}}>
                    <Image src={user.avatar ? user.avatar : '/images/users.png'}
                           alt={'user-image'} width={250} height={250}
                    />
                </div>
            </Box>
        </Paper>
    );


};

export default DatingUserCard;

