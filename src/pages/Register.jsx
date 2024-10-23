import  { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const navigate = useNavigate();

  const evaluatePasswordStrength = (password) => {
    if (password.length < 6) return "Weak";
    if (/[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password) && /\W/.test(password)) {
      return "Strong";
    }
    if (/[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password)) {
      return "Medium";
    }
    return "Weak";
  };

  const handlePasswordChange = (e) => {
    const newPass = e.target.value;
    setPassword(newPass);
    setPasswordStrength(evaluatePasswordStrength(newPass));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (passwordStrength === "Weak") {
      setError("Password is too weak");
      return;
    }

    const user = { username, email, password };
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/login");
  };

  return (
    <div className="flex flex-col gap-2 border-solid border-2 bg-slate-300 drop-shadow-2xl rounded-md border-sky-500 w-1/2 h-auto p-5">
      <h2 className="text-2xl font-medium">Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control bg-gray-200"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
            className="form-control bg-gray-200"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <small>Password Strength: {passwordStrength}</small>
        </div>
        <div className="form-group ">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control bg-gray-200"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary mt-3">Register</button>
      </form>
    </div>
  );
};

export default Register;
