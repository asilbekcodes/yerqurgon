import CustomLineChart from "@/components/atoms/charts/custom-line-chart/CustomLineChart";
import CustomStatisticsCard from "@/components/atoms/custom-statistics-card/CustomStatisticsCard";
import CustomDatePicker from "@/components/atoms/form-elements/custom-date-picker/CustomDatePicker";
import CustomDataTable from "@/components/molecules/custom-data-table/CustomDataTable";
import ErrorResult from "@/components/molecules/error-result/ErrorResult";
import PageLoader from "@/components/molecules/page-loader/PageLoader";
import {
  httpGetStorageStatisticsMonthly,
  httpGetTradeStatisticsMonthly,
} from "@/services/api/requests/statistics.request";
import useCompanyStore from "@/store/useCompanyStore";
import { NumberToThousandFormat, getMonthName } from "@/utils/helpers";
import {
  RiCalendarScheduleFill,
  RiCashFill,
  RiMoneyDollarBoxFill,
  RiShoppingCartFill,
} from "@remixicon/react";
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Flex, Row, Typography } from "antd";
import dayjs from "dayjs";
import { get } from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const MonthlyStatitics = () => {
  const { t } = useTranslation();
  const {
    company: { currency_type },
  } = useCompanyStore();

  const [date, setDate] = useState(dayjs().format("YYYY-MM")); // Boshlang'ich qiymat hozirgi sana

  const { data, isLoading, error } = useQuery({
    queryKey: ["storage-monthly", date],
    queryFn: () => httpGetStorageStatisticsMonthly(date),
    select: (response) => response.data,
    enabled: !!date, // date mavjud bo'lsa, query ni faollashtirish
  });

  return (
    <Row gutter={[20, 20]}>
      <Col xs={24}>
        <Flex align="center" justify="space-between">
          <Typography.Title level={5}>{t("Oylik statistika")}</Typography.Title>
          <CustomDatePicker
            style={{ width: "200px" }}
            picker="month"
            value={dayjs(date)}
            format="YYYY-MM"
            onChange={(date, dateString) => {
              setDate(dateString);
            }}
          />
        </Flex>
      </Col>
      <Col xs={24}>
        {isLoading ? (
          <PageLoader />
        ) : (
          <>
            {error ? (
              <ErrorResult error={error} />
            ) : (
              <>
                <Flex gap={"20px"} vertical>
                  <Row gutter={[20, 20]}>
                    <Col xs={24} md={6}>
                      <CustomStatisticsCard
                        title={
                          <Typography.Title level={4}>
                            {t("Oy")}
                          </Typography.Title>
                        }
                        value={getMonthName(date)}
                        formatter={(value) => `${value}`}
                        prefix={<RiCalendarScheduleFill />}
                      />
                    </Col>
                    <Col xs={24} md={6}>
                      <CustomStatisticsCard
                        title={
                          <Typography.Title level={4}>
                            {t("Savdolar soni")}
                          </Typography.Title>
                        }
                        value={get(data, "total_count", 0)}
                        precision={2}
                        prefix={<RiShoppingCartFill />}
                        suffix={t("ta")}
                      />
                    </Col>
                    <Col xs={24} md={6}>
                      <CustomStatisticsCard
                        title={
                          <Typography.Title level={4}>
                            {t("Savdolar summasi")}
                          </Typography.Title>
                        }
                        value={get(data, "total_summa", 0)}
                        precision={2}
                        prefix={<RiMoneyDollarBoxFill />}
                        suffix={currency_type}
                      />
                    </Col>
                    <Col xs={24} md={6}>
                      <CustomStatisticsCard
                        title={
                          <Typography.Title level={4}>
                            {t("To'lovlar")}
                          </Typography.Title>
                        }
                        value={get(data, "total_payments", 0)}
                        precision={2}
                        prefix={<RiCashFill />}
                        suffix={currency_type}
                      />
                    </Col>
                    <Col xs={24} md={24}>
                      <GraphByCount data={data} />
                    </Col>
                    <Col xs={24} md={24}>
                      <GraphBySumma data={data} />
                    </Col>
                    <Col xs={24} md={24}>
                      <DataTable data={data} />
                    </Col>
                  </Row>
                </Flex>
              </>
            )}
          </>
        )}
      </Col>
    </Row>
  );
};

export default MonthlyStatitics;

const GraphByCount = ({ data }) => {
  const { t } = useTranslation();

  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const DATA = get(data, "daily_stats", []).map((item, index) => ({
      type: item.date,
      value: item.total_count,
    }));
    setGraphData(DATA);
  }, [data]);

  const config = {
    data: graphData,
  };

  return (
    <Card title={t("Savdolar soni (kunlar bo'yicha)")}>
      <CustomLineChart config={config} />
    </Card>
  );
};

const GraphBySumma = ({ data }) => {
  const { t } = useTranslation();

  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const DATA = get(data, "daily_stats", []).map((item, index) => ({
      type: item.date,
      value: item.total_summa,
    }));
    setGraphData(DATA);
  }, [data]);

  const config = {
    data: graphData,
  };

  return (
    <Card title={t("Savdolar summasi (kunlar bo'yicha)")}>
      <CustomLineChart config={config} />
    </Card>
  );
};

const DataTable = ({ data }) => {
  const { t } = useTranslation();

  const columns = [
    {
      title: t("Sana"),
      dataIndex: "date",
    },
    {
      title: t("Savdolar soni"),
      dataIndex: "total_count",
      render: (value) => {
        return <>{NumberToThousandFormat(value, t("ta"))}</>;
      },
      sorter: (a, b) => a.total_count - b.total_count,
    },
    {
      title: t("Savdolar summasi"),
      dataIndex: "total_summa",
      render: (value) => {
        return <>{NumberToThousandFormat(value)}</>;
      },
      sorter: (a, b) => a.total_summa - b.total_summa,
    },
    {
      title: t("To'lovlar"),
      dataIndex: "total_payments",
      render: (value) => {
        return <>{NumberToThousandFormat(value)}</>;
      },
      sorter: (a, b) => a.total_payments - b.total_payments,
    },
  ];

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const DATA = get(data, "daily_stats", []).map((item, index) => ({
      ...item,
    }));
    setTableData(DATA);
  }, [data]);

  return (
    <CustomDataTable
      title={t("Savdolar (kunlar bo'yicha)")}
      dataSource={tableData}
      columns={columns}
      pagination={false}
    />
  );
};
