import api from '../../lib/API';
import urls from '../../../src/main/resources/urls';
import {createActions} from '../actionsCreator.js';

const actions = createActions(
  {
    actionTypes: [
      "DO_SMTH",
    ],
    asyncTypes: ["GET_CHATS", "SET_CHATS",],
  },
  {
    prefix: 'datingChats',
  }
);

export default {
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

