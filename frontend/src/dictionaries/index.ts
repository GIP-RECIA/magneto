import { Resource } from "i18next";

import de from "./i18n/de.json";
import en from "./i18n/en.json";
import es from "./i18n/es.json";
import fr from "./i18n/fr.json";
import it from "./i18n/it.json";
import pt from "./i18n/pt.json";

const dictionaries = {
  de,
  en,
  es,
  fr,
  it,
  pt,
};

const resources: Resource = {};
Object.keys(dictionaries).forEach((k: string) => {
  resources[k] = {
    magneto: dictionaries[k],
  };
});

export { resources };
