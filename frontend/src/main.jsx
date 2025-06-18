// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import ErrorBoundary from "./components/ErrorBoundary.jsx";
// import App from "./App.jsx";
// import "./index.css";

// export const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: 1,
//       retryDelay: attemptIndex => Math.min(1000 * attemptIndex, 3000),
//       staleTime: 10000,
//       refetchOnWindowFocus: false,
//     },
//   },
// });


// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <BrowserRouter>
//       <QueryClientProvider client={queryClient}>
//         <ErrorBoundary>
//           <App />
//         </ErrorBoundary>
//         <ReactQueryDevtools initialIsOpen={false} />
//       </QueryClientProvider>
//     </BrowserRouter>
//   </StrictMode>
// );
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import App from "./App.jsx";
import "./index.css";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      retryDelay: attemptIndex => Math.min(1000 * attemptIndex, 3000),
      staleTime: 10000,
      refetchOnWindowFocus: false,
    },
  },
});

const rootElement = document.getElementById("root");

// ✅ Prevent duplicate root initialization during hot reload
if (!rootElement._reactRootContainer) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </BrowserRouter>
    </StrictMode>
  );
}
