import React from "react";
import * as ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import { Provider } from "react-redux";
import { persistor, store } from "./shared/stores/store";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
