export const setNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification
  }	
}

export const resetNotification = () => {
  return {
    type: 'RESET_NOTIFICATION'
  }	
}	

const reducer = (state = '', action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'SET_NOTIFICATION': {
      return action.notification
    }
    case 'RESET_NOTIFICATION': {
      return ''
    }
  }
  return state
}

export default reducer