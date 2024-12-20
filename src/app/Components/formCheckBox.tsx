import React, { useState } from 'react';

interface Option {
  id: string;
  label: string;
  value: string;
  textOne?: string;
  textTwo?: string;
  textThree?: string;
  disabled: boolean;
  isSelected: boolean;
}

interface CheckboxFormProps {
  options: Option[];
  setOptions: Function;
}

const CheckboxFormComponent: React.FC<CheckboxFormProps> = ({ options, setOptions }) => {

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setOptions(options.map((option) => {
      if (option.value === value) {
        return { ...option, isSelected: !option.isSelected };
      }
      return option;

    }));

  };

  return (
    <div className="w-full">
      <form className="w-full space-y-2">
        {options.map((option) => (

          <div key={option.id} className={`flex items-center border border-futuro-100 p-4 shadow-md rounded-xl ${option.isSelected ? 'bg-futuro-100' : 'bg-white'}`}>
            <input
              type="checkbox"
              id={option.id}
              name="organizationType"
              value={option.value}
              checked={option.isSelected}
              onChange={handleOptionChange}
              disabled={option.disabled}
              className="mr-4"
            />
            <div className="flex flex-col">
              <label className="block font-nunito-sans text-md font-medium text-[#5782F2] ">{option.label}</label>
              {option.textTwo && <p className='font-nunito-sans text-md font-normal text-[#0A3323]' > $ {parseInt(option.textTwo)}</p>}
              {option.textThree && <p className={`text-xs text-cimiento`}>{option.textThree}</p>}
            </div>
          </div>
        ))}
      </form>

    </div>
  );
};

export default CheckboxFormComponent;

