import React, { useEffect, useState } from "react";
import DeleteProgram from "../components/HomePage/DeleteProgram";
import EditProgram from "../components/HomePage/EditProgram";
import Program from "../components/HomePage/Program";
import store, {
   getPrograms, 
} from "../redux";
import { useDispatch, connect } from "react-redux";

export const ProgramContext = React.createContext();
function ProgramsPage({ getPrograms,}) {
 


  return (
    <div
      style={{
        //  position: "absolute",
        width: "100%",
      }}
    >
      <ProgramContext.Provider>
        <Program
          
        />
        
      </ProgramContext.Provider>
      <EditProgram />

        <DeleteProgram />
    </div>
  );
}

export default ProgramsPage;
