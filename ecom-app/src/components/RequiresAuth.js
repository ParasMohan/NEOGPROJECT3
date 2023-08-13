import React, { useContext } from 'react'
import { AuthContext } from '..'
import { Navigate, useLocation } from 'react-router-dom'

export const RequiresAuth = ({children}) => {
    const {token} = useContext(AuthContext)
    const location = useLocation();
  return (
    <div>
      {token ? children : <Navigate to="/login" state={{ from: location }} />}
    </div>
  )
}