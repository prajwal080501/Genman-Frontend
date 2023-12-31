import { Link } from "react-router-dom";
import Logo from "./Logo";
import { SunIcon } from "@heroicons/react/24/solid";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import toast from "react-hot-toast";
import Switch from "./Switch";
import { motion } from "framer-motion";

function Header() {
  const { login, logout, user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  async function onSuceess(res) {
    setLoading(true);
    const data = jwtDecode(res.credential);
    const { name, email, picture } = data;

    const response = await fetch(`${import.meta.env.VITE_PRODUCTION_API_URL}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        profilePicture: picture,
      }),
    });

    console.log(response);
    const jsonData = await response.json();

    login(jsonData.user, jsonData.token);

    console.log(jsonData);

    setLoading(false);
    toast.success("Authentication successfully");
  }

  function onError(res) {
    console.log(res);
  }
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex z-10 w-full dark:bg-zinc-900 bg-white transition-all duration-200 sticky top-0 items-center justify-between px-3 py-5"
    >
      <div>
        <Logo />
      </div>
      <div className="flex items-center space-x-6 px-4">
        <div>
          <Switch />
        </div>
        {user ? (
          <>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg text-white font-medium text-base lg:text-lg hover:scale-105 active:scale-95 duration-200 ease-linear"
            >
              {loading ? (
                <span className="">
                  <ClipLoader color="white" size={20} />
                </span>
              ) : (
                "Logout"
              )}
            </button>
            <img
              title={user?.name}
              src={user?.profilePicture}
              className="rounded-full cursor-pointer ring-2 ring-blue-600 w-12 h-12"
              alt=""
            />
          </>
        ) : (
          <div>
            <GoogleLogin
              theme={"filled_black"}
              useOneTap
              type="icon"
              auto_select
              shape="circle"
              onSuccess={onSuceess}
              onError={onError}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Header;
