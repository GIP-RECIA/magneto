import { IGetConf, IGetSession } from "edifice-ts-client";

const sessionQuery: { isSuccess: boolean; data: IGetSession } = {
  isSuccess: true,
  data: {
    user: undefined,
    currentLanguage: undefined,
    quotaAndUsage: {
      quota: 0,
      storage: 0,
    },
    userDescription: {},
    userProfile: undefined,
    bookmarkedApps: [],
  },
};
const confQuery: { isSuccess: boolean; data: IGetConf } = {
  isSuccess: true,
  data: {
    app: "",
    applications: [],
    conf: {
      dependencies: {
        themes: {},
        widgets: {},
      },
      emitWrapper: false,
      overriding: [],
    },
    currentApp: undefined,
    theme: {
      basePath: "",
      bootstrapPath: "",
      bootstrapVersion: "",
      is1d: false,
      logoutCallback: "",
      skin: "",
      skinName: "",
      skins: [],
      themeName: "",
      themeUrl: "",
    },
  },
};

export { sessionQuery, confQuery };
