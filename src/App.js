import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { connect } from "react-redux";
import { fetchUser,succeeded,failed } from "./redux";
import axios from "axios";
import MoreInfo from "./components/HomePage/MoreInfo";
import SuccessPage from "./pages/SuccessPage";
import FailPage from "./pages/FailPage";

function App({ token, ready, fetchUser, loading, success,fail }) {
  const [showResults, setShowResults] = useState(false);
  const [successPage, setSuccessPage] = useState(false);
  const [failPage, setFailPage] = useState(false);
  const [prog, setProg] = useState({})
  const [moreInfoStartDate, setMoreInfoStartDate] = useState("")
  const [moreInfoEndDate, setMoreInfoEndDate] = useState("")

  useEffect(() => {
    fetchUser();
  }, []);

  if (!loading && !ready && !token) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        {/* {showResults ? <MoreInfo /> : null} */}
        {success ? <SuccessPage  /> : null}
        {fail ? <FailPage  /> : null}
        <Router>
          <Routes
            isLoggedIn={token}
            // prog={prog}
            // setProg={setProg}
            // showResults={showResults}
            // setShowResults={setShowResults}
            // successPage={successPage}
            // setSuccessPage={setSuccessPage}
            // setFailPage={setFailPage}
            // moreInfoStartDate={moreInfoStartDate}
            // moreInfoEndDate={moreInfoEndDate}
            // setMoreInfoEndDate={setMoreInfoEndDate}
            // setMoreInfoStartDate={setMoreInfoStartDate}
          />
        </Router>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ready: state.auth.ready,
    token: state.auth.token,
    loading: state.auth.loading,
    success: state.answer.success,
    fail: state.answer.fail
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    succeeded: () => dispatch(succeeded()),
    failed: () => dispatch(succeeded())

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
