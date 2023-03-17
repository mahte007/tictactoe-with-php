import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Load(props){
    const [loadedGames, setLoadedGames] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");


    const url = "http://localhost:5000/boards"
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const headers = {
              "Content-Type": "application/json",
            }
            
            const response = await fetch(
              url,
              { headers }
            );
            const data = await response.json();
            setLoadedGames(data);
        }
        fetchData();
        setIsLoaded(true);
    }, [])


    async function handleDelete(id){
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'},
        };

        const response = await fetch(url + "/" + id, requestOptions);
        const status = await response.status;
        console.log(status);
        
        setLoadedGames(prevGames => prevGames.filter(game => game.id !== id))

    }



    function handleLoad(game){
        props.setSavedBoard(game.board);
        props.setIsNewBoard(false);
        navigate("/game");
    }



    function handleSearch(e){
        setSearchQuery(e.target.value);
    }



    const filteredGames = loadedGames.filter(game => game.name.toLowerCase().includes(searchQuery.toLocaleLowerCase()));

    if(!isLoaded){
        return(
            <div>Loading...</div>
        )
    }else{
        return(
            <div>
                <h1>Saved Board Games</h1>
                <div>
                <input type="text" id="search" value={searchQuery} onChange={handleSearch} placeholder="Search"></input>
                    {filteredGames.map((game, index) => {
                        return(
                            <div key={index} className="game">
                                <h3>{game.name}</h3>
                                <h4>Board Size: {Math.sqrt(game.board.length)}X{Math.sqrt(game.board.length)}</h4>
                                <button onClick={() => handleLoad(game)}>Load</button> 
                                <button onClick={() => handleDelete(game.id)}>Delete</button> 
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

}