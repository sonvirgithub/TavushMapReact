import React, { useEffect, useState } from "react";
import Organization from "../components/Organization/Organization";
import axios from "axios";
import SupportType from "../components/SupportType/SupportType";

export const SupportContext = React.createContext();

function SupportTypesPage({ setSuccessPage, setFailPage }) {
  const [supportTypes, setSupportTypes] = useState("");
  const [categoryType, setCategoryType] = useState([]);

  const addSupport = (sup) => {
    supportTypes.push(sup);
    setSupportTypes([...supportTypes]);
  };

  const editSupport = (sup) => {
    console.log(sup, "sup");
    // categoryType.map((catType) => {
    //   if (catType.id == sup.categoryid_new) {
    //     supportTypes.map((supType) => {
    //       supType.categoryName = catType.name_arm;
    //     });
    //   }
    // });

    supportTypes.map((supType) => {
      // console.log(supType, "supType");
      if (supType.id == sup.id) {
        supType.name_eng = sup.support_eng;
        supType.name_arm = sup.support_arm;
        supType.categoryId = sup.categoryid_new;
        supType.categoryName = sup.category_name;
        // supType.category_arm = sup.ca;

        setSupportTypes([...supportTypes]);
      }
    });
  };

  const deleteSupport = (id) => {
    supportTypes.map((supType) => {
      if (supType.id == id) {
        const index = supportTypes.indexOf(supType);
        supportTypes.splice(index, 1);

        setSupportTypes([...supportTypes]);
      }
    });
  };

  //   console.log("object");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios("/api/supportsForAdmin");
  //     console.log(result, "****************************");
  //     setSupportTypes(result.data.data);

      
  //     const catresult = await axios("/api/categories");
  //     console.log(catresult, "999999");
  //     setCategoryType(catresult.data.data);
  //   };

  //   fetchData();
  // }, []);
  useEffect(() => {
    axios("/api/supportsForAdmin").then(res => {
      setSupportTypes(res.data.data)
//   };
    
  })
  axios("/api/categories").then(res => {
    setCategoryType(res.data.data)
//   };
  
})

}, []);

  //   console.log(organizations, "organizationsorganizations");
  return (
    <div
      style={{
        // position: "absolute",
        width: "100%",
      }}
    >
      <SupportContext.Provider
        value={{
          supportTypes,
          setSupportTypes,
          addSupport,
          deleteSupport,
          editSupport,
        }}
      >
        <SupportType
          supportTypes={supportTypes}
          categoryType={categoryType}
          setSuccessPage={setSuccessPage}
          setFailPage={setFailPage}
        />
      </SupportContext.Provider>
    </div>
  );
}

export default SupportTypesPage;
