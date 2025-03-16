import { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";

export function meta() {
    return [
        { title: "Login" },
        { name: "description", content: "Login to your account" },
    ];
}

export default function Login() {
    const now = new Date();
    const [time, setTime] = useState(`${now.toLocaleDateString('en-PH', { month: 'short', day: 'numeric' })} ${now.toLocaleTimeString('en-PH', { timeStyle: 'short' })}`);

    useEffect(() => {
        setInterval(() => {
            const now = new Date();
            setTime(`${now.toLocaleDateString('en-PH', { month: 'short', day: 'numeric' })} ${now.toLocaleTimeString('en-PH', { timeStyle: 'short' })}`);
        }, 1000);
    }, []);

    return (
        <main className="bg-[#282828] h-screen w-screen flex overflow-hidden flex-col p-4">
            <div className="flex relative">
                <div className="flex items-center w-full justify-center h-10">
                    <div className="font-bold px-4 py-2 rounded-full hover:bg-[#ffffff21] cursor-pointer">
                        {time}
                    </div>
                </div>
            </div>
            <div className="grow flex justify-center items-center pb-20 ">
                <div className="flex bg-[#ffffff17] rounded-3xl p-3 w-96 hover:bg-[#ffffff21] transition-colors duration-200 cursor-pointer">
                    <div className="rounded-full bg-[#ffffff21] p-4">
                        <CiUser className="h-11 w-11" />
                    </div>
                    <div className="text-2xl p-4 font-bold">
                        glen
                    </div>
                </div>
            </div>
        </main>
    );
}
