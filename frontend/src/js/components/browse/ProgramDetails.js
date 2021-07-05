import React from 'react';

const ProgramDetails = ({ className, program }) => {
  return <div className={className}>{program.title}</div>;
};

export default ProgramDetails;
