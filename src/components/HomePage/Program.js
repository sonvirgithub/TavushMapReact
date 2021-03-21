import React, { useState, useEffect } from "react";
import AddProgram from "./AddProgram/AddProgram";
import DeleteProgram from "./DeleteProgram";
import MoreInfo from "./MoreInfo";
import EditProgram from './EditProgram'
import "react-datepicker/dist/react-datepicker.css";
import "./Program.css"
import moment from 'moment'


function Program({ programs, showResults, setShowResults, setProg, setMoreInfoEndDate,setMoreInfoStartDate }) {

  const [item, setItem] = useState({})
  const [itemDelete, setItemDelete] = useState({})
  const [itemMoreInfo, setItemMoreInfo] = useState({})
  const [editShow, setEditShow] = useState(false)
  const [deleteShow, setDeleteShow] = useState(false)
  

  let [isSelect, setIsSelect] = useState([{}])


  const handleShowEdit = (index) => {

    if (programs[index].status === "ընթացիկ") {
      programs[index].status = 1
    }
    if (programs[index].status === "ավարտված") {
      programs[index].status = 2
    }

    const startDate = moment(programs[index].startDate).toDate()
    const endDate = moment(programs[index].endDate).toDate()


    programs[index].support.map((item) => {
      if (item.supports.length > 0 || item.supports.length != undefined) {
        item.supports.map((support) => {
          isSelect.push({
            supportid: support.supportid
          })
        })
      }
    })

    programs[index].startDate = startDate
    programs[index].endDate = endDate
    // programs[index].support = isSelect
    setItem(programs[index])
    setEditShow(true)

  }

  const handleShowDelete = (id) => {
    setItemDelete(id)
    setDeleteShow(true)
  }

  const handleShowMoreInfo = (index) => {

    setMoreInfoStartDate(moment(programs[index].startDate).format('DD.MM.YYYY'))
    setMoreInfoEndDate(moment(programs[index].endDate).format('DD.MM.YYYY'))
    if(programs[index].status === 1 ){
      programs[index].status ="ընթացիկ"
    }
    if(programs[index].status === 2 ){
      programs[index].status ="ավարտված"
    }
    setProg(programs[index])

    setShowResults(true)
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
            {programs.length > 0 ? (

              programs.map((prog, index) => {

                return (

                  <tr key={prog.id}>
                    <td>{prog.programName_arm}</td>
                    <td >
                      <div className="tdSphere" >
                        {prog.support.map(item => {
                          return item.category_arm + ', '
                        })}
                      </div>
                    </td>

                    <td>{prog.budget}</td>
                    <td>
                      {prog.status}
                    </td>
                    <td>{prog.manager_arm}</td>
                    <td>
                      <div style={{ display: "flex" ,}}>
                        <div style={{  width: "30px", marginRight: "10px" }} onClick={() => {
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
                        <div  onClick={() => {
                          handleShowDelete(prog.id);

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
                <td colSpan="5">Տվյալներ չկան</td>
              </tr>
            )}
          </tbody>
          <EditProgram prog={item} setProg={setItem} show={editShow} setShow={setEditShow} isSelect={isSelect} setIsSelect={setIsSelect} />
          <DeleteProgram id={itemDelete} show={deleteShow} setShow={setDeleteShow} />

        </table>
      </div>

    </div>
  );
}

export default Program;
