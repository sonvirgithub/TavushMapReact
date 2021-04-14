import React, { useEffect, useState } from "react";
import DeleteProgram from "../components/HomePage/DeleteProgram";
import EditProgram from "../components/HomePage/EditProgram";
import Program from "../components/HomePage/Program";


export const ProgramContext = React.createContext();
function ProgramsPage({ showResults, setShowResults, setProg, moreInfoStartDate,
  moreInfoEndDate, setMoreInfoEndDate, setMoreInfoStartDate, setSuccessPage, setFailPage }) {
 


  return (
    <div
      style={{
        //  position: "absolute",
        width: "100%",
      }}
    >
      <ProgramContext.Provider>
        <Program
          moreInfoStartDate={moreInfoStartDate}
          moreInfoEndDate={moreInfoEndDate}
          setMoreInfoEndDate={setMoreInfoEndDate}
          setMoreInfoStartDate={setMoreInfoStartDate}
          setProg={setProg}
          showResults={showResults}
          // programs={programs}
          // setPrograms={setPrograms}
          setShowResults={setShowResults}
          setSuccessPage={setSuccessPage}
          setFailPage={setFailPage}
        />
        
      </ProgramContext.Provider>
      <EditProgram />

        <DeleteProgram />
    </div>
  );
}

export default ProgramsPage;
