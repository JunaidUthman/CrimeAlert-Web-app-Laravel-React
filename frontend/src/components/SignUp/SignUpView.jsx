function SignUpView({ handleChange, handleSubmit, handleGetLocation, formData, errors, loading }) {
    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
            {loading && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-200 border-t-red-600 mb-6"></div>
                    <div className="text-gray-700 text-xl font-medium">Creating your account...</div>
                    <div className="text-gray-500 text-sm mt-2">Please wait while we set up your profile</div>
                </div>
            )}
            
            <div className="max-w-2xl w-full space-y-8">
                {/* Header Section */}
                <div className="text-center space-y-4">

                    <p className="text-xl text-gray-700 max-w-lg mx-auto leading-relaxed font-medium">
                        Create your account to stay informed about safety incidents and alerts in your area
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white shadow-xl rounded-2xl border border-gray-200 overflow-hidden">
                    <div className="px-8 py-10 sm:px-12 sm:py-12">
                        <form className="space-y-8" onSubmit={handleSubmit}>
                            {/* Personal Information Section */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                                    Personal Information
                                </h3>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Full Name */}
                                    <div className="space-y-2">
                                        <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700">
                                            Full Name *
                                        </label>
                                        <input
                                            id="fullName"
                                            name="fullName"
                                            type="text"
                                            required
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white"
                                            placeholder="Enter your full name"
                                        />
                                        {errors.fullName && (
                                            <div className="text-red-600 text-sm font-medium flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                {errors.fullName}
                                            </div>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                                            Email Address *
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white"
                                            placeholder="Enter your email address"
                                        />
                                        {errors.email && (
                                            <div className="text-red-600 text-sm font-medium flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                {errors.email}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Security Section */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                                    Account Security
                                </h3>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Password */}
                                    <div className="space-y-2">
                                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                                            Password *
                                        </label>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            required
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white"
                                            placeholder="Create a secure password"
                                        />
                                        {errors.password && (
                                            <div className="text-red-600 text-sm font-medium flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                {errors.password}
                                            </div>
                                        )}
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="space-y-2">
                                        <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">
                                            Confirm Password *
                                        </label>
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            required
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white"
                                            placeholder="Confirm your password"
                                        />
                                        {errors.confirmPassword && (
                                            <div className="text-red-600 text-sm font-medium flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                {errors.confirmPassword}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Location Section */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex-grow pr-4">
                                        Location Information
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={handleGetLocation}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        Get My Location
                                    </button>
                                </div>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Latitude */}
                                    <div className="space-y-2">
                                        <label htmlFor="lat" className="block text-sm font-semibold text-gray-700">
                                            Latitude *
                                        </label>
                                        <input
                                            id="lat"
                                            name="lat"
                                            type="text"
                                            required
                                            value={formData.lat}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
                                            placeholder="Latitude coordinates"
                                            readOnly
                                        />
                                        {errors.lat && (
                                            <div className="text-red-600 text-sm font-medium flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                {errors.lat}
                                            </div>
                                        )}
                                    </div>

                                    {/* Longitude */}
                                    <div className="space-y-2">
                                        <label htmlFor="lng" className="block text-sm font-semibold text-gray-700">
                                            Longitude *
                                        </label>
                                        <input
                                            id="lng"
                                            name="lng"
                                            type="text"
                                            required
                                            value={formData.lng}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
                                            placeholder="Longitude coordinates"
                                            readOnly
                                        />
                                        {errors.lng && (
                                            <div className="text-red-600 text-sm font-medium flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                {errors.lng}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <div className="flex items-start">
                                        <svg className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                        <div>
                                            <h4 className="text-sm font-medium text-blue-900">Location Privacy</h4>
                                            <p className="text-sm text-blue-700 mt-1">
                                                Your location is used only to provide relevant safety alerts in your area. We never share your exact coordinates with other users.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <button
                                    type="submit"
                                    className="w-full bg-red-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    Create Your Safety-Net Account
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 px-8 py-6 sm:px-12 border-t border-gray-200">
                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <a href="#" className="text-red-600 hover:text-red-700 font-semibold transition-colors duration-200 hover:underline">
                                    Log in here
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Trust Indicators */}
                <div className="text-center text-xs text-gray-500 space-y-2">
                    <p>By creating an account, you agree to our Terms of Service and Privacy Policy</p>
                    <div className="flex items-center justify-center space-x-4">
                        <div className="flex items-center">
                            <svg className="w-4 h-4 text-green-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Secure & Encrypted</span>
                        </div>
                        <div className="flex items-center">
                            <svg className="w-4 h-4 text-green-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Privacy Protected</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SignUpView;