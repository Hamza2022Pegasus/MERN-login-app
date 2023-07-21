import React from 'react';
import { useFormik } from 'formik';
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
// const validaitonSchema  = Yup.object({
//     'email': Yup
//         .string()
//         .email('Invalid Email')
//         .required('Required!'),
//     'password': Yup
//         .string()
//         .required('No password provided.') 
//         .min(4, 'Password is too short - should be 4 chars minimum.')
//         .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
// })


    const Oldemailform=()=>{
        const formik = useFormik({
            initialValues,
            // handleBlur,
            validate,
            // validaitonSchema,
            onSubmit
        })
        // console.log('Form Values', formik.values)
        // console.log("Visited Fields", formik.touched)
    return (
    <div className='w-25 mx-auto'>
        <h1 className='h1 mx-auto w-100 mb-5 mt-5'>Sign In </h1>
        <form onSubmit={formik.handleSubmit}>
            <div className="form-floating mx-auto w-100">
                <input type="email" 
                name="email"
                className="form-control " 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur} 
                value={formik.values.email}
                placeholder="name@example.com"/>
                <label htmlFor='floatingInput' className='text-left'>Email address</label>
                
                {formik.touched.email && formik.errors.email ? <div className='text-danger mt-2 ms-3'>{formik.errors.email}</div>:null}

            </div>
            <div className="form-floating mx-auto w-100 mt-3">
                <input type="password" 
                name='password' 
                className="form-control" 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur} 
                value={formik.values.password}
                placeholder='password'/>
                <label htmlFor='floatingPassword' className='text-left'>Password</label>

                {formik.touched.password && formik.errors.password ? <div className='text-danger mt-2 ms-3'>{formik.errors.password}</div>:null}
            
            </div>
            {/* <div class="input-group mb-3 mt-3">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                    <input type="checkbox" aria-label="Checkbox for following text input"/>
                    </div>
                </div>
                <p className='ml-3'>Remember me</p>
            </div> */}
            <div className='form-group mx-auto mt-4 w-50 text-center'>
                <button type="submit" className="btn btn-primary btn-lg">Submit</button>
            </div>
        </form>
    </div>
    )
}
export default Oldemailform;
