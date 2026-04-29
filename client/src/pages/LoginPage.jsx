import React, { useState } from 'react'
import assets from '../assets/assets'

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const onSubmitHandler = (e)=> {
    e.preventDefault();

    if (currState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }
  }

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 items-center justify-center px-10">
        <div className="flex flex-col items-start gap-5">
          <img src={assets.logo_icon} className="w-14" />
          <h1 className="text-5xl font-semibold text-white">QuickChat</h1>
          <p className="text-gray-400 max-w-sm">
            Connect instantly with people around the world. Fast, secure, real-time chat.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">

        <form onSubmit={onSubmitHandler} className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-gray-600 p-8 rounded-2xl shadow-xl text-white">

          <h2 className="text-2xl font-semibold mb-6 flex justify-between items-center">
            {currState}
            {isDataSubmitted && <img onClick={()=> setIsDataSubmitted(false)} src={assets.arrow_icon} className="w-5 cursor-pointer" />}
          </h2>

          {/* STEP 1 */}
          {!isDataSubmitted && (
            <div className="flex flex-col gap-4">
              {currState === "Sign up" && (
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  className="p-3 rounded-md bg-transparent border border-gray-500 outline-none"
                />
              )}

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="p-3 rounded-md bg-transparent border border-gray-500 outline-none"
              />

              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="p-3 rounded-md bg-transparent border border-gray-500 outline-none"
              />
            </div>
          )}

          {/* STEP 2 (BIO) */}
          {currState === "Sign up" && isDataSubmitted && (
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows="4"
              placeholder="Write a short bio..."
              className="w-full p-3 rounded-md bg-transparent border border-gray-500 outline-none"
            />
          )}

          <button className="w-full mt-6 py-3 rounded-md bg-gradient-to-r from-purple-400 to-violet-600">
            {currState === "Sign up"
              ? (isDataSubmitted ? "Finish Signup" : "Create Account")
              : "Login"}
          </button>

          <div className="flex items-center gap-2 mt-4 text-sm text-gray-400">
            <input type="checkbox" />
            <p>Agree to terms of use and privacy policy</p>
          </div>

          <p className="text-sm mt-4 text-gray-400">
            {currState === "Sign up" ? (
              <>
                Already have an account?{" "}
                <span
                  onClick={() => {
                    setCurrState("Login");
                    setIsDataSubmitted(false);
                  }}
                  className="text-violet-400 cursor-pointer"
                >
                  Login
                </span>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <span
                  onClick={() => setCurrState("Sign up")}
                  className="text-violet-400 cursor-pointer"
                >
                  Sign up
                </span>
              </>
            )}
          </p>

        </form>
      </div>
    </div>
  )
}

export default LoginPage