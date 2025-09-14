import {usecontext} from "react";
import {UserContext} from './UserContext';


 userDat = usecontext(UserContext)

function UserInfo() {
  return 
  <UserDetails userDat={userDat} />;
}

export default UserInfo;