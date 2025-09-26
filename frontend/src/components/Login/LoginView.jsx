function LoginView({handleChange , handleSubmit , formData , errors , emailFound , loading}) {
    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            {loading && 
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-70">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-200 border-t-red-600 mb-4"></div>
                <div className="text-gray-600 text-lg font-medium">Logging In....</div>
            </div>
            }
            <div className="max-w-md w-full space-y-8">
                
                <div className="bg-white shadow-md rounded-lg p-8">

                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Login to your account </h2>
                    </div>

                        {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-3 border-t-2 border-b-2 border-l-0 border-r-0 border-gray-300 focus:border-red-600 focus:outline-none transition-colors duration-200 bg-transparent mb-4"
                            placeholder="Enter your email"
                        />
                            {errors.email && <div className="text-red-500">{errors.email}</div>}
                            
                    </div>
                <div/>

                {/* Password */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                    </label>
                    <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-3 border-t-2 border-b-2 border-l-0 border-r-0 border-gray-300 focus:border-red-600 focus:outline-none transition-colors duration-200 bg-transparent mb-6"
                            placeholder="Create a password"
                    />
                            {errors.password && <div className="text-red-500">{errors.password}</div>}
                            {!emailFound && <div className="text-red-500 mb-4">the informations you entered are not correct</div>}
                </div>

                {/* Sign Up Button */}
                <div>
                    <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full bg-red-600 text-white py-3 px-4 rounded-md font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                            Create Account
                    </button>
                </div>

                    {/* Log In Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            don't have an account?{' '}
                            <a href="#" className="text-red-600 hover:text-red-700 font-medium transition-colors duration-200">
                                register here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default LoginView;