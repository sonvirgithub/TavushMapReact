import React, { useEffect, useState } from "react";
import Organization from "../components/Organization/Organization";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import { getOrganizations } from "../redux";
import EditOrganization from "../components/Organization/EditOrganization"
import DeleteOrganization from "../components/Organization/DeleteOrganization"

export const OrganizationContext = React.createContext();
function OrganizationsPage() {

  
  return (
    <div
      style={{
        // position: "absolute",
        width: "100%",
      }}
    >
      
        <Organization />
        <EditOrganization />
        <DeleteOrganization />
     
    </div>
  );
}




export default OrganizationsPage;