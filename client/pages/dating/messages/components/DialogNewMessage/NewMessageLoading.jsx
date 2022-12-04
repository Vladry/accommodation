import React from "react";
import {useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import LinearProgress from '@mui/material/LinearProgress';
import sel from '@/store/message/selector';

const NewMessageLoading = () => {
  const {searchUserLoading} = useSelector(sel.getMessageData);

  return (searchUserLoading ? <LinearProgressWrapper/> : <></>);
}

const styles = ({theme}) => ({
  height: 2,
});

const LinearProgressWrapper = styled(LinearProgress)(styles);

export default NewMessageLoading;
