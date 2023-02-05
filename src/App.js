import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import MovielistPage from "./pages/movielist/Index.js";
import LoginPage from "./pages/login/Index.js";
import AuthContextProvider from "./contexts/AuthContext.js";
import { ToastContainer } from "react-toastify";
import WatchlistPage from "./pages/watchlist/index.js";
import { HomePage } from "./pages/HomePage.js";

function App() {
  return (
    <>
      <ToastContainer  />
      <AuthContextProvider>
        <Router>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route
              path='/popular'
              element={<MovielistPage moviesCategory={"popular"} />}
            />
            <Route
              path='/discover'
              element={<MovielistPage moviesCategory={"discover"} />}
            />
            <Route
              path='/now_playing'
              element={<MovielistPage moviesCategory={"now_playing"} />}
            />
            <Route
              path='/upcoming'
              element={<MovielistPage moviesCategory={"upcoming"} />}
            />
            <Route
              path='/top_rated'
              element={<MovielistPage moviesCategory={"top_rated"} />}
            />
            <Route
              path='/search'
              element={<MovielistPage moviesCategory={"search"} />}
            />
            <Route path='/login' element={<LoginPage action='login' />} />
            <Route path='/signup' element={<LoginPage action='signup' />} />
            <Route path='/watchlist/' element={<WatchlistPage/>} />
            <Route path='/watchlist/:userId' element={<WatchlistPage/>} />
          </Routes>
        </Router>
      </AuthContextProvider>
    </>
  );
}

export default App;
