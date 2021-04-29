import React, { useEffect,  } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { connect } from "react-redux";
import { fetchUser,succeeded, } from "./redux";
import SuccessPage from "./pages/SuccessPage";
import FailPage from "./pages/FailPage";

function App({ token, ready, fetchUser, loading, success,fail }) {
  
 

  useEffect(() => {
    fetchUser();
  }, []);

  if (!loading && !ready && !token) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
       
        {success ? <SuccessPage  /> : null}
        {fail ? <FailPage  /> : null}
        <Router>
          <Routes
            isLoggedIn={token}
            
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
