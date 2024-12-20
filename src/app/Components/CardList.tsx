import Card from '@/app/Components/card';
import React from 'react';

interface CardProps {
  label: string;
  textOne?: string;
  textTwo?: string;
  textThree?: string;
}

const CardList: React.FC<CardProps> = ({ label, textOne, textTwo, textThree }) => {
  return (
    <div className="w-full p-2">
      <Card>
        <div className="flex flex-col p-2 ">
          <p className="block font-nunito-sans text-md font-medium text-[#5782F2]">{label}</p>
          {textOne && <p className="font-nunito-sans text-md font-normal text-[#0A3323]">$ {textOne}</p>}
          {textThree && <p className="font-nunito-sans text-md font-normal text-[#0A3323]">{textThree}</p>}
          {textTwo && <p className={`text-xs ${textTwo === 'En mora' ? 'text-[#FB923C]' : 'text-[#6C9FFF]'}`}>{textTwo}</p>}
        </div>
      </Card>
    </div>
  );
};

export default CardList;

