import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Load(props){
    const [loadedGames, setLoadedGames] = useState([]);
    const [numberOfGames, setNumberOfGames] = useState(0);
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
            setNumberOfGames(data.length);
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
        setNumberOfGames(prevNumGames => prevNumGames - 1);

    }



    function handleLoad(game){
        props.setSavedBoard(game.board);
        props.setIsNewBoard(false);
        navigate("/game");
    }



    function handleView(){

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
                <Link to="/">Back to Main Menu</Link>
                <h2>{numberOfGames}</h2>
                <div>
                <input type="text" id="search" value={searchQuery} onChange={handleSearch} placeholder="Search"></input>
                    {filteredGames.map((game, index) => {
                        return(
                            <div key={index}>
                                <div>{game.name}</div>
                                <button onClick={() => handleDelete(game.id)}>Delete</button> 
                                <button onClick={() => handleLoad(game)}>Load</button> 
                                <button onClick={handleView}>View</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

}