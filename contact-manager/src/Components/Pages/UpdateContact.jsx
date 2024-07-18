import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateContact = () => {
  const { contactId } = useParams();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8282/contact/${contactId}`
        );
        setContact(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching contact:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchContact();
  }, [contactId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8282/${user.id}/${contactId}`, contact);
      Swal.fire({
        title: "Success",
        text: "Contact Added Successfully !!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        navigate("/show-contact");
      });
    } catch (error) {
      console.error("Error updating contact:", error);
      setError(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching contact: {error.message}</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 sm:p-8 lg:p-10 rounded shadow-md w-full max-w-md sm:max-w-lg lg:max-w-2xl">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-center">
          Update Contact
        </h2>
        {contact && (
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={contact.fullName}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={contact.email}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={contact.phone}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nickName"
              >
                Nickname
              </label>
              <input
                type="text"
                id="nickName"
                name="nickName"
                value={contact.nickName}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="occupation"
              >
                Occupation
              </label>
              <input
                type="text"
                id="occupation"
                name="occupation"
                value={contact.occupation}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Update Contact
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateContact;
