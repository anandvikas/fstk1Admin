import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useRequest from "../../../hooks/useRequest";

const AddFoodUseForm = () => {
  // --------------------------------------------------------------------------------------
  const { register, handleSubmit } = useForm();
  const { request, response } = useRequest();
  const navigate = useNavigate();
  let isValidate = true;
  // --------------------------------------------------------------------------------------
  const frontendValidation = () => {
    return;
  };
  // --------------------------------------------------------------------------------------
  const makePostBody = (data) => {
    return {
      name: data.name,
      price: parseInt(data.price),
      ingredients: data.ingredients.split(",").map((ele) => {
        return ele.trim();
      }),
      catagory: data.catagory,
      isVeg: data.isVeg,
    };
  };
  // --------------------------------------------------------------------------------------
  const onFormSubmit = (data) => {
    // console.log(data);
    frontendValidation();
    if (isValidate) {
      let postBody = makePostBody(data);
      console.log(postBody);
      request("POST", `/food/add`, postBody);
    }
  };
  // --------------------------------------------------------------------------------------
  useEffect(() => {
    if (response) {
      alert("food added");
      navigate("/food");
    }
  }, [response]);
  // --------------------------------------------------------------------------------------
  return (
    <div>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div>
          <input type="text" placeholder="Item Name" {...register("name")} />
          <br />
          <input type="number" placeholder="Price" {...register("price")} />
          <br />
          <input
            type="text"
            placeholder="Ingredients"
            {...register("ingredients")}
          />
          <hr />
        </div>
        <div>
          <select {...register("catagory")}>
            <option value="meal">Meal</option>
            <option value="snack">Snack</option>
            <option value="drink">Drink</option>
          </select>
          <hr />
        </div>
        <div>
          Is Veg : <input type="checkbox" {...register("isVeg")} />
          <hr />
        </div>
        <div>
          <input type="submit" value="submit form" />
        </div>
      </form>
    </div>
  );
};

export default AddFoodUseForm;
