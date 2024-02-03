import React from 'react';

// Define a type for the component props
type FAQAnswerProps = {
  answer: string;
};

const FAQAnswer: React.FC<FAQAnswerProps> = ({ answer }) => {
  return <p>{answer}</p>;
};

export default FAQAnswer;