import React from 'react';

type ButtonType = {
  text: string;
  onClick?: () => void;
};

export default function Button({ text, onClick }: ButtonType) {
  return (
    <button
      className='bg-brand text-white
     py-2 px-4 rounded-sm hover:brightness-110'
      onClick={onClick}
    >
      {text}
    </button>
  );
}
