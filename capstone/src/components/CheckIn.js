import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
function CheckInBook() 
{
    const [returnedBook, returnBook] = useState(null);
    const [checkInBooks, setCheckIn] = useState([]);

    // state of checkedoutBook is set 
    // when clicked on
    // lowkey copy paste from the other component i made
    async function fetchCheckedOutBooks() 
    {
        try 
        {
            const url = 'http://localhost:7000/books?avail=false';
            const res = await fetch(url);
            const res_body = await res.json();
            setCheckIn(res_body);
            console.log(res_body);
        }
        catch(e) 
        {
            console.error("Failed to fetch checked-out books:", e);
        }
    }

    
    useEffect(() => 
        {
            fetchCheckedOutBooks();
        },
    []);

   
    useEffect(() => 
        {
            async function checkInBook(book) 
            {
                try 
                {
                    const book_id = String(book);
                    const url = "http://localhost:7000/books/" + book_id;
                    const data = { avail: true, who: "", due: "" };

                    await fetch(url, 
                    {
                        method: 'PUT',
                        headers: 
                        {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    });
                    fetchCheckedOutBooks();
                } 
                catch(error)
                {
                    console.error(error);
                }
            }
            checkInBook(returnedBook);
        }
    , [returnedBook]);

    function handleClick(book) 
    {
        console.log(book);
        returnBook(book);
    }

    return(
        <div className="w3-container">
            <Link to = "/home" className=" w3-right w3-button w3-orange">Jump to Home</Link>
            <h1 className="w3-center w3-text-light-green">Check In a Book</h1>
            <ul className="w3-ul w3-card-4">
                {checkInBooks.map((book, index) => (
                    <button key={index} className="w3-text-pink" onClick={() => handleClick(book[0])}>
                        {book[1]}
                    </button>
                ))}
            </ul>
        </div>
    );
}

export default CheckInBook;
