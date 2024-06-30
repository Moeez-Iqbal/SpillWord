import React, { useState } from "react";
import axios from "axios";

function EmailTemplatePopUp({
  style,
  selectedEmails,
  userEmailAddress,
  onClose,
}) {
  // Initialize 'to' field with selected email labels
  const initialToField = selectedEmails.map((email) => email.label).join(", ");

  // Form state with initial values
  const [formData, setFormData] = useState({
    senderEmail: userEmailAddress, // Assuming userEmailAddress is the sender
    selectedEmails: initialToField,
    subject: "",
    body: "",
    attachments: [],
    ccEmails: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "attachments") {
      setFormData({
        ...formData,
        attachments: files,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Log to verify 'to' field before sending
      console.log("Sending emails to:", formData.selectedEmails);

      // POST request to backend API endpoint
      const response = await axios.post(
        "http://localhost:3002/sendBulkEmails",
        formData
      );

      // Log success response
      console.log("Emails sent successfully:", response.data);

      // Close the popup after successful submission
      onClose();
    } catch (error) {
      // Handle errors from axios request
      console.error("Error sending emails:", error);

      // Handle specific error responses
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        // Example: Display user-friendly error message based on response
        alert("Failed to send emails. Please try again later.");
      } else if (error.request) {
        console.error("Request made but no response received:", error.request);
        alert("Failed to send emails. No response received from the server.");
      } else {
        console.error("Error setting up request:", error.message);
        alert("Failed to send emails. Error setting up the request.");
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div
        style={{ ...style, maxHeight: "80vh", overflowY: "auto" }}
        className="popup-content bg-white p-6 rounded-lg shadow-lg"
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">New Template</h1>

            {/* From (name) input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                From:
              </label>
              <input
                type="text"
                name="senderEmail"
                value={formData.senderEmail}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                // readOnly // Assuming userEmailAddress is not editable
              />
            </div>

            {/* To input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                To:
              </label>
              <input
                type="text"
                name="selectedEmails"
                value={formData.selectedEmails}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required // Ensure 'to' is required
              />
            </div>

            {/* File (attachment) input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                File:
              </label>
              <input
                type="file"
                name="attachments"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                multiple // Allow multiple file selection
              />
            </div>

            {/* CC input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                CC:
              </label>
              <input
                type="text"
                name="ccEmails"
                value={formData.ccEmails}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Subject input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Subject:
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                style={{ width: "34rem" }}
                required // Ensure 'subject' is required
              />
            </div>

            {/* Body textarea */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Body:
              </label>
              <textarea
                name="body"
                value={formData.body}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md h-32"
                style={{ width: "34rem", height: "24rem" }}
                required // Ensure 'body' is required
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex justify-end mt-6 space-x-4">
              <button
                type="button"
                className="px-6 py-2 bg-gray-200 rounded-md"
                onClick={onClose} // Close the popup on Cancel
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Send Emails
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmailTemplatePopUp;
