import { TSeminar } from '../../types/types';
import './seminarsList.css';
import { FC } from 'react';
import { SeminarItem } from '../seminarItem/seminarItem';

type SeminarsListProps = {
  seminars: TSeminar[];
};

export const SeminarList: FC<SeminarsListProps> = ({ seminars }) => {
  
  return (
    <ul className='seminarsList'>
      {seminars.map((seminar) => (
        <SeminarItem key={seminar.id} seminar={seminar}></SeminarItem>
      ))}
    </ul>
  )


};



