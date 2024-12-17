const CustomCard =()=> {
    return (
        <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-md p-4">

            <div className="flex items-center mb-2">
                <img
                    className="w-[120px] h-[120px] rounded-full border border-gray-300"
                    src="/avatar.png"
                    alt="Avatar"
                />
                <div className="ml-4 w-full">
                    <h5 className="text-[18px] text-gray-800 font-bold mb-1">John Doe</h5>
                    <p className="text-[14px] text-gray-500 mb-1">Software Engineer</p>
                    <div className={'w-full'}><span className="text-gray-500 text-[12px]">Bio:</span>
                        <span
                            className="text-gray-500 text-[12px]">I love reading and building apps and playing games...</span>
                    </div>
                </div>
            </div>

            <div className=" w-full flex items-center mb-2 space-x-2 text-left">
                <p className="text-[14px] font-semibold tracking-tight text-gray-800">Previous field:</p>
                <p className="text-[14px] font-medium text-gray-800">Product management</p>
            </div>

            <div className=" w-full flex items-center mb-2 text-left space-x-2 pl-8">
                <p className="text-[14px] font-semibold tracking-tight text-gray-800 ">Hobbies:</p>
                <div className={" flex items-center"}>
                    <p className="text-[14px] font-medium text-gray-800">Cooking</p>
                    <p className="text-[14px]  font-medium text-gray-800">,Reading</p>
                </div>

            </div>

            <div className=" w-full flex justify-center items-center space-x-2">
                <div className={" flex items-center space-x-1"}><img
                    className="w-[14px] h-[14px] rounded-full border border-gray-300"
                    src="/linkedin.png"
                    alt="Avatar"
                />
                    <p className="text-[13px] font-light tracking-tight text-gray-800 ">Ammyforreal</p>
                </div>

                <div className={" flex items-center space-x-1"}><img
                    className="w-[14px] h-[14px] rounded-full border border-gray-300"
                    src="/instagram.png"
                    alt="Avatar"
                />
                    <p className="text-[13px] font-light tracking-tight text-gray-800 ">Ammyforshort</p>
                </div>

            </div>
        </div>

    );
}

export default CustomCard;