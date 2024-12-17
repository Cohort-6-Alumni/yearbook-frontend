import { FiSearch } from "react-icons/fi";
import {Button} from "@material-tailwind/react";

const Navbar =()=> {
    return (
            <nav className="sticky top-0 z-10 bg-white">
                <div className="container mx-auto px-4 py-1 flex justify-between items-center">
                    <div>
                        <img
                            className="w-[60px] h-[60px] border-gray-300"
                            src="/logo.png"
                            alt="Logo"
                        />
                    </div>
                    <div className="relative max-w-md mx-auto">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
                        />
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                    </div>

                    <div>
                        <Button size="sm" className="bg-[#9260E2]">Login</Button>
                    </div>
                </div>
            </nav>
    )
}

export default Navbar;


