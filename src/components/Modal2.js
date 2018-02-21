import React from 'react';
import Modal from 'react-modal';
import PaintingContainer from '../containers/PaintingContainer'

export default props => {
  const {state, title, words, isOpen, handleCloseModal, shouldCloseOnOverlayClick, setName, handleCancel} = props;

  return (
    <Modal
      closeTimeoutMS={150}
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
      setName={setName}
      handleCancel={handleCancel}
      className="flex mt-8 pt-8 justify-center"
      >
        <form className="w-full max-w-sm mt-8 bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4 justify-center" onSubmit={handleCloseModal}>
        <label className="block text-grey font-bold text-center mb-1 py-4" >
        You need to be logged in to save a canvas
        </label>
          <div className="flex justify-center mb-6">
          </div>
          <div className="flex mb-6 justify-center ">
          <div className="px-4">
            <button className="shadow bg-purple hover:bg-purple-light text-white font-bold py-2 px-4 justify-center rounded" type="submit">
              Save Painting
            </button>
          </div>
          <div className="px-4 ml-2 mr-2">
            <button className="shadow bg-purple hover:bg-purple-light text-white font-bold py-2 px-4 justify-center rounded" onClick={handleCancel}>
              Cancel
            </button>
          </div>
          </div>
        </form>
    </Modal>
  );
}
