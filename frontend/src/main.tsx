import React from "react";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { BoardsNavigationProvider } from "./providers/BoardsNavigationProvider";
import { FoldersNavigationProvider } from "./providers/FoldersNavigationProvider";
import { router } from "./routes";
import { setupStore } from "./store";
import "~/i18n";
import { OdeClientProvider, ThemeProvider } from "./utils/context.utils";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

console.log("init main");
if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line global-require
  import("@axe-core/react").then((axe) => {
    axe.default(React, root, 1000);
  });
}

const store = setupStore();

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: unknown) => {
      if (error === "0090") window.location.replace("/auth/login");
    },
  }),
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <OdeClientProvider
        params={{
          app: "magneto",
        }}
      >
        <ThemeProvider>
          <FoldersNavigationProvider>
            <BoardsNavigationProvider>
              <RouterProvider router={router} />
            </BoardsNavigationProvider>
          </FoldersNavigationProvider>
        </ThemeProvider>
      </OdeClientProvider>
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
);
