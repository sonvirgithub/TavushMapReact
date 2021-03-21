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
}) {

  // console.log(showResults, "showResults rout");
  if (isLoggedIn) {
    // console.log(isLoggedIn);
    return (
      <>
        {/* <SideBar /> */}
        {showResults ? (
          <MoreInfo
            setShowResults={setShowResults}
            prog={prog}
          // programsList={programsList}
          />
        ) : (
          <SideBar />
        )}
        <Switch>
          {/* <RouteWithLayout
            component={ProgramsPage}
            render={() => <ProgramsPage showResults={showResults} />}
            exact
            showResults={showResults}
            setShowResults={setShowResults}
            layout={MainLayout}
            path="/program"
          /> */}
          <Route
            exact
            path="/admin/program"
            render={() => (
              <ProgramsPage
                setProg={setProg}
                showResults={showResults}
                setShowResults={setShowResults}
              />
            )}
          />
          <Route
            exact
            path="/admin/organization"
            render={() => (
              <OrganizationsPage
                setSuccessPage={setSuccessPage}
                successPage={successPage}
                setFailPage={setFailPage}
              />
            )}
          />
          <Route
            exact
            path="/admin/category"
            render={() => (
              <CategoriesPage
                setSuccessPage={setSuccessPage}
                successPage={successPage}
                setFailPage={setFailPage}
              />
            )}
          />
          <Route
            exact
            path="/admin/supportType"
            render={() => (
              <SupportTypesPage
                setSuccessPage={setSuccessPage}
                setFailPage={setFailPage}
              />
            )}
          />
          <Route
            exact
            path="/admin/settings"
            render={() => (
              <SettingPage
                setSuccessPage={setSuccessPage}
                setFailPage={setFailPage}
              />
            )}
          />
          {/* <RouteWithLayout
            component={OrganizationsPage}
            exact
            layout={MainLayout}
            path="/organization"
          /> */}
          {/* <RouteWithLayout
            component={CategoriesPage}
            exact
            layout={MainLayout}
            path="/category"
          />
          <RouteWithLayout
            component={SupportTypesPage}
            exact
            layout={MainLayout}
            path="/supportType"
          />
          <RouteWithLayout
            component={SettingPage}
            exact
            layout={MainLayout}
            path="/settings"
          /> */}

          <Redirect to="/admin/program" />
        </Switch>
      </>
    );
  } else {


    return (
      <Switch>
        <Route exact path="/admin/login" render={() => <Login />} />
        {/* <RouteWithLayout
          component={Login}
          exact
          layout={LoginLayout}
          path="/login"
        /> */}

        <Redirect to="/admin/login" />
      </Switch>
    );
  }
}
export default Routes;
