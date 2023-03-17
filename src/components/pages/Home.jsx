import { Link } from "react-router-dom";

export default function Board(){

    return(
        <div>
            <ul>
                <li><Link to="/game">Game</Link></li>
                <li><Link to="/load">Load</Link></li>
            </ul>
        </div>
    )
}