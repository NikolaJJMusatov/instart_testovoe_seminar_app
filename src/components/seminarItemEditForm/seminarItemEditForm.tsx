import { FC, SyntheticEvent, useState } from 'react';
import './seminarItemEditForm.css';
import { useDispatch, useSelector } from '../../store/store';
import { clearErrorState, fetchEditSeminar, selectSeminarsError } from '../../slices/seminarsSlice/seminarsSlice';
import dayjs from 'dayjs';

type SeminarItemEditFormProps = {
  id: number;
  title: string;
  description: string;
  photo: string;
  visible: () => void
};

export const SeminarItemEditForm: FC<SeminarItemEditFormProps> = ({id, title, description, photo, visible}) => {
  
  const [titleState, setTitleState] = useState<string>(title);
  const [descriptionState, setDescriptionState] = useState<string>(description);
  const [photoUrlState, setphotoUrlState] = useState<string>(photo);

  const error = useSelector(selectSeminarsError);

  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchEditSeminar({
      id: id,
      title: titleState,
      description: descriptionState,
      photo: photoUrlState,
      date: dayjs().format('DD.MM.YYYY'),
      time: dayjs().format('HH:mm'),
    }))

    if (error === undefined) {
      visible();
      dispatch(clearErrorState());
    }
  }

  return (
    <>
    <form
      name='seminarEdit'
      className='formSeminarEdit'
    >
      <div className='formContainerSeminarEdit'>
        <label htmlFor="seminarEditTitle">title</label>
        <input
          placeholder='отредактируйте title'
          className='formSeminarEditInput'
          onChange={(e) => setTitleState(e.target.value)}
          name='seminarEditTitle'
          value={titleState}
          maxLength={50}
          required
        />
        <label htmlFor="seminarEditDescription">description</label>
        <textarea
          placeholder='отредактируйте description'
          className='formSeminarEditTextArea'
          onChange={(e) => setDescriptionState(e.target.value)}
          value={descriptionState}
          name='seminarEditDescription'
          maxLength={500}
          required
        />
        <label htmlFor="seminarEditPhotoUrl">photoUrl</label>
        <input
          placeholder='отредактируйте photoUrl'
          className='formSeminarEditInput'
          onChange={(e) => setphotoUrlState(e.target.value)}
          value={photoUrlState}
          name='seminarEditPhotoUrl'
          maxLength={30}
          required
        />
      </div>
      <button
        id='seminarEditButton'
        className='formSeminarEditButton'
        onClick={handleSubmit}
      >
        Сохранить изменения
      </button>
    </form>
    {error && (
      <div>
        {error}
      </div>
    )}
    </>
  )
}