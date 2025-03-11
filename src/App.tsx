import { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from './store/store';
import { fetchSeminars, selectSeminars, selectSeminarsIsLoading } from './slices/seminarsSlice/seminarsSlice';
import { SeminarList } from './components/seminarsList/seminarsList';
import { Modal } from './components/modal/modal';
import { Preloader } from './components/preloader/preloader';


function App() {
  const dispatch = useDispatch();
  const seminars = useSelector(selectSeminars);
  const isLoading = useSelector(selectSeminarsIsLoading);

  useEffect(() => {
    dispatch(fetchSeminars());
  }, []);

  return (
    <>
      <section className='section'>
        <SeminarList seminars={seminars}></SeminarList>
      </section>
      {isLoading && (
        <Modal>
          <Preloader/>
        </Modal>
      )}
    </>
  )
}

export default App
