import React, { useState } from "react";
import useRequest from "../../hooks/useRequest";

const ImgUpload = () => {
  const { request, response } = useRequest();
  const [img, setImg] = useState("");

  const handleChange = (e) => {
    console.log(e);
    setImg(e.target.files[0]);
  };
  const submitForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", img);
    formData.append("something", "xyz");
    console.log({ img: img });
    console.log(formData);
    request("POST", "/image", formData);
  };
  return (
    <div>
      <form onSubmit={submitForm} encType="multipart/form-data">
        <input type="file" name="img" onChange={handleChange} />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

export default ImgUpload;
