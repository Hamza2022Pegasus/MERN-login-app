import React, { Component } from 'react'

// const fetchData = async () => {
//   try {
//     const response = await fetch("https://api.example.com/data");
//     if (!response.ok) {
//       throw new Error("Request failed");
//     }
//     const responseData = await response.json();
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const fetchData = async ()=>{
//   const response = await fetch("http://localhost:8000/users"); 
//   if (response.ok){
//     const jsonvalue = await response.json();
//     console.log(await Promise.resolve(jsonvalue));
//   }
//   else{
//     console.log(Promise.reject("not found"))
//   }
// }

const fetchData = async () => {
  const response = await fetch("http://localhost:8000/users", {
    method: 'POST',
    crossDomain: true,
    headers: {
      Accept: 'application.json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*"
    },
    body: JSON.stringify({
      email: "owen_teale@gameofthron.es"
    }),
  })
  if (response.ok) {
    const jsonvalue = await response.json()
    console.log(await Promise.resolve(jsonvalue))
  }
}
// async function fetchData() {
//   fetch('http://localhost:8000/users')
//   .then((response) => {
//     // console.log("Data=>"+JSON.stringify(response));
//   })
// }

  // try {
  //   const data = await fetch('http://localhost:8000/users');
  //   // console.log("Data=>"+JSON.stringify(data));
  //   localStorage.setItem(data,JSON.stringify(data))
  //   const data2 = JSON.parse(localStorage.getItem(data))
  //   console.log("Data=>"+JSON.stringify(data2));
  // } catch (error) {
  //   console.log(error.message);
  // }
// }

const Datalog = () => {
  return(
    <div className='data-from-api-div'>
     <p className='data-from-api'><button className="btn btn-primary btn-lg" onClick={fetchData}>Press to see data</button></p>
    </div>  
  )
}

export default Datalog