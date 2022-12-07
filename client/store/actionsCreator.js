import { createActions as createActionsLib } from "redux-actions"

export const createAction = (actionType, { async = false, ...options }) => {
  let action = {};

  if (async) {
    action = createActionsLib(
      {
        [actionType]: {
          REQUEST: (act) => act,
          SUCCESS: (act) => act,
          FAIL: (act) => act,
        },
      },
      options
    )
  } else {
    action = createActionsLib(
      {
        [actionType]: (act) => act,
      },
      options
    )
  }

  return action
}

export const createActions = ({ actionTypes = [], asyncTypes = [] }, options) => {
  const _actions = {}
  const _asyncActions = {}

  actionTypes.forEach((type) => {
    _actions[type] = (act) => act
  })

  asyncTypes.forEach((type) => {
    _asyncActions[type] = {
      REQUEST: (act) => act,
      SUCCESS: (act) => act,
      FAIL: (act) => act,
    }
  })

  return {
    actions: createActionsLib({ ..._actions }, options),
    asyncActions: createActionsLib({ ..._asyncActions }, options),
  }
}
