import React from 'react'
import Setting from '../Setting/Setting'
import { Link } from 'react-router-dom'

function PayBookDropdow() {
  return (
    <>
    <Setting/>
     <section id='about-account-drop' className='Diagnosis-Container'>
                    <div>
                        <ul className='Diagnosis_list'>
                            <li className="report-list">
                                <Link className="report-title" to="/Daily_paymet/Book">
                                    Recievie & Payment Book for Outdoor 
                                </Link>
                            </li>
                            <li className="report-list">
                                <Link className="report-title" to="/Indoor-Summary"> 
                                   Recievie & Payment Book for Indoor
                                </Link>
                            </li>
                            <li className="report-list">
                                <Link className="report-title" to="/Daily_paymet/Book">
                                   Recievie & Payment Indoor + Outdoor Both
                                </Link>
                            </li>
                            <li className="report-list">
                                <Link className="report-title" to="/Testing-data">
                                   All Summary Indoor & Outdoor Both on Operator
                                </Link>
                            </li>
                        </ul>
                    </div>
                </section>
    </>
  )
}

export default PayBookDropdow