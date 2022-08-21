import propTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { updateLoggedInUserFollowing, updateFollowedUserFollowers} from '../../services/firebase';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/route';

export default function SuggestedProfiles({ docId, username, profileId, userId, loggedInUserDocId}) {
    
    const [followed, setFollowed] = useState(false);

    async function handleFollowUser() {
        setFollowed(true);
        await updateLoggedInUserFollowing(loggedInUserDocId, profileId);
        await updateFollowedUserFollowers(spDocId, userId)
    }

    return !followed ? (
        <div className='flex flex-row items-center align-items justify-between' >
            <div className='flex items-center justify-between' >
                <img 
                    className='rounded-full w-8 flex mr-3'
                    src= {`/images/avatars/${username}.png`}
                    alt=""   
                />
                <Link to={ROUTES.PROFILE} >
                    <p className='font-bold text-sm'>{username}</p> 
                </Link>
            </div>
            <div>
                <button 
                    className='text-sx font-bold text-blue-500'
                    type='button'
                    onClick={handleFollowUser}
                >
                    Follow
                </button>
            </div>
        </div>
    ) : null ;
}

SuggestedProfiles.propTypes = {
    profileDocId: propTypes.string,
    username: propTypes.string,
    profileId: propTypes.string,
    userId: propTypes.string,
    loggedInUserDocId: propTypes.string
};
