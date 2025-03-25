import ExampleFileUrl from "@/assets/file/Service_example.xlsx";
import ClearFilterButton from "@/components/atoms/clear-filter-button/ClearFilterButton";
import CreateButton from "@/components/atoms/create-button/CreateButton";
import CustomDataTable from "@/components/molecules/custom-data-table/CustomDataTable";
import GlobalSearchInput from "@/components/molecules/global-search-input/GlobalSearchInput";
import PageTitle from "@/components/molecules/page-title/PageTitle";
import UploadButton from "@/components/molecules/upload-button/UploadButton";
import { httpImportClients } from "@/services/api/requests/clients.requests";
import {
  httpGetServices,
  httpImportServices,
} from "@/services/api/requests/services.requests";
import { objectToQueryString } from "@/utils/helpers";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Col, Flex, Row } from "antd";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useListBreadcrumbItems } from "./breadcrumbs/useListBreadcrumb";
import { useServiceColumns } from "./useServiceColumns";

const ServicesPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: null,
  });

  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState("");

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
    isRefetching,
    ...rest
  } = useQuery({
    queryKey: [
      "services",
      {
        page: pagination.current,
        pageSize: pagination.pageSize,
        filters: filters,
      },
    ],
    queryFn: () =>
      httpGetServices(
        pagination.current,
        pagination.pageSize,
        objectToQueryString(filters)
      ),
    select: (response) => response.data,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (data) {
      setPagination({
        current: data.current || 1,
        pageSize: data.pageSize || 10,
        total: data.total || "",
      });
    }
  }, [data]);

  const handleTableChange = (pagination, tabelFilters) => {
    setPagination({
      ...pagination,
    });
    setFilters(tabelFilters);
  };

  const clearFilters = () => {
    setFilters({});
    setSearch("");
  };

  const handleOnSearch = (value) => {
    setFilters({ ...filters, search: value });
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const TABLE_COLUMNS = useServiceColumns(
    pagination,
    filters,
    setFilters,
    refetch
  );
  const BREADCRUMB_ITEMS = useListBreadcrumbItems();

  console.log(data);

  return (
    <>
      <Helmet>
        <title>{t("Xizmatlar")}</title>
      </Helmet>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Flex align="center" justify="space-between">
            <PageTitle>{t("Xizmatlar")}</PageTitle>
          </Flex>
        </Col>
        <Col span={24}>
          <Breadcrumb items={BREADCRUMB_ITEMS} />
        </Col>
        <Col span={24}>
          <Row gutter={[20, 20]}>
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <GlobalSearchInput
                value={search}
                enterButton
                onSearch={handleOnSearch}
                onChange={handleChangeSearch}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={18} xl={18}>
              <Flex align="center" justify="end" gap="middle">
                <UploadButton
                  uploadRequest={httpImportServices}
                  refetch={refetch}
                  ExampleFileUrl={ExampleFileUrl}
                />
                <ClearFilterButton onClick={clearFilters} />
                <CreateButton onClick={() => navigate("create")} />
              </Flex>
            </Col>
            <Col span={24}>
              <CustomDataTable
                columns={TABLE_COLUMNS}
                data={data?.results || []}
                pagination={pagination}
                loading={isLoading || isRefetching}
                onChange={handleTableChange}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default ServicesPage;
