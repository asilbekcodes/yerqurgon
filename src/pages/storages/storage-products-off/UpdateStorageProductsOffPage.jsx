import BackButton from "@/components/atoms/back-button/BackButton";
import ErrorResult from "@/components/molecules/error-result/ErrorResult";
import PageLoader from "@/components/molecules/page-loader/PageLoader";
import PageTitle from "@/components/molecules/page-title/PageTitle";
import { prepareStorageProductOffForEdit } from "@/services/api/prepare-data/storage-products-off";
import {
  httpGetStorageProductOffOne,
  httpUpdateStorageProductOff,
} from "@/services/api/requests/storage-products-off.requests";
import { handleSuccessNotification, scrollToTop } from "@/utils/helpers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Breadcrumb, Col, Flex, Row } from "antd";
import { get } from "lodash";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import StorageProductOffForm from "./_components/StorageProductOffForm";
import { useUpdateBreadcrumbItems } from "./breadcrumbs/useUpdateBreadcrumb";

const UpdateStorageProductsOffPage = () => {
  const { t } = useTranslation();

  const { id } = useParams();

  const updateElementState = useQuery({
    queryKey: ["storage-product-off-one", id],
    queryFn: () => httpGetStorageProductOffOne(id),
    select: (response) => prepareStorageProductOffForEdit(response.data),
  });

  const handleSuccess = () => {
    scrollToTop();
    handleSuccessNotification(t("Muvaffaqiyatli bajarildi !"));
    updateElementState.refetch();
  };

  const { isPending, mutateAsync } = useMutation({
    mutationFn: httpUpdateStorageProductOff,
    onSuccess: handleSuccess,
    onError: (error) => {
      scrollToTop();
      console.log(error);
    },
  });

  const handleSubmit = async (values, reset) => {
    mutateAsync({ id, data: values });
  };

  const BREADCRUMB_ITEMS = useUpdateBreadcrumbItems();

  return (
    <>
      <Helmet>
        <title>{t("Tahrirlash")}</title>
      </Helmet>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Flex align="center" justify="space-between">
            <PageTitle>{t("Tahrirlash")}</PageTitle>
            <BackButton />
          </Flex>
        </Col>
        <Col span={24}>
          <Breadcrumb items={BREADCRUMB_ITEMS} />
        </Col>
        <Col span={24}>
          {updateElementState.isLoading ? (
            <PageLoader />
          ) : (
            <>
              {updateElementState.error ? (
                <ErrorResult error={updateElementState.error} />
              ) : (
                <StorageProductOffForm
                  handleSubmit={handleSubmit}
                  defaultValues={{
                    ...get(updateElementState, "data", []),
                  }}
                  actionLoading={isPending}
                />
              )}
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default UpdateStorageProductsOffPage;
