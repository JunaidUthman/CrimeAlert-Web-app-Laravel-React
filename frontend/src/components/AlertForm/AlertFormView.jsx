import { useState } from "react";

export default function CrimeReportForm({formData , handleInputChange , handleSubmit ,getCurrentLocation }) {

    return (
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
                {/* Coordinates Section */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location Coordinates
                    </label>
                        <div className="flex-1">
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Title of the Crime"
                                step="any"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                            <span className="text-xs text-gray-500 mt-1 block">Lat</span>
                        </div>
                    <div className="flex gap-2">

                        <div className="flex-1">
                            <input
                                type="number"
                                name="latitude"
                                value={formData.latitude}
                                onChange={handleInputChange}
                                placeholder="Latitude"
                                step="any"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                            <span className="text-xs text-gray-500 mt-1 block">Lat</span>
                        </div>
                        <div className="flex-1">
                            <input
                                type="number"
                                name="longitude"
                                value={formData.longitude}
                                onChange={handleInputChange}
                                placeholder="Longitude"
                                step="any"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                            <span className="text-xs text-gray-500 mt-1 block">Lng</span>
                        </div>
                    </div>
                </div>

                {/* Description Section */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Crime Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Describe the criminal activity observed..."
                        rows="4"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                        {formData.description.length}/500 characters
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-semibold text-sm transition-colors duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!formData.latitude || !formData.longitude || !formData.description}
                >
                    🚨 Submit Crime Report
                </button>
            </div>

            {/* Disclaimer */}
            <div className="mt-4 p-3 bg-gray-100 border border-gray-300 rounded-md">
                <p className="text-xs text-gray-600 leading-relaxed">
                    <strong>Important:</strong> This form is for non-emergency reports only. 
                    For immediate emergencies, contact local authorities directly.
                </p>
            </div>
        </div>
    );
}