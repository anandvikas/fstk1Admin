import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useRequest from "../../../hooks/useRequest";

import {
  RenderInputFields,
  Input,
  Select,
  Button,
  CheckBox,
} from "../../../form/form";

const EditFood = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { request: getDetails, response: getDetailsResponse } = useRequest();
  const { request: patchDetails, response: patchDetailsResponse } =
    useRequest();
  const isValidate = true;

  const [formData, setFormData] = useState({
    name: "",
    catagory: "meal",
    price: "",
    ingredients: "",
    isVeg: false,
  });

  useEffect(() => {
    getDetails("GET", `/food/getOne/${id}`);
  }, []);

  useEffect(() => {
    if (getDetailsResponse) {
      // console.log(getDetailsResponse);
      setFormData({
        ...getDetailsResponse,
        ingredients: getDetailsResponse.ingredients.toString(),
      });
    }
  }, [getDetailsResponse]);

  // --------------------------------------------------------------------------------------
  const frontEndValidation = () => {
    return;
  };
  // --------------------------------------------------------------------------------------
  const makePatchBody = () => {
    // console.log(formData);
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
  // --------------------------------------------------------------------------------------
  const submitHandler = (e) => {
    e.preventDefault();
    frontEndValidation();
    if (isValidate) {
      let patchBody = makePatchBody();
      patchDetails("PATCH", `/food/patchOne/${id}`, patchBody);
    }
  };
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

  useEffect(() => {
    if (patchDetailsResponse) {
      alert("food updated successful");
      setFormData({
        name: "",
        catagory: "meal",
        price: "",
        ingredients: "",
        isVeg: false,
      });
      navigate("/food");
    }
  }, [patchDetailsResponse]);

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
      value: "Update",
    },
  ];

  return (
    <div>
      {formData && (
        <form onSubmit={submitHandler}>
          <RenderInputFields inputFields={inputFields} />
        </form>
      )}
    </div>
  );
};

export default EditFood;
