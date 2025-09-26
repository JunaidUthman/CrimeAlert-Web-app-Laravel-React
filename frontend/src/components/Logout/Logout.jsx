import { logout } from '../../services/login.js';
import { useNavigate } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';

export default function Logout() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const hasLoggedOut = useRef(false);

    useEffect(() => {
        const doLogout = async () => {
            if (hasLoggedOut.current) return;
            hasLoggedOut.current = true;
            await logout();
            setLoading(false);
            navigate('/home');
            window.location.reload();
        };

        doLogout();
    }, []);

    return (
        <main>
            {loading && 
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-70">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-200 border-t-red-600 mb-4"></div>
                    <div className="text-gray-600 text-lg font-medium">Logging Out....</div>
                </div>
            }
        </main>
    );
}