// src/components/EmailList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetTemplateEmail = () => {
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const response = await axios.get('http://localhost:3000/gettempelate'); // Corrected endpoint URL
                setEmails(response.data);
            } catch (error) {
                console.error('Error fetching templates:', error);
            }
        };

        fetchTemplates();
    }, []); // Empty dependency array to fetch data once when component mounts

    return (
        <div className="p-4">
            <div className="flex items-center justify-between pb-2">
                <button className="px-4 py-2 bg-blue-500 text-white rounded">Show Filters</button>
            </div>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Subject</th>
                        <th className="py-2">Delivered</th>
                        <th className="py-2">Name</th>
                        <th className="py-2">Reply</th>
                        <th className="py-2">Body</th>
                    </tr>
                </thead>
                <tbody>
                    {emails.map((email) => (
                        <tr key={email._id} className="border-t">
                            <td className="p-2">{email.subject}</td>
                            <td className="p-2">Delivered</td>
                            <td className="p-2">{email.owner}</td>
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
