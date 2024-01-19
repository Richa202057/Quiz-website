import React from 'react'
import './ErrorMessage.css'
function ErrorMessage({children}) {
  return (
    <div className='error'>{children}</div>
  )
}

export default ErrorMessage