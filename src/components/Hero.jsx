import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import gifHome from "../assets/gifhome.gif";
import { TypeAnimation } from "react-type-animation";
import { useContext } from "react";
import { motion } from "framer-motion";
import { UserContext } from "../context/UserContext";
function Hero(){ 
  const { user } = useContext(UserContext);
  return (
    <div className="w-full transition-all h-full duration-200 dark:bg-zinc-950 bg-white flex flex-col lg:flex-row justify-around items-center py-5 px-5">
      <motion.div
        initial={{ opacity: 0, scale: 1.5}}
        animate={{ opacity: 1,  scale: 1 }}
        transition={{ duration: 1 }}
        className=" text-left w-fit  flex flex-col items-start space-y-9"
      >
        <div className="flex flex-col space-y-4">
          <p className="underline dark:text-white decoration-rose-500  text-5xl lg:text-6xl">
            <TypeAnimation
              sequence={[
                "Your Personal",
                1000,
                "Your Secure",
                1000,
                "Your Private",
                1000,
              ]}
              wrapper="p"
              repeat={Infinity}
              className="text-black dark:text-white transition-all duration-200 font-extrabold opacity-90"
            />
          </p>
          <p className="text-black dark:text-white font-extrabold text-4xl lg:text-6xl opacity-90">
            Password{" "}
            <span className="text-blue-500 font-extrabold">Manager</span>
          </p>
        </div>
        <div>
          <Link
            to="/dashboard"
            className="w-fit dark:text-white bg-transparent ring-2 flex justify-center space-x-3 items-center p-2 ring-blue-500 rounded-lg text-xl lg:text-lg text-black mt-18 hover:bg-blue-500 duration-200 hover:ring-0 ease-linear hover:scale-105 hover:text-white font-medium"
          >
            <span>{!user ? "Sign in" : "Dashboard"}</span>{" "}
            <span className="animate-pulse">
              <ArrowRightCircleIcon className="h-5 w-5 inline-block" />
            </span>
          </Link>
        </div>
      </motion.div>
      <div>
        <img
          src={gifHome}
          className="hidden lg:inline object-contain h-96 w-96"
          alt=""
        />
      </div>
    </div>
  );
}

export default Hero;
