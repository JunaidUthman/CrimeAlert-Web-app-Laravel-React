import HomeView from "./HomeView";
import { useState } from "react";
import {getNearByAlerts} from '../../services/AlertService';

function Home(){
    const [isAlertClicked , setIsAlertClicked] = useState(false);
    const [loading, setLoading] = useState(false);
    

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
    const handleScan = () => {
        setLoading(true);
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }

        // Get user's current position
        navigator.geolocation.getCurrentPosition(
            async (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            try {
                const response = await getNearByAlerts(lat, lng);
                setLoading(false);
                alert(response.data.message);
                console.log(response); 
            } catch (err) {
                console.log("We have an error:", err);
            }
            },
            (error) => {
            console.log("Geolocation error:", error);
            alert("Unable to retrieve your location");
            }
        );
    };

    const handleGoBackClick = () => {
        setIsAlertClicked(false);
    }
    return (
        <HomeView isAlertClicked={isAlertClicked} handleAlertClick={handleAlertClick} handleGoBackClick={handleGoBackClick} handleScan={handleScan} loading={loading} />
    )
}

export default Home;