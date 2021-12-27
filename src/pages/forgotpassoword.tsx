import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
type fieldvalues = {
  email: string;
};
export default function Forgotpassoword() {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<fieldvalues>();
  const [msg, setMsg] = useState("");
  const [sucess, setSucess] = useState("");

  return (
    <div className="container">
      <form
        onSubmit={handleSubmit(async (data) => {
          await axios({
            method: "POST",
            data: { email: data.email },
            url: "http://localhost:3001/user/forgot-password",
          })
            .then((res) => {
              setSucess(res.data);
              setMsg("");
            })
            .catch((error) => {
              setMsg(error.response.data.error);
              setSucess("");
            });
        })}
      >
        <h1>Forgot password</h1>
        <hr></hr>
        <p className="forgot">
          Please enter the email address you'd like your password reset
          information sent to
        </p>
        <div className="error">{errors.email?.message}</div>
        <div className="fields">
          <label htmlFor="email"></label>
          <input
            type="email"
            {...register("email", {
              required: { value: true, message: "Email required" },
            })}
            id="email"
            placeholder="Enter email address"
          ></input>
        </div>
        <div className="sucess">{sucess}</div>
        <div className="error">{msg}</div>
        <div className="button">
          <button type="submit">Request reset link</button>
        </div>
      </form>
    </div>
  );
}
