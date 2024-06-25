// src/components/GetTemplateEmail.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetTemplateEmail = () => {
    const [emails, setEmails] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState(null);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const response = await axios.get('http://localhost:3003/gettemplates'); // Corrected endpoint URL
                setEmails(response.data);
            } catch (error) {
                console.error('Error fetching templates:', error);
            }
        };

        fetchTemplates();
    }, []); // Empty dependency array to fetch data once when component mounts

    const handleEmailSelect = (email) => {
        setSelectedEmail(selectedEmail === email._id ? null : email._id);
    };

    return (
        <div className="p-4">
            {/* Show Filters Button */}
            <div className="flex items-center justify-between pb-2">
                <button className="px-4 py-2 bg-blue-500 text-white rounded">Show Filters</button>
            </div>
            {/* Email Table */}
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 text-left">Checkbox</th>
                        <th className="py-2 text-left">Name</th>
                        <th className="py-2 text-left">Subject</th>
                        <th className="py-2 text-left">Delivered</th>
                        <th className="py-2 text-left">Reply</th>
                        <th className="py-2 text-left px-3">Body</th>
                    </tr>
                </thead>
                <tbody>
                    {emails.map((email) => (
                        <tr
                            key={email._id}
                            className={`border-t h-16 hover:bg-gray-200 ${selectedEmail === email._id ? 'bg-blue-100' : ''}`}
                            onClick={() => handleEmailSelect(email)}
                        >
                            <td className="p-2">
                                <input
                                    type="checkbox"
                                    checked={selectedEmail === email._id}
                                    onChange={() => handleEmailSelect(email)}
                                    className="mr-2"
                                />
                            </td>
                            <td className="p-2 font-bold">{email.owner}</td>
                            <td className="p-2 font-bold">{email.subject}</td>
                            <td className="p-2">Delivered</td>
                            <td className="p-2">Reply</td>
                            <td className="p-2">{email.body}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GetTemplateEmail;
