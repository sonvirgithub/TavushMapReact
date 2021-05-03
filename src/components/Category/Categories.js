import AddCategory from "./AddCategory";
import React, { useEffect } from "react";
import { useDispatch, useSelector,connect } from "react-redux";
import { deleteCategory, editCategory, deleteShow, editShow ,getCategories} from "../../redux";

function Categories({getCategories}) {

  useEffect(() => {
    getCategories()
  }, [])


  const dispatch = useDispatch()
 
  const categories = useSelector(state => state.cat.categories)
  const handleShowEdit = (index) => {

    dispatch(editCategory(categories[index]))
    dispatch(editShow())
  }

  const handleShowDelete = (index) => {

    dispatch(deleteCategory(categories[index]))
    dispatch(deleteShow())
  }

  return (
    <div style={{ marginLeft: "328px" }}>
      <div className="org_title">
        <div className="org_title_txt">Ոլորտներ</div>
        <div>
          <AddCategory />
        </div>
      </div>

      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>
              Ոլորտ <span style={{ fontWeight: "400" }}>(Հայ)</span>
            </th>
            <th>
              Ոլորտ <span style={{ fontWeight: "400" }}>(Անգլ)</span>
            </th>

            <th></th>
          </tr>
        </thead>

        <tbody>
          {categories.length > 0 ? (
            categories.map((cat, index) => {
              return (
                <tr key={cat.id}>
                  <td>{cat.name_arm}</td>
                  <td>{cat.name_eng}</td>

                  <td>
                    <div
                      style={{ display: "flex",justifyContent:"center" }}
                    >
                      <div
                        variant="primary"
                        onClick={() => {
                          handleShowEdit(index);
                        }}
                      >
                        <img className="org_icon" src={require("../../img/edit.svg").default} />
                      </div>
                      <div style={{ }}
                        onClick={() => {
                          handleShowDelete(index);
                        }}>
                        <img
                        style={{ width: "17px" }}
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

const mapDispatchToProps = dispatch => {
  return {
      getCategories: () => dispatch(getCategories())
  }
}

export default connect(null,mapDispatchToProps)(Categories);
