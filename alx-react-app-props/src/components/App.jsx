import ProfilePage from './ProfilePage';
import UserContext from './UserContext.js'



function App() {
  const userData = { name: "Jane Doe", email: "jane.doe@example.com" };

  return
  
  <UserContext.Provide value={userData}>
  <ProfilePage/>;
  </UserContext.Provide>

}

export default App;
