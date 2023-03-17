import { Link } from "react-router-dom";

export default function Board(props){

    return(
        <div>
            <ul>
                <li><Link to="/game" onClick={props.setIsNewBoard(true)}>Game</Link></li>
                <li><Link to="/load">Load</Link></li>
            </ul>
            <input list="boardsizes" />
            <datalist id="boardsizes">
                <option value="3X3" />
                <option value="4X4" />
                <option value="5X5" />
                <option value="6X6" />
                <option value="7X7" />
            </datalist>
        </div>
    )
}