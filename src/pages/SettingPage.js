import React, { useEffect, useState } from "react";
import Categories from "../components/Category/Categories";
import axios from "axios";
import Settings from "../components/Setting/Settings";

export const SettingContext = React.createContext();
function SettingPage({ setSuccessPage, setFailPage }) {
  const [settings, setSettings] = useState("");

  const addUser = (user) => {
    settings.push(user);
    setSettings([...settings]);
  };

  const editUser = (user) => {
    settings.map((set) => {
      if (set.id == user.id) {
        set.firstname = user.firstname;
        set.lastname = user.lastname;

        setSettings([...settings]);
      }
    });
  };

  const deleteUser = (id) => {
    settings.map((set) => {
      if (set.id == id) {
        const index = settings.indexOf(set);
        settings.splice(index, 1);

        setSettings([...settings]);
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/api/settings");
      setSettings(result.data.data);
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
      <SettingContext.Provider
        value={{
          //   settings,
          setSettings,
          addUser,
          deleteUser,
          editUser,
          //   editCategory,
        }}
      >
        <Settings
          settings={settings}
          setSuccessPage={setSuccessPage}
          setFailPage={setFailPage}
        />
      </SettingContext.Provider>
    </div>
  );
}

export default SettingPage;
