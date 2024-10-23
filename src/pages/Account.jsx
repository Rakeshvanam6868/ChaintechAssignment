import  { useState } from "react";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
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
    setNewPassword(newPass);
    setPasswordStrength(evaluatePasswordStrength(newPass));
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (currentPassword !== user.password) {
      setMessage("Current password is incorrect");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setMessage("New passwords do not match");
      return;
    }
    if (passwordStrength === "Weak") {
      setMessage("New password is too weak");
      return;
    }

    user.password = newPassword;
    localStorage.setItem("user", JSON.stringify(user));
    setMessage("Password updated successfully");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      localStorage.removeItem("user");
      navigate("/register");
    }
  };

  return (
    <div className='flex flex-col gap-1 drop-shadow-2xl border-solid border-2 rounded-md bg-slate-300 border-sky-300 w-1/2 h-[600px]  p-4'>
      <h2 className="text-2xl font-medium">Account Settings</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>

      <form onSubmit={handleUpdatePassword}>
        <div className="form-group">
          <label>Current Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control bg-gray-200"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input
            type={showNewPassword ? "text" : "password"}
            className="form-control bg-gray-200"
            value={newPassword}
            onChange={handlePasswordChange}
            required
          />
          <small>Password Strength: {passwordStrength}</small>
          <br />
          <button type="button" onClick={() => setShowNewPassword(!showNewPassword)}>
            {showNewPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div className="form-group">
          <label>Confirm New Password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            className="form-control bg-gray-200"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>
        {message && <div className={`alert ${message.includes("success") ? "alert-success" : "alert-danger"}`}>{message}</div>}
        <button type="submit" className="btn btn-primary mt-3">Update Password</button>
      </form>
      <button className="btn btn-danger mt-3" onClick={handleDeleteAccount}>Delete Account</button>
      <button className="btn btn-secondary mt-3" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Account;
