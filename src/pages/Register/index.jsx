import { Layout } from "../../Components/Layout";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { updateProfile } from "firebase/auth";
import { useAuth } from "../../context/useAuth";
 const Register = () => {
     const {setUser} = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User registered:", userCredential.user);

            await updateProfile(user, { displayName: name });

            setUser({
                uid: user.uid,
                email: user.email,
                displayName: name,
            });

            console.log("User registered:", user);
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Layout>
            <section className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Create your account
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Or{" "}
                            <Link
                                to={"/sign-in"}
                                className="font-medium text-[#ffba00]"
                            >
                                sign in to your existing account
                            </Link>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <div className="rounded-md shadow-sm space-y-4">
                            <div>
                                <input
                                    type="text"
                                    required
                                    className="appearance-none rounded-lg w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#ffba00] focus:border-[#ffba00] sm:text-sm"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    required
                                    className="appearance-none rounded-lg w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#ffba00] focus:border-[#ffba00] sm:text-sm"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    required
                                    className="appearance-none rounded-lg w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#ffba00] focus:border-[#ffba00] sm:text-sm"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    required
                                    className="appearance-none rounded-lg w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#ffba00] focus:border-[#ffba00] sm:text-sm"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-[#ffba00] to-[#ff6c00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffba00]"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </Layout>
    );
};

export default Register

