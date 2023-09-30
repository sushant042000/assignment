import React, { useState } from "react";
import { loginApi } from "../API/api";
import { loginFailed, loginStart, loginSuccess } from "../Store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Hourglass } from "react-loader-spinner";
function Login() {
  const { loading, token } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      return toast("✖ please fill all the fileds");
    }
    try {
      dispatch(loginStart());
      const response = await loginApi(email, password);

      dispatch(loginSuccess(response.data.message.data.access_token));
      toast("✔ Login Success");
      navigate("/all");
    } catch (error) {
      dispatch(loginFailed(error.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {loading ? (
        <div>
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#306cce", "#72a1ed"]}
          />
        </div>
      ) : (
        <div className="bg-purple-500">
          <div className=" p-8 rounded shadow-md w-80 bg-violet-300">
            <h2 className="flex text-2xl font-semibold mb-4 items-center justify-center">
              Login
            </h2>
            <div className="mb-4">
              <input
                type="text"
                id="emailId"
                name="emailId"
                className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-400"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                id="password"
                name="password"
                className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-400"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-center items-center">
            <button
              className="bg-purple-500 content-center text-white py-2 px-4 rounded  hover:bg-purple`-600"
              onClick={handleLogin}
            >
              Login
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
