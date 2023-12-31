import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import NoPasswords from "./NoPasswords";
import PasswordCard from "./PasswordCard";
import ClipLoader from "react-spinners/ClipLoader";
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/solid";
import Upload from "./Upload";
import toast from "react-hot-toast";
function PasswordList({ passwords, setPasswords, getPasswordByUserId }) {
  const { user, token } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getPasswordByUserId();
  }, [user, setPasswords]);

  async function exportPasswords() {
    const res = await fetch(
      `${import.meta.env.VITE_PRODUCTION_API_URL}/password/export/${user?._id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      }
    );
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "passwords.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    toast.success("Passwords exported successfully");
  }

  return (
    <div className="w-[100%] h-fit flex flex-col items-center justify-center mt-10 rounded-lg bg-white dark:bg-zinc-800 p-5">
      <Upload
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setPasswords={setPasswords}
      />
      <div className="w-full py-5 px-3 flex  justify-between items-start">
        <p className=" text-lg lg:text-3xl w-full font-extrabold text-black dark:text-white text-left">
          Total saved passwords:
          <span className="font-bold bg-blue-500/40 text-white px-2 rounded-lg">
            {passwords?.length}
          </span>
        </p>
        <div className="flex items-center space-x-5">
          {/* <button
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
            title="Import Passwords"
            className="text-3xl font-extrabold text-black dark:text-white p-2"
          >
            <ArrowDownOnSquareIcon className="h-8 w-8 text-black dark:text-white hover:text-blue-500 hover:scale-110 duration-200 cursor-pointer" />
          </button> */}
          <button
            disabled={passwords?.length === 0}
            className="text-xs lg:text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed py-2 px-2 rounded-lg bg-green-600 text-white hover:scale-105 duration-200 ease-linear"
            onClick={exportPasswords}
            title="Export passwords"
          >
            Export Passwords
          </button>
        </div>
      </div>
      {loading ? (
        <div className="flex items-center justify-center">
          <ClipLoader color="white" size={70} />
        </div>
      ) : passwords?.length === 0 ? (
        <NoPasswords />
      ) : (
        <div className="w-full flex flex-wrap justify-center items-center">
          {passwords?.map((password) => (
            <PasswordCard
              getPasswordByUserId={getPasswordByUserId}
              key={password._id}
              password={password}
              setPasswords={setPasswords}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default PasswordList;
