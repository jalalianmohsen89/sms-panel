import store from "@/core/store";
import ThemeProvider from "@/core/theme/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./core/assets/css/index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store as any}>
      <ThemeProvider />
    </Provider>
  </QueryClientProvider>
);
