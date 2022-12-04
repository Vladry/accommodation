import {createActions} from '../utils';
import api from '../../lib/API';
import urls from '../../../src/main/resources/urls';

const actions = createActions(
  {
    actionTypes: [
      'SET_ACTIVE_ID', 'CLOSE_CHAT_INFO', 'OPEN_CHAT_INFO', 'RESET_ACTIVE_ID',
      'NAVIGATION_LOADING', 'DETAIL_LOADING', 'SEND_MESSAGE', 'SET_MESSAGE',
      'RESET_FOUND_USERS'
    ],
    asyncTypes: ['GET_CONVERSATION', 'SEARCH_USER'],
  },
  {
    prefix: 'message',
  }
);

export const ACTIONS = {
  ...actions.actions,
  ...actions.asyncActions,
}


export const getUsersRoutes = () => async dispatch => {
  try {
    dispatch(ACTIONS.navigationLoading())
    // await api.get()
    setTimeout(() => {
      dispatch(ACTIONS.navigationLoading());
    }, 500)

  } catch (err) {
    console.log('getUsersRoutes error - ', err);
  }
}

export const sendMessage = ({text, id}) => async dispatch => {
  try {
    console.log(text);
    // await api.get()

  } catch (err) {
    console.log('sendMessage error - ', err);
  }
}

export const getConversation = ({id}) => async dispatch => {
  try {
    dispatch(ACTIONS.setActiveId({id}));
    dispatch(ACTIONS.detailLoading());
    // await api.get()
    setTimeout(() => {
      dispatch(ACTIONS.detailLoading());
    }, 500)

  } catch (err) {
    console.log('getConversation error - ', err);
  }
}

export const searchUser = ({text}) => async dispatch => {
  try {
    if (text.trim() === '') {
      dispatch(ACTIONS.searchUser.success([]));
    } else {
      dispatch(ACTIONS.searchUser.request());
      const data = await api.get(urls.searchInterlocutor, {params: {text}});
      dispatch(ACTIONS.searchUser.success(data));
    }

  } catch (err) {
    console.log('searchUser error - ', err);
    dispatch(ACTIONS.searchUser.fail());
  }
}
