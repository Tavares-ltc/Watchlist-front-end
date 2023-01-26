import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from "react";
import Movielist from "./pages/movielist/index.js";
 

function App() {
  return (
    <>
    <Router>
      <Routes>
       <Route path="/" element={<Movielist />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
