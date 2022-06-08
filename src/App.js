import react, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import SignUp from "./components/signup/signup";
import { NonPrivateRoutes, Privateroutes } from "./utils/routes";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "./store/actionCreators/actionCreator";

const App = () => {
  const myState = useSelector((state) => state.reducer1);
  const dispatch = useDispatch();
  let { loggedIn } = myState;

  let userToken = localStorage.getItem("userToken");
  useEffect(() => {
    if (userToken) {
      dispatch(loginAction());
    }
  }, []);

  // console.log(myState);
  return (
    <Routes>
      {loggedIn ? (
        <>
          {Privateroutes.map((element, index) => {
            return (
              <Route
                key={index}
                path={element.path}
                element={<element.component />}
              />
            );
          })}
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </>
      ) : (
        <>
          {NonPrivateRoutes.map((element, index) => {
            return (
              <Route
                key={index}
                path={element.path}
                element={<element.component />}
              />
            );
          })}
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </>
      )}
    </Routes>
  );
};

export default App;
