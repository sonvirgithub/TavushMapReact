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
    categoryType.map((catType) => {
      if (catType.id == sup.categoryid_new) {
        supportTypes.map((supType) => {
          supType.category_arm = catType.name_arm;
        });
      }
    });

    supportTypes.map((supType) => {
      if (supType.supportid == sup.id) {
        supType.support_eng = sup.support_eng;
        supType.support_arm = sup.support_arm;
        supType.categoryid = sup.categoryid_new;
        // supType.category_arm = sup.ca;

        setSupportTypes([...supportTypes]);
      }
    });
  };

  const deleteSupport = (id) => {
    supportTypes.map((supType) => {
      if (supType.supportid == id) {
        const index = supportTypes.indexOf(supType);
        supportTypes.splice(index, 1);

        setSupportTypes([...supportTypes]);
      }
    });
  };

  //   console.log("object");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/api/supports");
     
      setSupportTypes(result.data.data);
      const catresult = await axios("/api/categories");
      setCategoryType(catresult.data.data);
    };

    fetchData();
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
