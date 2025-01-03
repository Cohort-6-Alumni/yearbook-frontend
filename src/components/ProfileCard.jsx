import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import {useNavigate} from "react-router";
import {useContext} from "react";
import {AppContext} from "../context/contextApi.jsx";
import instagramLogo from "../assets/instagram.png";
import linkedin from "../assets/linkedin.png";

const ProfileCard = ({  firstName, lastName,picture,id, currentRole })=> {

    const navigate = useNavigate();
    const {getUserProfilesCxt} = useContext(AppContext);
    console.log("CUSTOM CARD",getUserProfilesCxt())

    const handleClick = ()=>{
        navigate(`/user_profile/${id}`)
    }
    return (
        <Card className="max-w-xs mx-auto cursor-pointer" onClick={handleClick}>
                <img src={picture} alt="profile-picture" className="object-cover w-[200px] h-[150px] mx-auto rounded-t-lg" />
            <CardBody className="text-center pt-1">
                <Typography variant="h6" color="blue-gray" className="mb-1">
                    {`${firstName} ${lastName}`}
                </Typography>
                <Typography color="blue-gray" className="font-light text-sm">
                    {currentRole}
                </Typography>
            </CardBody>
            <CardFooter className="flex justify-center gap-4 pb-4 pt-1">
                <Tooltip content="LinkedIn">
                    <a href="#facebook">
                        <img src={linkedin} alt="LinkedIn" className="w-5 h-5" />
                    </a>
                </Tooltip>
                <Tooltip content="Instagram">
                    <a href="#instagram">
                        <img src={instagramLogo} alt="Instagram" className="w-5 h-5" />
                    </a>
                </Tooltip>
            </CardFooter>
        </Card>
        // <Card className="max-w-sm mx-auto cursor-pointer w-full" onClick={handleClick}>
        //     <CardHeader floated={false} className="h-50">
        //         <img src={picture} alt="profile-picture" className="object-cover w-[285px] h-[200px]" />
        //     </CardHeader>
        //     <CardBody className="text-center pt-2">
        //         <Typography variant="h4" color="blue-gray" className="mb-1">
        //             {`${firstName} ${lastName}`}
        //         </Typography>
        //         <Typography color="blue-gray" className="font-medium" textGradient>
        //             CEO / Co-Founder
        //         </Typography>
        //     </CardBody>
        //     <CardFooter className="flex justify-center gap-7 pb-6 pt-2">
        //         <Tooltip content="Like">
        //             <Typography
        //                 as="a"
        //                 href="#facebook"
        //                 variant="lead"
        //                 color="blue"
        //                 textGradient
        //             >
        //                 <img
        //                     src={linkedin}
        //                     alt="Avatar"
        //                 />
        //             </Typography>
        //         </Tooltip>
        //         {/*<Tooltip content="Follow">*/}
        //         {/*    <Typography*/}
        //         {/*        as="a"*/}
        //         {/*        href="#twitter"*/}
        //         {/*        variant="lead"*/}
        //         {/*        color="light-blue"*/}
        //         {/*        textGradient*/}
        //         {/*    >*/}
        //         {/*        <i className="fab fa-twitter" />*/}
        //         {/*    </Typography>*/}
        //         {/*</Tooltip>*/}
        //         <Tooltip content="Follow">
        //             <Typography
        //                 as="a"
        //                 href="#instagram"
        //                 variant="lead"
        //                 color="purple"
        //                 textGradient
        //             >
        //                 <img
        //                     src={instagramLogo}
        //                     alt="Avatar"
        //                 />
        //             </Typography>
        //         </Tooltip>
        //     </CardFooter>
        // </Card>
    );
}

export default ProfileCard;


ProfileCard.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    picture: PropTypes.string,
    id: PropTypes.string,
    currentRole: PropTypes.string,
};