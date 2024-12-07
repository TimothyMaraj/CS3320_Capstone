import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";





function CheckedOutBook() 
{
    const [returndate, calculateReturn] = useState("00-00-0000");
    const [borrowedBook, borrowBook] = useState(null);
    const [person, reportPerson] = useState("");
    const [freeBooks, setBooks] = useState([]);

 
    async function fetchFreeBooks() 
    {
        try 
        {
            // url is same route from before 
            // port is 7000 though
            const url = 'http://localhost:7000/books?avail=true';
            const res = await fetch(url);
            const res_body = await res.json();
            setBooks(res_body);
            console.log(res_body);
        } 
        catch(e) 
        {
            console.error(e);
        }
    }

    
    useEffect(() => 
        {
            fetchFreeBooks();
        }
    , []);

    
    useEffect(() => 
    {
        async function checkedBook(book, personName, date) 
        {
            try 
            {
                const book_id = String(book);
                const url = "http://localhost:7000/books/" + book_id; 
                const data = { avail: false, who: personName, due: date };

                await fetch(url, 
                    {
                        method: 'PUT',
                        headers: 
                        {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    }
                );
                fetchFreeBooks();
            } 
            catch(error) 
            {
                console.error(error);
            }
        }
        checkedBook(borrowedBook, person, returndate);
    }, [borrowedBook, person, returndate]);

  
    function handleClick(book) 
    {
        const personName = document.getElementById("personName").value;
        if (personName == null || personName == "") 
        {
            alert("Enter Your Name");
            return;
        }

        console.log(book);
        borrowBook(book);
        reportPerson(personName);
        // get date
        // add 24 days
        // log date
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 24);
        const formattedDate = currentDate.toISOString().split('T')[0];
        console.log(formattedDate);
        calculateReturn(formattedDate);
    }

    return (
        <div className="w3-container">
            <Link to = "/home" className=" w3-right w3-button w3-purple">Jump to Home</Link>
            <h1 className="w3-center w3-text-light-green">Check Out a Book</h1>
            <ul className="w3-ul w3-card-4">
                {freeBooks.map((book, index) => (
                    <button key={index} className="w3-text-pink" onClick={() => handleClick(book[0])}>
                        {book[1]}
                    </button>
                ))}
            </ul>
            <div className="w3-center">
                <label>Input Name Below</label>
                <br />
                <input type="text" id="personName" name="personName" />
            </div>
        </div>
    );
}

export default CheckedOutBook;
