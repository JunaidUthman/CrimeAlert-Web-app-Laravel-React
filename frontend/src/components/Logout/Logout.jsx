import {logout} from '../../services/login.js';
import { useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';

export default function Logout() {

    const navigate = useNavigate();

    const hasLoggedOut = useRef(false);

    useEffect(() => {
    const doLogout = async () => {
        if (hasLoggedOut.current) return;

        hasLoggedOut.current = true;
        await logout();
        navigate('/home');
        window.location.reload();
    };

    doLogout();
    }, []);

}