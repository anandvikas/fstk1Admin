import React from "react";
import { useForm } from "react-hook-form";

const FormUseForm = () => {
  const { register, handleSubmit } = useForm();
  const onFormSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div>
          <h3>Basic</h3>
          <input
            type="text"
            placeholder="user name"
            {...register("userName")}
          />
          <br />
          <input type="email" placeholder="email" {...register("email")} />
          <br />
          <input
            type="password"
            placeholder="password"
            {...register("password")}
          />
          <br />
          <hr />
        </div>
        <div>
          <h3>Address</h3>
          <input
            type="text"
            placeholder="Street"
            {...register("address.street")}
          />
          <br />
          <input type="text" placeholder="City" {...register("address.city")} />
          <br />
          <input
            type="text"
            placeholder="State"
            {...register("address.state")}
          />
          <br />
          <hr />
        </div>
        <div>
          male : <input type="radio" {...register("gender")} value="male" />
          female : <input type="radio" {...register("gender")} value="female" />
          other : <input type="radio" {...register("gender")} value="other" />
          <hr />
        </div>
        <div>
          Send mails : <input type="checkbox" {...register("sendMail")} />
          Send text : <input type="checkbox" {...register("sendText")} />
          <hr />
        </div>
        <div>
          <select {...register("state")}>
            <option value="">Select State</option>
            <option value="delhi">Delhi</option>
            <option value="rajasthan">Rajasthan</option>
            <option value="up">UP</option>
            <option value="mp">MP</option>
          </select>
          <hr />
        </div>
        <div>
          <input type="submit" value="submit form" />
        </div>
      </form>
    </div>
  );
};

export default FormUseForm;
