import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { connect } from "react-redux";
import { fetchUser } from "./redux";
import axios from "axios";
import MoreInfo from "./components/HomePage/MoreInfo";
import SuccessPage from "./pages/SuccessPage";
import FailPage from "./pages/FailPage";

function App({ token, ready, fetchUser, loading }) {
  const [showResults, setShowResults] = useState(false);
  const [successPage, setSuccessPage] = useState(false);
  const [failPage, setFailPage] = useState(false);
  const [prog, setProg] = useState({})
  const [moreInfoStartDate, setMoreInfoStartDate] = useState("")
  const [moreInfoEndDate, setMoreInfoEndDate] = useState("")

  useEffect(() => {
    fetchUser();
  }, []);

  // useEffect(() => {
  //   setSuccessPage(true);
  // }, [setSuccessPage]);



  // if (!loading && !ready && !token) {
  //   return <p>Loading...</p>;
  // } else {
  return (
    <div>
      {/* {showResults ? <MoreInfo /> : null} */}
      {successPage ? <SuccessPage setSuccessPage={setSuccessPage} /> : null}
      {failPage ? <FailPage setFailPage={setFailPage} /> : null}
      <Router>
        <Routes
          isLoggedIn={token}
          prog={prog}
          setProg={setProg}
          showResults={showResults}
          setShowResults={setShowResults}
          successPage={successPage}
          setSuccessPage={setSuccessPage}
          setFailPage={setFailPage}
          moreInfoStartDate={moreInfoStartDate}
          moreInfoEndDate={moreInfoEndDate}
          setMoreInfoEndDate={setMoreInfoEndDate}
          setMoreInfoStartDate={setMoreInfoStartDate}
        />
      </Router>
    </div>
  );
  // }
}
const mapStateToProps = (state) => {
  return {
    ready: state.ready,
    token: state.token,
    loading: state.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
