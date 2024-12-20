import React from 'react';
import { colorsFormSelector } from '../Styles/colors';

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

interface RadioFormProps {
  options: Option[];
  setOptions: Function;
  color?: string;
}

const RadioFormComponent: React.FC<RadioFormProps> = ({ options, setOptions, color = "futuro" }) => {

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    setOptions(options.map((option) => {
      if (option.id === id) {
        return { ...option, isSelected: !option.isSelected };
      }
      else {
        return { ...option, isSelected: false };
      }

    }));

  };

  const colorQuery = colorsFormSelector[color];

  return (
    <div className="w-full">
      <form className="w-full space-y-2">
        {options.map((option) => (

          <div key={option.id} className={`flex items-center border p-4 shadow-md rounded-xl ${option.isSelected ? colorQuery : `bg-white border-gray-200 text-${color}`}`}>
            <input
              type="radio"
              id={option.id}
              name="organizationType"
              value={option.value}
              checked={option.isSelected}
              onChange={handleOptionChange}
              disabled={option.disabled}
              className="mr-4"
            />
            <div className="flex flex-col">
              <label className="block font-nunito-sans text-md font-medium">{option.label}</label>
              {option.textTwo && <p className='font-nunito-sans text-md font-normal text-[#0A3323]' > ${parseInt(option.textTwo).toLocaleString('es-CO')}</p>}
              {option.textThree && <p className={`text-xs ${option.textThree === 'En mora' ? 'text-[#FB923C]' : 'text-[#6C9FFF]'}`}>{option.textThree}</p>}
            </div>
          </div>
        ))}
      </form>

    </div>
  );
};

export default RadioFormComponent;

