import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Board from "./pages/Board";
import Home from "./pages/Home";
import Load from "./pages/Load";

export default function App() {

  const [savedBoard, setSavedBoard] = useState("");
  const [isNewBoard, setIsNewBoard] = useState(true);
  
  return (
    <div>
      <h1>Tic Tac Toe Game</h1>
      <Routes>
        <Route path="/" element={ <Home setIsNewBoard={setIsNewBoard} />} />
        <Route path="/game" element={ <Board savedBoard={savedBoard} isNewBoard={isNewBoard} />} />
        <Route path="/load" element={ <Load setSavedBoard={setSavedBoard} setIsNewBoard={setIsNewBoard} />} />
      </Routes>
    </div>
  );
}
