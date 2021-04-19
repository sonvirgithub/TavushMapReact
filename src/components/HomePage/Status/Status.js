import React, { useState, useContext, useEffect, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import '../AddProgram/AddProgram.css'
import UseOutSideClick from "../../HomePage/UseOutSideClick"
import "react-datepicker/dist/react-datepicker.css";
import { connect, useDispatch } from "react-redux";
import store, { progEditSuccess, editProg } from "../../../redux";

function Status({ statusErr }) {

  const [arrow_icon_status, setArrow_iconStatus] = useState(true)
  const dispatch = useDispatch()
  const ref = useRef();


  UseOutSideClick(ref, () => {

    if (arrow_icon_status) setArrow_iconStatus(false);
  });

  return (
    <div>
      <div className="project_name">
        <label className="status">Կարգավիճակ<img className="star" src={require("../AdminIcons/red-star.svg").default} /></label>
        <button className='btnSities' id='btnSelect' onClick={() => setArrow_iconStatus(!arrow_icon_status)}>

          {
            store.getState().prog.program.statusId == 1 || store.getState().prog.program.statusId == 2 ?
              <label className="label_city">{store.getState().prog.program.status}</label>
              : <label className="label_city">Կարգավիճակ</label>


          }
        </button>
        <img className="arrow_icon" src={require("../AdminIcons/arrow.svg").default} onClick={() => setArrow_iconStatus(!arrow_icon_status)} />
        {
          arrow_icon_status && (
            <div ref={ref} className="select_status">

              <div className='list city' >
                <div className="radio">

                  <li style={{
                    backgroundColor: store.getState().prog.program.statusId == 1 ?
                      '#A4C2D8' : '#FAFAFA'
                  }} className='li1' onClick={() => dispatch(editProg({ ...store.getState().prog.program, statusId: 1, status: "Ընթացիկ" }))}>Ընթացիկ</li>
                </div>
                <div className="radio">

                  <li className='li1' style={{
                    backgroundColor: store.getState().prog.program.statusId === 2 ?
                      '#A4C2D8' : '#FAFAFA'
                  }} onClick={() => dispatch(editProg({ ...store.getState().prog.program, statusId: 2, status: "Ավարտված" }))}>Ավարտված</li>
                </div>
              </div>

            </div>
          )
        }


      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {

    program: state.prog.program,
    statusErr: state.prog.statusErr

  };
};


export default connect(mapStateToProps, null)(Status)
