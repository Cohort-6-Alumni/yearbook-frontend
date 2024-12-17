import CustomCard from "../../components/CustomCard.jsx";
import { Button } from "@material-tailwind/react";



const HomePage =()=> {
    return (
                <div className="container mx-auto max-w-5xl px-4 ">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <CustomCard/>
                    <CustomCard/>
                    <CustomCard/>
                    <CustomCard/>
                    <CustomCard/>
                    <CustomCard/>
                    <CustomCard/>
                    <CustomCard/>
                    <CustomCard/>
                </div>
                <div className=" flex w-full justify-center items-center my-8 ">
                    <Button size="lg" className="bg-[#9260E2]">More</Button>
                </div>
              </div>

    );
}

export default HomePage;