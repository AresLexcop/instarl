import { useState, useEffect } from "react";
import propTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/use-user";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";
import Photos from "./photos";

export default function Header({ 
    photosCount, 
    followerCount, 
    setFollowerCount,
    profile : { docId: profileDocId, userId: profileUserId, fullName, Followers = [], following = [], username: profileUsername }
}) {
    const user = useUser();
    // console.log('user',user.length);
    const [isFollowingProfile, setIsFollowingProfile] = useState(false);

    const activeBtnFollow = user.username && user.username !== profileUsername;
    // console.log(activeBtnFollow);
    const handleToggleFollow = async () => {
        setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile)
        setFollowerCount({
            followerCount: isFollowingProfile ? followerCount - 1 : (followerCount + 1)
        });
        await toggleFollow(isFollowingProfile, user.docId, profileDocId, profileUserId, user.userId);
    };

    {useEffect (() => {
        if (user.length == 1 ) {
    const isLoggedInUserFollowingProfile = async () => {
        const isFollowing = await isUserFollowingProfile(user[0].username, profileUserId);
        setIsFollowingProfile(!!isFollowing);
    };
    // console.log('username', user.username);
    if (user[0].username && profileUserId) {
        isLoggedInUserFollowingProfile();
    }}
    }, [user.username, profileUserId]);}

    // console.log('fol', Followers);
    return user.length == 1 ? (
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
            <div className="container flex justify-center">
                <img 
                    className="rounded-full h-40 w-40 flex "
                    alt={`${profileUsername} profile picture`}
                    src={`/images/avatars/${profileUsername}.png`}
                />
            </div>
            <div className="flex items-center justify-center flex-col col-span-2">
                <div className="container flex items-center">
                    <p className="text-2xl font-bold mr-4"> {profileUsername} </p>
                    {activeBtnFollow && (
                        <button 
                            className="bg-blue-500 font-bold text-sm rouned text-white w-20 h-8"
                            type="button"
                            onClick={handleToggleFollow}
                        >
                            {isFollowingProfile? 'Unfollow' : 'Follow'}
                        </button>
                    )}
                </div>
                <div className="container flex mt-4 ">
                    {Followers  == undefined || following == undefined? (
                        <Skeleton count={1} width={677} height={24} />
                    ):(
                        <>
                            <p className="mr-10" >
                                <span className="font-bold" >{photosCount}</span> Photos
                            </p>
                            <p className="mr-10" >
                                <span className="font-bold" >{followerCount}</span>
                                {``}
                                {followerCount == 1 || followerCount == 0? ' Follower' :  ' Followers'}
                            </p>
                            <p className="mr-10" >
                                <span className="font-bold" >{following.length}</span> Following
                            </p>
                        </>
                    )}
                </div>
                <div className="container mt-4">
                    <p className="font-medium"> {!fullName ? <Skeleton count={1} width={350} height={24} /> :fullName} </p>
                </div>
            </div>
        </div>
    ) : null;
}

Header.propTypes = {
    photosCount: propTypes.number.isRequired,
    followerCount: propTypes.number.isRequired,
    setFollowerCount: propTypes.func.isRequired,
    profile: propTypes.shape({
        docId: propTypes.string,
        userId: propTypes.string,
        fullName: propTypes.string,
        Followers: propTypes.array,
        following: propTypes.array,
        username: propTypes.string
    }).isRequired
};