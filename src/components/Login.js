import React, {useState , useContext} from 'react';
import{Outlet , useNavigate} from 'react-router-dom';

import bookContext from '../Context/BookContext';


const Login = () => {
  const navigate = useNavigate();
  const context = useContext(bookContext);
  const {showAlert}= context;

  const [credentials , newCredentials] = useState({email:"" , password:"", accountType:"student"});

  const onChange = (e) => {
    newCredentials({...credentials , [e.target.name]:e.target.value});
  };

  const onSubmit =async (e) => {
    e.preventDefault();

     
    const response =  await fetch('http://localhost:5000/auth/user/login' ,  {     
                        method:"POST",
                        headers:{"Content-Type": "application/json"},
                        body:JSON.stringify({email:credentials.email, password:credentials.password, accountType:credentials.accountType})
                     })
                     const json = await response.json();
                     
                     if(json.errors){
                      
                      showAlert("danger" ,"Please enter valid Credentials" , "Invalid credentials!!")
                     }
                     else{
                      localStorage.setItem('token',json.token);
                      navigate("/")

                     }
     newCredentials({email:"" , password:""});
  }

    return  <div className='my-5 pt-5 mt-5'>
    
    <h2>Login</h2>
    <div className='d-flex align-items-center justify-content-center '>
   <div className=" card  " style={{width: "28rem" , backgroundColor:"f2f2f2"}}>
  <div className="card-body">
  <form onSubmit={onSubmit} >
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" onChange={onChange} value={credentials.email } name="email" aria-describedby="emailHelp" required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" onChange={onChange} value={credentials.password } id="exampleInputPassword1" required/>
  </div>
  <div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="accountType" id="inlineRadio1" onChange={onChange}  value="student" checked required />
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


export default Login;