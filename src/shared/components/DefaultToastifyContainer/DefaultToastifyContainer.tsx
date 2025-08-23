import type { FC } from 'react';
import { ToastContainer } from 'react-toastify';

const DefaultToastifyContainer: FC = () => {
  return (
    <ToastContainer
      position="bottom-left"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );
}

export default DefaultToastifyContainer;