import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function Home() 
{
    return (
        <div className="w3-container w3-padding">
        <h1 className="w3-center w3-text-cyan">CS3320 Capstone Project</h1>
        <div className="w3-center w3-margin-top">
            
            <Link to="/freebooks" className="w3-button w3-red w3-margin w3-round">
            List Free Books
            </Link>
            
            <Link to="/checkedout" className="w3-button w3-light-green w3-margin w3-round">
            List Checked Out Books
            </Link>
            
            <Link to="/checkout" className="w3-button w3-yellow w3-margin w3-round">
            Check Out Books
            </Link>
            
            <Link to="/checkin" className="w3-button w3-blue w3-margin w3-round">
            Check In a Book
            </Link>

        </div>
        </div>
    );
}

export default Home;
