import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Contact = () => {
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8282/sendemail", {
        message,
        subject,
        to,
      });

      if (response.status === 200) {
        Swal.fire("Success", "Email has been sent successfully!", "success");
        setMessage("");
        setSubject("");
        setTo("");
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      Swal.fire("Error", "Email not sent", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 pb-14">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-6">Send Email</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Message:</label>
            <textarea
              className="w-full px-3 py-2 border rounded-md"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Subject:</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">To:</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Email"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
