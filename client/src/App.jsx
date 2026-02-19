import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import {useEffect, useState} from 'react';
import ArticleDetails from './pages/ArticleDetails';
import ProtectedRoute from './components/ProtectedRoute';
import dummyData from './data/dummyArticle';
import CreateArticle from './pages/CreateArticle';
function App() {
  const[isLoggedIn,setIsLoggedIn] = useState(()=>{
    return localStorage.getItem("isLoggedIn") === "true" ;
  });
  const[articles,setArticles] = useState(()=>
       {const saved = localStorage.getItem("articles");
        return saved ? JSON.parse(saved) : dummyData;
       });
  useEffect(()=>{
    localStorage.setItem("articles",JSON.stringify(articles));
  },[articles]);
  const addArticle = (newArticle)=>{
    setArticles(prev=>[...prev,newArticle]);
  }
  const likeArticle = (id)=>{
    setArticles(prev=>
      prev.map(article=>
      article.id === id 
      ? {...article, likes:article.likes+1}
       : article
    )
  );
  }
  const viewArticle = (id)=>{
    setArticles(prev => 
      prev.map(article =>
        article.id === id 
        ? {...article,views:article.views+1}
        :article
      )
    );
  }
  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
       <Route path="/" element={<Home articles={articles} likeArticle={likeArticle}/>} /> 
        <Route path="/create" 
                 element={
                 <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <CreateArticle addArticle={addArticle}/>
                  </ProtectedRoute>} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Dashboard viewArticle={viewArticle}/></ProtectedRoute>} />
        <Route path="/article/:id" element={<ArticleDetails  
                                            articles = {articles}
                                            likeArticle={likeArticle} 
                                            viewArticle={viewArticle}
                                            />
                                          } 
                                            />
      </Routes>
    </BrowserRouter>
  );
}

export default App;