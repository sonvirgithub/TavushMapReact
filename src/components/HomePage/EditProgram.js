import React, { useState, useContext, useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import '././AddProgram/AddProgram.css'
import { ProgramContext } from "../../pages/ProgramsPage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import { connect, useDispatch } from "react-redux";
import store, {
  succeeded, failed, editShow, progEditSuccess, editProg,
  moreInfoProgram, cityErrMessage, orgErrMessage, supErrMessage
} from "../../redux";
import Communities from "./Communities/Communities";
import Organizations from "./Organizations/Organizations";
import SupportTypes from "./SupportTypes/SupportTypes";
import Status from "./Status/Status";
import { render } from "react-dom";

function EditProgram({ isSelect, progEditSuccess, showEdit, moreInfoProgram, program1,
  cityErrMessage, orgErrMessage, supErrMessage, moreInfoProg }) {

  const selected = moment(store.getState().prog.program.startDate).toDate()
  const dispatch = useDispatch()

  const [arry, setArray] = useState([])
  const [saveClassName, setSaveClassName] = useState("")
  const [indexes, setIndexes] = useState([])

  const myRef1 = useRef();
  const myRef2 = useRef();
  const myRef3 = useRef();
  const myRef4 = useRef();
  const myRef5 = useRef();
  const myRef6 = useRef();
  const myRef7 = useRef();
  const myRef8 = useRef();
  const myRef9 = useRef();



  useEffect(() => {
    if (program1.programName_arm != "" && program1.programName_eng != "" && program1.budget != "" &&
      program1.manager_arm != "" && program1.manager_eng != "" && program1.contact_arm != ""
      && program1.contact_eng != "" && program1.description_arm != "" && program1.description_eng != "" &&
      program1.community?.length != 0 && program1.organization?.length != 0 && isSelect?.length != 0) {
      setSaveClassName("save_class1")
    }

    else if (program1.programName_arm != "" || program1.programName_eng != "" || program1.budget != "" ||
      program1.manager_arm != "" || program1.manager_eng != "" || program1.contact_arm != ""
      || program1.contact_eng != "" || program1.description_arm != "" || program1.description_eng != "" ||
      program1.community?.length != 0 || program1.organization?.length != 0 || isSelect?.length != 0) {
      setSaveClassName("save_class2")
    }
  }, [program1])

  const [program, setProgram] = useState([
    { editError: "", classname: '' },
    { editError: "", classname: '' },
    { editError: "", classname: '' },
    { editError: "", classname: '' },
    { editError: "", classname: '' },
    { editError: "", classname: '' },
    { editError: "", classname: '' },
    { editError: "", classname: '' },
    { editError: "", classname: '' },

  ])

  const handleClose = () => {
    dispatch(editShow())
  };

  const auto_grow = (element) => {

    element.target.style.height = "50px";
    element.target.style.height = (element.target.scrollHeight) + "px";

  }
  const executeScroll = () => {
    console.log(indexes[0], "myRef.current");


    myRef1.current.scrollIntoView()


  };

  const validate = () => {

    arry[0] = program1.programName_arm
    arry[1] = program1.programName_eng
    arry[2] = program1.budget
    arry[3] = program1.manager_arm
    arry[4] = program1.manager_eng
    arry[5] = program1.contact_arm
    arry[6] = program1.contact_eng
    arry[7] = program1.description_arm
    arry[8] = program1.description_eng
    arry[9] = program1.community
    arry[10] = program1.organization
    arry[11] = isSelect

    setArray([...arry])


    if (program1.programName_arm == "" || program1.programName_eng == "" || program1.budget == "" ||
      program1.manager_arm == "" || program1.manager_eng == "" || program1.contact_arm == ""
      || program1.contact_eng == "" || program1.description_arm == "" || program1.description_eng == "" ||
      program1.community.length == 0 || program1.organization.length == 0 || isSelect.length == 0) {


      arry.map((item, index) => {
        if (item === "" || item?.length == 0) {

          program[index] = {
            editError: "Խնդրում ենք լրացնել դաշտը",
            classname: "class_name_input"
          }
          
          console.log(indexes);
          switch (index) {
            case 9:
              cityErrMessage({
                editError: "Խնդրում ենք լրացնել դաշտը",
                classname: "class_name_input"
              })
              break;
            case 10:
              orgErrMessage({
                editError: "Խնդրում ենք լրացնել դաշտը",
                classname: "class_name_input"
              })
              break;
            case 11:
              supErrMessage({
                editError: "Խնդրում ենք լրացնել դաշտը",
                classname: "class_name_input"
              })
              break;

            default:
              break;
          }
          setProgram([...program])


        } else {
          program[index] = {
            editError: "",
            classname: ""
          }
         
        }

      })
      setProgram([...program])

      return false
    }
    return true;
  }
  const handleSubmit = (evt) => {

    const year = store.getState().prog.program.startDate.getFullYear()
    const month = store.getState().prog.program.startDate.getMonth() + 1
    const day = store.getState().prog.program.startDate.getDate()
    const startDate = `${year}-${month}-${day}`

    const year1 = store.getState().prog.program.endDate.getFullYear()
    const month1 = store.getState().prog.program.endDate.getMonth() + 1
    const day1 = store.getState().prog.program.endDate.getDate()
    const endDate = `${year1}-${month1}-${day1}`


    const isValid = validate()
    console.log("isValid", isValid);
    if (isValid == true) {


      axios
        .put(`/api/editProgram`, {
          program: store.getState().prog.program, isSelect, startDate, endDate
        })
        .then((res) => {
          if (res.data.success) {
            // setSuccessPage(true);
            dispatch(succeeded(true))
            progEditSuccess(store.getState().prog.program)
            if (moreInfoProg.id == store.getState().prog.program.id) {
              moreInfoProgram(store.getState().prog.program)

            }

            arry.map((item, index) => {
              program[index] = {
                editError: "",
                classname: ""
              }
              setProgram([...program])
            })
            supErrMessage({
              editError: "",
              classname: ""
            })
            orgErrMessage({
              editError: "",
              classname: ""
            })
            cityErrMessage({
              editError: "",
              classname: ""
            })
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

    } else {
      executeScroll()
    }

  };

  return (
    <>
      <Modal show={showEdit} onHide={handleClose} animation={false}>
        {store.getState().prog.program && Object.keys(store.getState().prog.program).length ?
          <Modal.Body>

            <div className="project_name">
              <label className="project_name_label" id="1" ref={myRef1}>
                Ծրագրի անուն (Հայերեն)<img className="star" src={require("./AdminIcons/red-star.svg").default} />
              </label>
              <textarea type="text" className={`${program[0].classname} project_name_input`} onInput={(e) => auto_grow(e)}
                required
                value={store.getState().prog.program.programName_arm}
                onChange={e => dispatch(editProg({ ...store.getState().prog.program, programName_arm: e.target.value, }))}
                placeholder="Ծրագրի անուն հայերեն"
              />
              <label className="inputiError">{program[0].editError}</label>
            </div>
            <div className="project_name">
              <label className="project_name_label" ref={myRef2}>Ծրագրի անուն (English) <img className="star" src={require("./AdminIcons/red-star.svg").default} />
              </label>
              <textarea type="text" className={`${program[1].classname} project_name_input`}
                onInput={(e) => auto_grow(e)}
                placeholder="Project name in English"
                value={store.getState().prog.program.programName_eng}
                onChange={e =>
                  dispatch(editProg({ ...store.getState().prog.program, programName_eng: e.target.value, }))} />
              <label className="inputiError">{program[1].editError}</label>
            </div>

            <Communities />


            {/* budget-i inputnery */}
            <div className="project_name">
              <label className="budge_name" ref={myRef3}>Բյուջե<img className="star" src={require("./AdminIcons/red-star.svg").default} /></label>
              <input className={`${program[2].classname} budge_input`}
                placeholder="10 000" value={store.getState().prog.program.budget}

                onChange={e => dispatch(editProg({ ...store.getState().prog.program, budget: e.target.value, }))} />
              <div className="usd_input">
                USD
            </div>
              <label className="inputiError">{program[2].editError}</label>
            </div>

            {/* date-eri inputnery */}
            <div className="display_flex">

              <div className="start">
                <label className="start_date_label">Սկիզբ<img className="star_start_date" src={require("./AdminIcons/red-star.svg").default} /></label>

                <DatePicker
                  selected={store.getState().prog.program.startDate}
                  startDate={store.getState().prog.program.startDate}
                  onChange={date => dispatch(editProg({ ...store.getState().prog.program, startDate: date }))}

                  className="dateStart"
                  closeOnScroll={true} />
              </div>
              <div className="end">
                <label className="end_date_label">Ավարտ<img className="star_end_date" src={require("./AdminIcons/red-star.svg").default} /></label>
                <DatePicker selected={store.getState().prog.program.endDate} startDate={store.getState().prog.program.endDate} onChange={date => dispatch(editProg({ ...store.getState().prog.program, endDate: date }))} className="dateEnd" closeOnScroll={true} />
              </div>

            </div>

            {/* xekavari input-nery */}
            <div className="project_name">
              <label className="project_name_label" ref={myRef4}>Ծրագրի ղեկավար (Հայերեն)<img className="star" src={require("./AdminIcons/red-star.svg").default} /></label>
              <textarea type="text" className={`${program[3].classname} project_name_input`}
                placeholder="Անուն, Ազգանուն"
                onInput={(e) => auto_grow(e)}
                value={store.getState().prog.program.manager_arm}
                onChange={e => dispatch(editProg({ ...store.getState().prog.program, manager_arm: e.target.value, }))} />
              <label className="inputiError">{program[3].editError}</label>
            </div>
            <div className="project_name">
              <label className="project_name_label" ref={myRef5}>Ծրագրի ղեկավար (English)<img className="star" src={require("./AdminIcons/red-star.svg").default} /></label>
              <textarea type="text" onInput={(e) => auto_grow(e)} className={`${program[4].classname} project_name_input`} placeholder="Fistname, Lastname" value={store.getState().prog.program.manager_eng} onChange={e => dispatch(editProg({ ...store.getState().prog.program, manager_eng: e.target.value, }))} />
              <label className="inputiError">{program[4].editError}</label>
            </div>

            {/* contactPerson-i input-nery  */}
            <div className="project_name"  >
              <label className="project_name_label" ref={myRef6}>Կոնտակտ անձ (Հայերեն)<img className="star" src={require("./AdminIcons/red-star.svg").default} /></label>
              <textarea type="text" onInput={(e) => auto_grow(e)} className={`${program[5].classname} project_name_input`} placeholder="Անուն, Ազգանուն" value={store.getState().prog.program.contact_arm} onChange={e => dispatch(editProg({ ...store.getState().prog.program, contact_arm: e.target.value, }))} />
              <label className="inputiError">{program[5].editError}</label>
            </div>
            <div className="project_name">
              <label className="project_name_label" ref={myRef7}>Կոնտակտ անձ (Անգլերեն)<img className="star" src={require("./AdminIcons/red-star.svg").default} /></label>
              <textarea type="text" onInput={(e) => auto_grow(e)} className={`${program[6].classname} project_name_input`} placeholder="Fistname, Lastname" value={store.getState().prog.program.contact_eng} onChange={e => dispatch(editProg({ ...store.getState().prog.program, contact_eng: e.target.value, }))} />
              <label className="inputiError">{program[6].editError}</label>
            </div>

            <Organizations />

            <SupportTypes />

            {/* discriptionneri input-nery */}
            <div className="project_name">
              <label className="project_name_label" ref={myRef8}>Նկարագրություն (Հայերեն)<img className="star" src={require("./AdminIcons/red-star.svg").default} /></label>
              <textarea className={`${program[7].classname} description_input`} placeholder="Հակիրճ նկարագրություն" value={store.getState().prog.program.description_arm} onChange={e => dispatch(editProg({ ...store.getState().prog.program, description_arm: e.target.value, }))} />
              <label className="inputiError">{program[7].editError}</label>
            </div>
            <div className="project_name">
              <label className="project_name_label" ref={myRef9}>Նկարագրություն (English)<img className="star" src={require("./AdminIcons/red-star.svg").default} /></label>
              <textarea className={`${program[8].classname} description_input`} placeholder="Brief description" value={store.getState().prog.program.description_eng} onChange={e => dispatch(editProg({ ...store.getState().prog.program, description_eng: e.target.value, }))} />
              <label className="inputiError">{program[8].editError}</label>
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
              <button className={`${saveClassName} save`} type="submit" onClick={() => { handleSubmit() }}>Հաստատել</button>
            </div>
          </Modal.Body>
          : <></>}
      </Modal>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    program1: state.prog.program,
    showEdit: state.prog.showEdit,
    isSelect: state.prog.isSelect,
    suppForMoreInfo: state.moreInfo.suppForMoreInfo,
    moreInfoProg: state.moreInfo.moreInfoProg,

  };
};

const mapDispatchToProps = dispatch => {
  return {
    progEditSuccess: (prog, isSelect) => dispatch(progEditSuccess(prog, isSelect)),
    moreInfoProgram: (prog) => dispatch(moreInfoProgram(prog)),
    cityErrMessage: (cityErr) => dispatch(cityErrMessage(cityErr)),
    orgErrMessage: (orgErr) => dispatch(orgErrMessage(orgErr)),
    supErrMessage: (supErr) => dispatch(supErrMessage(supErr)),

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditProgram);
