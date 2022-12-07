import api from '../../lib/API';
import urls from '../../../src/main/resources/urls';
import {createActions} from '../utils';

const actions = createActions(
  {
    actionTypes: [
      "DO_SMTH",
    ],
    asyncTypes: ["GET_CHATS", "SET_CHATS",],
  },
  {
    prefix: 'message',
  }
);

export const ACTIONS = {
  ...actions.actions,
  ...actions.asyncActions,
}


export const geChats = () => async dispatch => {
  try {
    dispatch(ACTIONS.getChats())

  } catch (err) {
    console.log('getUsersRoutes error - ', err);
  }
}

