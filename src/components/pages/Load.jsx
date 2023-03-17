import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Load(){
    const [loadedGames, setLoadedGames] = useState([]);

    const url = "http://localhost:5000/boards"

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
    }, [])

    return(
        <div>
            <h1>Saved Board Games</h1>
            <Link to="/">Back to Main Menu</Link>
            <div>
                {loadedGames.map((games, index) => {
                    return(
                        <div key={index}>{games.name}</div>
                    )
                })}
            </div>
        </div>
    )
}