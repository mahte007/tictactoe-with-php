import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";


export default function Menu(props){

    const navigate = useNavigate();


    function handleGameStart(){
        navigate("/game");
    }


    return(
        <div className="main-menu">
            <ul>
                <li><Link to="/game" onClick={() => {props.setIsNewBoard(true); handleGameStart()}}>Game</Link></li>
                <li><Link to="/load">Load</Link></li>
            </ul>
        </div>
    )
}