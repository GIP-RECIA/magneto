import { createContext, useContext, useEffect, useMemo } from "react";

import { OdeClientProps, OdeContextProps } from "@edifice-ui/react";
import { useTranslation } from "react-i18next";

import { confQuery, sessionQuery } from "./fakeData";

export const OdeClientContext = createContext<OdeContextProps | null>(null!);

export function OdeClientProvider({ children, params }: OdeClientProps) {
  const appCode = params.app;

  const { t } = useTranslation();
  const translatedAppCode = t(appCode);

  const init = confQuery?.isSuccess && sessionQuery?.isSuccess;

  useEffect(() => {
    const attributes = [
      {
        data: "html",
        value: sessionQuery?.data?.currentLanguage || "fr",
      },
      // #WB-3137 Disable the translation of the content of the page which provoced issues
      {
        data: "translate",
        value: "no",
      },
    ];

    attributes.forEach((attribute) => {
      return document
        .querySelector("html")
        ?.setAttribute(attribute.data, attribute.value as string);
    });
  }, [sessionQuery?.data]);

  useEffect(() => {
    document.title = `${translatedAppCode}`;
  }, [appCode, sessionQuery.data, translatedAppCode]);

  const values = useMemo(
    () => ({
      appCode,
      applications: confQuery?.data?.applications,
      confQuery,
      currentApp: confQuery?.data?.currentApp,
      currentLanguage: sessionQuery?.data?.currentLanguage,
      init,
      sessionQuery,
      user: sessionQuery?.data?.user,
      userDescription: sessionQuery?.data?.userDescription,
      userProfile: sessionQuery?.data?.userProfile,
    }),
    [appCode, confQuery, init, sessionQuery],
  );

  return (
    <OdeClientContext.Provider value={values}>
      {children}
    </OdeClientContext.Provider>
  );
}

export function useOdeClient() {
  const context = useContext(OdeClientContext);

  if (!context) {
    throw new Error(`Cannot be used outside of OdeClientProvider`);
  }
  return context;
}
