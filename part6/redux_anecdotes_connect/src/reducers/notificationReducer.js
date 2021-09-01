export const setNotification = (notification, s, timer) => {
  return async (dispatch) => {
	console.log('timer', timer)
    if (timer) {
	  clearTimeout(timer)
	  console.log('Cleared setTimeout')
    }		
	dispatch({
      type: 'SET_NOTIFICATION',
	  notification 
    })
    const id = setTimeout(() => dispatch({type: 'RESET_NOTIFICATION'}), s*1000)
    dispatch({
	  type: 'SET_TIMER',
	  timer: id
	})	
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET_NOTIFICATION'
  }	
}

export const setTimer = () => {
  return {
    type: 'SET_TIMER'
  }	
}	

const reducer = (state = {notification: '', timer: null}, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION': {
      return {
	    notification: action.notification,
		timer: null
	  }
    }
    case 'RESET_NOTIFICATION': {
      return {
		notification: '',
		timer: null
	  } 	 		 
    }
	case 'SET_TIMER': {
	  return {
		...state,
		timer: action.timer
	  }	  
	}
  }
  return state
}

export default reducer