import apiClient from '../utils/apiClient';

export const createAlert = async (alertData) => {
    return apiClient.post('/createAlert', {
        title: alertData.title,
        description: alertData.description,
        lat: alertData.lat,
        lng: alertData.lng,
    });
} 
export const UpdateAlert = async (alertData) => {
    return apiClient.post('/UpdateAlert', {
        id : alertData.id,
        title: alertData.title,
        description: alertData.description,
        lat: alertData.lat,
        lng: alertData.lng,
    });
} 
export const DeleteAlert = async (alertData) => {
    return apiClient.post('/DeleteAlert', {
        id : alertData.id
    });
} 

export const getMyAlerts = async () => {
    return apiClient.get('/getMyAlerts');
}

export const getNearByAlerts = async (lat, lng) => {
    return apiClient.get(`/getNearByAlerts?lat=${lat}&lng=${lng}`);
}