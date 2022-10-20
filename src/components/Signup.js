import React, {useState , useContext} from 'react';
import{Outlet , useNavigate} from 'react-router-dom';

import bookContext from '../Context/BookContext';


const Signup = () => {
  const navigate = useNavigate();
  const context = useContext(bookContext);
  const {showAlert}= context;

  const [credentials , newCredentials] = useState({ name:"", email:"" , password:"" ,cpassword:"" , accountType:"student"});

  const onChange = (e) => {
    newCredentials({...credentials , [e.target.name]:e.target.value});
  };

  const onSubmit =async (e) => {
    e.preventDefault();

     if(credentials.password !==credentials.cpassword){
      showAlert("danger" ,"Your Confirmed password is different" , "Invalid credentials!!")
      return;
     }
    const response =  await fetch('http://localhost:5000/auth/user/createuser' ,  {     
                        method:"POST",
                        headers:{"Content-Type": "application/json"},
                        body:JSON.stringify({ name:credentials.name , email:credentials.email, password:credentials.password, accountType:credentials.accountType})
                     })
                     const json = await response.json();
                     
                     if(json.errors){
                      
                      showAlert("danger" ,json.errors , "Invalid credentials!!")
                     }
                     else{
                      localStorage.setItem('token',json.token);
                      navigate("/")

                     }
     newCredentials({ name:"", email:"" , password:"" ,cpassword:"" , accountType:"student"});
  }
    return <div className='my-5 pt-5 mt-5'>
    <h2>Sign-Up</h2>
    <div className='d-flex align-items-center justify-content-center ' >
   <div className=" card  " style={{width: "28rem" , backgroundColor:"f2f2f2"}}>
  <div className="card-body">
  <form onSubmit={onSubmit} >
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" onChange={onChange} name="name" minLength={2}  required />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" name="email" onChange={onChange} aria-describedby="emailHelp" required/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" id="exampleInputPassword1" onChange={onChange} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" name="cpassword" id="exampleInputPassword2" onChange={onChange} required/>
  </div>
  <div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="accountType" id="inlineRadio1" value="student" onChange={onChange} checked />
  <label className="form-check-label" htmlFor="inlineRadio1" >Student</label>
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="accountType" id="inlineRadio2" onChange={onChange} value="teacher"/>
  <label className="form-check-label" htmlFor="inlineRadio2">Teacher</label>
</div>
<br/>
  <button type="submit" className="btn btn-success my-2">Submit</button>
</form>
  </div>
</div>
</div>
<Outlet/>
</div>

}


export default Signup;