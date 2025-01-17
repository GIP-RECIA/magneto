import { EmptyScreen } from "@edifice-ui/react";
import { useTranslation } from "react-i18next";

import { useOdeClient, useOdeTheme } from "~/utils/context.utils";

export default function EmptyScreenApp(): JSX.Element {
  const { appCode } = useOdeClient();
  const { theme } = useOdeTheme();
  const { t } = useTranslation("magneto");

  return (
    <EmptyScreen
      imageSrc={`${theme?.bootstrapPath}/images/emptyscreen/illu-${appCode}.svg`}
      imageAlt={t("explorer.emptyScreen.app.alt")}
      title={t("explorer.emptyScreen.blog.title.create")}
      text={"Oops"}
    />
  );
}
