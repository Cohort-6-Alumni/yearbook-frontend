import { useParams } from "react-router";
import {getProfile} from "../../api/index.js";
import {useEffect, useState} from "react";
import Loader from "../../components/Loader.jsx";

const ReadOnlyProfile =()=> {
    const params = useParams();
    const [foundUser, setFoundUser] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
    const fetchUsers = async () => {
        try {
            setLoading(true)
            const res = await getProfile(params.profileId);
            setFoundUser(res.data);
            setLoading(false)
        } catch (err) {
            console.error("Error fetching profiles:", err);
        }
    }
        fetchUsers();
    }, []);



    if (loading === true){
        return (
            <Loader/>
        )
    }

  return (
      <div className={"w-full flex flex-col"}>
          <div className="grid  grid-cols-1 gap-4 lg:grid-cols-3">
              <div className={"flex space-x-2"}>
                  <img
                      className="w-[120px] h-[120px] rounded-full border border-gray-300"
                      src={foundUser?.picture}
                      alt="Avatar"
                  />

                  <div className="ml-4 w-full pt-8 flex flex-col">
                      <div className="flex items-center ">
                          <p className="text-medium text-gray-800 font-bold mb-1">{`${foundUser?.firstName} ${foundUser?.lastName}`}</p>
                      </div>
                      <p className="text-sm font-normal text-wrap">{foundUser?.currentRole}</p>
                      <div className={'flex space-x-1 text-nowrap'}>
                          <p className={"text-sm font-semibold"}>Bio:</p>
                          <p className={"text-sm font-normal text-wrap"}>{foundUser?.bio}</p>
                      </div>
                  </div>
              </div>
              <div className={"flex flex-col pt-8 w-full"}>
                  <div className={"flex space-x-2 mb-2"}><p className={"text-sm font-semibold"}>Previous Field:</p>
                      <p className={"text-sm font-normal"}>{` ${foundUser?.previousField}`}</p></div>
                  <div className={"flex space-x-2 "}><p className={"text-sm font-semibold"}>Interests:</p>
                      <p className={"text-sm font-normal"}>{` ${foundUser?.interests}`}</p></div>
              </div>

              <div className={"flex flex-col pt-8 w-full"}>
                  <div className={"flex space-x-2 mb-2"}><p className={"text-sm font-semibold"}>Hobbies:</p> <p
                      className={"text-sm font-normal"}>{` ${foundUser?.hobbies}`}</p></div>
                  <div className={"flex space-x-1 text-nowrap"}>
                      <p className={"text-sm font-semibold"}>Favourite coding snack:</p>
                      <p className={"text-sm font-normal text-wrap"}>{`${foundUser?.favoriteCodingSnack}`}</p>
                  </div>
              </div>
          </div>
            <div className="w-full flex flex-col justify-center items-center my-8">
                <p className={"font-medium text-2xl"}>Favorite Quote</p>
              <div className={"w-full flex justify-center mt-4"}>
                    <p className={"italic"}>{foundUser?.favoriteQuote}</p>
              </div>
            </div>

          <div className={"w-full flex flex-col"}>
              <div className={"mb-4"}>
                  <p className={"mb-2 text-lg"}>{foundUser?.mostLikelyToQuestion}</p>
                  <div className={"bg-[#F6F6F6] rounded-md p-4"}><p className={"text-sm"}>{foundUser?.mostLikelyToAnswer}</p>
                  </div>
              </div>

              <div className={"mb-4"}>
                  <p className={"mb-2 text-lg"}>Most memorable bootcamp moment?</p>
                  <div className={"bg-[#F6F6F6] rounded-md p-4"}><p
                      className={"text-sm"}>{foundUser?.mostMemorableBootcampMoment}</p>
                  </div>
              </div>

              <div className={"mb-4"}>
                  <p className={"mb-2 text-lg"}>Last word</p>
                  <div className={"bg-[#F6F6F6] rounded-md p-4"}><p className={"text-sm"}>{foundUser?.lastWords}</p>
                  </div>
              </div>

              <div className={"mb-4"}>
                  <p className={"mb-2 text-lg"}>Advice for future cohort</p>
                  <div className={"bg-[#F6F6F6] rounded-md p-4"}><p
                      className={"text-sm"}>{foundUser?.adviceForFutureCohort
                  }</p>
                  </div>
              </div>

              <div className={"mb-4"}>
                  <p className={"mb-2 text-lg"}>Biggest Challenge?</p>
                  <div className={"bg-[#F6F6F6] rounded-md p-4"}><p
                      className={"text-sm"}>{foundUser?.biggestChallenge}</p>
                  </div>
              </div>

              <div className={"mb-4"}>
                  <p className={"mb-2 text-lg"}>How you overcame it</p>
                  <div className={"bg-[#F6F6F6] rounded-md p-4"}><p
                      className={"text-sm"}>{foundUser?.howYouOvercameIt}</p>
                  </div>
              </div>
          </div>
      </div>

  )
}

export default ReadOnlyProfile;
