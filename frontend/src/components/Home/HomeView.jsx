import MapComponent from "../MapComponent/MapComponent";
import AlertForm from "../AlertForm/AlertForm";
import { useState } from "react";

function HomeView({isAlertClicked , handleAlertClick , handleGoBackClick}){
    const formType = "create";
    const [goback , setGoBack] = useState(true);
    if(goback){
        console.log("u can change the view now")
        handleGoBackClick();
        setGoBack(false);
    }
    const [Coords , selectCoords] = useState(null);
    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-white shadow-lg border-b-4 border-red-600">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <h1 className="text-4xl font-bold text-gray-900 text-center leading-tight">
                        <span className="text-red-600">Bee Safe</span> Crime Alert System
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
                            <h2 className="text-xl font-semibold">Crime Map</h2>
                            <p className="text-red-100 text-sm">Real-time crime data visualization</p>
                        </div>
                        <div className="h-full min-h-[500px] bg-gray-100">
                            <MapComponent onSelect={selectCoords} />
                        </div>
                    </div>

                    {/* Control Panel */}
                    {!isAlertClicked && <div className="w-[40%] bg-white rounded-lg shadow-xl border border-gray-200">
                        <div className="bg-gray-800 text-white px-6 py-3 rounded-t-lg">
                            <h2 className="text-xl font-semibold">Control Panel</h2>
                        </div>
                        
                        <div className="p-6 space-y-6">
                            {/* Crime Detection Section */}
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <div className="flex items-center mb-3">
                                    <div className="w-3 h-3 bg-red-600 rounded-full mr-3"></div>
                                    <h3 className="font-semibold text-gray-900">Crime Detection</h3>
                                </div>
                                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                                    Check for reported criminal activity in your immediate vicinity
                                </p>
                                <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-semibold text-sm transition-colors duration-200 shadow-md hover:shadow-lg">
                                    🔍 Scan Nearby Crimes
                                </button>
                            </div>

                            {/* Alert System Section */}
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                <div className="flex items-center mb-3">
                                    <div className="w-3 h-3 bg-amber-600 rounded-full mr-3"></div>
                                    <h3 className="font-semibold text-gray-900">Alert System</h3>
                                </div>
                                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                                    Report incidents and create safety alerts for your community
                                </p>
                                <button onClick={handleAlertClick} className="w-full bg-amber-600 hover:bg-amber-700 text-white px-4 py-3 rounded-lg font-semibold text-sm transition-colors duration-200 shadow-md hover:shadow-lg">
                                    ⚠️ Create Alert
                                </button>
                            </div>
                        </div>
                    </div>}
                    {isAlertClicked && <div className="w-[40%] shadow-xl rounded-xl"><AlertForm Coords={Coords} setGoBack={setGoBack} formType={formType}/></div>}
                </div>
            </div>
        </main>
    )
}

export default HomeView;