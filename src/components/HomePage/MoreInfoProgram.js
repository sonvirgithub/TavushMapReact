import React from "react";
import CloseMoreInfoProgram from "./CloseMoreInfoProgram";
import MoreInfo from "./MoreInfo";

function MoreInfoProgram({
  setProgramId,
  prog,
  programs,
  showResults,
  setShowResults,
}) {

  const onClick = () => {
    setShowResults(true);
    setProgramId(prog.id);
  };

  return (
    <>
      <div>


      </div>

    </>
  );
}

export default MoreInfoProgram;