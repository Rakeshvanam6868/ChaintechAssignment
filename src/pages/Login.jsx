import  { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      navigate("/account");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex flex-col gap-2 border-solid border-2 rounded-md drop-shadow-2xl bg-slate-300 border-sky-500 w-1/2 h-80  p-5">
      <h2 className="text-2xl font-medium">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-2">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control bg-gray-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control bg-gray-200 "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary w-20">Login</button>
      </form>
    </div>
  );
};

export default Login;
