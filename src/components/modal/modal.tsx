import { createPortal } from 'react-dom';
import './modal.css'
import { FC, ReactNode, SyntheticEvent } from 'react';

type TModalProps = {
  onClose?: (e: SyntheticEvent) => void;
  children?: ReactNode;
};


const modalRoot = document.getElementById('modals');

export const Modal: FC<TModalProps> = ({ onClose, children }) => {
  return createPortal(
    <div className='modal'>
        <button className='button' type='button' onClick={onClose}>
          X
        </button>
      <div className='content'>{children}</div>
    </div>, modalRoot as HTMLDivElement
  )
}
