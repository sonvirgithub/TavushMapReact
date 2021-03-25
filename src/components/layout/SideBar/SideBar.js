import React, { useState } from "react";
import { Route, useHistory, NavLink } from "react-router-dom";
import "./SideBar.css";

function Sidebar() {

  const history = useHistory();

  async function log_out() {

    const headers = {}
    headers["Content-Type"] = "application/json"
    fetch('/api/logout', {
      method:
        "GET",
      headers
    }).then(res => res.json())
      .then(data => {
        if (data.success) {
          window.location.reload()
          history.push("/dmn/login")
        }
      })
  }



  return (
    <div className="sideBar">
      <div className="properties">
        <div
        >
          <img
            src={require("./AdminIcons/programm.svg").default}
            className="icon_program"
          />
          <NavLink
            to="/dmn/program"
            className="btn_projects div_projects"
            activeClassName="activeclass"
          >
            {" "}
            Ծրագրեր
          </NavLink>
        </div>
        <div
        >
          <NavLink
            to="/dmn/organization"
            className="btn_projects div_projects"
            activeClassName="activeclass"
          >
            <img
              src={require("./AdminIcons/orggray.svg").default}
              className="icon"
            />
            Կազմակերպություններ
          </NavLink>
        </div>
        <div
        >
          <NavLink
            to="/dmn/category"
            className="btn_projects div_projects"
            activeClassName="activeclass"
          >
            <img
              src={require("./AdminIcons/phere.svg").default}
              className="icon_category"
            />
            Ոլորտներ
          </NavLink>
        </div>
        <div
        //  className="div_projects"
        >
          <NavLink
            to="/dmn/supportType"
            className="btn_projects div_projects"
            activeClassName="activeclass"
          >
            <img
              src={require("./AdminIcons/support.svg").default}
              className="icon"
            />
            Աջակցության տեսակներ
          </NavLink>
        </div>
        <div
        //  className="div_projects"
        >
          <NavLink
            to="/dmn/settings"
            className="btn_projects div_projects"
            activeClassName="activeclass"
          >
            <img
              src={require("./AdminIcons/settings.svg").default}
              className="icon_settings"
            />
            Կարգավորումներ
          </NavLink>
        </div>
      </div>

      <div className="logout">
        <button
          className="btn_logout"
          onClick={log_out}
        >
          Դուրս գալ{" "}
          <img
            src={require("./AdminIcons/logout.svg").default}
            className="log_out_icon"
          />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
