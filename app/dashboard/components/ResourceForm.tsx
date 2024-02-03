
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Resource {
  title: string;
  url: string;
  description: string;
}

interface ResourceFormProps {
  onSave: (resource: Resource) => void;
  initialResource?: Resource;
}


const ResourceForm: React.FC<ResourceFormProps> = ({
  onSave,
  initialResource = { title: '', url: '', description: '' },
}) => {
  const [resource, setResource] = useState<Resource>(initialResource);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResource({ ...resource, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(resource);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-lg font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={resource.title}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 shadow-sm rounded-md"
        />
      </div>
      <div>
        <label htmlFor="url" className="block text-lg font-medium text-gray-700">URL</label>
        <input
          type="text"
          name="url"
          id="url"
          value={resource.url}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 shadow-sm rounded-md"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          id="description"
          value={resource.description}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 shadow-sm rounded-md"
          rows={3}
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Save Resource
      </button>
    </form>
  );
};

export default ResourceForm;
