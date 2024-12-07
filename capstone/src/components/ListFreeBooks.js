import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function ListFreeBooks()
{
    const [freeBooks, setBooks] = useState([]);
   
    useEffect(() => 
        {
            async function fetchFreeBooks()
            {
                try
                {
                    // Add Code
                    let URL = 'http://localhost:7000/books?avail=true'
                    const res = await fetch(URL); 
                    //console.log( await res.json());
                    // replace this now with useState
                    let res_body = await res.json();
                    // the return is an
                    // array of arrays
                    setBooks(res_body);
                    console.log(res_body);
                }
                catch(e)
                {
                    console.log(e);
                }
                
            }
            fetchFreeBooks(); 
        }

    , []);
    
        

    return (
        <div className="w3-container">

        <Link to = "/home" className=" w3-right w3-button w3-blue">Jump to Home</Link>

        <h1 className="w3-center w3-text-light-green">Free Books</h1>
            <ul className="w3-ul w3-card-4">
                {
                    freeBooks.map((book, index) => (
                        <li key={index} className="w3-text-pink">
                            {book[1]}
                        </li>
                    ))

                }
            </ul>
        </div>
    ); 

}

export default ListFreeBooks;