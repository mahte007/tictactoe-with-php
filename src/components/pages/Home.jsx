import { Link } from "react-router-dom";

export default function Board(props){

    return(
        <div>
            <ul>
                <li><Link to="/game" onClick={props.setIsNewBoard(true)}>Game</Link></li>
                <li><Link to="/load">Load</Link></li>
            </ul>
        </div>
    )
}