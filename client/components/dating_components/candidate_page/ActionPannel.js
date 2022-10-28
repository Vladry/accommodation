import React from 'react';
import {Box, useMediaQuery} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import ReportIcon from '@mui/icons-material/Report';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import PhishingIcon from '@mui/icons-material/Phishing';
import styled from '@emotion/styled';
import Tooltip from "@mui/material/Tooltip";
import {useTheme} from "@mui/material/styles";
import BackButton from "../../BackButton";


const ActionPannel = ({placement}) => {
    const isSmallScreen = useMediaQuery('(max-width: 1100px)');
    const isMediumScreen = useMediaQuery('(max-width: 900px)');
    const theme = useTheme();

    return (
        <Box sx={{
            width: {xs: '200px', sm: '250px', md: '350px', lg: '450px'},
            backgroundColor: '#281714',
            color: 'white',
            mr: '10px',
            display: 'flex',
            flexFlow: 'column',
            gap: '29px',
            p: '20px',
            borderRadius: `${theme.cardBoxParams.borderRadius}`,
        }}>
            <Box>
                <FavoriteIcon sx={{color: 'red'}}/>
                <FavoriteBorderIcon
                />
                <Span>like/unlike</Span>
            </Box>
            {/*<Box>*/}
            {/*    <Tooltip placement={placement} title={"bookmark this candidate for later messaging"}>*/}
            {/*    <BookmarkAddIcon/><Span>bookmark</Span></Tooltip>*/}
            {/*</Box>*/}
            <Box>
                <Tooltip placement={placement} title={"bookmark this candidate for later messaging"}>
                    <BookmarkAddIcon/></Tooltip>
                <Tooltip placement={placement} title={"bookmark this candidate for later messaging"}>
                    <Span>{isSmallScreen? "bookmark" : "bookmark this candidate"}</Span></Tooltip>
            </Box>
            <Box>
                <Tooltip placement={placement} title={"text to this candidate"}>
                    <ChatIcon/></Tooltip>

                <Tooltip placement={placement} title={"text to this candidate"}>
                    <Span>{isSmallScreen? "message" : "message him/her"}</Span></Tooltip>
            </Box>
            <Box>
                <SendIcon
                /><Span>send</Span>
            </Box>
            <Box sx={{color: 'red'}}>
                <Tooltip placement={placement} title={"Report about an abusive or impolite candidate or other instances of rudeness and the like."}>
                    <ReportProblemOutlinedIcon/></Tooltip>
                <Tooltip placement={placement} title={"Report about an abusive or impolite candidate or other instances of rudeness and the like."}>
                    <Span>{isSmallScreen? "Report abuse" : "Report abusive behaviour"}</Span></Tooltip>
            </Box>
            <Box sx={{color: 'darkred'}}>
                <Tooltip placement={placement} title={"Report candidate's suspicious actions, such as scum, fishing and commercial - related content."}>
                    <ReportOutlinedIcon/></Tooltip>
                <Tooltip placement={placement} title={"Report candidate's suspicious actions, such as scum, fishing and commercial - related content."}>
                    <Span>{isSmallScreen? "scam" : "Scam, fishing or commerce"}</Span></Tooltip>
            </Box>

            {/*            <Box>
                <ReportIcon sx={{color: 'maroon'}}/>
                <ReportOutlinedIcon sx={{color: 'maroon'}}/>
                <ReportProblemOutlinedIcon sx={{color: 'darkred'}}/>
                <PhishingIcon sx={{color: 'darkred'}}/>
            </Box>*/}

            {isMediumScreen && <BackButton xyOffset={{top: '420px', left: '70px'}}/>}
        </Box>
    );
};

export default ActionPannel;

const Span = styled.span`
color: lightgray;
margin-left: 10px;
`;