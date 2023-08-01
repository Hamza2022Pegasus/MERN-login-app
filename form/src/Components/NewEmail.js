import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};

const fetchData = async (e_mail, password) => {
  try {
    const response = await axios.post("http://localhost:8000/users", {
      email: e_mail,
      password,
    });
    return response;
  } catch (err) {
    return await err;
  }
};

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(values.password)) {
    errors.password =
      "Minimum eight characters, at least one letter and one number";
  }
  // console.log(errors)
  return errors;
};

const NewEmail = () => {
  // console.log('Form Values', formik.values)
  // console.log("Visited Fields", formik.touched)
  const [warning, setWarning] = useState(null);
  const [cookieValue, setCookieValue] = useState(false);
  const [tokenTrue, setTokenTrue] = useState(false);
  const navigate = useNavigate();

  console.log("Outside useffect", cookieValue);

  useEffect(() => {
    const cookieArray = document.cookie
      .split(";")
      .map((cookie) => cookie.trim());
    const cookie = cookieArray.find((cookie) => cookie.startsWith(`token`));

    if (cookie) {
      setCookieValue(cookie.split("=")[1]);
    }
    console.log("inside useeffect", cookieValue);
    if (cookieValue) {
      axios
        .post("http://localhost:8000/users/token", { token: cookieValue })
        .then((response) => {
          console.log(response.data.success);
          if (response.data.success) {
            setTokenTrue(true);
            setWarning("You are already logged in");
            navigate("/home");
          } else {
            setWarning("Please enter your email and password");
          }
        });
    }
  }, [cookieValue]);

  const onSubmit = async (values) => {
    const resp = await fetchData(values.email, values.password);
    console.log(resp);
    if (resp.data.accessToken) {
      document.cookie = `token=${resp.data.accessToken}`;
      if (warning == null) {
        setWarning(resp.data.data);
      } else {
        setWarning(null);
      }
      navigate("/home");
    } else {
      if (warning == null) {
        setWarning(resp.data.data);
      } else {
        setWarning(null);
      }
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
      className=""
    >
      <Form className="w-25 min-vh-50 mx-auto d-flex flex-column justify-content-center align-items-center border border-light border-2 rounded px-3 shadow mt-5 mb-3 pb-5">
        <h1 className="h1 mx-auto w-100 mb-5 mt-5  text-center">Sign In </h1>
        <p className="text-danger ms-3 mt-1 mb-2 w-50 animation lead ">
          {warning}
        </p>
        <div className="form-group mx-auto mb-n1 w-100">
          <label className="text-left mb-1 w-100">
            Email address: <sup>*</sup>
          </label>
          <Field
            type="email"
            name="email"
            className="form-control form-control-lg border border-dark shadow-sm rounded"
          />
          <div className="text-danger ms-3 mt-1 animation">
            {" "}
            <ErrorMessage name="email" />
          </div>
        </div>
        <div className="form-group mx-auto w-100 mb-2 mt-1">
          <label className="text-left mb-1 w-100">
            Password: <sup>*</sup>
          </label>
          <Field
            type="password"
            name="password"
            className="form-control form-control-lg border border-dark shadow-sm rounded"
          />
          <div className="text-danger ms-3 mt-1 animation">
            {" "}
            <ErrorMessage name="password" />
          </div>
        </div>
        <div className="form-group mx-auto mt-3 w-50 text-center">
          <button type="submit" className="btn btn-primary btn-lg">
            Submit
          </button>
        </div>
      </Form>
    </Formik>
  );
};
export default NewEmail;
