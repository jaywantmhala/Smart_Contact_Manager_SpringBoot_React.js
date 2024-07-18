import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ShowContact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`http://localhost:8282/${user.id}`);
        setContacts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setError(error);
        setLoading(false);
      }
    };

    if (user) {
      fetchContacts();
    }
  }, [user]);

  const handleDelete = async (contactId) => {
    try {
      await axios.delete(`http://localhost:8282/${contactId}`);
      setContacts(contacts.filter((contact) => contact.id !== contactId));
    } catch (error) {
      console.error("Error deleting contact:", error);
      setError(error);
    }
  };

  const handleUpdate = (contactId) => {
    navigate(`/update-contact/${contactId}`);
  };

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching contacts: {error.message}</div>;
  }

  const filteredContacts = contacts.filter((contact) =>
    contact.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(
    indexOfFirstContact,
    indexOfLastContact
  );

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredContacts.length / contactsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Contacts</h2>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 px-4 py-2 border border-gray-300 rounded"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b border-gray-300">Full Name</th>
              <th className="py-2 px-4 border-b border-gray-300">Email</th>
              <th className="py-2 px-4 border-b border-gray-300">Phone</th>
              <th className="py-2 px-4 border-b border-gray-300">Nickname</th>
              <th className="py-2 px-4 border-b border-gray-300">Occupation</th>
              <th className="py-2 px-4 border-b border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentContacts.length > 0 ? (
              currentContacts.map((contact) => (
                <tr key={contact.id} style={{ textAlign: "center" }}>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {contact.fullName}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {contact.email}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {contact.phone}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {contact.nickName}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {contact.occupation}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    <button
                      onClick={() => handleUpdate(contact.id)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-2 px-4 border-b border-gray-300" colSpan="6">
                  No contacts found for this user.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handleClick(number)}
            className={`mx-1 px-3 py-1 border rounded ${
              currentPage === number
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500"
            }`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShowContact;
