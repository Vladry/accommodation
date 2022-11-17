import React from 'react';
import {Box} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import ReportIcon from '@mui/icons-material/Report';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
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
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PhotoIcon from '@mui/icons-material/Photo';
import CloseIcon from '@mui/icons-material/Close';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import CancelIcon from '@mui/icons-material/Cancel';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import TuneIcon from '@mui/icons-material/Tune';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

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

            {/*https://mui.com/material-ui/material-icons/*/}
            <Box>
                <FavoriteIcon/>
                <FavoriteBorderIcon/>
                <NotificationsIcon/>
                <ThumbUpAltIcon/>
                <ThumbUpOffAltIcon/>
                <VisibilityIcon/>
                <ArrowCircleLeftIcon/>
                <ArrowCircleRightIcon/>
                <AddAPhotoIcon/>
                <AddPhotoAlternateIcon/>
                <PhotoIcon/>
                <HomeIcon/>
            </Box>
            <Box>
                <BookmarkAddIcon/>
                <BookmarksIcon/>
                <ChatIcon/>
                <InsertCommentIcon/>
                <SendIcon/>
                <MailIcon/>
                <MailOutlineIcon/>
                <CloudDownloadIcon/>
                <CloudUploadIcon/>
                <DownloadIcon/>
                <FileDownloadIcon/>
                <FileUploadIcon/>
                <ContentCopyIcon/>
            </Box>
            <Box>
                <ReportIcon/>
                <ReportOutlinedIcon/>
                <ReportProblemOutlinedIcon/>
                <ReportProblemIcon/>
                <PhishingIcon/>
                <LoginIcon/>
                <LogoutIcon/>
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
            <Box>
                <CloseIcon/>
                <CancelPresentationIcon/>
                <CancelIcon/>
                <HighlightOffIcon/>
            </Box>

            <Box>
                <SettingsIcon/>
                <SettingsSuggestIcon/>
                <TuneIcon/>
                <DisplaySettingsIcon/>
                <ManageAccountsIcon/>
            </Box>

            <Box>
                <ToggleOffIcon/>
                <ToggleOnIcon/>
            </Box>



        </Box>
    );
};


export default MyIcons;