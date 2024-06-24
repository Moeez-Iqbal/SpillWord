// src/components/EmailList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetTemplateEmail = () => {
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const response = await axios.get('http://localhost:3001/gettempelate`');
                setEmails(response.data);
            } catch (error) {
                console.error('Error fetching templates:', error);
            }
        };

        fetchTemplates();
    }, []);

    return (
        <div className="p-4">
            <div className="flex items-center justify-between pb-2">
                <button className="px-4 py-2 bg-blue-500 text-white rounded">Show Filters</button>
            </div>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Star</th>
                        <th className="py-2">Sender</th>
                        <th className="py-2">Subject</th>
                        <th className="py-2">Content</th>
                        <th className="py-2">Delivery</th>
                        <th className="py-2">Reply</th>
                        <th className="py-2">Interested</th>
                        <th className="py-2">Opt out</th>
                        <th className="py-2">Stats</th>
                        <th className="py-2">Time</th>
                    </tr>
                </thead>
                <tbody>
                    {emails.map((email) => (
                        <tr key={email._id} className="border-t">
                            <td className="p-2"><input type="checkbox" /></td>
                            <td className="p-2">{email.owner}</td>
                            <td className="p-2">{email.subject}</td>
                            <td className="p-2">{email.body}</td>
                            <td className="p-2">Delivered</td>
                            <td className="p-2">Reply</td>
                            <td className="p-2">Interested</td>
                            <td className="p-2">Opt out</td>
                            <td className="p-2"><a href="#" className="text-blue-500">Unlock more tracking stats!</a></td>
                            <td className="p-2">{new Date(email.createdAt).toLocaleTimeString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GetTemplateEmail;
