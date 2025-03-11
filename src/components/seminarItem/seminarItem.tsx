import './seminarItem.css';
import { FC, SyntheticEvent, useState } from 'react';
import { TSeminar } from '../../types/types';
import { useDispatch, useSelector } from '../../store/store';
import { fetchDeleteSeminar, selectSeminarsIsLoading } from '../../slices/seminarsSlice/seminarsSlice';
import { Modal } from '../modal/modal';
import { SeminarItemEditForm } from '../seminarItemEditForm/seminarItemEditForm';
import { Preloader } from '../preloader/preloader';

type SeminarItemProps = {
  seminar: TSeminar;
};

export const SeminarItem: FC<SeminarItemProps> = ({seminar}) => {
  const {id, title, description, photo} = seminar;
  const dispatch = useDispatch();

  const[visisble, setVisible] = useState<boolean>(false);

  const isLoading = useSelector(selectSeminarsIsLoading);
  
  const handleDelete = (e: SyntheticEvent) => {
    dispatch(fetchDeleteSeminar({id}));
  };

  const handleOpenModal = (e: SyntheticEvent) => {
    setVisible(!visisble);
  };

  return (
    <>
      <li key={id} className='seminarItem'>
        <span className='titleSeminar'>{title}</span>
        <div className='containerSeminarFoto'>
          <img src={photo} className='seminarFoto'></img>
          <p className='seminarDescription'>{description}</p>
        </div>
        <div className='containerSeminarButtons'>
          <button onClick={handleOpenModal} className='buttonEdit'>Редактировать</button>
          <button onClick={handleDelete} className='buttonDelete'>Удалить</button>
        </div>
        </li>
        {visisble && (
          <Modal onClose={handleOpenModal}>
            <SeminarItemEditForm
              id={id}
              title={title}
              description={description}
              photo={photo}
              visible={() => setVisible(!visisble)}
            />
          </Modal>
        )}
        {isLoading && (
          <Modal onClose={handleOpenModal}>
            <Preloader/>
          </Modal>
        )}
    </>

  )

}