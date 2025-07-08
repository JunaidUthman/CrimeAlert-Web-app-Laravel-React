import AlertFormView from "./AlertFormView";
import { useState } from "react";
import {createAlert} from "../../services/AlertService";

export default function AlertForm() {
    const [formData, setFormData] = useState({
        title: '',
        latitude: '',
        longitude: '',
        description: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e)  => {
        e.preventDefault();
        // Handle form submission here
        //console.log('Crime report submitted:', formData);

        const response = await createAlert(formData);

        console.log('Crime created in the database:', response.data);
        // Reset form after submission
        setFormData({
            title: '',
            latitude: '',
            longitude: '',
            description: ''
        });
    };

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setFormData(prev => ({
                        ...prev,
                        latitude: position.coords.latitude.toFixed(6),
                        longitude: position.coords.longitude.toFixed(6)
                    }));
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };
    return(
        <AlertFormView formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} getCurrentLocation={getCurrentLocation} />
    )
}