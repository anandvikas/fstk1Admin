import { useEffect, useState } from "react";
import useRequest from "../../../hooks/useRequest";
import { RenderInputFields, Input, Select, Button } from "../../../form/form";
import { useNavigate } from "react-router-dom";

// --------------------------------------------------------------------------------------
const SubInput = ({ inputFields }) => {
  return <RenderInputFields inputFields={inputFields} />;
};

const AddUser = () => {
  let isValidate = true;
  // --------------------------------------------------------------------------------------
  const { request, response } = useRequest();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    rpassword: "",
    gender: "male",
  });
  const navigate = useNavigate();
  // --------------------------------------------------------------------------------------
  const handleChange = (event) => {
    // console.log(event);

    const { name, value } = event.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
    // event.target.focus = true;
  };
  // --------------------------------------------------------------------------------------
  const frontEndValidation = () => {
    if (formData.password !== formData.rpassword) {
      isValidate = false;
      alert("password do not match");
    }
    return isValidate;
  };
  // --------------------------------------------------------------------------------------
  const makePostBody = () => {
    return {
      userName: formData.userName,
      email: formData.email,
      password: formData.password,
      gender: formData.gender,
    };
  };
  // --------------------------------------------------------------------------------------
  const submitForm = (e) => {
    e.preventDefault();
    frontEndValidation();
    if (isValidate) {
      let postBody = makePostBody();
      request("POST", `/user/signup`, postBody);
    }
  };
  // --------------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------------
  useEffect(() => {
    if (response) {
      console.log(response);
      localStorage.setItem("userToken", JSON.stringify(response));
      alert("user added");
      navigate("/user");
    }
  }, [response]);
  // --------------------------------------------------------------------------------------
  const inputFields = [
    {
      component: Input,
      type: "text",
      name: "userName",
      placeholder: "User Name",
      onchange: handleChange,
      value: formData.userName,
    },
    {
      component: Input,
      type: "email",
      name: "email",
      placeholder: "Email",
      onchange: handleChange,
      value: formData.email,
    },
    {
      component: Input,
      type: "password",
      name: "password",
      placeholder: "Password",
      onchange: handleChange,
      value: formData.password,
    },
    {
      component: Input,
      type: "password",
      name: "rpassword",
      placeholder: "Repeat Password",
      onchange: handleChange,
      value: formData.rpassword,
    },
    {
      component: Select,
      name: "gender",
      onchange: handleChange,
      value: formData.gender,
      options: [
        {
          text: "Male",
          opValue: "male",
        },
        {
          text: "Female",
          opValue: "female",
        },
      ],
    },
    {
      component: Button,
      type: "submit",
      value: "Add",
    },
  ];
  // --------------------------------------------------------------------------------------
  return (
    <>
      <div>
        <form onSubmit={submitForm}>
          <SubInput inputFields={inputFields} />
        </form>
      </div>
    </>
  );
};
export default AddUser;
