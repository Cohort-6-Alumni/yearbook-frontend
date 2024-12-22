import { useParams } from "react-router";
import {useContext} from "react";
import {AppContext} from "../../context/contextApi.jsx";

const ReadOnlyProfile =()=> {
    const { getUserProfilesCxt } = useContext(AppContext);

    const params = useParams();

    console.log("PARAMS", params);
    const foundUser = getUserProfilesCxt().find((profile) => profile.profileId === params.profileId);

  return (
      <div>
          <div>{params.profileId}</div>
          <div>{foundUser?.user.firstName}</div>
          <div>{foundUser?.user.lastName}</div>
      </div>

  )
}

export default ReadOnlyProfile;
