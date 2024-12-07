import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ListCheckedOutbooks()
{
    const [checkOutBooks, setBooks] = useState([]);
   
    useEffect(() => 
        {
            async function fetchCheckedOutBooks()
            {
                try
                {
                    // Add Code
                    let url = 'http://localhost:7000/books?avail=false'
                    const res = await fetch(url); 
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
            fetchCheckedOutBooks(); 
        }

    , []);
    
    return(
        <div className="w3-container">

        <Link to = "/home" className=" w3-right w3-button w3-red">Jump to Home</Link>

        <h1 className="w3-center w3-text-light-green">Checked Out Books</h1>
            <ul className="w3-ul w3-card-4">
            {
                checkOutBooks.map((book, index) => 
                (
                    <li key={index} className="w3-text-pink">
                        {book[1]}
                    </li>
                ))

            }
            </ul>
        </div>
    ); 

}

export default ListCheckedOutbooks;