import React, { useState, useEffect } from "react";
import useRequest from "../../../hooks/useRequest";
import {
  RenderInputFields,
  Input,
  Select,
  Button,
  CheckBox,
} from "../../../form/form";
import { useNavigate } from "react-router-dom";

const AddFood = () => {
  const [formData, setFormData] = useState({
    name: "",
    catagory: "meal",
    price: "",
    ingredients: "",
    isVeg: false,
  });
  let isValidate = true;
  const { request, response } = useRequest();
  const navigate = useNavigate();
  // ----------------------------------------------------------------------
  const handleChange = (event) => {
    // console.log(event);
    const { name, value } = event.target;
    if (name === "isVeg") {
      setFormData((prev) => {
        return { ...prev, isVeg: event.target.checked };
      });
    } else {
      setFormData((prev) => {
        return { ...prev, [name]: value };
      });
    }
  };
  // ----------------------------------------------------------------------
  const inputFields = [
    {
      component: Input,
      type: "text",
      name: "name",
      placeholder: "Product Name",
      onchange: handleChange,
      value: formData.name,
      required: true,
    },
    {
      component: Select,
      name: "catagory",
      onchange: handleChange,
      value: formData.catagory,
      options: [
        {
          text: "Meal",
          opValue: "meal",
        },
        {
          text: "Drink",
          opValue: "drink",
        },
        {
          text: "Snack",
          opValue: "snack",
        },
      ],
    },
    {
      component: Input,
      type: "number",
      name: "price",
      placeholder: "Price",
      onchange: handleChange,
      value: formData.price,
      required: true,
    },
    {
      component: Input,
      type: "text",
      name: "ingredients",
      placeholder: "Ingredients (comma seperated)",
      onchange: handleChange,
      value: formData.ingredients,
      required: true,
    },
    {
      component: CheckBox,
      type: "checkbox",
      name: "isVeg",
      placeholder: "Is Veg",
      onchange: handleChange,
    },
    {
      component: Button,
      type: "submit",
      value: "Add",
    },
  ];
  // ----------------------------------------------------------------------
  const frontendValidation = () => {
    return;
  };
  // ----------------------------------------------------------------------
  const makePostBody = () => {
    return {
      name: formData.name,
      price: parseInt(formData.price),
      ingredients: formData.ingredients.split(",").map((ele) => {
        return ele.trim();
      }),
      catagory: formData.catagory,
      isVeg: formData.isVeg,
    };
  };
  // ----------------------------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    frontendValidation();
    if (isValidate) {
      let postBody = makePostBody();
      // console.log(postBody);
      request("POST", `/food/add`, postBody);
    }
  };
  // ----------------------------------------------------------------------
  useEffect(() => {
    if (response) {
      alert("food added");
      setFormData({
        name: "",
        catagory: "meal",
        price: "",
        ingredients: "",
        isVeg: false,
      });
      navigate("/food");
    }
  }, [response]);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <RenderInputFields inputFields={inputFields} />
      </form>
    </div>
  );
};

export default AddFood;
