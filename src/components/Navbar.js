import React , {useContext} from 'react';
import {Link ,Outlet , useNavigate} from 'react-router-dom';

import bookContext from '../Context/BookContext';
import Alert from './Alert';

const Navbar = () => {

  const navigate = useNavigate();

  const context = useContext(bookContext);
  const {userName ,alert , showAlert} = context;

  const handleLogout = () => {
    showAlert("success", "Hope to see you again soon..." , "Bye-Bye!!!!");
    localStorage.removeItem("token");
    navigate("/login");
  }
    return <div>
        <nav className="navbar bg-light position-fixed top-0" style={{width:"100%" , zIndex:6}}>
  <div className="container-fluid">
    <Link className="navbar-brand mx-3 font-weight-bolder " to="/">my<b>Library </b> </Link>
    {localStorage.getItem("token") && userName && <h3>Hola! ~{userName} </h3> }
    
    <div className="d-flex" role="search">

      {!localStorage.getItem("token") &&<>
       <Link className="btn btn-outline-success mx-1" to="/login" >Login</Link>
      <Link className="btn btn-outline-success mx-1" to="/signup" >Sign-Up</Link>
      </>}
      {localStorage.getItem("token") &&<>
       <button className="btn btn-success mx-1" onClick={handleLogout} >Logout</button>
      </>}
    </div>
  </div>
</nav>
{alert && <Alert type={alert.type} message={alert.message}  reaction ={alert.reaction} />}
<Outlet/>
    </div>;
}

export default Navbar;