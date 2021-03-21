import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import AddSupportType from "./AddSupportType";
import DeleteSupportType from "./DeleteSupportType";
import EditSupportType from "./EditSupportType";

function SupportType({
  supportTypes,
  categoryType,
  setSuccessPage,
  setFailPage,
}) {
  console.log("log",supportTypes);
  return (
    <div style={{ marginLeft: "328px" }}>
      <div className="org_title">
        <div className="org_title_txt">Աջակցության տեսակներ</div>
        <div>
          <AddSupportType
            setSuccessPage={setSuccessPage}
            categoryType={categoryType}
            setFailPage={setFailPage}
          />
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
                  <td>{supType.category_arm}</td>
                  {/* <td>{supType.category_eng}</td> */}
                  <td>{supType.support_arm}</td>
                  <td>{supType.support_eng}</td>

                  <td>
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <EditSupportType
                        supType={supType}
                        categoryType={categoryType}
                        setSuccessPage={setSuccessPage}
                        setFailPage={setFailPage}
                      />
                      <DeleteSupportType
                        supType={supType}
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

export default SupportType;
