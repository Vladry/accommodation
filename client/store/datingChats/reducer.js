import * as datingChatActions from './index';

const init = {
}

export default (state = init, {type, payload}) => {
  switch (type) {
    case String(datingChatActions.someAct):
      return {
        ...state,
      };

    default:
      return state;
  }
}
