import './index.css'

function UserProfile() {
  return (
    <div className="bg-gray-100 max-w-sm mx-auto my-20 rounded-lg shadow-lg p-4 sm:p-6 md:p-8  max-w-xs sm:max-w-sm md:max-w-md " >
      <img src="https://via.placeholder.com/150" alt="User"  className=' w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full mx-auto'/>
      <h1 className='text-xl text-blue-800 my-4 mb-1 md:mb-2 text-xl sm:text-lg md:text-xl'>John Doe</h1>
      <p className='text-gray-600 text-base text-sm sm:text-base'>Developer at Example Co. Loves to write code and explore new technologies.</p>
    </div>
  );
}

export default UserProfile;