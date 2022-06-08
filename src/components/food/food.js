import React, { useEffect, useState } from "react";
import useRequest from "../../hooks/useRequest";
import { Link } from "react-router-dom";
import DelFood from "./delFood/del";

const Food = () => {
  const { request, response } = useRequest();
  const [foodData, setFoodData] = useState(null);
  useEffect(() => {
    request("GET", `/food`);
  }, []);
  useEffect(() => {
    if (response) {
      // console.log(response);
      setFoodData(response);
    }
  }, [response]);
  return (
    <>
      {foodData && (
        <div>
          {foodData.map((ele) => {
            return (
              <div key={ele._id}>
                <span>{ele.name}</span>
                <Link to={`/food/edit/${ele._id}`}>edit</Link>
                <DelFood id={ele._id} />
                <Link to={`/food/${ele._id}`}>View</Link>
              </div>
            );
          })}
        </div>
      )}
      <Link to="/food/add">Add food</Link>
    </>
  );
};

export default Food;
