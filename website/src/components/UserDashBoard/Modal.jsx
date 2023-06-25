import React from 'react'
import './userdashboard.css';

const Modal = ({isVisible, onClose, children}) => {
    if(!isVisible) return null;
  return (
    <div className='modal'>
        <button onClick={onClose}>Close</button>
        {children}
    </div>
  )
}

export default Modal