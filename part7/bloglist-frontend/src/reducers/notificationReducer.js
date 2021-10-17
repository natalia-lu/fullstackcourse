const notificationReducer = (state = { message: '', variant: '' }, action) => {
  switch (action.type) {
  case 'SHOW_SUCCESS_NOTIFICATION':
    return {
      message: action.data.message,
      variant: 'success'
    }
  case 'SHOW_WARNING_NOTIFICATION':
    return {
      message: action.data.message,
      variant: 'danger'
    }
  case 'HIDE_NOTIFICATION':
    return { message: '', variant: '' }
  default:
    return state
  }
}

export const showSuccessNotification = (message) => {
  return {
    type: 'SHOW_SUCCESS_NOTIFICATION',
    data: {
      message
    }
  }
}

export const showWarning = (message) => {
  return {
    type: 'SHOW_WARNING_NOTIFICATION',
    data: {
      message
    }
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION'
  }
}

export default notificationReducer