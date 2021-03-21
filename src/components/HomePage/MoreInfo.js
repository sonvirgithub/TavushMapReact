import { useEffect, useState } from "react";
import React from "react";
import "./MoreInfo.css"

function MoreInfo({ prog, showResults, setShowResults,moreInfoStartDate, moreInfoEndDate}) {
  let [supports2, setSupports2] = useState([])


  const closeMore = () => {
    setShowResults(false);

  };

  useEffect(() => {
    supports2 = []

    prog.support.map((item) => {
      item.supports.map((support) => {
        supports2.push(support.support_arm)
      })

    })
    setSupports2([...supports2])
  }, [prog])

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
          {prog.programName_arm}
        </div>

        <div style={{ color: "#808A8A", fontSize: "18px", }}>
          {prog.programName_eng}
        </div>

        <div style={{ margintop: "10px", padding: "5px 0px", fontSize: "15px", display: "flex" }}>
          <img
            className="org_icon"
            src={require("../../img/community.svg").default}
          />
          {prog.community.map(item => {
            return item.community_arm + ', '
          })}
        </div>


        <div style={{ padding: "5px 0px", fontSize: "15px", display: "flex" }}>
          {" "}
          <img
            className="org_icon"
            src={require("../../img/budget.svg").default}
          />
          {prog.budget}$
        </div>

        <div style={{ padding: "5px 0px", fontSize: "15px", display: "flex" }}>
          <img
            className="org_icon"
            src={require("../../img/time.svg").default}
          />
          {moreInfoStartDate} - {moreInfoEndDate}
        </div>

        <div style={{ padding: "5px 0px", fontSize: "15px", display: "flex" }}>
          <img
            className="org_icon"
            src={require("../../img/head name.svg").default}
          />
          {prog.manager_arm}
        </div>

        <div style={{ padding: "5px 0px", fontSize: "15px", display: "flex" }}>
          <img
            className="org_icon"
            src={require("../../img/contact.svg").default}
          />
          {prog.contact_arm}
        </div>

        <div style={{ padding: "5px 0px", fontSize: "15px", display: "flex" }}>
          <img
            className="org_icon"
            src={require("../../img/organization.svg").default}
          />
          {prog.organization.map(item => {
            return item.organizationName_arm + ', '
          })}

        </div>


        <div style={{ padding: "5px 0px", fontSize: "15px", display: "flex" }}>
          <img
            className="org_icon"
            src={require("../../img/sphere.svg").default}
          />
          {prog.support.map(item => {
            return item.category_arm + ', '
          })}
        </div>

        <div style={{ padding: "5px 0px", fontSize: "15px", display: "flex" }}>
          <img
            className="org_icon"
            src={require("../../img/support.svg").default}
          />
          {supports2.map(item => {
            return item + ', '
          })}
        </div>



        <div className="desc" style={{ padding: "5px 0px", fontSize: "15px", display: "flex"}}>

          <img
            className="org_icon"
            src={require("../../img/description.svg").default}
          />
          <div >
            {prog.description_arm}

          </div>

        </div>




        <div style={{ padding: "5px 0px", fontSize: "15px" }}>
          <img
            className="org_icon"
            src={require("../../img/ongoing.svg").default}
          />
          {prog.status}

        </div>

        <div style={{ padding: "5px 0px", fontSize: "15px" }}>
          <img
            className="org_icon"
            src={require("../../img/donor.svg").default}
          />
          Դոնոր խմբի անդամ <b>{prog.isDonor ? 'է' : 'չէ'}</b>
        </div>
      </div>




    </div>
  );
}

export default MoreInfo;
