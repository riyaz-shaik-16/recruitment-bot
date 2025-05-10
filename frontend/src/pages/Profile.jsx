import { useSelector } from "react-redux"

const Profile = () => {

  const  {user} = useSelector(state=>state.user);
  console.log(user);
  return (
    <>
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
  <div className="flex items-center space-x-4 mb-6">
    <img src={user?.picture} alt="Profile" className="w-20 h-20 rounded-full border" />
    <div>
      <h2 className="text-2xl font-semibold">{user?.name}</h2>
      <p className="text-gray-500">{user?.email}</p>
    </div>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
    <div>
      <p className="text-gray-400">Phone</p>
      <p>+1 234 567 890</p>
    </div>
    <div>
      <p className="text-gray-400">Location</p>
      <p>New York, USA</p>
    </div>
    <div>
      <p className="text-gray-400">Education</p>
      <p>B.Sc. in Computer Science</p>
    </div>
    <div>
      <p className="text-gray-400">Experience</p>
      <p>2 years</p>
    </div>
  </div>

  <div className="mt-6">
    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
      Edit Profile
    </button>
  </div>
</div>

    </>
  )
}

export default Profile
