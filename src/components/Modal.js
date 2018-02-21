import React from 'react';
import Modal from 'react-modal';
import PaintingContainer from '../containers/PaintingContainer'

export default props => {
  const {state, title, words, isOpen, handleCloseModal, shouldCloseOnOverlayClick, setName, handleCancel, whichModal, handleCloseModal2} = props;

  const ModalSave = <Modal
    closeTimeoutMS={150}
    isOpen={isOpen}
    handleCloseModal={handleCloseModal}
    setName={setName}
    handleCancel={handleCancel}
    className="flex mt-8 pt-8 justify-center"
    >
      <form className="w-full max-w-sm mt-8 bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4 justify-center" onSubmit={handleCloseModal}>
      <label className="block text-grey font-bold text-center mb-1 py-4" >
      Give your painting a title
      </label>
        <div className="flex justify-center mb-6">
          <div>
            <label className="align-middle text-center inline block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4" >
              Title:
            </label>
          </div>
          <div >
            <input className="bg-grey-lighter appearance-none border-2 border-grey-lighter hover:border-purple rounded w-full py-2 px-4 text-grey-darker " id="inline-full-name" name='painting name' onChange={setName} type="text" placeholder="Painting Title" required></input>
          </div>
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

  const ModalImg = <Modal
    state={state}
    closeTimeoutMS={150}
    isOpen={isOpen}
    handleCloseModal={handleCloseModal2}
    className="flex mt-8 pt-8 justify-center"
    >
      <form className="w-auto h-full bg-white shadow-md rounded pb-8 mb-4 justify-center" onSubmit={handleCloseModal}>
        <div className="flex-1 justify-center">
        <button className="shadow bg-purple hover:bg-purple-light text-white font-bold py-2 px-4 justify-center rounded" type="submit">
          Close
        </button>
          <div className='flex-1' >
            <img id="image" className="h-auto" src={state.img}></img>
          </div>
        </div>
      </form>
  </Modal>

  return (
    <div>
    {whichModal === 'ModalSave'? ModalSave : ModalImg}
    </div>
  );
}
