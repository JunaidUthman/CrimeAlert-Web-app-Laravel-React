import { useState } from "react";

export default function CrimeReportForm({ formData, handleInputChange, handleSubmit, getCurrentLocation, errors , setGoBack , closePopup}) {
    const GoBack = () => {
        setGoBack(true);
        console.log("Go back function is called");
    };
    return (
        <main className="h-full">
            {location.pathname === "/alerts" && 
                    <div className="flex justify-end mb-3 ">
                        <button
                        type="button"
                        onClick={closePopup}
                        className=" bg-red-600 hover:bg-red-700 text-white px-3.5 py-2 rounded-full font-semibold text-sm transition-colors duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed "
                    >
                            X
                    </button>
                    </div>    
            }
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 h-full">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-600 rounded-full mr-3"></div>
                        <h3 className="font-semibold text-gray-900">Report Crime</h3>
                    </div>
                    <button
                        type="button"
                        onClick={getCurrentLocation}
                        className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded transition-colors duration-200"
                    >
                        📍 Use My Location
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Title of the Crime"
                            className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                                errors?.title ? "border-red-500" : "border-gray-300"
                            }`}
                        />
                        {errors?.title && <p className="text-xs text-red-600 mt-1">{errors.title}</p>}
                    </div>

                    {/* Latitude & Longitude */}
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <input
                                type="number"
                                name="lat"
                                value={formData.lat}
                                onChange={handleInputChange}
                                placeholder="Lat"
                                step="any"
                                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                                    errors?.lat ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            {errors?.lat && <p className="text-xs text-red-600 mt-1">{errors.lat}</p>}
                        </div>
                        <div className="flex-1">
                            <input
                                type="number"
                                name="lng"
                                value={formData.lng}
                                onChange={handleInputChange}
                                placeholder="Lng"
                                step="any"
                                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                                    errors?.lng ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            {errors?.lng && <p className="text-xs text-red-600 mt-1">{errors.lng}</p>}
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Describe the criminal activity observed..."
                            rows="4"
                            className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none ${
                                errors?.description ? "border-red-500" : "border-gray-300"
                            }`}
                        />
                        {errors?.description && <p className="text-xs text-red-600 mt-1">{errors.description}</p>}
                        <div className="text-xs text-gray-500 mt-1">{formData.description.length}/500 characters</div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-semibold text-sm transition-colors duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!formData.lat || !formData.lng || !formData.description}
                    >
                        🚨 Submit Crime Report
                    </button>
                </div>

                {/* Disclaimer */}
                <div className="mt-4 p-3 bg-gray-100 border border-gray-300 rounded-md">
                    <p className="text-xs text-gray-600 leading-relaxed">
                        <strong>Important:</strong> All submited reports gonna be treated by AI to make sure they donn't contain any personal information or sensitive data. Please ensure your report is accurate and does not include any personal identifiers.
                    </p>
                </div>
                <div className="flex justify-center">
                    {location.pathname === "/" && <button
                        type="button"
                        onClick={GoBack}
                        className="mt-10 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-semibold text-sm transition-colors duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Go Back
                    </button>}
                    
                </div>
                
            </div>
            
        </main>
    );
}
