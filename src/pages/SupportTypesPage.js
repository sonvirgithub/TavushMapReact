import React, { useEffect } from "react";
import Organization from "../components/Organization/Organization";
import DeleteSupportType from "../components/SupportType/DeleteSupportType";
import EditSupportType from "../components/SupportType/EditSupportType";
import SupportType from "../components/SupportType/SupportType";
export const SupportContext = React.createContext();

function SupportTypesPage() {
 

  
  // const addSupport = (sup) => {
  //   supportTypes.push(sup);
  //   dispatch(getSupportTypes([...supportTypes]));
  // };

  // const editSupport = (support) => {

  //   supportTypes.map((supType) => {
  //     if (supType.id == support.id) {
       
  //       supType.name_eng = support.name_eng;
  //       supType.name_arm = support.name_arm;
  //       supType.categoryId = support.categoryId;
  //       supType.categoryName = support.categoryName;
  //       dispatch(getSupportTypes([...supportTypes]));
  //     }
  //   });
  // };

  // const deleteSupport = (id) => {
  //   supportTypes.map((supType) => {
  //     if (supType.id == id) {
  //       const index = supportTypes.indexOf(supType);
  //       supportTypes.splice(index, 1);

  //       dispatch(getSupportTypes([...supportTypes]));
  //     }
  //   });
  // };


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
