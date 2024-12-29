import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.jsx";
import "./index.css";
import AuthProvider from "./provider/AuthProvider";
import { store } from "./redux/store";


const queryClient = new QueryClient()
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    </Provider>
    </AuthProvider>
  </StrictMode>
);
