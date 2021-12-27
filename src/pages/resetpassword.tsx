import axios from "axios";
import React, { useState, useRef } from "react";
import { useHref, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
type formvalues = {
  password: string;
  confirmpass: string;
};
export default function ResetPassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formvalues>();
  const [fail, setFail] = useState("");
  const [sucess, setSucess] = useState("");
  const { token, userId } = useParams();
  const isValidToken = async () => {
    await axios({
      method: "GET",
      url: `http://localhost:3001/user/reset-password/${userId}/${token}`,
    }).catch((err) => {
      navigate("/");
    });
  };
  useEffect(() => {
    isValidToken();
  }, []);
  return (
    <div className="container">
      <form
        onSubmit={handleSubmit(async (data) => {
          if (data.password.localeCompare(data.confirmpass)) {
            setFail("Password and confirm Password should be same");
          } else {
            setFail("");
            await axios({
              method: "POST",
              url: `http://localhost:3001/user/reset-password/${userId}/${token}`,
              data: {
                confirmpass: data.confirmpass,
                password: data.password,
              },
            }).then((res) => {
              setFail("");
              setSucess(res.data);
            });
          }
        })}
      >
        <h1>Reset password</h1>
        <hr className="solid"></hr>

        <div className="fields">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password", {
              required: { value: true, message: "Password is required" },
              pattern: {
                value: /^[A-Za-z0-9$&+,:;=?@#|'<>.-^*()%!]*$/,
                message: "Password can only contain numbers and charcters",
              },
              maxLength: {
                value: 20,
                message: "The maximum length of Password is 20 characters",
              },
              minLength: {
                value: 5,
                message: "The minimum length of Password is 5 characters",
              },
            })}
            id="password"
            placeholder="Password"
          ></input>
        </div>
        <div className="error">{errors.password?.message}</div>

        <div className="fields">
          <label htmlFor="confrimpass">Confirm password</label>
          <input
            type="password"
            {...register("confirmpass", {
              required: {
                value: true,
                message: "Confirm password is required",
              },
              pattern: {
                value: /^[A-Za-z0-9$&+,:;=?@#|'<>.-^*()%!]*$/,
                message: "Password can only contain numbers and charcters",
              },
              maxLength: {
                value: 20,
                message: "The maximum length of Password is 20 characters",
              },
              minLength: {
                value: 5,
                message: "The minimum length of Password is 5 characters",
              },
            })}
            id="confrimpass"
            placeholder="Repeat password"
          ></input>
        </div>
        <div className="error">
          {errors.confirmpass?.message}
          <br></br>
          {fail}
        </div>
        <div className="sucess">{sucess}</div>
        <div className="button">
          <button type="submit">Change password</button>
        </div>
      </form>
    </div>
  );
}
