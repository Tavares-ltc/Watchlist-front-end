import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Movielist from "./pages/movielist/Index.js";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Movielist />} />
          <Route
            path='/popular'
            element={<Movielist moviesCategory={"Popular"} />}
          />
          <Route
            path='/discover'
            element={<Movielist moviesCategory={"Discover"} />}
          />
          <Route
            path='/nowplaying'
            element={<Movielist moviesCategory={"Now Playing"} />}
          />
          <Route
            path='/upcoming'
            element={<Movielist moviesCategory={"Upcoming"} />}
          />
          <Route
            path='/toprated'
            element={<Movielist moviesCategory={"Top Rated"} />}
          />
          <Route
            path='/search'
            element={<Movielist moviesCategory={"Search"} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
