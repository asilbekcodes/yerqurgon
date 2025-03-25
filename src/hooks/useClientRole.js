import { useTranslation } from "react-i18next";

const useClientRole = () => {
  const { t } = useTranslation();
  return [
    { text: t("Director"), label: t("Director"), value: "DIRECTOR" },
    { text: t("Manager"), label: t("Manager"), value: "MENAGER" },
    { text: t("Do‘kon egasi"), label: t("Do‘kon egasi"), value: "" },
    { text: t("Yetkazib beruvchi"), label: t("Yetkazib beruvchi"), value: "DELIVER" },
    { text: t("Sklatchi"), label: t("Sklatchi"), value: "SHOPKEEPER" },
  ];
};

export default useClientRole;
