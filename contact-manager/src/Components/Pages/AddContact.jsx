import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddContact = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const [data, setData] = useState([]);
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const nickNameRef = useRef(null);
  const occupationRef = useRef(null);
  const phoneRef = useRef(null);
  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const fullName = fullNameRef.current.value;
    const email = emailRef.current.value;
    const nickName = nickNameRef.current.value;
    const occupation = occupationRef.current.value;
    const phone = phoneRef.current.value;

    const addContact = {
      fullName: fullName,
      email: email,
      nickName: nickName,
      occupation: occupation,
      phone: phone,
    };
    postContact(addContact);
  };

  const postContact = async (addContact) => {
    try {
      const response = await axios.post(
        `http://localhost:8282/${user.id}`,
        addContact
      );
      console.log(response.data);

      setData([...data, response.data]);
      Swal.fire({
        title: "Success",
        text: "Contact Added Successfully !!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        navigate("/show-contact");
      });
      //   localStorage.setItem("user", JSON.stringify(response.data));

      //   navigate("/profile", { state: { user: response.data } });
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleOnSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              ref={fullNameRef}
              type="text"
              id="username"
              name="fullName"
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
              ref={emailRef}
              type="email"
              id="email"
              name="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              NickName
            </label>
            <input
              ref={nickNameRef}
              type="text"
              id="password"
              name="nickName"
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
              ref={phoneRef}
              type="text"
              id="phone"
              name="phone"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="desc"
            >
              Occupation
            </label>
            <input
              ref={occupationRef}
              type="text"
              id="desc"
              name="desc"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="col-span-1 md:col-span-2 flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContact;
