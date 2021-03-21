import React, { useEffect, useState } from "react";
import Organization from "../components/Organization/Organization";
import axios from "axios";

export const OrganizationContext = React.createContext();
function OrganizationsPage({ setSuccessPage, successPage, setFailPage }) {
  const [organizations, setOrganizations] = useState("");
  const [language, setLanguage] = useState("arm")


  const addOrganization = (org) => {
    organizations.push(org);
    setOrganizations([...organizations]);
  };

  const editOrganization = (org) => {
    organizations.map((organization) => {
      if (organization.id == org.id) {
        organization.name_eng = org.name_eng;
        organization.name_arm = org.name_arm;
        organization.person = org.person;

        setOrganizations([...organizations]);
      }
    });
  };

  const deleteOrganization = (id) => {
    organizations.map((organization) => {
      if (organization.id == id) {
        const index = organizations.indexOf(organization);
        organizations.splice(index, 1);

        setOrganizations([...organizations]);
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/api/organizations");
      setOrganizations(result.data.data);
    };

    fetchData();
  }, []);
  return (
    <div
      style={{
        //  position: "absolute",
        width: "100%",
      }}
    >
      <OrganizationContext.Provider
        value={{
          organizations,
          setOrganizations,
          addOrganization,
          deleteOrganization,
          editOrganization,
        }}
      >
        <Organization
          organizations={organizations}
          successPage={successPage}
          setSuccessPage={setSuccessPage}
          setFailPage={setFailPage}
        />
      </OrganizationContext.Provider>
    </div>
  );
}

export default OrganizationsPage;
