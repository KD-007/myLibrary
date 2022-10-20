import React , {useRef , useContext } from 'react';
import bookContext from '../Context/BookContext';


const Model = (props) => {
  const context = useContext(bookContext);
  
  let {modelRef , mode , book  ,onChange} = props;


  const {handleDelete, handleEdit, handleReturn ,handleBorrow } = context;
  const closeRef = useRef(null);

 
  const operation=(mode)=>{
    if(mode === "delete"){
      return <p>Do You Want to delete  book: "{book.title}" by <i> ~  {book.authore}</i>  </p>
    }
    if(mode === "edit"){

      return  <form className='container' >
      <div className=" mb-3  text-start">
        <label htmlFor="bookName" className="form-label">Book Name</label>
        <input type="text" className="form-control" id="bookName" onChange={onChange} value={book.title} name="title" required />
      </div>
      <div className="mb-3  text-start">
        <label htmlFor="authoreName" className="form-label">Authore Name</label>
        <input type="text" className="form-control" name="authore" onChange={onChange} value={book.authore}  id="authoreName" required />
      </div>
      <div className="mb-3  text-start">
        <label htmlFor="quantity" className="form-label">Quantity</label>
        <input type="number" className="form-control" name="quantity" onChange={onChange} value={book.quantity} id="quantity" min={1} required/>
      </div>
      
    </form>
    }
    if(mode === "return"){
      const milliSeconds = Date.now() - Date.parse(book.date)
      const days =Math.ceil(milliSeconds / (1000 * 3600 * 24))

      return <p>Do You Want to Return book: "{book.title}" by <i> ~  {book.authore}</i>
                <br/>
                Book is Owned for:{days} Days 
                <br/>
                Total Applicable Late fine :{days>7?(days-7)*10 :0} Rs
                    </p>
    }
    if(mode === "add"){
      return <p>Do You Want to borrow book: "{book.title}" by <i> ~  {book.authore}</i>  </p>
      
    }
  }


  const handleClick=()=>{
    closeRef.current.click()
    if(mode === "delete"){ handleDelete( book._id)}
    if(mode === "edit"){ handleEdit(book._id ,book.title , book.authore ,book.quantity)}
    if(mode === "return"){ handleReturn(book._id ,book.title , book.authore)}
    if(mode === "add"){ handleBorrow(book.title , book.authore)}

  }

  


    return <>
   
<button ref={modelRef} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">{mode} book </h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        {mode && operation(mode)}
      </div>
      <div className="modal-footer">
        <button ref={closeRef} type="button" className="btn btn-secondary"  data-bs-dismiss="modal">Close</button>
        <button type="button" onClick={handleClick} className="btn btn-success">Save changes</button>
      </div>
    </div>
  </div>
</div>



    </>
}


export default Model;