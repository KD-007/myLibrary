import React , {useState , useContext} from 'react';
import bookContext from '../Context/BookContext';

const AddBook = () => {
  const [addData , newaddData] = useState({ title:"" , authore:"" ,quantity:"" });

  const context = useContext(bookContext);
  const { accountType , AddBook } = context;
 


  const onChange=(e)=>{
    newaddData({...addData , [e.target.name]:e.target.value});

  }

  const onSubmit = (e)=>{
    e.preventDefault();
    if (accountType === "teacher"){
      AddBook(addData.title, addData.authore, addData.quantity);
      
    }
  }
    return <>
    <h2  >To Add a Book in Library</h2>
    <div className='container '>
             <form className='container' onSubmit={onSubmit} >
  <div className=" mb-3  text-start">
    <label htmlFor="bookName" className="form-label">Book Name</label>
    <input type="text" className="form-control" id="bookName" onChange={onChange} value={addData.title} name="title"  minLength={2} required />
  </div>
  <div className="mb-3  text-start">
    <label htmlFor="authoreName" className="form-label">Authore Name</label>
    <input type="text" className="form-control" name="authore" onChange={onChange} value={addData.authore}  id="authoreName" minLength={2} required />
  </div>
  <div className="mb-3  text-start">
    <label htmlFor="quantity" className="form-label">Quantity</label>
    <input type="number" className="form-control" name="quantity" onChange={onChange} value={addData.quantity} id="quantity" min={1} required />
  </div>
  
  <button type="submit" className="btn btn-success">Submit</button>
</form>

    </div>
    </>

}


export default AddBook;