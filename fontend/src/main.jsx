import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/Router.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { FinancialRecordsProvider } from "./contexts/Financial.context.jsx";

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <FinancialRecordsProvider>
        <RouterProvider router={router}></RouterProvider>
      </FinancialRecordsProvider>
    </ClerkProvider>
  </StrictMode>
);
