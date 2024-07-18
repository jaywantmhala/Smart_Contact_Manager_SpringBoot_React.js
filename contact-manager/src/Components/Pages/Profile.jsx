import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="bg-white p-6 sm:p-8 lg:p-10 rounded shadow-md w-full max-w-md sm:max-w-lg lg:max-w-2xl">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-center">
          User Profile
        </h2>
        {user ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-3 px-6 bg-gray-100 text-gray-700 font-bold uppercase text-sm text-left">
                    Field
                  </th>
                  <th className="py-3 px-6 bg-gray-100 text-gray-700 font-bold uppercase text-sm text-left">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-6 text-gray-600">Full Name</td>
                  <td className="py-3 px-6">{user.fullName}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-6 text-gray-600">Email</td>
                  <td className="py-3 px-6">{user.email}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-6 text-gray-600">Occupation</td>
                  <td className="py-3 px-6">{user.occupation}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-6 text-gray-600">Phone</td>
                  <td className="py-3 px-6">{user.phone}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">No user data available</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
