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
  <>
    <div style={{ padding: 30 }}>
      <h2>{isSignup ? "Create Account" : "Sign In"}</h2>

      {isSignup && (
        <>
          <input
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <br />
        </>
      )}

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <br />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <br />

      <button onClick={handleSubmit}>
        {isSignup ? "Sign Up" : "Sign In"}
      </button>

      <p style={{ cursor: "pointer" }} onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? "Already have an account? Sign in" : "New user? Create account"}
      </p>
    </div>
  </>
);

}

export default App;
