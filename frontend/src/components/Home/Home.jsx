import HomeView from "./HomeView";
import { useState } from "react";

function Home(){
    const [isAlertClicked , setIsAlertClicked] = useState(false);
    

    const onSelectCoords = (coords) => {
        // console.log("Coordinates received in parent:", coords);
        setSelectedCoords(coords);
    };

    const handleAlertClick = () => {
        if(localStorage.getItem('access_token')){
            setIsAlertClicked(true);
        }
        else{
            alert("Please login to access this feature.");
        }
        
    }
    const handleGoBackClick = () => {
        setIsAlertClicked(false);
    }
    return (
        <HomeView isAlertClicked={isAlertClicked} handleAlertClick={handleAlertClick} handleGoBackClick={handleGoBackClick} />
    )
}

export default Home;