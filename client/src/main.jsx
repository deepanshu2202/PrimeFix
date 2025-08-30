import App from "./App.jsx";
import { Provider } from "react-redux";
import store from './redux/store/store.js';
import { createRoot } from "react-dom/client";
import { SocketProvider } from "./context/SocketProvider.jsx";

createRoot(document.getElementById("root")).render(
  <SocketProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </SocketProvider>
);