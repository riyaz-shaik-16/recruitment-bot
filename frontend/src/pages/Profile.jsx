import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  // console.log(user);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-black-pearl-950 rounded-xl shadow-md text-mercury-50">
      {/* Profile Header */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={user?.picture || "/default-profile.jpg"} // Fallback for no picture
          alt="Profile"
          className="w-20 h-20 rounded-full border-2 border-gray-600"
        />
        <div>
          <h2 className="text-2xl font-semibold">{user?.name}</h2>
          <p className="text-gray-400">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
