import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Board from "./pages/Board";
import Home from "./pages/Home";

export default function App() {

  const [boardSize, setBoardSize] = useState(9);
  const [board, setBoard] = useState();
  
  return (
    <div>
      <h1>Tic Tac Toe Game</h1>
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/game" element={ <Board />} />
      </Routes>
      <Board />
    </div>
  );
}
