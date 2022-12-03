import { TodosProvider } from "context/todoContext";
import { UserProvider } from "context/userContext";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "styles/global-styles";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <UserProvider>
    <TodosProvider>
      <BrowserRouter>
        <GlobalStyle />
        <App />
      </BrowserRouter>
    </TodosProvider>
  </UserProvider>,
);

reportWebVitals();
