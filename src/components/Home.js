import React, { useContext, useEffect, useRef, useState } from 'react';
import { Outlet ,useNavigate } from 'react-router-dom';

import AddBook from './AddBook';
import bookContext from '../Context/BookContext';
import Book from './Book';
import Model from './Model';



const Home = (props) => {

  const context = useContext(bookContext);
  const { books, accountType, ownedBooks, fetchAllBooks, fetchMyBooks , showAlert } = context;

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token')){
      showAlert("success", "Welcome to myLibrary" , "Hola!!!!");
      fetchAllBooks()
    }else{
      showAlert("warning", "You Have to login First..." , "Hello user!!!");
      navigate("/login");
    }
    
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (accountType === "student") {
      fetchMyBooks();
      
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountType])


  const modelRef = useRef(null);
  const [mode, currentMode] = useState(null);
  const [mybook, currentBook] = useState({ _id: "", title: "", authore: "", quantity: "", date: "" });
  const [searchResult, newSearchResult] = useState(<p>Search results to be Displayed Here.....</p>);

  
  const onChange = (e) => {
  
    currentBook({ ...mybook, [e.target.name]: e.target.value });

  }

  const editBook = (currentBookData, currentModeType) => {
    modelRef.current.click()
    currentBook(currentBookData);
    currentMode(currentModeType);
  }

  const handleSearch=(e)=>{
    e.preventDefault();
    if(mybook.title ==="" && mybook.authore === ""){
      showAlert("warning " , "Fields are required." , "Empty fields!!!");
      return;
    }
    let found = null;
    found = books.find((book)=>{
      return book.title===mybook.title && book.authore === mybook.authore
    })
    
    if(found===undefined){
      showAlert("warning " , "Your Searched Book Doesn't exist in Library." , "Oh-Oh!!!");
      newSearchResult(<p>Unable to find Your Search book</p>) }
    else{newSearchResult(<Book key={found._id} book={found} accountType={accountType} ownedCategory={false} editBook={editBook} />)}
    currentBook({ _id: "", title: "", authore: "", quantity: "", date: "" });
  }



  return <div className='my-5 pt-5' >
  
   
   {accountType==="teacher" &&  <AddBook /> }
    < Model modelRef={modelRef} mode={mode} book={mybook} onChange={onChange} />
    {accountType === "student" && <>
      <h2>My owned Books</h2>

      <div className="container" >
        <div className="row my-3">
    
          {ownedBooks && ownedBooks.map((book) => {
            return <Book key={book._id} book={book} accountType={accountType} ownedCategory={true} editBook={editBook} />
          })}

              </div>
            </div>
          </>}
    <div className="container" >
      <div className="row my-3">
        <h2>Search a book from database</h2>
      
        <form>
          <div className="form-group text-start">
            <label htmlFor="title">Enter Book Title</label>
            <input type="text" className="form-control" id="title" name="title" onChange={onChange} value={mybook.title} required />
          </div>
          <div className="form-group text-start">
            <label htmlFor="authore">Enter Authore name</label>
            <input type="text" className="form-control" id="authore" name="authore" onChange={onChange} value={mybook.authore} required />
          </div>
          <button type="submit"  onClick={handleSearch} className="btn btn-success my-3">Search</button>
        </form>
        {searchResult} 

        <h2>All Books Available</h2>
          
        {books && books.map((book) => {
          return <Book key={book._id} book={book} accountType={accountType} ownedCategory={false} editBook={editBook} />
        })}

      </div>
    </div>
   
  
  <Outlet />
  </div>
}


export default Home;