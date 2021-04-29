import React, { useEffect } from "react";
import Organization from "../components/Organization/Organization";
import DeleteSupportType from "../components/SupportType/DeleteSupportType";
import EditSupportType from "../components/SupportType/EditSupportType";
import SupportType from "../components/SupportType/SupportType";
export const SupportContext = React.createContext();

function SupportTypesPage() {
 

  return (
    <div
      style={{
        // position: "absolute",
        width: "100%",
      }}
    >
     
        <SupportType/>
        <EditSupportType />
        <DeleteSupportType />
          
        
    </div>
  );
}


export default SupportTypesPage;
