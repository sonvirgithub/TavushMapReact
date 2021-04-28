import DeleteProgram from "../components/HomePage/DeleteProgram";
import EditProgram from "../components/HomePage/EditProgram";
import Program from "../components/HomePage/Program";


function ProgramsPage() {
 


  return (
    <div style={{ width: "100%", }}   >
        <Program/>
      <EditProgram />
        <DeleteProgram />
    </div>
  );
}

export default ProgramsPage;
