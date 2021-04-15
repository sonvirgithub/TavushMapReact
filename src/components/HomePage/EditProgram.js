import React, { useState, useContext, useEffect, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import '././AddProgram/AddProgram.css'
import { ProgramContext } from "../../pages/ProgramsPage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UseOutSideClick from "../HomePage/UseOutSideClick"
import moment from 'moment'
import { connect, useDispatch } from "react-redux";
import store, { succeeded, failed, editShow, progEditSuccess, editProg, changeIsSelect, selectedSupports } from "../../redux";
import Communities from "./Communities/Communities";
import Organizations from "./Organizations/Organizations";
import SupportTypes from "./SupportTypes/SupportTypes";
import Status from "./Status/Status";

function EditProgram({ isSelect, progEditSuccess, showEdit, }) {

  const selected = moment(store.getState().prog.program.startDate).toDate()
  const dispatch = useDispatch()

  const handleClose = () => {

    dispatch(editShow())

  };


  const handleSubmit = (evt) => {

    const year = store.getState().prog.program.startDate.getFullYear()
    const month = store.getState().prog.program.startDate.getMonth() + 1
    const day = store.getState().prog.program.startDate.getDate()
    const startDate = `${year}-${month}-${day}`

    const year1 = store.getState().prog.program.endDate.getFullYear()
    const month1 = store.getState().prog.program.endDate.getMonth() + 1
    const day1 = store.getState().prog.program.endDate.getDate()
    const endDate = `${year1}-${month1}-${day1}`


    axios
      .put(`/api/editProgram`, {
        program: store.getState().prog.program, isSelect, startDate, endDate
      })
      .then((res) => {
        if (res.data.success) {
          // setSuccessPage(true);
          dispatch(succeeded(true))
          progEditSuccess(store.getState().prog.program)
          // console.log("isSeleeeeeeeeeect", isSelect);

          handleClose();
          // window.location.reload()
        } else {

          handleClose();
          dispatch(failed(true))
          // setFailPage(true);
        }
      })
      .catch((e) => {
        handleClose();
      });

  };


  return (
    <>

      <Modal show={showEdit} onHide={handleClose} animation={false}>
        {store.getState().prog.program && Object.keys(store.getState().prog.program).length ?
          <Modal.Body>

            <div className="project_name">
              <label className="project_name_label">Ծրագրի անուն (Հայերեն)</label>
              <input className="project_name_input" placeholder="Ծրագրի անուն հայերեն" value={store.getState().prog.program.programName_arm} onChange={e => dispatch(editProg({ ...store.getState().prog.program, programName_arm: e.target.value, }))} />

            </div>
            <div className="project_name">
              <label className="project_name_label">Ծրագրի անուն (English)</label>
              <input className="project_name_input" placeholder="Project name in English" value={store.getState().prog.program.programName_eng} onChange={e => dispatch(editProg({ ...store.getState().prog.program, programName_eng: e.target.value, }))} />
            </div>

            <Communities />


            {/* budget-i inputnery */}
            <div className="project_name">
              <label className="budge_name">Բյուջե</label>
              <input className="budge_input" placeholder="10 000" value={store.getState().prog.program.budget} onChange={e => dispatch(editProg({ ...store.getState().prog.program, budget: e.target.value, }))} />
              <Form.Control as="select" className="usd_input">
                <option >USD</option>
              </Form.Control>
            </div>

            {/* date-eri inputnery */}
            <div className="display_flex">

              <div className="start">
                <label className="start_date_label">Սկիզբ</label>

                <DatePicker
                  selected={store.getState().prog.program.startDate}
                  startDate={store.getState().prog.program.startDate}
                  onChange={date => dispatch(editProg({ ...store.getState().prog.program, startDate: date }))}

                  className="dateStart"
                  closeOnScroll={true} />
              </div>
              <div className="end">
                <label className="end_date_label">Ավարտ</label>
                <DatePicker selected={store.getState().prog.program.endDate} startDate={store.getState().prog.program.endDate} onChange={date => dispatch(editProg({ ...store.getState().prog.program, endDate: date }))} className="dateEnd" closeOnScroll={true} />
              </div>
            </div>

            {/* xekavari input-nery */}
            <div className="project_name">
              <label className="project_name_label">Ծրագրի ղեկավար (Հայերեն)</label>
              <input type="text" className="project_name_input" placeholder="Անուն, Ազգանուն" value={store.getState().prog.program.manager_arm} onChange={e => dispatch(editProg({ ...store.getState().prog.program, manager_arm: e.target.value, }))} />

            </div>
            <div className="project_name">
              <label className="project_name_label">Ծրագրի ղեկավար (English)</label>
              <input type="text" className="project_name_input" placeholder="Fistname, Lastname" value={store.getState().prog.program.manager_eng} onChange={e => dispatch(editProg({ ...store.getState().prog.program, manager_eng: e.target.value, }))} />
            </div>

            {/* contactPerson-i input-nery  */}
            <div className="project_name">
              <label className="project_name_label">Կոնտակտ անձ (Հայերեն)</label>
              <input type="text" className="project_name_input" placeholder="Անուն, Ազգանուն" value={store.getState().prog.program.contact_arm} onChange={e => dispatch(editProg({ ...store.getState().prog.program, contact_arm: e.target.value, }))} />

            </div>
            <div className="project_name">
              <label className="project_name_label">Կոնտակտ անձ (Անգլերեն)</label>
              <input type="text" className="project_name_input" placeholder="Fistname, Lastname" value={store.getState().prog.program.contact_eng} onChange={e => dispatch(editProg({ ...store.getState().prog.program, contact_eng: e.target.value, }))} />
            </div>

            <Organizations />

            <SupportTypes />

            {/* discriptionneri input-nery */}
            <div className="project_name">
              <label className="project_name_label">Նկարագրություն (Հայերեն)</label>
              <textarea className="description_input" placeholder="Հակիրճ նկարագրություն" value={store.getState().prog.program.description_arm} onChange={e => dispatch(editProg({ ...store.getState().prog.program, description_arm: e.target.value, }))} />

            </div>
            <div className="project_name">
              <label className="project_name_label">Նկարագրություն (English)</label>
              <textarea className="description_input" placeholder="Brief description" value={store.getState().prog.program.description_eng} onChange={e => dispatch(editProg({ ...store.getState().prog.program, description_eng: e.target.value, }))} />
            </div>

            {/* status-i inputnery */}
            <Status />
            
            <div className="donor">
              <label className="donor_label">Դոնոր խմբի անդամ է</label>
              <input type="checkbox" id='donor' className="isDonor" value={store.getState().prog.program.isDonor} defaultChecked={store.getState().prog.program.isDonor}
                onClick={() => dispatch(editProg({ ...store.getState().prog.program, isDonor: !store.getState().prog.program.isDonor, }))} />
            </div>

            <div className="btn_popup">
              <button className="cancel" onClick={() => { handleClose() }}>Չեղարկել</button>
              <button className="save" onClick={() => { handleSubmit() }}>Հաստատել</button>
            </div>
          </Modal.Body>
          : <></>}
      </Modal>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    program: state.prog.program,
    showEdit: state.prog.showEdit,
    isSelect: state.prog.isSelect

  };
};

const mapDispatchToProps = dispatch => {
  return {
    progEditSuccess: (prog, isSelect) => dispatch(progEditSuccess(prog, isSelect)),
    // changeIsSelect: (isSelect) => dispatch(changeIsSelect(isSelect))

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditProgram);
