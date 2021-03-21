import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import AddCategory from "./AddCategory";
import DeleteCategory from "./DeleteCategory";
import EditCategory from "./EditCategory";

function Organization({ categories, setSuccessPage, setFailPage }) {
  return (
    <div style={{ marginLeft: "328px" }}>
      <div className="org_title">
        <div className="org_title_txt">Ոլորտներ</div>
        <div>
          <AddCategory
            setSuccessPage={setSuccessPage}
            setFailPage={setFailPage}
          />
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
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <EditCategory
                        cat={cat}
                        setSuccessPage={setSuccessPage}
                        setFailPage={setFailPage}
                      />
                      <DeleteCategory
                        cat={cat}
                        setSuccessPage={setSuccessPage}
                        setFailPage={setFailPage}
                      />
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

export default Organization;
