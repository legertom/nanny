'use client';

import { useContext, useState } from "react";
import { MessageData } from "../../components/Context/context";

interface IMessage {
  first_para?: string;
  second_para?: string;
  // Add additional fields as needed
}

const AboutPageDashboard = () => {
  const messageContext = useContext(MessageData);

  // Ensure that messageContext provides an object with message and setMessage
  const { message, setMessage } = messageContext || {};
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSuccess(false);
    setErrors([]);

    try {
      const response = await fetch("/api/about_page/1", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...message }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(true);
      } else {
        const errorData = await response.json();
        setErrors(errorData.errors);
      }
    } catch (error) {
      console.error("An error occurred during update:", error);
      // Handle error state
    }
  };

  const changeValues = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedMessage: IMessage = {
      ...message,
      [e.target.name]: e.target.value,
    };
    if (typeof setMessage === 'function') {
      setMessage(updatedMessage);
    } else {
      console.error('setMessage is not a function');
    }
  };


    return (
      <div className="flex h-screen bg-gray-100 p-10">
      <div className="max-w-3xl w-full space-y-8">
        <h1 className="text-4xl font-bold mb-6">About Page</h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="paragraphOne" className="block text-lg font-medium text-gray-700 mb-2">First Paragraph</label>
            <textarea
              id="paragraphOne"
              name="first_para"
              value={message ? message.first_para : null}
              onChange={changeValues}
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows={4}
            ></textarea>
          </div>
    
          <div className="mb-4">
            <label htmlFor="paragraphTwo" className="block text-lg font-medium text-gray-700 mb-2">Second Paragraph</label>
            <textarea
              id="paragraphTwo"
              name="second_para"
              value={message ? message.second_para : null}
              onChange={changeValues}
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows={4}
            ></textarea>
          </div>
    
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
          {success && <p className="text-green-600 font-bold">About Page updated successfully</p>}
        </form>
      </div>
    </div>
    
    );
};

export default AboutPageDashboard;
