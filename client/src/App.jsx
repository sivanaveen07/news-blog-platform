import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import { useState} from 'react';
import ArticleDetails from './pages/ArticleDetails';
import ProtectedRoute from './components/ProtectedRoute';
import CreateArticle from './pages/CreateArticle';
function App() {
  const[isLoggedIn,setIsLoggedIn] = useState(()=>{
    return localStorage.getItem("isLoggedIn") === "true" ;
  });


  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
       <Route path="/" element={<Home/>} /> 
        <Route path="/create" 
                 element={
                 <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <CreateArticle/>
                  </ProtectedRoute>} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Dashboard/></ProtectedRoute>} />
        <Route path="/article/:id" element={<ArticleDetails />} 
                                            />
      </Routes>
    </BrowserRouter>
  );
}

export default App;