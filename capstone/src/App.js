import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ListCheckedOutbooks from './components/ListCheckedOut.js';
import ListFreeBooks from './components/ListFreeBooks.js';
import CheckInBook from './components/CheckIn.js';
import CheckedOutBook from './components/Checkout.js';
import Home from './components/Home.js';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/home" element= { <Home/> }/>
        <Route path="/checkedout" element= { <ListCheckedOutbooks/> }/>
        <Route path="/freebooks" element= { <ListFreeBooks/> }/>
        <Route path="/checkin" element= { <CheckInBook/> }/>
        <Route path="/checkout" element= { <CheckedOutBook/> }/>
      </Routes>
    </Router>
  );
}

export default App;
