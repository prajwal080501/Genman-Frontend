import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import NoPasswords from "./NoPasswords";
import PasswordCard from "./PasswordCard";
import ClipLoader from "react-spinners/ClipLoader";
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/solid";
import Upload from "./Upload";
function PasswordList({ passwords, setPasswords }) {
    const { user, token } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const getPasswordByUserId = useCallback(async () => {
        setLoading(true);
        const res = await fetch(`http://localhost:8000/api/password/${user?._id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        })
        const data = await res.json();
        setPasswords(data.passwords);
        console.log(passwords);
        setLoading(false);
    }, [user, token, setPasswords])

    useEffect(() => {
        getPasswordByUserId();

    }, [user])

    return (
        <div className="w-full h-fit flex flex-col items-center justify-center mt-10 rounded-lg bg-white dark:bg-zinc-800 p-5">
            <Upload isOpen={isOpen} setIsOpen={setIsOpen} setPasswords={setPasswords} />
            <div className="w-full py-5 px-3 flex  justify-between items-start">
                <p className="text-3xl font-extrabold text-black dark:text-white text-left">
                    Total saved passwords: <span className="font-bold bg-blue-500/40 text-white px-2 rounded-lg">{passwords?.length}</span>
                </p>
                <button onClick={
                    () => {
                        setIsOpen((prev) => !prev);
                    }

                } title="Import Passwords" className="text-3xl font-extrabold text-black dark:text-white">
                    <ArrowDownOnSquareIcon className="h-8 w-8 text-black dark:text-white hover:text-blue-500 hover:scale-110 duration-200 cursor-pointer" />
                </button>
            </div>
            {
                loading ? <div className="flex items-center justify-center">
                    <ClipLoader color="white" size={70} />
                </div> : passwords?.length === 0 ? <NoPasswords /> : <div className="w-full flex flex-wrap justify-center items-center">
                    {
                        passwords?.map((password) => (
                            <PasswordCard key={password._id} password={password} setPasswords={setPasswords} />
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default PasswordList