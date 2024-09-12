import {
  Layout as EdificeLayout,
  useOdeClient as edificeOdeClient,
  OdeClientProvider as EdificeOdeClientProvider,
  ThemeProvider as EdificeThemeProvider,
} from "@edifice-ui/react";

import { default as OpenLayout } from "~/open/components/Layout";
import {
  useOdeClient as openOdeClient,
  OdeClientProvider as OpenOdeClientProvider,
} from "~/open/utils/OdeClientProvider";
import { ThemeProvider as OpenThemeProvider } from "~/open/utils/ThemeProvider";

const isEntNgContext = false;

const Layout = isEntNgContext ? EdificeLayout : OpenLayout;

const useOdeClient = () =>
  isEntNgContext ? edificeOdeClient() : openOdeClient();

const OdeClientProvider = isEntNgContext
  ? EdificeOdeClientProvider
  : OpenOdeClientProvider;

const ThemeProvider = isEntNgContext ? EdificeThemeProvider : OpenThemeProvider;

export { Layout, useOdeClient, OdeClientProvider, ThemeProvider };
