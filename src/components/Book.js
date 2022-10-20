import React from 'react';



const Book = (props) => {
  
  const {book, editBook , accountType , ownedCategory } = props;

 
  return <>
 
  <div className='col-md-3'>
  <div className="card my-3" >
    <div className="card-header"> <b> {book.title}</b>

    </div>
    <div className="card-body">
      <h5 className="card-title">By: <i> {book.authore} </i></h5>
      {accountType==="teacher" && <h6 className="card-title">Available Quantity: {book.quantity}</h6>}
      <br />
     {accountType==="teacher" &&<> <i className="fa-solid fa-trash-can mx-1 btn" onClick={()=>{editBook(book , "delete")}}  ></i>
      <i className="fa-solid fa-pen-to-square mx-1 btn" onClick={()=>{editBook(book , "edit")}} ></i> </>}
    {accountType==="student" && ownedCategory===true && <i className="fa-solid fa-right-to-bracket btn" onClick={()=>{editBook(book , "return")}}></i>}
    {accountType==="student" && ownedCategory===false && <i className="fa-regular fa-square-plus btn" onClick={()=>{editBook(book , "add")}}></i>}
    
    </div>
  </div>
  </div>
  </>


}


export default Book;