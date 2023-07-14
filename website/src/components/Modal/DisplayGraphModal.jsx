import React from 'react'
import PieChart from "../Charts/PieChart"
import SimpleBarChart from '../Charts/SimpleBarChart';
import "../Modal/displayGraphModal.css"

/**
 * `handeClose` is a function that set `show`, by default false.
 * `children` allows us to pass any JSX to be rendered in the modal.
 * @param {*} param0 
 * @returns 
 */

const DisplayGraphModal = ({handleClose, show, data, goal}) => {
    const showHideDisplayGraphModal = show ? "modal_overlay" : "modal display-none";

    if (!show) {
        return null; // Don't render anything if show is false
      }

    return (
        <div className={showHideDisplayGraphModal}>
             <div className="modal_overlay">
                <div className="modal">
                        <h3>Pie Chart</h3>
                        <PieChart data={data}></PieChart>
                        <h3>Bar Chart</h3>
                        <SimpleBarChart data={data} goal={goal}></SimpleBarChart>
                        <button className='closeButton' onClick={handleClose}>Close</button>
                </div>
             </div>
        </div>
    )
}

export default DisplayGraphModal