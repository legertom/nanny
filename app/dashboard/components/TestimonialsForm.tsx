
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Testimonial {
  name: string;
  review: string;
}

interface TestimonialsFormProps {
  onSave: (testimonial: Testimonial) => void;
  initialTestimonial?: Testimonial;
}


const TestimonialsForm: React.FC<TestimonialsFormProps> = ({ onSave, initialTestimonial = { name: '', review: '' } }) => {
  const [testimonial, setTestimonial] = useState<Testimonial>(initialTestimonial);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTestimonial({ ...testimonial, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(testimonial);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={testimonial.name}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 shadow-sm rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="review" className="block text-lg font-medium text-gray-700">Review</label>
        <textarea
          name="review"
          id="review"
          value={testimonial.review}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 shadow-sm rounded-md"
          rows={3}
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Save Testimonial
      </button>
    </form>
  );
};

export default TestimonialsForm;
