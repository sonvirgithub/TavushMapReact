import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import AddSetting from "./AddSetting";
import DeleteSetting from "./DeleteSetting";
import EditSetting from "./EditSetting";
import { connect, useDispatch } from "react-redux";
import { editUser, deleteUser,getUsers,editShow,deleteShow } from "../../redux";

function Settings({ settings, setSuccessPage, setFailPage,getUsers,users }) {

  const [settingEditShow, setSettingEditShow] = useState(false)
  const [settingDeleteShow, setSettingDeleteShow] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    getUsers()
  }, [])
  
  const handleShowEdit = (index) => {

    dispatch(editUser(users[index]))
    // setSettingEditShow(true)
    dispatch(editShow())
  }

  const handleShowDelete = (index) => {

    dispatch(deleteUser(users[index]))
    // setSettingDeleteShow(true)
    dispatch(deleteShow())
  }

  return (
    <div style={{ marginLeft: "328px" }}>
      <div className="org_title">
        <div className="org_title_txt">Կարգավորումներ</div>
        <div>
          <AddSetting
            setSuccessPage={setSuccessPage}
            setFailPage={setFailPage}
          />
        </div>
      </div>

      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Անուն</th>
            <th>Ազգանուն</th>
            <th>Էլ․ հասցե</th>

            <th></th>
          </tr>
        </thead>

        <tbody>
          {users.length > 0 ? (
            users.map((set, index) => {
              return (
                <tr key={set.id}>
                  <td>{set.firstname}</td>
                  <td>{set.lastname}</td>
                  <td>{set.email}</td>

                  <td>
                    <div
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <div
                        variant="primary"
                        onClick={() => {
                          handleShowEdit(index);
                        }}
                      >
                        <img className="org_icon" src={require("../../img/edit.svg").default} />
                      </div>
                      <div  onClick={() => {
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
              <td colSpan="5">Տվյաներ չկան</td>
            </tr>
          )}
        </tbody>
        {/* <EditSetting
          show={settingEditShow}
          setShow={setSettingEditShow}
          setSuccessPage={setSuccessPage}
          setFailPage={setFailPage}
        />
        <DeleteSetting
          show={settingDeleteShow}
          setShow={setSettingDeleteShow}
          setSuccessPage={setSuccessPage}
          setFailPage={setFailPage}
        /> */}
      </table>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {

    users: state.set.users,
    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(getUsers())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Settings);
