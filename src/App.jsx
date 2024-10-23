import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Header from './components/Header';
import Footer from './components/Footer';
function App() {
  return (
    <Router>
      <div className='flex flex-col gap-7 items-center h-screen justify-center bg-slate-800' >
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
