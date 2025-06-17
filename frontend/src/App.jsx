import { useState } from "react";
import axios from "axios";

const API_URL = "http://15.206.158.173:5000/auth";

function App() {
  const [isSignup, setIsSignup] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const endpoint = isSignup ? "/register" : "/login";
      const payload = isSignup ? { name, email, password } : { email, password };
      const res = await axios.post(API_URL + endpoint, payload);
      alert(res.data.message || "Success!");
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {isSignup ? "Create Account" : "Sign In"}
        </h2>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {isSignup && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            onClick={handleSubmit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <p
          className="mt-4 text-center text-sm text-blue-600 hover:underline cursor-pointer"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup
            ? "Already have an account? Sign in"
            : "New user? Create account"}
        </p>
      </div>
    </div>
  );
}

export default App;
