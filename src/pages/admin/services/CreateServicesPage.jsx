import BackButton from "@/components/atoms/back-button/BackButton";
import PageTitle from "@/components/molecules/page-title/PageTitle";
import { httpPostService } from "@/services/api/requests/services.requests";
import { handleSuccessNotification, scrollToTop } from "@/utils/helpers";
import { useMutation } from "@tanstack/react-query";
import { Breadcrumb, Col, Flex, Row } from "antd";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import ServiceForm from "./_components/ServiceForm";
import { useCreateBreadcrumbItems } from "./breadcrumbs/useCreateBreadcrumb";

const CreateServicesPage = () => {
  const { t } = useTranslation();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: httpPostService,
    onSuccess: () => {
      scrollToTop();
      handleSuccessNotification(t("Muvaffaqiyatli bajarildi !"));
    },
    onError: (error) => {
      scrollToTop();
      console.log(error);
    },
  });

  const handleSubmit = async (values, reset) => {
    const response = await mutateAsync(values);

    if (response?.status === 201) {
      reset();
    }
  };

  const BREADCRUMB_ITEMS = useCreateBreadcrumbItems();

  return (
    <>
      <Helmet>
        <title>{t("Xizmat qo'shish")}</title>
      </Helmet>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Flex align="center" justify="space-between">
            <PageTitle>{t("Xizmat qo'shish")}</PageTitle>
            <BackButton />
          </Flex>
        </Col>
        <Col span={24}>
          <Breadcrumb items={BREADCRUMB_ITEMS} />
        </Col>
        <Col span={24}>
          <ServiceForm
            handleSubmit={handleSubmit}
            defaultValues={{}}
            actionLoading={isPending}
          />
        </Col>
      </Row>
    </>
  );
};

export default CreateServicesPage;
