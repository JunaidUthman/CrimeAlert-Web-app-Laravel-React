
function SignUpView({handleChange , handleSubmit , formData , errors}) {


    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Create your account </h2>
                    <p className="text-gray-600">Join CrimeAlert to stay informed about safety in your area</p>
                </div>

                {/* Sign Up Card */}
                <div className="bg-white shadow-md rounded-lg p-8">
                    <div className="space-y-6">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                required
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full px-3 py-3 border-t-2 border-b-2 border-l-0 border-r-0 border-gray-300 focus:border-red-600 focus:outline-none transition-colors duration-200 bg-transparent"
                                placeholder="Enter your full name"
                            />
                            {errors.fullName && <div className="text-red-500">{errors.fullName}</div>}
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
                                className="w-full px-3 py-3 border-t-2 border-b-2 border-l-0 border-r-0 border-gray-300 focus:border-red-600 focus:outline-none transition-colors duration-200 bg-transparent"
                                placeholder="Enter your email"
                            />
                            {errors.email && <div className="text-red-500">{errors.email}</div>}
                        </div>

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
                                className="w-full px-3 py-3 border-t-2 border-b-2 border-l-0 border-r-0 border-gray-300 focus:border-red-600 focus:outline-none transition-colors duration-200 bg-transparent"
                                placeholder="Create a password"
                            />
                            {errors.password && <div className="text-red-500">{errors.password}</div>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-3 py-3 border-t-2 border-b-2 border-l-0 border-r-0 border-gray-300 focus:border-red-600 focus:outline-none transition-colors duration-200 bg-transparent"
                                placeholder="Confirm your password"
                            />
                            {errors.confirmPassword && <div className="text-red-500">{errors.confirmPassword}</div>}
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
                    </div>

                    {/* Sign In Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <a href="#" className="text-red-600 hover:text-red-700 font-medium transition-colors duration-200">
                                Sign in here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SignUpView;