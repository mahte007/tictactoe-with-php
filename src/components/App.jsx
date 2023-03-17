import { useState, useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Menu from "./header/Menu";
import Board from "./pages/Board";
import Home from "./pages/Home";
import Load from "./pages/Load";

export default function App() {

  const [savedBoard, setSavedBoard] = useState("");
  const [isNewBoard, setIsNewBoard] = useState(true);
  const [boardSize, setBoardSize] = useState(9);
  
  return (
    <div className="main">
      <Link to="/"><h1>Tic Tac Toe Game</h1></Link>
      <Menu setIsNewBoard={setIsNewBoard} setBoardSize={setBoardSize} />
      <Routes>
        <Route path="/" element={ <Home setIsNewBoard={setIsNewBoard} setBoardSize={setBoardSize} />} />
        <Route path="/game" element={ <Board savedBoard={savedBoard} isNewBoard={isNewBoard} boardSize={boardSize} setBoardSize={setBoardSize} />} />
        <Route path="/load" element={ <Load setSavedBoard={setSavedBoard} setIsNewBoard={setIsNewBoard} />} />
      </Routes>
    </div>
  );
}
