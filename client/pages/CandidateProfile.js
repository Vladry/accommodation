import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    Avatar,
    Box, ButtonBase,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputLabel,
    Paper,
    TextField,
    useMediaQuery
} from "@mui/material";
import {fetchData} from "../store/actions/userAction";
import types from "../store/types";
import sel from "../store/selectors";
import urls from '../../src/main/resources/urls.json'
import SwiperUserPic from "../components/dating_components/swiper_carousel/SwiperUserPic";
import api from "../lib/API";
import BackButton from "../components/BackButton";
import ActionPannel from "../components/dating_components/candidate_profile/ActionPannel";
import CandidateDetailsTable from "../components/dating_components/candidate_profile/CandidateDetailsTable";
import My_Drawer from "../components/appbar/My_Drawer";
import ToggleMenuIconButton from "../components/ToggleMenuIconButton";
import {useRouter} from "next/router";
import {useTheme} from "@mui/material/styles";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import ChatIcon from "@mui/icons-material/Chat";
import Image from "next/image";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import Draggable from 'react-draggable';
import CloseIcon from "@mui/icons-material/Close";

let stompClient = null;

const CandidateProfile = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const candidateDatingProfile = useSelector(sel.candidateDatingProfile);
    const user = useSelector(sel.user);
    const loadDatProfile = useRef({den: false});
    const reviewedUser = useSelector(sel.reviewedUser);
    const [pictures, setPictures] = useState([]);
    const fetchingFlag = useRef(false);
    const router = useRouter();
    const queriedUserId = router.query.queriedUserId;

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const forceToggleDrawer = () => {
        setIsDrawerOpen(() => !isDrawerOpen);
    }


    const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
    const openMessageDialog = () => {
        setIsMessageDialogOpen(true);
    };

    const [isLiked, setIsLiked] = useState(false);
    const likeAction = () => {
        setIsLiked(!isLiked);
    }

    const [isBookmarked, setIsBookmarked] = useState(false);
    const bookmarkToFavorites = () => {
        setIsBookmarked(!isBookmarked);
    }

    const conditionalToggleDrawer = (e) => {
        // console.log("e.target: ", e.target);
        // console.log('e.target.getAttribute("name): ', e.target.getAttribute("name"));
        // console.log('e.target.dataset.name: ', e.target.dataset.name);
        // console.log('e.target.getAttribute("data-name): ', e.target.getAttribute("data-name"));
        if (e.target.dataset.name === "triggersToggling") {
            setIsDrawerOpen(() => !isDrawerOpen);
        }
        // console.log("not toggling, as target is not equal to triggersToggling");
    };
    const isSmallScreen = useMediaQuery('(max-width:900px)');
    const isLargeScreen = !isSmallScreen;
    let isPaid = useSelector(sel.isPaid);
    // isPaid = false;

    const candidateId = reviewedUser.id;


    const handleCloseMessageDialog = () => {
        setIsMessageDialogOpen(false);
    };

    const [textField, setTextField] = useState("");
    let tempTextField = useRef('');
    const textFieldRef = useRef();

    const debounce = useRef(false);
    useEffect(() => {
        document.addEventListener('keyup', e => {
            if (debounce.current) return;
            // console.log("e.key: ", e.key);
            // console.log("e.code: ", e.code);
            if ((e.altKey || e.ctrlKey || e.shiftKey) && e.key === "Enter") {
                setTimeout(() => {
                    debounce.current = false;
                }, 500);
                sendMessageHandler();
                debounce.current = true;
            } else if (e.key === "Escape") {
                handleCloseMessageDialog();
            }

        });

    }, [])


    const handleInpChange = (e) => {
        tempTextField.current = e.target.value;
    }

    const sendMessageHandler = () => {
        textFieldRef.current.value = "";
        console.log("message:", tempTextField.current);
        // handleCloseMessageDialog();
    };


    const connect = () => {
        if (candidateId === null) return;
        const socket = new SockJS("/ws");
        stompClient = Stomp.over(socket);
        stompClient.connect({}, (frame) => {
            stompClient.subscribe(`/queue/dating/${candidateId}`, datingSubscription);
            console.log("candidate with id ", candidateId, "has subscribed!")
        })
    }

    const datingSubscription = (datingMessage) => {
        let messageText = JSON.parse(datingMessage.body);
        console.log(messageText);
    }

    const fetchExistingPhotos = (queriedUserId) => {
        fetchingFlag.current = true;
        dispatch({type: types.FETCHING_PHOTOS, payload: true});
        api.get(`/users/photos/all/${queriedUserId}?serviceGroup=DATING`).then((urls) => {
            // console.log("fetched photoUrls:", urls);
            const pictures = [...urls];
            dispatch({type: types.FETCHING_PHOTOS, payload: false});
            fetchingFlag.current = false;
            if (reviewedUser?.avatar && !pictures.includes(reviewedUser.avatar)) {
                pictures.push(reviewedUser.avatar);
            }
            setPictures(pictures);
        });
    }


    useEffect(() => {
        if (loadDatProfile["den"]) {
            return;
        }
        loadDatProfile["den"] = true;
        if (queriedUserId) {
            dispatch(fetchData(urls.datingProfile, queriedUserId, types.GET_CANDIDATE_DATING_PROFILE, types.SET_CANDIDATE_DATING_PROFILE_SUCCESS, types.SET_CANDIDATE_DATING_PROFILE_FAIL));
            connect();
        }
    }, [queriedUserId]);

    useEffect(() => {
        if (!fetchingFlag.current && !!queriedUserId) {
            fetchExistingPhotos(queriedUserId);
            // console.log("candidateDatingProfile: ", candidateDatingProfile);
        }
    }, [queriedUserId])


    const candidateAvatar = (
        (pictures && pictures.length > 0) ?
            (<Avatar sx={{
                bgcolor: 'lightgray', color: 'darkgray',
                width: `${isLargeScreen ? "50px" : '40px'}`,
                height: `${isLargeScreen ? "50px" : '40px'}`
            }}>
                <Image src={`${pictures[0]}`}
                       layout={'fill'}
                       alt="candidate avatar"/>
            </Avatar>)
            :
            <AccountCircle sx={{display: 'flex'}}/>
    );

    const messagingWarning = isPaid ? "Type your message below:" : "your tariff plan does not cover messaging to this candidate.";


    function PaperComponent(props) {
        const nodeRef = useRef(null);
        return (
            <Draggable nodeRef={nodeRef} handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
                <Paper ref={nodeRef} {...props} />
            </Draggable>
        );
    }


    return (
        <Paper sx={{
            // [theme.breakpoints.up('xl')]: {display: 'flex'},
            border: '1px solid green', maxWidth: "98%",
            backgroundColor: `${theme.paperBackgroundColor}`,
        }}>


            {isSmallScreen &&
                <Box>
                    <Box sx={{position: 'absolute'}}>
                        <My_Drawer isDrawerOpen={isDrawerOpen} toggleDrawer={conditionalToggleDrawer}>
                            <ActionPannel
                                isMessageDialogOpen={isMessageDialogOpen}
                                openMessageDialog={openMessageDialog}
                                isBookmarked={isBookmarked}
                                bookmarkToFavorites={bookmarkToFavorites}
                                isLiked={isLiked}
                                likeAction={likeAction}
                            />
                        </My_Drawer>
                        <ToggleMenuIconButton color={'#000'} toggleDrawer={forceToggleDrawer}/>
                    </Box>

                    <SwiperUserPic pictures={pictures}/>
                </Box>
            }


            {isLargeScreen &&
                <Box>
                    <Box sx={{position: 'absolute'}}>
                        <ActionPannel
                            isMessageDialogOpen={isMessageDialogOpen}
                            openMessageDialog={openMessageDialog}
                            isBookmarked={isBookmarked}
                            bookmarkToFavorites={bookmarkToFavorites}
                            isLiked={isLiked}
                            likeAction={likeAction}
                        />
                    </Box>
                    <SwiperUserPic pictures={pictures}/>
                    <BackButton/>
                </Box>
            }


            <Dialog
                aria-labelledby="draggable-dialog-title"
                PaperComponent={PaperComponent}
                fullWidth={true}
                maxWidth={'sm'}
                sx={{borderRadius: `${theme.cardBoxParams.borderRadius}`}}
                open={isMessageDialogOpen}
                onClose={handleCloseMessageDialog}
                aria-describedby="dialog-description"
            >


                <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title">

                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', m: 4}}>
                        <ChatIcon sx={{width: '50px', height: '50px'}}/>

                        <Box sx={{
                            m: '0 auto',
                            color: isPaid ? 'green' : `${theme.palette.error.custom3}`
                        }}>
                            {messagingWarning}
                        </Box>

                        {candidateAvatar}
                        <CloseIcon sx={{marginLeft: '30px', cursor: 'pointer'}} onClick={handleCloseMessageDialog}/>
                    </Box>


                </DialogTitle>


                <DialogContent>
                    <InputLabel htmlFor="message">messaging {reviewedUser.name}:</InputLabel>

                    {/*https://mui.com/material-ui/react-text-field/#basic-textfield*/}
                    <TextField inputRef={textFieldRef} multiline fullWidth disabled={!isPaid}
                               id="message" data-name={"message"} label={isPaid ? "text me ..." : 'check your balance'}
                               helperText={isPaid ? "type something" : ' '}
                               error={!isPaid}
                               onChange={handleInpChange}
                    />
                    <DialogContentText>
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                </DialogActions>


                <Box disabled={!isPaid} onClick={sendMessageHandler}
                     sx={{
                         display: 'flex',
                         justifyContent: 'center',
                         gap: '15px',
                         cursor: 'pointer',
                         mb: '30px',
                         opacity: isPaid ? 1 : 0.4
                     }}>

                    <span>Send</span>
                    <SendIcon color="primary"/>
                </Box>
            </Dialog>


            <Box sx={{width: '60%', margin: '0 auto'}}>
                <CandidateDetailsTable/>
            </Box>


        </Paper>
    )
        ;
};

export default CandidateProfile;