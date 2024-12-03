import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from './redux/store/store.js';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <NextUIProvider>
      <Provider store={store}>
        <App />
        <Toaster />
      </Provider>
    </NextUIProvider>
  </BrowserRouter>
)


