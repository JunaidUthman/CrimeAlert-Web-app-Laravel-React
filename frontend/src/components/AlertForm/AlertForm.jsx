import AlertFormView from "./AlertFormView";
import { useState , useEffect } from "react";
import {UpdateAlert} from "../../services/AlertService";
import {createAlert} from "../../services/AlertService";

export default function AlertForm({Coords , setGoBack , formType , UpdateData , closePopup}) {

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        lat: '',
        lng: '',
        description: ''
    });


    useEffect(() => {
        if (Coords) {
            setFormData(prev => ({
                ...prev,
                lat: Coords.lat.toFixed(6),
                lng: Coords.lng.toFixed(6)
            }));
        }
        
    }, [Coords]);

    useEffect(() => {
        if(UpdateData && formType=="update") {
            setFormData({
                id : UpdateData.id || '',   
                title: UpdateData.title || '',
                lat: UpdateData.lat || '',
                lng: UpdateData.lng || '',
                description: UpdateData.description || ''
            });
            
        }else{
             console.log("UpdateData empty");
        }
        
    }, [UpdateData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { title, lat, lng, description } = formData;
        const newErrors = {};

        if (!title.trim()) newErrors.title = "Title is required";
        if (!lat || isNaN(lat)) newErrors.lat = "Latitude is required and must be a number";
        if (!lng || isNaN(lng)) newErrors.lng = "Longitude is required and must be a number";
        if (!description.trim()) newErrors.description = "Description is required";

        // If there are errors, set them and stop submission
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Clear previous errors
        setErrors({});

        try {
            if(formType == "create"){
                setLoading(true);
                const response = await createAlert(formData);
                setLoading(false);

                if (response.status === 201) {
                    
                    alert("Crime report created successfully!");
                    
                    window.location.reload();
                    console.log("AI response", response);
                    setFormData({ title: "", lat: "", lng: "", description: "" });
                } else {
                    alert("Failed to create crime report. Please try again.");
                    
                }
            }
            else if(formType=="update"){
                setLoading(true);
                const response = await UpdateAlert(formData);
                setLoading(false);

                if (response.status === 201) {
                    alert("Crime report updated successfully!");
                    window.location.reload();
                    console.log("AI response", response);
                    setFormData({ title: "", lat: "", lng: "", description: "" });
                } else {
                    alert("Failed to update crime report. Please try again.");
                    
                }
            }
            

            
        } catch (error) {
            console.error("Error creating crime report:", error);
            alert("An error occurred. Please try again.");
        }
    };


    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setFormData(prev => ({
                        ...prev,
                        lat: position.coords.latitude.toFixed(6),
                        lng: position.coords.longitude.toFixed(6)
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
        <main>
            {<AlertFormView
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            getCurrentLocation={getCurrentLocation}
            errors={errors}
            formType={formType}
            setGoBack={setGoBack}
            closePopup = {closePopup}
            loading={loading}
            />}
        </main>
        

    )
}