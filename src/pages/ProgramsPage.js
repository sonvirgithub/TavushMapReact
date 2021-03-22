import React, { useEffect, useState } from "react";
import Program from "../components/HomePage/Program";


export const ProgramContext = React.createContext();
function ProgramsPage({ showResults, setShowResults, setProg, moreInfoStartDate, moreInfoEndDate, setMoreInfoEndDate,setMoreInfoStartDate, setSuccessPage, setFailPage }) {
  const [programs, setPrograms] = useState([])


  const addProgram = (prog) => {
    // programs.push(prog);
    // setPrograms([...programs]);
    // console.log("programs",programs);
  };


  const deleteProgram = (id) => {
    programs.map((program) => {
      if (program.id == id) {
        const index = programs.indexOf(program);
        programs.splice(index, 1);
        setPrograms([...programs]);

      }
    });
  };

  
  useEffect(() => {
    fetch("/api/programsForAdmin")
      .then((res) => res.json())
      .then((res) => {
        setPrograms(res.data);


      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  return (
    <div
      style={{
        //  position: "absolute",
        width: "100%",
      }}
    >
      <ProgramContext.Provider
        value={{
          programs,
          setPrograms,
          addProgram,
          deleteProgram,
        }}
      >
        <Program
          moreInfoStartDate={moreInfoStartDate}
          moreInfoEndDate={moreInfoEndDate}
          setMoreInfoEndDate={setMoreInfoEndDate}
          setMoreInfoStartDate={setMoreInfoStartDate}
          setProg={setProg}
          showResults={showResults}
          setPrograms={setPrograms}
          programs={programs}
          setPrograms={setPrograms}
          setShowResults={setShowResults}
          setSuccessPage={setSuccessPage}
          setFailPage={setFailPage}
        />
      </ProgramContext.Provider>
    </div>
  );
}

export default ProgramsPage;
