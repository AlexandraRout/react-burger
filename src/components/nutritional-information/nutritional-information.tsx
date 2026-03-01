import React from 'react';
import nutritionalInformation from './nutritional-information.module.css';

interface INutritionalInformationProps {
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
}

export default function NutritionalInformation({
  calories, proteins, fat, carbohydrates,
}: INutritionalInformationProps) {
  const nutritionalInfo = [
    { label: 'Калории, ккал', value: calories },
    { label: 'Белки, г', value: proteins },
    { label: 'Жиры, г', value: fat },
    { label: 'Углеводы, г', value: carbohydrates },
  ];

  return (
    <div className={nutritionalInformation.nutritional_information}>
      {nutritionalInfo.map(({ label, value }) => (
        <div key={label} className={nutritionalInformation.nutritional_information_container}>
          <p className="text text_type_main-default text_color_inactive">{label}</p>
          <p className="text text_type_digits-default text_color_inactive">{value}</p>
        </div>
      ))}
    </div>
  );
}
