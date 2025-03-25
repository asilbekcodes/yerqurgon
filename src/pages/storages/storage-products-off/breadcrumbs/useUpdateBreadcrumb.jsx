import { RiHomeOfficeFill } from "@remixicon/react";
import { Flex } from "antd";
import { useTranslation } from "react-i18next";
import { NavLink, useParams } from "react-router-dom";

export const useUpdateBreadcrumbItems = () => {
  const { t } = useTranslation();

  const { id } = useParams();

  return [
    {
      title: (
        <Flex align="center" gap="small">
          <RiHomeOfficeFill size={20} />
          <span>{t("Omborxona")}</span>
        </Flex>
      ),
    },
    {
      title: (
        <NavLink to={"/storages/storage-products-off"}>
          {t("Yaroqsiz mahsulotlar")}
        </NavLink>
      ),
    },
    {
      title: t("Tahrirlash"),
    },
    {
      title: id,
    },
  ];
};
