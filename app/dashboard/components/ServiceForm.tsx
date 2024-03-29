import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Service {
  title: string;
  description: string;
}

interface ServiceFormProps {
  onSave: (service: Service) => void;
  initialService?: Service;
}

const ServiceForm: React.FC<ServiceFormProps> = ({
  onSave,
  initialService = { title: '', description: '' }, // Provide default values
}) => {
  const [service, setService] = useState<Service>(initialService);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(service);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-lg font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={service.title}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 shadow-sm rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          id="description"
          value={service.description}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 shadow-sm rounded-md"
          rows={4}
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Save Service
      </button>
    </form>
  );
};

export default ServiceForm;
