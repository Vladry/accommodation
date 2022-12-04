import { createActions as createActionsLib } from "redux-actions"

export const createAction = (actionType, { async = false, ...options }) => {
  let actions = {};

  if (async) {
    actions = createActionsLib(
      {
        [actionType]: {
          REQUEST: (action) => action,
          SUCCESS: (action) => action,
          FAIL: (action) => action,
        },
      },
      options
    )
  } else {
    actions = createActionsLib(
      {
        [actionType]: (action) => action,
      },
      options
    )
  }

  return actions
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
