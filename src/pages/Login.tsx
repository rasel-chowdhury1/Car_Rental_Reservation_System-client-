
import {  useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TiArrowBackOutline } from "react-icons/ti";
import { Link, NavLink, useNavigate} from "react-router-dom";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/auth/authSlice";
import Swal from "sweetalert2";



const Login = () => {
  const navigate = useNavigate()
  const [login, {data,isLoading}] = useLoginMutation();
  console.log({isLoading})
  const dispatch = useDispatch();

  const [logindata, setLogindata] = useState({
    email: "",
    password: "",
  });

  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    setLogindata({
      ...logindata,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = logindata;
    if (!email || !password) {
      setError("All fields are required");
    } else {
      try {
        const res = await login(logindata).unwrap() // when not use unwrap.return {data:{data: {}}} but use this then return only {data: {}}
        
        dispatch(setUser({user: res.data, token: res.token}))
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${res.message}`,
          showConfirmButton: false,
          timer: 1500
        });
        navigate("/")
        
      } catch (error) {
        
      }
    }
  };

  return (
    <div className="py-10 px-10 text-[#0c01a1] dark:text-[#73e9fe]">
      {loading && (
        <div className="flex justify-center items-center">
          <span className="loading loading-ring loading-md"></span>Loging
          Processing....
        </div>
      )}
      <div className="flex gap-3 justify-center md:justify-normal items-center">
        <Link to={"/"} className="text-2xl font-bold">
          <TiArrowBackOutline />
        </Link>
        <Link to={"/"} className="text-lg font-bold">
          Back to home
        </Link>
      </div>
      <div className="min-h-[600px] md:min-h-[600px] flex flex-col md:flex-row justify-between gap-3 md:gap-5">
        <div className="w-full md:w-[60%] flex flex-col items-center justify-center md:p-0">
          <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-[#0c01a1] to-[#73e9fe] bg-clip-text py-3">
            Login
          </h1>
          <hr />
          <form onSubmit={handleSubmit} className="w-full md:w-1/2">
            <div className="flex flex-col mt-5 ">
            <label className="ml-3 font-medium" >Email :</label>
              <input
                type="text"
                placeholder="Enter your email"
                name="email"
                className=" outline-none border-2 w-full  mt-2 px-8 py-4 bg-[#EEF5F3]  rounded-full"
                value={logindata.email}
                onChange={handleChange}
              />
              
              <br />

<div className="relative mt-1">
<label className="ml-3 font-medium " >Password:</label>
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={logindata.password}
                onChange={handleChange}
                className="outline-none border-2 w-full  mt-2 px-8 py-4 bg-[#EEF5F3]  rounded-full"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center mt-8 pr-3"
              >
                {passwordVisible ? (
                  <FaEyeSlash className="h-5 w-5 text-gray-500" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>

              <button
                className="mt-5 w-full  text-white py-3 rounded-full bg-gradient-to-r from-[#9d11bd] to-[#73e9fe] hover:from-[#73e9fe] hover:to-[#9d11bd]"
                style={{
                  // background: "linear-gradient(135deg, #5AA6E1, #D939F5)",
                  color: "white",
                  fontSize: "20px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Sign in
              </button>
            </div>
          </form>
          
        </div>
        <div

          className="w-full md:w-[40%] text-white flex flex-col justify-center items-center text-center gap-y-2 md:gap-y-3 px-10 py-24 rounded md:p-0 bg-gradient-to-r from-[#1711bd] to-[#73e9fe] dark:from-[#1133bd] dark:to-[#73e9fe] dark:bg-gradient-to-r"
        

        >
          <h1 className="text-3xl md:text-5xl font-bold">New Here ?</h1>
          <h3 className="text-lg md:text-xl md:px-16">
            Sir-gragn up and discover a grea amount of opportunities
          </h3>
          <Link to="/register">
            <button className="hover:bg-gradient-to-r from-[#9d11bd] to-[#73e9fe] text-white font-bold  px-10 py-2 rounded-full  border-2">
              Sign up
            </button>
          </Link>
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

export default Login;
