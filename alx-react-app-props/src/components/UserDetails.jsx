import {usecontext} from "react";
import {UserContext} from '../user.context';


 userDat = usecontext(UserContext)

function UserInfo() {
  return 
  <UserDetails userDat={userDat} />;
}

export default UserInfo;