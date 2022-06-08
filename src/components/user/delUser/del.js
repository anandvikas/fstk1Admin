import React, { useEffect } from "react";
import useRequest from "../../../hooks/useRequest";

const DelUser = ({ id }) => {
  const { request, response } = useRequest();
  useEffect(() => {
    if (response) {
      console.log(response);
      window.location.reload();
    }
  }, [response]);
  const deleteIt = () => {
    request("DELETE", "/user/delOne", { id: id });
  };
  return <button onClick={deleteIt}>del</button>;
};

export default DelUser;
