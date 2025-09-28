function LoginView({ handleChange, handleSubmit, formData, errors, emailFound, loading }) {
    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
            {loading && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-200 border-t-red-600 mb-6"></div>
                    <div className="text-gray-700 text-xl font-medium">Signing you in...</div>
                    <div className="text-gray-500 text-sm mt-2">Please wait while we verify your credentials</div>
                </div>
            )}
            
            <div className="max-w-md w-full space-y-8">
                {/* Header Section */}
                <div className="text-center space-y-4">
                    <p className="text-xl text-gray-700 max-w-sm mx-auto leading-relaxed font-medium">
                        Sign in to access your Safety-Net dashboard
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-white shadow-xl rounded-2xl border border-gray-200 overflow-hidden">
                    <div className="px-8 py-10 sm:px-10 sm:py-12">
                        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                            {/* General Error Message */}
                            {!emailFound && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        <div>
                                            <h4 className="text-sm font-medium text-red-900">Login Failed</h4>
                                            <p className="text-sm text-red-700 mt-1">
                                                The email or password you entered is incorrect. Please try again.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Email Field */}
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

                            {/* Password Field */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                                        Password *
                                    </label>

                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white"
                                    placeholder="Enter your password"
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


                            {/* Sign In Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full bg-red-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    Sign In to Safety-Net
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 px-8 py-6 sm:px-10 border-t border-gray-200">
                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <a href="#" className="text-red-600 hover:text-red-700 font-semibold transition-colors duration-200 hover:underline">
                                    Create one here
                                </a>
                            </p>
                        </div>
                    </div>
                </div>



            </div>
        </main>
    );
}

export default LoginView;