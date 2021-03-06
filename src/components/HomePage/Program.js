import React, { useState, useEffect } from "react";
import AddProgram from "./AddProgram/AddProgram";
import "react-datepicker/dist/react-datepicker.css";
import "./Program.css"
import moment from 'moment'
import store, {
  deleteProg, deleteShow, editShow, getPrograms, deleteSupMoreInfo, allSupports, selectCommunities,
  editProg, selectedSupports, changeIsSelect, moreInfoShow, moreInfoProgram, changeSupMoreInfo, editSupMoreInfo, naxkinProg
} from "../../redux";
import { useDispatch, connect } from "react-redux";

function Program({ getPrograms, changeIsSelect, program, edit, moreInfoShow, moreInfoProgram,
  changeSupMoreInfo, selectedSupports, deleteSupMoreInfo, selectCommunities }) {

  useEffect(() => {
    getPrograms()

  }, [])

  const dispatch = useDispatch()

  const handleShowEdit = (index) => {

    // selectCommunities(store.getState().prog.programs[index].community)
    dispatch(editProg(store.getState().prog.programs[index]))
    if (program.id != store.getState().prog.programs[index].id) {
      changeIsSelect([])
      selectedSupports(store.getState().prog.programs[index])

    } else {
      if (!edit) {
        changeIsSelect([])
        selectedSupports(store.getState().prog.programs[index])

      }
    }

    dispatch(editShow())

  }

  const handleShowDelete = (index) => {

    dispatch(deleteProg(store.getState().prog.programs[index]))
    dispatch(deleteShow())
  }

  const handleShowMoreInfo = (index) => {

    moreInfoProgram(store.getState().prog.programs[index])
    deleteSupMoreInfo()
    changeSupMoreInfo(store.getState().prog.programs[index])
    moreInfoShow(true)

  }
  return (
    <div
    // style={{ position: "absolute" }}
    >
      <div style={{ marginLeft: "328px" }}>
        <div className="org_title">
          <div className="org_title_txt">Ծրագրեր</div>
          <div>
            <AddProgram />
          </div>
        </div>

        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={{ width: "15%" }}>Ծրագրի անուն</th>
              <th style={{ width: "15%" }}>Ոլորտ(ներ)</th>
              <th style={{ width: "15%" }}>Բյուջե</th>
              <th style={{ width: "15%" }}>Կարգավիճակ</th>
              <th style={{ width: "15%" }}>Ծրագրի ղեկավար</th>
              <th style={{ width: "25%" }}></th>
            </tr>
          </thead>

          <tbody>
            {store.getState().prog.programs.length > 0 ? (

              store.getState().prog.programs.map((prog, index) => {

                return (

                  <tr key={prog.id}>

                    <td>
                      <div className="tdSphere">{prog.programName_arm}</div>
                    </td>
                    <td >
                      <div className="tdSphere" >
                        {prog.support?.map(item => {
                          return item.category_arm + ', '
                        })}
                      </div>
                    </td>

                    <td>{prog.budget}</td>
                    <td>
                      {prog.status}
                    </td>
                    <td>
                      <div className="tdSphere">
                        {prog.manager_arm}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: "flex", justifyContent:"center" }}>
                        <div style={{ width: "30px", marginRight: "10px" }} onClick={() => {
                          handleShowMoreInfo(index)

                        }}>
                          <img
                            style={{ width: "25px" }}
                            className="org_icon"
                            src={require("../../img/eye.svg").default}
                          />
                        </div>
                        <div style={{ display: "flex" }}>

                          <div variant="primary" onClick={() => {
                            handleShowEdit(index);

                          }}>
                            <img className="org_icon" src={require("../../img/edit.svg").default} />
                          </div>
                        </div>
                        <div onClick={() => {
                          handleShowDelete(index);

                        }}>
                          <img
                            style={{ width: "17px" }}
                            className="org_icon"
                            src={require("../../img/remove.svg").default}
                          />
                        </div>

                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6">Տվյալներ չկան</td>
              </tr>
            )}
          </tbody>


        </table>
      </div>

    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    program: state.prog.program,
    programs: state.prog.programs,
    edit: state.prog.edit,
    add: state.prog.add,
    moreInfoProg: state.moreInfoProg,
    suppMoreInfoProg: state.moreInfo.suppMoreInfoProg,
    cities: state.prog.cities



  };
};
const mapDispatchToProps = dispatch => {
  return {
    getPrograms: () => dispatch(getPrograms()),
    selectedSupports: (prog) => dispatch(selectedSupports(prog)),
    changeIsSelect: (isSelect) => dispatch(changeIsSelect(isSelect)),
    moreInfoShow: (show) => dispatch(moreInfoShow(show)),
    moreInfoProgram: (prog) => dispatch(moreInfoProgram(prog)),
    editSupMoreInfo: (prog) => dispatch(editSupMoreInfo(prog)),
    deleteSupMoreInfo: () => dispatch(deleteSupMoreInfo()),
    changeSupMoreInfo: (prog) => dispatch(changeSupMoreInfo(prog)),
    allSupports: (prog) => dispatch(allSupports(prog)),
    selectCommunities: (com) => dispatch(selectCommunities(com))





  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Program);
