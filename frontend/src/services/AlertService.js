import apiClient from '../utils/apiClient';

export const createAlert = async (alertData) => {
    return apiClient.post('/createAlert', {
        title: alertData.title,
        description: alertData.description,
        lat: alertData.lat,
        lng: alertData.lng,
    });
} 