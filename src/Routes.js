import React from "react";
import Login from "./components/Login/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import OrganizationsPage from "./pages/OrganizationsPage";
import CategoriesPage from "./pages/CategoriesPage";
import SupportTypesPage from "./pages/SupportTypesPage";
import ProgramsPage from "./pages/ProgramsPage";
import SettingPage from "./pages/SettingPage";
import SideBar from "./components/layout/SideBar/SideBar";
import MoreInfo from "./components/HomePage/MoreInfo";
import { useDispatch, connect } from "react-redux";


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
  show
}) {
  if (isLoggedIn) {

    return (
      <>

        {/* <SideBar /> */}
        {show ? (
          <MoreInfo
          // moreInfoStartDate={moreInfoStartDate}
          // moreInfoEndDate={moreInfoEndDate}
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
                // showResults={showResults}
                // setShowResults={setShowResults}
                // setProg={setProg}
                // moreInfoStartDate={moreInfoStartDate}
                // moreInfoEndDate={moreInfoEndDate}
                // setMoreInfoEndDate={setMoreInfoEndDate}
                // setMoreInfoStartDate={setMoreInfoStartDate}
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
              <CategoriesPage />
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

const mapStateToProps = (state) => {
  return {
    show: state.moreInfo.show

  };
};

export default connect(mapStateToProps, null)(Routes);
