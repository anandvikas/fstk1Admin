import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
import useRequest from "../../../hooks/useRequest";

const DelFood = ({ id }) => {
  const { request, response } = useRequest();
  //   const navigate = useNavigate();
  useEffect(() => {
    if (response) {
      console.log(response);
      //   navigate("/food");
      window.location.reload();
    }
  }, [response]);
  const deleteIt = () => {
    request("DELETE", "/food/delOne", { id: id });
  };
  return <button onClick={deleteIt}>del</button>;
};

export default DelFood;
