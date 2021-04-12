import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import AddOrganization from "./AddOrganization";
import DeleteOrganization from "./DeleteOrganization";
import EditOrganization from "./EditOrganization";
import "./style.css";
import { useDispatch,connect } from "react-redux";
import { deleteOrg ,editOrg,deleteShow,editShow,getOrganizations} from "../../redux";

function Organization({ organizations,getOrganizations }) {
  
  useEffect(() => {
    getOrganizations()
  }, [])


  const dispatch = useDispatch()

  console.log("organizations");
  const handleShowEdit = (index) => {

    dispatch(editOrg(organizations[index]))
    dispatch(editShow())

  }

  const handleShowDelete = (index) => {
    dispatch(deleteOrg(organizations[index]))
    dispatch(deleteShow())

  }
  return (
    <div style={{ marginLeft: "328px" }}>
      <div className="org_title">
        <div className="org_title_txt">Կազմակերպություններ</div>
        <div>
          <AddOrganization />
        </div>
      </div>

      <table style={{ width: "100%" }}>
        <thead
          style={{
            //  fontSize: "18px",
            fontWeight: "700",
          }}
        >
          <tr>
            <th>
              Կազմակերպության անվանում{" "}
              <span style={{ fontWeight: "400" }}>(Հայ)</span>
            </th>
            <th>
              Կազմակերպության անվանում
              <span style={{ fontWeight: "400" }}>(Անգլ)</span>
            </th>
            <th>Կոնտակտ անձ</th>

            <th></th>
          </tr>
        </thead>

        <tbody style={{ fontSize: "16px" }}>
          {organizations.length > 0 ? (
            organizations.map((org, index) => {
              return (
                <tr key={org.id}>
                  <td>{org.nameArm}</td>
                  <td>{org.nameEng}</td>
                 

                  <td>{org.contactPersonArm}</td>
                  {/* <td>{org.name_eng}</td> */}
                  <td
                  //   style={{ display: "flex" }}
                  >
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                        <div
                        variant="primary"
                        onClick={() => {
                          handleShowEdit(index);
                        }}
                      >
                        <img className="org_icon" src={require("../../img/edit.svg").default} />
                      </div>
                      <div style={{ marginLeft: "5px" }} onClick={() => {
                          handleShowDelete(index);
                        }}>
                        <img
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
        {/* <EditOrganization/>
        <DeleteOrganization /> */}
      </table>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {

    organizations: state.org.organizations,
    
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getOrganizations: () => dispatch(getOrganizations())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Organization);
