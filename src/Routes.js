import React from "react";
import Login from "./components/Login/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import RouteWithLayout from "./router/RouteWithLayout";
import LoginLayout from "./router/LoginLayout";
import MainLayout from "./router/MainLayout";
import HomePage from "./components/HomePage/Program";
import OrganizationsPage from "./pages/OrganizationsPage";
import CategoriesPage from "./pages/CategoriesPage";
import SupportTypesPage from "./pages/SupportTypesPage";

import ProgramsPage from "./pages/ProgramsPage";
import SettingPage from "./pages/SettingPage";
import SideBar from "./components/layout/SideBar/SideBar";
import MoreInfo from "./components/HomePage/MoreInfo";

function Routes({
  prog,
  setProg,
  isLoggedIn,
  showResults,
  setShowResults,
  successPage,
  setSuccessPage,
  setFailPage,
  moreInfoStartDate,
  moreInfoEndDate,
  setMoreInfoStartDate,
  setMoreInfoEndDate,

}) {
  if (isLoggedIn) {
   
    return (
      <>

        {/* <SideBar /> */}
        {showResults ? (
          <MoreInfo
            setShowResults={setShowResults}
            prog={prog}
            moreInfoStartDate={moreInfoStartDate}
            moreInfoEndDate={moreInfoEndDate}
          // programsList={programsList}
          />
        ) : (
          <SideBar />
        )}
        <Switch>
          
          <Route
            exact
            path="/dmn/program"
            render={() => (
              <ProgramsPage
                showResults={showResults}
                setShowResults={setShowResults}
                setProg={setProg}
                moreInfoStartDate={moreInfoStartDate}
                moreInfoEndDate={moreInfoEndDate}
                setMoreInfoEndDate={setMoreInfoEndDate}
                setMoreInfoStartDate={setMoreInfoStartDate}
                setSuccessPage={setSuccessPage}
                setFailPage={setFailPage}
              />
            )}
          />
          <Route
            exact
            path="/dmn/organization"
            render={() => (
              <OrganizationsPage />
            )}
          />
          <Route
            exact
            path="/dmn/category"
            render={() => (
              <CategoriesPage/>
            )}
          />
          <Route
            exact
            path="/dmn/supportType"
            render={() => (
              <SupportTypesPage
              
              />
            )}
          />
          <Route
            exact
            path="/dmn/settings"
            render={() => (
              <SettingPage
                setSuccessPage={setSuccessPage}
                setFailPage={setFailPage}
              />
            )}
          />

          <Redirect to="/dmn/program" />
        </Switch>
      </>
    );
  } else {


    return (
      <Switch>
        <Route exact path="/dmn/login" component={Login} />
        <Redirect to="/dmn/login" />
      </Switch>
    );
  }
}
export default Routes;
