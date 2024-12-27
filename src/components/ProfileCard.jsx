import {
    Card,
    CardHeader,
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

const ProfileCard = ({  firstName, lastName,picture,id })=> {

    const navigate = useNavigate();
    const {getUserProfilesCxt} = useContext(AppContext);
    console.log("CUSTOM CARD",getUserProfilesCxt())

    const handleClick = ()=>{
        navigate(`/user_profile/${id}`)
    }
    return (
        <Card className="max-w-sm mx-auto cursor-pointer" onClick={handleClick}>
            <CardHeader floated={false} className="h-50">
                <img src={picture} alt="profile-picture" className="object-cover w-[285px] h-[200px]" />
            </CardHeader>
            <CardBody className="text-center pt-2">
                <Typography variant="h4" color="blue-gray" className="mb-1">
                    {`${firstName} ${lastName}`}
                </Typography>
                <Typography color="blue-gray" className="font-medium" textGradient>
                    CEO / Co-Founder
                </Typography>
            </CardBody>
            <CardFooter className="flex justify-center gap-7 pb-6 pt-2">
                <Tooltip content="Like">
                    <Typography
                        as="a"
                        href="#facebook"
                        variant="lead"
                        color="blue"
                        textGradient
                    >
                        <img
                            src={linkedin}
                            alt="Avatar"
                        />
                    </Typography>
                </Tooltip>
                {/*<Tooltip content="Follow">*/}
                {/*    <Typography*/}
                {/*        as="a"*/}
                {/*        href="#twitter"*/}
                {/*        variant="lead"*/}
                {/*        color="light-blue"*/}
                {/*        textGradient*/}
                {/*    >*/}
                {/*        <i className="fab fa-twitter" />*/}
                {/*    </Typography>*/}
                {/*</Tooltip>*/}
                <Tooltip content="Follow">
                    <Typography
                        as="a"
                        href="#instagram"
                        variant="lead"
                        color="purple"
                        textGradient
                    >
                        <img
                            src={instagramLogo}
                            alt="Avatar"
                        />
                    </Typography>
                </Tooltip>
            </CardFooter>
        </Card>
    );
}

export default ProfileCard;


ProfileCard.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    picture: PropTypes.string,
    id: PropTypes.string,
};