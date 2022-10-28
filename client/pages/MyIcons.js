import React from 'react';
import {Box} from "@mui/material";
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
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import DoneIcon from '@mui/icons-material/Done';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import ElderlyIcon from '@mui/icons-material/Elderly';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import FaceIcon from '@mui/icons-material/Face';
import WomanIcon from '@mui/icons-material/Woman';
import ManIcon from '@mui/icons-material/Man';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import WcIcon from '@mui/icons-material/Wc';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


const MyIcons = () => {
    return (
        <Box sx={{
            minWidth: '160px',
            mr: '10px',
            display: 'flex',
            flexFlow: 'column',
            gap: '20px',
            p: '20px'
        }}>
            <Box><FavoriteIcon/>
                <FavoriteBorderIcon/>
            </Box>
            <Box>
                <BookmarkAddIcon/>
                <ChatIcon/>
                <SendIcon/>
            </Box>
            <Box>
                <ReportIcon/>
                <ReportOutlinedIcon/>
                <ReportProblemOutlinedIcon/>
                <PhishingIcon/>
            </Box>


            <Box>
                <DoneIcon/>
                <DoneOutlineIcon/>
                <FilterAltIcon/>
            </Box>
            <ElderlyIcon/>
            <Box>
                <ElectricBoltIcon/>
                <EmojiEmotionsIcon/>
                <LocalBarIcon/>
                <SentimentVeryDissatisfiedIcon/>
                <SentimentSatisfiedAltIcon/>
                <SentimentSatisfiedIcon/>
                <DoNotDisturbOnIcon/>
                <RemoveCircleIcon/>
                <RemoveCircleOutlineIcon/>
            </Box>

            <Box>
                <FaceIcon/>
                <WomanIcon/>
                <ManIcon/>
                <WcIcon/>
            </Box>

            <Box>
                <PeopleAltIcon/>
                <PersonAddIcon/>
                <PersonRemoveIcon/>
                <PersonAddDisabledIcon/>
            </Box>

            <Box>
                <StarIcon/>
                <StarBorderIcon/>
                <StarPurple500Icon/>
            </Box>


            <Box>
                <MonetizationOnIcon/>
                <AttachMoneyIcon/>
                <ShoppingCartIcon/>
                <AddShoppingCartIcon/>
            </Box>
        </Box>
    );
};

export default MyIcons;