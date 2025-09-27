import MapComponent from "../MapComponent/MapComponent";
import AlertForm from "../AlertForm/AlertForm";
import { useState } from "react";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { Shield, Camera, Lock, Phone, Search, AlertTriangle, Eye, MapPin, Bell, Car, Zap, Users, Target, Smartphone, Activity } from 'lucide-react';

// Floating Icons Component
const FloatingIconsBackground = () => {
    // Crime/Safety related Lucide React icons
    const iconComponents = [
        <Shield className="w-6 h-6" />,
        <Camera className="w-6 h-6" />,
        <Lock className="w-6 h-6" />,
        <Phone className="w-6 h-6" />,
        <Search className="w-6 h-6" />,
        <AlertTriangle className="w-6 h-6" />,
        <Eye className="w-6 h-6" />,
        <MapPin className="w-6 h-6" />,
        <Bell className="w-6 h-6" />,
        <Car className="w-6 h-6" />,
        <Zap className="w-6 h-6" />,
        <Users className="w-6 h-6" />,
        <Target className="w-6 h-6" />,
        <Smartphone className="w-6 h-6" />,
        <Activity className="w-6 h-6" />
    ];
    
    // Generate random positions and delays for icons
    const floatingIcons = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        iconComponent: iconComponents[i % iconComponents.length],
        initialX: Math.random() * 100,
        initialY: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 4,
        scale: 0.4 + Math.random() * 0.6
    }));

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Floating icons */}
            {floatingIcons.map((item) => (
                <motion.div
                    key={item.id}
                    className="absolute opacity-10 select-none text-red-600"
                    style={{
                        left: `${item.initialX}%`,
                        top: `${item.initialY}%`,
                        transform: `scale(${item.scale})`
                    }}
                    animate={{
                        y: [-40, 40, -40],
                        x: [-30, 30, -30],
                        rotate: [0, 15, -15, 0],
                        opacity: [0.08, 0.2, 0.08]
                    }}
                    transition={{
                        duration: item.duration,
                        repeat: Infinity,
                        delay: item.delay,
                        ease: "easeInOut"
                    }}
                >
                    {item.iconComponent}
                </motion.div>
            ))}
        </div>
    );
};

// Hero Section Component
const HeroSection = () => {
    const navigate = useNavigate();
    return (
        <div className="relative h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-red-200 to-red-300 overflow-hidden">
            {/* Floating Icons Background */}
            <FloatingIconsBackground />
            
            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-red-400/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/20 rounded-full blur-3xl"></div>
            
            {/* Hero Content */}
            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <div className="mb-6">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-800 rounded-full text-sm font-medium mb-8 border border-red-200">
                            <Shield className="w-4 h-4" />
                            Advanced Security Platform
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
                        Safety-Net
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-light mb-8 text-red-900">
                        Crime Alert System
                    </h2>
                    <p className="text-lg md:text-xl mb-12 text-red-800 leading-relaxed max-w-3xl mx-auto font-medium">
                        Empowering communities with real-time crime intelligence and proactive safety measures. 
                        Advanced monitoring technology for a safer tomorrow.
                    </p>
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <button  onClick={() => navigate('/signup')} className="inline-flex items-center gap-2 bg-white text-red-400 border-2 border-red-600 px-8 py-4 rounded-xl text-lg font-medium hover:bg-red-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        🚀 Get Started
                    </button>
                    <button onClick={() => navigate('/about')} className="inline-flex items-center gap-2 border-2 border-red-600 text-red-700 px-8 py-4 rounded-xl text-lg font-medium hover:border-red-700 hover:bg-red-50 transition-all duration-300">
                        <Search className="w-5 h-5" />
                        Learn More
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

function HomeView({isAlertClicked , handleAlertClick , handleGoBackClick , handleScan , loading}){
    const formType = "create";

    const [goback , setGoBack] = useState(true);
    const isLoggedIn = !!localStorage.getItem('access_token');
    
    if(goback){
        console.log("u can change the view now")
        handleGoBackClick();
        setGoBack(false);
    }
    const [Coords , selectCoords] = useState(null);
    
    return (
        <div className="min-h-screen mt-12">
            {/* Hero Section - Full Screen */}
             {!isLoggedIn && <HeroSection />}
            
            
            {/* Main Content Section */}
            <main className="min-h-screen bg-gray-50">
                {/* Header Section */}
                <div className="bg-white shadow-lg border-b-4 border-red-600">
                    <div className="max-w-7xl mx-auto px-6 py-8">
                        <h1 className="text-4xl font-bold text-gray-900 text-center leading-tight">
                            <span className="text-red-600">Safety-Net</span> Crime Alert System
                        </h1>
                        <p className="text-lg text-gray-600 text-center mt-2">
                            Stay informed about criminal activity in your area
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto p-6">
                    <div className="flex gap-6 min-h-[600px]">
                        {/* Map Section */}
                        <div className="w-[60%] bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                            <div className="bg-red-600 text-white px-6 py-3 border-b">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5" />
                                    <h2 className="text-xl font-semibold">Crime Map</h2>
                                </div>
                                <p className="text-red-100 text-sm">Real-time crime data visualization</p>
                            </div>
                            <div className="h-full min-h-[500px] bg-gray-100">
                                <MapComponent onSelect={selectCoords}  />
                            </div>
                        </div>

                        {/* Control Panel */}
                        {!isAlertClicked && <div className="w-[40%] bg-white rounded-lg shadow-xl border border-gray-200">
                            <div className="bg-gray-800 text-white px-6 py-3 rounded-t-lg">
                                <div className="flex items-center gap-2">
                                    <Activity className="w-5 h-5" />
                                    <h2 className="text-xl font-semibold">Control Panel</h2>
                                </div>
                            </div>
                            
                            <div className="p-6 space-y-6">
                                {loading && (
                                    <div className="flex justify-center items-center flex-col">
                                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-200 border-t-red-600 mb-4"></div>
                                        <div className="text-gray-600 text-lg font-medium">Scanning...</div>
                                    </div>
                                    )}
                                {/* Crime Detection Section */}
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <div className="flex items-center mb-3">
                                        <Search className="w-4 h-4 text-red-600 mr-2" />
                                        <h3 className="font-semibold text-gray-900">Crime Detection</h3>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                                        Check for reported criminal activity in your immediate vicinity
                                    </p>
                                    <button onClick={handleScan} className="w-full inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-semibold text-sm transition-colors duration-200 shadow-md hover:shadow-lg">
                                        <Eye className="w-4 h-4" />
                                        Scan Nearby Crimes
                                    </button>
                                </div>

                                {/* Alert System Section */}
                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                    <div className="flex items-center mb-3">
                                        <Bell className="w-4 h-4 text-amber-600 mr-2" />
                                        <h3 className="font-semibold text-gray-900">Alert System</h3>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                                        Report incidents and create safety alerts for your community
                                    </p>
                                    <button onClick={handleAlertClick} className="w-full inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-3 rounded-lg font-semibold text-sm transition-colors duration-200 shadow-md hover:shadow-lg">
                                        <AlertTriangle className="w-4 h-4" />
                                        Create Alert
                                    </button>
                                </div>
                            </div>
                        </div>}
                        {isAlertClicked && <div className="w-[40%] shadow-xl rounded-xl"><AlertForm Coords={Coords} setGoBack={setGoBack} formType={formType}/></div>}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default HomeView;