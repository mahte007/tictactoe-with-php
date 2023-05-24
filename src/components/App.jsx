import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Menu from "./header/Menu";
import Board from "./pages/Board";
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
        <Route path="/game" element={ <Board savedBoard={savedBoard} isNewBoard={isNewBoard} boardSize={boardSize} setBoardSize={setBoardSize} setIsNewBoard={setIsNewBoard} />} />
        <Route path="/load" element={ <Load setSavedBoard={setSavedBoard} setIsNewBoard={setIsNewBoard} />} />
      </Routes>
    </div>
  );
}
