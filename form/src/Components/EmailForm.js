import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';


const initialValues={
    email:'',
    password:''
}

const validate = values => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
              } else if (
                !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(values.password)
              ) {
                errors.password = 'Minimum eight characters, at least one letter and one number';
              }
            return errors;
          }
const onSubmit = values =>{
    alert(JSON.stringify(values, null, 2))
}


    const NewEmailForm=()=>{
        // const formik = useFormik({
        //     initialValues,
        //     // handleBlur,
        //     validate,
        //     // validaitonSchema,
        //     onSubmit
        // })
        // console.log('Form Values', formik.values)
        // console.log("Visited Fields", formik.touched)
    return (
        <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
            <div className='form-group'>
                <h1 className=' display-1 font-weight-bold mb-5 '>Sign In </h1>
            </div>
            <Form >
            <div className="form-group mx-auto px-md-5 w-25">
                <label >Email address</label>
                <Field type="email" 
                name="email"
                className="form-control"/>
                <ErrorMessage name='email'/>

            </div>
            <div className="form-group px-md-5 mb-5 mx-auto w-25">
                <label >Password</label>
                <Field type="password" 
                name='password' 
                className="form-control" />
                <ErrorMessage name='password'/>
            
            </div>
            <div className='form-group '>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
            </Form>
        </Formik>
    )   
}
export default NewEmailForm;
