import { Link } from "react-router-dom"
import { useEffect, useState } from "react";

export default function Menu(props){
    const [size, setSize] = useState("");

    useEffect(() => {
        props.setBoardSize(9);
    }, [])



    function handleGameStart(){
        props.setBoardSize(size);
    }


    function handleSizeChange(e){
        setSize(e.target.value);
    }



    return(
        <div className="main-menu">
            <ul>
                <li><Link to="/game" onClick={() => {props.setIsNewBoard(true); handleGameStart()}}>Game</Link></li>
                <li><Link to="/load">Load</Link></li>
            </ul>
            <select id="boardSize" className="board-size-selector" onChange={handleSizeChange}>
                <option value="9">3X3</option>
                <option value="16">4X4</option>
                <option value="25">5X5</option>
                <option value="36">6X6</option>
                <option value="49">7X7</option>
            </select>
        </div>
    )
}