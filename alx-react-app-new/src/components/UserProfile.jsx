

const UserProfile = () => {
   const props = {name: 'Praise', bio: "A tech enthusiat with intense passion", age: '37'}

   return (
     <div style={{border: '2px solid green', padding: '20px', margin: '20px'}}>
       <h2 style={{ color: 'white', backgroundColor: 'green', display: 'inline', borderRadius: '5px'}} >{props.name}</h2>
       <p>Age:  <span style={{ fontWeight: 'bold' }}>{props.age}</span></p>
       <p>Bio:  <span style={{ fontWeight: 'bold' }}>{props.bio}</span></p>
     </div>
   );
 };


export default  UserProfile;