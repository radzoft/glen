import { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import BootSequence from "./components/BootSequence";

export function meta() {
    return [
        { title: "Login" },
        { name: "description", content: "Login to your account" },
    ];
}

export default function Login() {
    const now = new Date();
    const [time, setTime] = useState(`${now.toLocaleDateString('en-PH', { month: 'short', day: 'numeric' })} ${now.toLocaleTimeString('en-PH', { timeStyle: 'short' })}`);
    const [showLogin, setShowLogin] = useState(false);
    
    const bootLines = [
        "Starting system boot process...",
        "[  OK  ] Started Journal Service",
        "[  OK  ] Mounted FUSE Control File System",
        "[  OK  ] Listening on D-Bus System Message Bus Socket",
        "[  OK  ] Reached target System Initialization",
        "[  OK  ] Started CUPS Scheduler",
        "[  OK  ] Reached target Network",
        "Starting Network Manager...",
        "[  OK  ] Started Network Manager",
        "Starting User Manager for UID 1000...",
        "[  OK  ] Started User Manager for UID 1000",
        "Loading desktop environment...",
        "[  OK  ] System startup complete"
    ];

    useEffect(() => {
        setInterval(() => {
            const now = new Date();
            setTime(`${now.toLocaleDateString('en-PH', { month: 'short', day: 'numeric' })} ${now.toLocaleTimeString('en-PH', { timeStyle: 'short' })}`);
        }, 1000);
    }, []);

    // Only show login screen after boot sequence completes
    if (!showLogin) {
        return (
            <main className="bg-[#000000] h-screen w-screen flex overflow-hidden flex-col p-4">
                <div className="grow flex justify-center items-center">
                    <BootSequence 
                        lines={bootLines} 
                        typingSpeed={20} 
                        onComplete={() => setTimeout(() => setShowLogin(true), 500)} 
                    />
                </div>
            </main>
        );
    }

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
