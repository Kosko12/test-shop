import { ToastContainer } from 'react-toastify';
import './App.css';
import Header from './components/Header.component';
import Listing from './components/Listing.component';
import { Modal } from './components/Modal.component';
import { useModalContext } from './features/context/ModalContext';

function App() {
  const { isOpen, openModal, closeModal } = useModalContext();
  return (
    <div className="App">
      {/* <button style={{cursor: 'pointer'}}onClick={() => openModal()}>Otwórz modal</button> */}
      <Header/>
      <Listing/>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <></>
      </Modal>  
      <ToastContainer limit={5} autoClose={1500} position='bottom-right'/>
    </div>
  );
}

export default App;
