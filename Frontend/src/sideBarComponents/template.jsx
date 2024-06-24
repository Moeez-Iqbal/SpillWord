import React, { useState } from "react";
import axios from "axios";
import GetTemplateEmail from "./eMailComponents/getTemplateEmail";

const EmailTemplate = () => {
  const [formData, setFormData] = useState({
    name: "",
    file: null,
    tags: "",
    owner: "Zain Ishfaq (You)",
    subject: "",
    body: "",
    userId: "66740a6b4263e1320911c473",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [showEmailPopup, setShowEmailPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const val = type === "file" ? files[0] : value;

    if (type === "file") {
      setFormData({ ...formData, file: val, folder: "templates" }); // Example folder name, adjust as per your logic
    } else {
      setFormData({ ...formData, [name]: val });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.subject || !formData.body) {
      alert("Please fill in the required fields: Subject and Body.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("file", formData.file); // Ensure file is appended correctly
      formDataToSend.append("tags", formData.tags);
      formDataToSend.append("owner", formData.owner);
      formDataToSend.append("subject", formData.subject);
      formDataToSend.append("body", formData.body);
      formDataToSend.append("userId", formData.userId);

      const response = await axios.post(
        `http://localhost:3000/create`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure correct headers for FormData
          },
        }
      );

      console.log("Template created:", response.data);
      setFormData((prev) => ({ ...prev, _id: response.data._id }));
      setShowPopup(true);
    } catch (err) {
      console.error("Error creating template:", err);
    }
  };

  const [value, setValue] = useState(true);

  const handleSendTestEmail = async () => {
    try {
      const { subject, body, owner, tags } = formData;

      const msg = {
        subject: subject,
        body: body,
      };

      if (owner) {
        msg.text = `${body}\n\nOwner: ${owner}\nTags: ${tags}`;
        msg.html = `${body}<br><br>Owner: ${owner}<br>Tags: ${tags}`;
      } else {
        msg.text = body;
        msg.html = body;
      }

      await axios.post(`http://localhost:3000/sendTestEmail`, msg);
      setShowEmailPopup(true);
    } catch (err) {
      console.error("Error sending test email:", err);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleCloseEmailPopup = () => {
    setShowEmailPopup(false);
  };

  return (
    <>
      {value ? (
        <div className="py-4 flex">
          <div
            className="border bg-white px-4 py-4 mx-6"
            style={{ width: "40rem" }}
          >
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <h1 className="text-2xl font-bold">New Template</h1>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="flex justify-between">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      File:
                    </label>
                    <input
                      type="file"
                      name="file"
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Tags:
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Owner:
                  </label>
                  <input
                    type="text"
                    name="owner"
                    value={formData.owner}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
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
                    onChange={handleChange}
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
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md h-32"
                    style={{ width: "34rem", height: "24rem" }}
                    required
                  ></textarea>
                </div>

                <div className="flex justify-end mt-6 space-x-4">
                  <button
                    type="button"
                    className="px-6 py-2 bg-gray-200 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="bg-white" style={{ width: "35rem" }}>
            <div className="flex flex-col border-gray-300">
              <div className="space-y-4 px-4">
                <h2 className="text-xl font-bold py-4">Template Preview</h2>
                <div
                  className="border border-gray-300 rounded-md px-4 p-4"
                  style={{ width: "30rem" }}
                >
                  <p className="text-gray-700">
                    To: Example Contact &lt;example@google.com&gt;
                  </p>
                  <p className="text-gray-700">Subject: {formData.subject}</p>
                  <div className="mt-4 border-t border-gray-300 pt-4">
                    <p>{formData.body}</p>
                    <p>--</p>
                    <p>{formData.owner}</p>
                  </div>
                </div>
                <button
                  className="w-full p-2 bg-blue-500 text-white rounded-md"
                  onClick={handleSendTestEmail}
                >
                  Send Test Email to Me
                </button>{" "}
                <button
                  className="w-full p-2 bg-blue-500 text-white rounded-md"
                  onClick={() => {
                    setValue(false);
                  }}
                >
                  Send Email
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <GetTemplateEmail />
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md shadow-md text-center">
            <h2 className="text-lg font-bold mb-2">Template Created</h2>
            <p>Your template has been successfully created.</p>
            <button
              onClick={handleClosePopup}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showEmailPopup && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md shadow-md text-center">
            <h2 className="text-lg font-bold mb-2">Test Email Sent</h2>
            <p>Your test email has been sent successfully.</p>
            <button
              onClick={handleCloseEmailPopup}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EmailTemplate;
