import React, { useEffect, useState } from "react";
import useRequest from "../../hooks/useRequest";
import { Link, NavLink } from "react-router-dom";
import DelUser from "./delUser/del";

const User = () => {
  const { request, response } = useRequest();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    request("GET", `/user/get`);
  }, []);

  useEffect(() => {
    if (response) {
      setUserData(response);
    }
  }, [response]);

  return (
    <>
      {userData && (
        <div>
          {userData.map((val) => {
            return (
              <div key={val._id}>
                <span>{val.userName}</span>
                <Link to={`/user/edit/${val._id}`}>edit</Link>
                <DelUser id={val._id} />
                <Link to={`/user/${val._id}`}>View</Link>
              </div>
            );
          })}
        </div>
      )}
      <Link to="/user/add">Add user</Link>
    </>
  );
};

export default User;
