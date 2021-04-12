import React, { useEffect, useState } from "react";
import Categories from "../components/Category/Categories";
import axios from "axios";
import { connect,useDispatch } from "react-redux";
import { getCategories} from "../redux";
import EditCategory from "../components/Category/EditCategory"
import DeleteCategory from "../components/Category/DeleteCategory"
export const CategoryContext = React.createContext();

function CategoriesPage() {
  
 
  return (
    <div
      style={{
        // position: "absolute",
        width: "100%",
      }}
    >
      
        <Categories />
        <EditCategory />
        <DeleteCategory />
     
    </div>
  );
}



export default CategoriesPage;
