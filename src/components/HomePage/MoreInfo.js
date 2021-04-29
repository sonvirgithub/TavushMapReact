import { useEffect, useState } from "react";
import React from "react";
import "./MoreInfo.css"
import store, { moreInfoShow, editSupMoreInfo, changeSupMoreInfo } from "../../redux";
import { connect } from "react-redux";


function MoreInfo({ suppForMoreInfo, moreInfoProg, startDate, endDate, moreInfoShow,categMoreInfo }) {


  const closeMore = () => {
    moreInfoShow(false)

  };

console.log(categMoreInfo);

  return (
    <div className="sideBar sideBar1 ">
      <div onClick={closeMore}>
        <img
          //   className="org_icon"
          style={{ float: "right", padding: "20px", cursor: "pointer" }}
          src={require("../../img/remove.svg").default}
        />
      </div>

      <div style={{ padding: "30px" }} >

        <div style={{ color: "#05558F", fontSize: "28px", }}>
          {moreInfoProg.programName_arm}
        </div>

        <div style={{ color: "#808A8A", fontSize: "18px", }}>
          {moreInfoProg.programName_eng}
        </div>

        <div style={{ margintop: "10px", padding: "5px 0px", fontSize: "15px", display: "flex" }}>
          <img
            className="org_icon"
            src={require("../../img/community.svg").default}
          />
          {moreInfoProg.community?.map(item => {
            return item.community_arm + ', '
          })}
        </div>

        <div style={{ padding: "5px 0px", fontSize: "15px", display: "flex" }}>
          {" "}
          <img
            className="org_icon"
            src={require("../../img/budget.svg").default}
          />
          {moreInfoProg.budget}$
        </div>
        <div style={{ padding: "5px 0px", fontSize: "15px", display: "flex" }}>
          <img
            className="org_icon"
            src={require("../../img/time.svg").default}
          />
          {startDate} - {endDate}
        </div>

        <div style={{ padding: "5px 0px", fontSize: "15px", display: "flex" }}>
          <img
            className="org_icon"
            src={require("../../img/head name.svg").default}
          />
          {moreInfoProg.manager_arm}
        </div>

        <div style={{ padding: "5px 0px", fontSize: "15px", display: "flex" }}>
          <img
            className="org_icon"
            src={require("../../img/contact.svg").default}
          />
          {moreInfoProg.contact_arm}
        </div>

        <div style={{ padding: "5px 0px", fontSize: "15px", display: "flex" }}>
          <img
            className="org_icon"
            src={require("../../img/organization.svg").default}
          />
          {moreInfoProg.organization.map(item => {
            return item.organizationName_arm + ', '
          })}

        </div>

        <div style={{ padding: "5px 0px", fontSize: "15px", display: "flex" }}>
          <img
            className="org_icon"
            src={require("../../img/sphere.svg").default}
          />
          {categMoreInfo.map(item => {

            return item + ', '
          })}
        </div>

        <div style={{ padding: "5px 0px", fontSize: "15px", display: "flex" }}>
          <img
            className="org_icon"
            src={require("../../img/support.svg").default}
          />

          {suppForMoreInfo.map(item => {
            return item.name + ', '
          })}
        </div>


        <div className="desc" style={{ padding: "5px 0px", fontSize: "15px", display: "flex" }}>

          <img
            className="org_icon"
            src={require("../../img/description.svg").default}
          />
          <div >
            {moreInfoProg.description_arm}
          </div>
        </div>

        <div style={{ padding: "5px 0px", fontSize: "15px" }}>
          <img
            className="org_icon"
            src={require("../../img/ongoing.svg").default}
          />
          {moreInfoProg.status}

        </div>

        <div style={{ padding: "5px 0px", fontSize: "15px" }}>
          <img
            className="org_icon"
            src={require("../../img/donor.svg").default}
          />
          Դոնոր խմբի անդամ <b>{moreInfoProg.isDonor ? 'է' : 'չէ'}</b>
        </div>
      </div>

    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    moreInfoProg: state.moreInfo.moreInfoProg,
    startDate: state.moreInfo.startDate,
    endDate: state.moreInfo.endDate,
    suppForMoreInfo: state.moreInfo.suppForMoreInfo,
    isSelect: state.prog.isSelect,
    array: state.moreInfo.array,
    program: state.prog.program,
    categMoreInfo: state.moreInfo.categMoreInfo

  };
};
const mapDispatchToProps = dispatch => {
  return {
    moreInfoShow: (show) => dispatch(moreInfoShow(show)),
    editSupMoreInfo: (sup) => dispatch(editSupMoreInfo(sup)),
    changeSupMoreInfo: (prog) => dispatch(changeSupMoreInfo(prog))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoreInfo);
