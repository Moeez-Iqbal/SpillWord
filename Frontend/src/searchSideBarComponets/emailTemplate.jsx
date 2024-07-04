import React, { useState } from "react";
import axios from "axios";

function EmailTemplatePopUp({
  style,
  selectedEmails,
  userEmailAddress,
  onClose,
}) {
  const initialToField = selectedEmails.map((email) => email.label).join(", ");

  const [formData, setFormData] = useState({
    senderEmail: userEmailAddress,
    selectedEmails: initialToField,
    subject: "",
    body: "",
    attachments: [],
    ccEmails: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log(e.target.value);
    if (name == "attachments") {
      setFormData({
        ...formData,
        attachments: files,
      });
console.log(formData);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3003/sendBulkEmails",
        {
          ...formData,
          selectedEmails: selectedEmails.map((email) => ({
            address: email.label,
          })), // Ensure selectedEmails is in the expected format
        }
      );

      console.log("Emails sent successfully:", response.data);

      onClose();
    } catch (error) {
      console.error("Error sending emails:", error);

      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
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
            <h1 className="text-2xl font-bold">Bulk Email</h1>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                From:
              </label>
              <input
                type="text"
                name="senderEmail"
                value={formData.senderEmail}
                onChange={(e)=>{handleChange(e)}}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                To:
              </label>
              <input
                type="text"
                name="selectedEmails"
                value={formData.selectedEmails}
                onChange={(e)=>{handleChange(e)}}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                File:
              </label>
              <input
                type="file"
                name="attachments"
                onChange={(e)=>{handleChange(e)}}
                className="w-full p-2 border border-gray-300 rounded-md"
                multiple
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                CC:
              </label>
              <input
                type="text"
                name="ccEmails"
                value={formData.ccEmails}
                onChange={(e)=>{handleChange(e)}}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Subject:
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={(e)=>{handleChange(e)}}
                className="w-full p-2 border border-gray-300 rounded-md"
                style={{ width: "34rem" }}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Body:
              </label>
              <textarea
                name="body"
                value={formData.body}
                onChange={(e)=>{handleChange(e)}}
                className="w-full p-2 border border-gray-300 rounded-md h-32"
                style={{ width: "34rem", height: "24rem" }}
                required
              ></textarea>
            </div>

            <div className="flex justify-end mt-6 space-x-4">
              <button
                type="button"
                className="px-6 py-2 bg-gray-200 rounded-md"
                onClick={onClose}
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
