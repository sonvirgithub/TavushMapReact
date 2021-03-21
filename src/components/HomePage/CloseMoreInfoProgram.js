import React from "react";

function CloseMoreInfoProgram({ setShowResults }) {
  const close = () => {
    // setShowResults(!showResults);
    setShowResults(false);
  };
  return <div onClick={close}>X</div>;
}

export default CloseMoreInfoProgram;
