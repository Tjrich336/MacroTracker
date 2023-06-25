import React from 'react'
import './userdashboard.css';

const DashboardBox = ( {onClick, title, index}) => {
    return (
        <div className={`dashboard-box dashboard-box-${index}`} onClick={onClick}>
            {title}
        </div>
        );
}

export default DashboardBox