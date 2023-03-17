import { useEffect, useState } from "react";
import CustomAlert from "../reusable/CustomAlert";
import { useNavigate } from "react-router-dom";
import CustomButton from "../reusable/CustomButton";

export default function Board(props){
    
    const [board, setBoard] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [nextPlayer, setNextPlayer] = useState(true);
    const [playerMove, setPlayerMove] = useState("X");
    const [winner, setWinner] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [isSaved, setIsSaved] = useState(false);
    const [saveMessage, setSaveMessage] = useState("");
    

    const navigate = useNavigate()
    const numberOfColumns = Math.sqrt(props.boardSize);
    const url = "http://localhost:5000/boards"



    useEffect(() => {
        if(isLoaded){
            const gameBoard = document.getElementById("game-board");
            gameBoard.style.width = (numberOfColumns * 100) + "px";

        }
    }, [])


    useEffect(() => {
        if(props.isNewBoard){
            const newBoard = []
            for(let i = 0; i < props.boardSize; i++){
                newBoard.push("");
            }
            setBoard(newBoard);
            
        }else{
            const savedBoard = []
            if(props.savedBoard){
                for(let i in props.savedBoard){
                    props.savedBoard[i] === "0"
                    ? 
                    savedBoard.push("")
                    :
                    props.savedBoard[i] === "1" ? savedBoard.push("X") : savedBoard.push("O")
                }
                props.setBoardSize(savedBoard.length);
            }
            setBoard(savedBoard);
        }
            setIsLoaded(true);
    }, [props.boardSize])




    const handlePlayerMove = (index) => {
        console.log(board[index]);
        if(board[index] !== ""){
            return
        }
        const newBoard = [...board];
        newBoard[index] = playerMove;
        setBoard(newBoard);
        setNextPlayer(!nextPlayer);
        setPlayerMove(nextPlayer ? "O" : "X");
        setIsSaved(false);
    }



    const checkForWinner = () => {
        const size = Math.sqrt(board.length);

        for(let i = 0; i < board.length; i += size){
            const row = board.slice(i, i + size);
            if(row.every((val) => val === row[0] && val !== "")){
                setWinner(row[0]);
            }
        }

        for(let i = 0; i < size; i++){
            const column = [];
            for(let j = i; j < board.length; j += size){
                column.push(board[j]);
            }
            if(column.every((val) => val === column[0] && val !== "")){
                setWinner(column[0]);
            }
        }

        const diagonal1 = [];
        for(let i = 0; i < board.length; i += size + 1){
            diagonal1.push(board[i]);
        }
        if(diagonal1.every((val) => val === diagonal1[0] && val !== "")){
            setWinner(diagonal1[0]);
        }

        const diagonal2 = [];
        for(let i = size - 1; i < board.length - 1; i += size -1){
            diagonal2.push(board[i]);
        }
        if(diagonal2.every((val) => val === diagonal2[0] && val !== "")){
            setWinner(diagonal2[0]);
        }
    }



    useEffect(() => {
        checkForWinner();
    }, [board])



    useEffect(() => {
        if(winner !== null && winner !== undefined){
            console.log(winner);
            if(winner === "X"){
                setAlertMessage("The Winner is Player 1");
            }else if(winner === "O"){
                setAlertMessage("The Winner is Player 2");
            }
            handleAlert();
        }
    }, [winner])



    function handleAlert(){
        setShowAlert(true);
    }



    function handleCloseAlert(){
        setShowAlert(false);
        navigate('/')
    }



    async function handleSave(e){
        e.preventDefault();

        const gameName = document.getElementById("gameName");
        const requestBodyBoard = []

        for(let i in board){
            board[i] === "" 
            ?
            requestBodyBoard.push("0")
            :
            board[i] === "X" ? requestBodyBoard.push("1") : requestBodyBoard.push("2");

        }

        const requestBody = {
            "board": requestBodyBoard.join(""),
            "name": gameName.value
        };

        console.log(requestBody);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(requestBody)
        };

        const response = await fetch(url, requestOptions);
        const json = await response.json();
        if(json.statusCode === 400){
            setSaveMessage("The board cannot be empty!")
        }else{
            setSaveMessage("The game has been saved")
        }
        setIsSaved(true);
    }



    if(!isLoaded){
        return(<div>Loading...</div>)
    }else{
        return(
            <div className="board-container">
                <div className="board" id="game-board" style={{display: "grid", gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)`}}>
                    {board.map((val, index) => {
                        return <div className="cells" key={index} onClick={() => {handlePlayerMove(index)}} id={index}>{val}</div>
                    })}
                </div>

                <form onSubmit={handleSave}>
                <input type="text" placeholder="Current Game" id="gameName" /><br />
                <p style={isSaved ? {display: "block"} : {display: "none"}}>{saveMessage}</p>
                <CustomButton text="Save" />
                </form>

                {showAlert && <CustomAlert message={alertMessage} alertTitle="Game Over" buttonText="Home Page" onClose={handleCloseAlert} />}
            </div>
        )
    }

    
}