import HomeView from "./HomeView";
import { useState } from "react";

function Home(){
    const [isAlertClicked , setIsAlertClicked] = useState(false);
    console.log('isAlertClicked', isAlertClicked);

    const handleAlertClick = () => {
        console.log('Alert button clicked');
        setIsAlertClicked(true);
    }
    return (
        <HomeView isAlertClicked={isAlertClicked} handleAlertClick={handleAlertClick}/>
    )
}

export default Home;