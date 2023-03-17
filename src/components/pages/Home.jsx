import { Link } from "react-router-dom";

export default function Board(props){

    function handleSizeChange(e){
        console.log(e.target.value);
        props.setBoardSize(e.target.value)
    }

    return(
        <div>
            <ul>
                <li><Link to="/game" onClick={props.setIsNewBoard(true)}>Game</Link></li>
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