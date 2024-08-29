import Lottie from "lottie-react";
import { TiArrowBackOutline } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import RegiAni from "../assets/RegAni.json";
import { useState } from "react";
import Swal from "sweetalert2";
import { useSignUpMutation } from "../redux/features/auth/authApi";

const Register = () => {
  const navigate = useNavigate();
  const [signUp] = useSignUpMutation();
  const [error, setError] = useState("");
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    phone: "",
    address: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormdata({
      ...formdata,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const { name, email, password, password2, phone, address, terms } = formdata;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !name || !password || !password2 || !address) {
      setError("All fields are required...");
      return;
    }

    if (password !== password2) {
      setError("Passwords do not match!!!");
      return;
    }

    if (!terms) {
      setError("You must accept the terms and conditions");
      return;
    }

    try {
      const res = await signUp(formdata).unwrap();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully created your account",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
    } catch (error) {
      console.log({ error });
      setError("Failed to create account. Please try again.");
    }
  };

  return (
    <div className="py-10 px-10">
      <div className="flex gap-3 my-5 justify-center md:justify-normal items-center">
        <a href="/" className="text-2xl font-bold">
          <TiArrowBackOutline />
        </a>
        <a href="/" className="text-lg font-bold">
          Back to home
        </a>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-1/2 md:mt-20">
          <Lottie
            animationData={RegiAni}
            loop={true}
            className="object-center"
            style={{ height: "400px" }}
          />
        </div>
        <div className="w-full md:w-1/2 rounded-lg">
          <h1 className="text-center text-3xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-[#0c01a1] to-[#73e9fe] bg-clip-text py-3">
            Register
          </h1>
          <div className="px-8 py-3">
            <form className="flex flex-col mt-5" onSubmit={handleSubmit}>
              <label className="mb-1 ml-1 font-medium">Name :</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="px-4 py-2 mb-2 border-2 outline-none rounded-lg bg-slate-100 dark:bg-slate-900"
                name="name"
                value={name}
                onChange={handleChange}
              />

              <label className="mb-1 ml-1 font-medium">Email:</label>
              <input
                type="email"
                placeholder="Enter your Email"
                className="px-4 py-2 mb-2 border-2 outline-none rounded-lg bg-slate-100 dark:bg-slate-900"
                name="email"
                value={email}
                onChange={handleChange}
              />

              <label className="mb-1 ml-1 font-medium">Password:</label>
              <input
                type="password"
                placeholder="Enter your Password"
                className="px-4 py-2 mb-2 border-2 outline-none rounded-lg bg-slate-100 dark:bg-slate-900"
                name="password"
                value={password}
                onChange={handleChange}
              />

              <label className="mb-1 ml-1 font-medium">Confirm Password:</label>
              <input
                type="password"
                placeholder="Enter your Confirm Password"
                className="px-4 py-2 mb-2 border-2 outline-none rounded-lg bg-slate-100 dark:bg-slate-900"
                name="password2"
                value={password2}
                onChange={handleChange}
              />

              <label className="mb-1 ml-1 font-medium">Phone Number (Optional):</label>
              <input
                type="tel"
                className="mb-4 px-4 py-2 border-2 outline-none rounded-lg bg-slate-100 dark:bg-slate-900"
                name="phone"
                value={phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />

              <label className="mb-1 ml-1 font-medium">Address:</label>
              <input
                type="text"
                placeholder="Address"
                className="px-4 py-2 mb-2 border-2 outline-none rounded-lg bg-slate-100 dark:bg-slate-900"
                name="address"
                value={address}
                onChange={handleChange}
              />

              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  name="terms"
                  checked={terms}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  I agree to the{" "}
                  <a
                    href="/terms&condition"
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    Terms & Conditions
                  </a>
                </label>
              </div>

              {error && <p className="mt-2 text-red-500 text-center">{error}</p>}

              <button
                type="submit"
                className="mt-5 w-full text-white py-3 rounded-lg bg-gradient-to-r from-[#9d11bd] to-[#73e9fe] hover:from-[#73e9fe] hover:to-[#9d11bd]"
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Sign Up
              </button>
            </form>

            <h3 className="mt-4">
              Already have an account? Please{" "}
              <Link to="/login" className="underline">
                Sign In Instead
              </Link>
            </h3>
          </div>
        </div>
      </div>

      <footer className="mt-6 text-center">
        <Link to="/privacypolicy" className="text-sm text-gray-500 hover:underline">
          Privacy Policy
        </Link>{" "}
        |{" "}
        <Link to="/terms&condition" className="text-sm text-gray-500 hover:underline">
          Terms of Service
        </Link>
      </footer>
    </div>
  );
};

export default Register;
