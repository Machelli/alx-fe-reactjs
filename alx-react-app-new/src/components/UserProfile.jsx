

const UserProfile = () => {
   const props = {name: 'Praise', bio: "A tech enthusiat with intense passion", age: '37'}

   return (
     <div style={{border: '2px solid green', padding: '10px', margin: '10px'}}>
       <h2 style={{ color: 'blue', backgroundColor: 'white', display: 'inline', borderRadius: '5px'}} >{props.name}</h2>
       <p>Age:  <span style={{ fontWeight: 'bold' }}>{props.age}</span></p>
       <p>Bio:  <span style={{ fontWeight: 'bold' }}>{props.bio}</span></p>
     </div>
   );
 };


export default  UserProfile;