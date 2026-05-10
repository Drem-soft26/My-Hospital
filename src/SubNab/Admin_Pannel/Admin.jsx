import React from 'react'
import Setting from '../Setting/Setting'
import { Link } from 'react-router-dom'

function Admin() {
    return (
        <>
            <Setting />
            <section id='my-admin' className='Diagnosis-Container'>
                <div>
                    <ul className='Diagnosis_list'>
                        <li className="report-list">
                            <Link className="report-title" to="/Discount-page">
                                Discount Percent
                            </Link>
                        </li>
                        <li className='report-list'>
                            <Link className="report-title" to="/">
                               Permission Of Page
                            </Link>
                        </li>
                        <li className='report-list'>
                            <Link className="report-title" to="/New_Account_Creat">
                               User Account Creat
                            </Link>
                        </li>
                        <li className='report-list'>
                            <Link className="report-title" to="/Account_Active/Deactive">
                               User Account Active/Deactive
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    )
}

export default Admin