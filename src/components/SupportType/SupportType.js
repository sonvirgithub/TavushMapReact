import AddSupportType from "./AddSupportType";
import React, { useEffect } from "react";
import DeleteSupportType from "./DeleteSupportType";
import EditSupportType from "./EditSupportType";
import { connect,useDispatch } from "react-redux";
import { deleteSupportType, editSupportType, deleteShow, editShow,getSupportTypes,getCategories } from "../../redux";

function SupportType({ supportTypes,getSupportTypes,getCategories }) {

  const dispatch = useDispatch()

  useEffect(() => {
    getSupportTypes()
    getCategories()
  }, [])

 
  const handleShowEdit = (index) => {

    dispatch(editSupportType(supportTypes[index]))
    dispatch(editShow())
  }

  const handleShowDelete = (index) => {

    dispatch(deleteSupportType(supportTypes[index]))
    dispatch(deleteShow())
  }

  return (
    <div style={{ marginLeft: "328px" }}>
      <div className="org_title">
        <div className="org_title_txt">Աջակցության տեսակներ</div>
        <div>
          <AddSupportType />
        </div>
      </div>

      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>
              Ոլորտ
              {/* <span style={{ fontWeight: "400" }}>(Հայ)</span> */}
            </th>
            {/* <th>
              Ոլորտ <span style={{ fontWeight: "400" }}>(Անգլ)</span>{" "}
            </th> */}
            <th>
              Աջակցության տեսակ <span style={{ fontWeight: "400" }}>(Հայ)</span>
            </th>
            <th>
              Աջակցության տեսակ{" "}
              <span style={{ fontWeight: "400" }}>(Անգլ)</span>{" "}
            </th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {supportTypes.length > 0 ? (
            supportTypes.map((supType, index) => {
              return (
                <tr key={index}>
                  <td>{supType.categoryName}</td>
                  {/* <td>{supType.category_eng}</td> */}
                  <td>{supType.name_arm}</td>

                  <td>{supType.name_eng}</td>

                  <td>
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <div
                        variant="primary"
                        onClick={() => {
                          handleShowEdit(index);
                        }}
                      >
                        <img className="org_icon" src={require("../../img/edit.svg").default} />
                      </div>
                      <div style={{ marginLeft: "5px" }} onClick={() => {
                        handleShowDelete(index);
                      }}>
                        <img
                          className="org_icon"
                          src={require("../../img/remove.svg").default}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5">Տվյաներ չկան</td>
            </tr>
          )}
        </tbody>
        
      </table>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {

    supportTypes: state.support.supportTypes,
    
  };
};
const mapDispatchToProps = dispatch => {
  return {

    getSupportTypes: () => dispatch(getSupportTypes()),
    getCategories: () => dispatch(getCategories())
    
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SupportType);
