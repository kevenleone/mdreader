import * as React from 'react';

export const Button = ({ children = 'Boo1p' }) => {
  return (
    <button className="bg-black rounded text-teal-900 font-bold p-3">
      {children}
    </button>
  );
};
