import User from './User';
import Suggestions from './suggestion';
import useUser from '../../hooks/use-user';

export default function Sidebar() {
  const x = useUser();
  // console.log('x', x[0]);
    if (x[0] !== undefined)
    // return <p>I am assa </p>;
    // Testing to get data to Array
{  const { docId = '', fullName, username, userId, following }  = x[0];
// console.log(docId, fullName, username, userId, following);
  return (
    <div className="p-4">
      <User username = {username} fullName = {fullName} />
      <Suggestions userId={userId} following={following} loggedInUserDocId={docId}/>
    </div>
  )};
}

