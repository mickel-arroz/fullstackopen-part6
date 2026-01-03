import { useReducer, useRef } from 'react'
import { NotificationContext } from './notificationStore'

const reducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.payload
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(reducer, '')
  const timerRef = useRef(null)

  const setNotification = (message, seconds = 5) => {
    dispatch({ type: 'SHOW', payload: message })
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      dispatch({ type: 'CLEAR' })
      timerRef.current = null
    }, seconds * 1000)
  }

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}
