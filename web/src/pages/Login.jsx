import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, me, registerCustomer, registerFarmer, registerRider } from "../api/auth";
import { setAuthToken } from "../api/client";

export default function Login() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");

  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  
  const [farmName, setFarmName] = useState("");
  
  // Rider registration fields
  const [phone, setPhone] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");

  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) setAuthToken(token);
  }, []);

  function resetMessages() {
    setStatus("");
    setError("");
  }

  function switchMode(next) {
    resetMessages();
    setMode(next);
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
    setFarmName("");
    setPhone("");
    setVehicleType("");
    setVehiclePlate("");
  }

  function extractError(err, fallback) {
    const data = err?.response?.data;
    if (!data) return fallback;
    if (typeof data === "string") return data;
    if (data.detail) return data.detail;
    const key = Object.keys(data)[0];
    return Array.isArray(data[key]) ? data[key][0] : fallback;
  }

  async function handleLoginSubmit(e) {
    e.preventDefault();
    resetMessages();
    setStatus("Logging in...");

    try {
      const res = await login({ username, password });
      const access = res.data.access;
      localStorage.setItem("accessToken", access);
      setAuthToken(access);
      await me();
      navigate("/dashboard");
    } catch (err) {
      setStatus("");
      setError(extractError(err, "Login failed."));
    }
  }

  async function handleRegisterSubmit(e) {
    e.preventDefault();
    resetMessages();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setStatus("Creating account...");

    try {
      const payload = {
        username,
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      };

      await registerCustomer(payload);

      const loginRes = await login({ username, password });
      const access = loginRes.data.access;
      localStorage.setItem("accessToken", access);
      setAuthToken(access);
      await me();
      navigate("/dashboard");
    } catch (err) {
      setStatus("");
      setError(extractError(err, "Registration failed."));
    }
  }

  async function handleFarmerRegisterSubmit(e) {
    e.preventDefault();
    resetMessages();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setStatus("Creating farmer account...");

    try {
      const payload = {
        username,
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        farm_name: farmName,
      };

      await registerFarmer(payload);

      const loginRes = await login({ username, password });
      const access = loginRes.data.access;
      localStorage.setItem("accessToken", access);
      setAuthToken(access);
      await me();
      navigate("/dashboard");
    } catch (err) {
      setStatus("");
      setError(extractError(err, "Registration failed."));
    }
  }

  async function handleRiderRegisterSubmit(e) {
    e.preventDefault();
    resetMessages();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setStatus("Creating rider account...");

    try {
      const payload = {
        username,
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        phone,
        vehicle_type: vehicleType,
        vehicle_plate: vehiclePlate,
      };

      await registerRider(payload);

      const loginRes = await login({ username, password });
      const access = loginRes.data.access;
      localStorage.setItem("accessToken", access);
      setAuthToken(access);
      await me();
      navigate("/dashboard");
    } catch (err) {
      setStatus("");
      setError(extractError(err, "Registration failed."));
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">
          {mode === "login" ? "Login to EcoLabs" : "Create an Account"}
        </h2>

        {status && <p className="auth-status success">{status}</p>}
        {error && <p className="auth-status error">{error}</p>}

        {mode === "login" && (
          <form className="auth-form" onSubmit={handleLoginSubmit}>
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" required />

            <button className="primary-btn full-width">Login</button>

            <p className="auth-switch">
              No account?{" "}
              <button type="button" onClick={() => switchMode("register-customer")}>
                Create one
              </button>
            </p>
          </form>
        )}

        {mode === "register-customer" && (
          <form className="auth-form" onSubmit={handleRegisterSubmit}>
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
            <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First name" required />
            <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last name" required />
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" required />
            <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm password" required />

            <button className="primary-btn full-width">Register as Customer</button>

            <p className="auth-switch">
              Already have an account?{" "}
              <button type="button" onClick={() => switchMode("login")}>Login</button>
            </p>

            <p className="auth-switch">
              Want to be a farmer?{" "}
              <button type="button" onClick={() => switchMode("register-farmer")}>
                Register as farmer
              </button>
            </p>

            <p className="auth-switch">
              Want to earn as a rider?{" "}
              <button type="button" onClick={() => switchMode("register-rider")}>
                Register as rider
              </button>
            </p>
          </form>
        )}

        {mode === "register-farmer" && (
          <form className="auth-form" onSubmit={handleFarmerRegisterSubmit}>
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
            <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First name" required />
            <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last name" required />
            <input value={farmName} onChange={e => setFarmName(e.target.value)} placeholder="Farm name" required />
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" required />
            <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm password" required />

            <button className="primary-btn full-width">Register as Farmer</button>

            <p className="auth-switch">
              <button type="button" onClick={() => switchMode("login")}>Login</button>
            </p>
          </form>
        )}

        {mode === "register-rider" && (
          <form className="auth-form" onSubmit={handleRiderRegisterSubmit}>
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
            <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First name" required />
            <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last name" required />
            <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone number" required />
            <input value={vehicleType} onChange={e => setVehicleType(e.target.value)} placeholder="Vehicle type (e.g., motorcycle, car, bicycle)" />
            <input value={vehiclePlate} onChange={e => setVehiclePlate(e.target.value)} placeholder="Vehicle plate number" />
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" required />
            <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm password" required />

            <button className="primary-btn full-width">Register as Rider</button>

            <p className="auth-switch">
              <button type="button" onClick={() => switchMode("login")}>Login</button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
