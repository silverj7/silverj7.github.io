import React, { useState } from 'react';
import Modal from 'react-modal';

type Props = {};

const CarouselModalComponent = (props: Props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  export const openModal = () => {
    setModalIsOpen(true);
  };

  export const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>모달 제목</h2>
        <p>모달 내용</p>
        <button onClick={closeModal}>닫기</button>
      </Modal>
    </div>
  );
};

export default CarouselModalComponent;
