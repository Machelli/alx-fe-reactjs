import './index.css'

function UserProfile() {
  return (
    <div className="bg-gray-100 max-w-sm mx-auto my-20 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out text-center sm:p-4 md:p-8  max-w-xs sm:max-w-xs md:max-w-sm hover:shadow-xl" >
      <img src="https://via.placeholder.com/150" alt="User"  className=' w-24 h-24 sm:w-24 sm:h-24 md:w-36 md:h-36 rounded-full mx-auto hover:scale-110 transition-transform hover:shadow-xl'/>
      <h1 className='text-xl text-blue-800 my-4 mb-1 md:mb-2 text-xl sm:text-lg md:text-xl hover:text-blue-500 hover:shadow-xl'>John Doe</h1>
      <p className='text-gray-600 text-base text-sm sm:text-base'>Developer at Example Co. Loves to write code and explore new technologies.</p>
    </div>
  );
}

export default UserProfile;