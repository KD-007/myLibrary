import React , {useState} from 'react';
import bookContext from './BookContext';

const StateContext = (props) => {
    const [accountType , newaccountType]= useState(null);
    const booksData = [
        {
            "_id":"234",
            "title":"Sample Title",
            "authore":"Sample Authore",
            "quantity":"4"
          },
    ]

    const [books , newBooks]=useState(booksData);


    const bookData = [
        {
            "_id":"2334",
            "title":"Sample Title",
            "authore":"Sample Authore",
            "quantity":"4"
          },
    ]

    const [ownedBooks , newownedBooks]=useState(bookData);
    const [userName , newUserName]=useState(null);
    const [alert , setalert]=useState(null);


    //----------------------------------------------------------------------------------------------------------
    //to show alert
    const showAlert = (type , message , reaction)=>{
        setalert({type , message , reaction});
        setTimeout(()=>{
            setalert(null);
        },3000)
    }

    //--------------------------------------------------------------------------------------------------------------------------------
    //to Add book in Database

    const AddBook = async (title, authore, quantity) =>{
            const response = await fetch('http://localhost:5000/auth/book/addbook' , {
                method: 'POST',
                headers:{"content-type": "application/json",
                          "token": localStorage.getItem('token')  
                        },
                body: JSON.stringify({ title, authore, quantity})
            })

            const json = await response.json();
            if(json.error){
                showAlert("warning", json.error , "Oh-Oh!!!!");
                return;

            }
            newBooks(books.concat (json.book));
            showAlert("success", "book successfully Added to Database" , "Hurray!!!!");
    }
 //-----------------------------------------------------------------------------------------------
 //To fetch all Books

const fetchAllBooks = async()=>{
    const response = await fetch('http://localhost:5000/auth/book/fetchallbooks' , {
        method: 'GET',
        headers:{"content-type": "application/json",
                  "token": localStorage.getItem('token')  
                }
    })

    const json = await response.json();
    newBooks(json.book);
    newaccountType(json.userType);
    newUserName(json.userName);

}

//------------------------------------------------------------------------------------------------
//To delete a book from the database
const handleDelete =async(id)=>{
    const response = await fetch(`http://localhost:5000/auth/book/deletebook/${id}`,{
        method: 'DELETE',
        headers:{"content-type": "application/json",
        "token": localStorage.getItem('token')  
      }

    });
    const json = await response.json();
    if(json.error){localStorage.removeItem('token')};
    const updatedBooks= books.filter(book => book._id !==id);
    newBooks(updatedBooks);
    showAlert("primary", "book successfully removed from the Database" , "Hurray!!!!");

}
//-----------------------------------------------------------------------------------------------------------
//to edit a book in the database
const handleEdit =async(id , title , authore, quantity)=>{
    const response = await fetch(`http://localhost:5000/auth/book/updatebook/${id}`,{
        method:'PUT',
        headers:{"content-type": "application/json",
        "token": localStorage.getItem('token')  
      },
      body: JSON.stringify({title, authore, quantity})
    })
    const json = await response.json();
    if(json.error){localStorage.removeItem('token')};

    let updatedBooks = JSON.parse(JSON.stringify(books));
    for (let index = 0; index < updatedBooks.length; index++) {
        
        if(updatedBooks[index]._id===id){
            updatedBooks[index].title = title;
            updatedBooks[index].authore = authore;
            updatedBooks[index].quantity = quantity;
            break;
        }    
    }
   

    newBooks(updatedBooks);
    showAlert("success", "book successfully Updated to the Database" , "Hurray!!!!");


}
//------------------------------------------------------------------------------------------------
//fetch my owned book
const fetchMyBooks = async()=>{
    const response = await fetch('http://localhost:5000/auth/book/fetchmybooks',{
        method:'GET',
        headers:{"content-type": "application/json",
        "token": localStorage.getItem('token')  
      }
    })
    const json = await response.json();
    newownedBooks(json.myBooks);
}
//------------------------------------------------------------------------------------------
//Return a book
const handleReturn = async (id,title, authore)=>{
    const response = await fetch('http://localhost:5000/auth/book/returnbook/',{
        method:'POST',
        headers:{"content-type": "application/json",
        "token": localStorage.getItem('token')  
        },
        body: JSON.stringify({title: title, authore: authore})
    })
    const json = await response.json();
    
    if(json.error){localStorage.removeItem('token')};
    const updatedBooks= ownedBooks.filter(book => book._id !==id);
    newownedBooks(updatedBooks);
    showAlert("success", "book successfully returned" , "Hurray!!!!");

}
//-------------------------------------------------------------------------------------------------------
//Borrow a book
const handleBorrow = async(title,authore)=>{
    const response = await fetch('http://localhost:5000/auth/book/requestbook' , {
                method: 'POST',
                headers:{"content-type": "application/json",
                          "token": localStorage.getItem('token')  
                        },
                body: JSON.stringify({ title, authore})
            })

            const json = await response.json();
           
            if(json.message){ 
                showAlert("warning", json.message , "Oh-Oh!!!!")
                 return;}
            showAlert("success", "book successfully borrowed from Library" , "Hurray!!!!");
            newownedBooks(ownedBooks.concat (json.book));
            

}


  
    return <bookContext.Provider value={{userName, books,accountType, ownedBooks, alert, AddBook , fetchAllBooks , handleDelete ,handleEdit , fetchMyBooks, handleReturn , handleBorrow , showAlert} } >
        {props.children}
    </bookContext.Provider>
}

export default StateContext;