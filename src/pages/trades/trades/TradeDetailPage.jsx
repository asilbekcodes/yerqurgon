"use client"

import BackButton from "@/components/atoms/back-button/BackButton"
import CustomTabs from "@/components/atoms/custom-tabs/CustomTabs"
import CardTitle from "@/components/molecules/card-title/CardTitle"
import CustomDataTable from "@/components/molecules/custom-data-table/CustomDataTable"
import CustomModalConfirm from "@/components/molecules/custom-modal-confirm/CustomModalConfirm"
import ErrorResult from "@/components/molecules/error-result/ErrorResult"
import PageLoader from "@/components/molecules/page-loader/PageLoader"
import PageTitle from "@/components/molecules/page-title/PageTitle"
import TitleAndIconText from "@/components/molecules/title-and-icon-text/TitleAndIconText"
import { httpDeletePaymentTrade, httpGetTradeOne } from "@/services/api/requests/trade.requests"
import { NumberToThousandFormat, formatTimeForUI, handleSuccessNotification } from "@/utils/helpers"
import { DeleteFilled } from "@ant-design/icons"
import {
  RiBankCardLine,
  RiCalendarTodoFill,
  RiCashLine,
  RiColorFilterFill,
  RiCopperCoinLine,
  RiListSettingsFill,
  RiMoneyDollarBoxFill,
  RiRefundFill,
  RiRefundLine,
  RiShakeHandsFill,
  RiSlideshowLine,
  RiStackFill,
  RiUser2Fill,
  RiUserSettingsFill,
  RiWallet3Fill,
} from "@remixicon/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Breadcrumb, Button, Card, Col, Divider, Flex, Row, Tabs, Tag } from "antd"
import { get, isEmpty } from "lodash"
import { Helmet } from "react-helmet-async"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import {
  default as AddPaymentForStorageProduct,
  default as AddPaymentForTrade,
} from "./_components/add-payment-for-trade/AddPaymentForTrade"
import { useDetailBreadcrumbItems } from "./breadcrumbs/useDetailBreadcrumb"

const TradeDetailPage = () => {
  const { id } = useParams()

  const { t } = useTranslation()

  const { data, isLoading, isError, error, isFetching, refetch, isRefetching, ...rest } = useQuery({
    queryKey: ["trade-one", id],
    queryFn: () => httpGetTradeOne(id),
    select: (response) => response.data,
  })

  const BREADCRUMB_ITEMS = useDetailBreadcrumbItems()

  return (
    <>
      <Helmet>
        <title>{t("Savdo")}</title>
      </Helmet>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Flex align="center" justify="space-between">
            <PageTitle>{t("Savdo")}</PageTitle>
            <BackButton />
          </Flex>
        </Col>
        <Col span={24}>
          <Breadcrumb items={BREADCRUMB_ITEMS} />
        </Col>
        <Col span={24}>
          {isLoading ? (
            <PageLoader />
          ) : (
            <>
              {error ? (
                <ErrorResult error={error} />
              ) : (
                <>
                  <>
                    <CustomTabs tabPosition={"top"}>
                      <Tabs.TabPane tab={t("Umumiy ma'lumotlar")} key="1">
                        <Row gutter={[20, 20]}>
                          <Col xs={24} md={16}>
                            <Card>
                              <Flex vertical gap={"large"}>
                                <TitleAndIconText
                                  title={t("Mijoz").toUpperCase()}
                                  value={get(data, "client.name", "")}
                                  icon={<RiUser2Fill />}
                                />
                                <TitleAndIconText
                                  title={t("Sana").toUpperCase()}
                                  value={formatTimeForUI(get(data, "date", ""))}
                                  icon={<RiCalendarTodoFill />}
                                />
                                <Divider />
                                <TitleAndIconText
                                  title={t("Mahsulot").toUpperCase()}
                                  value={NumberToThousandFormat(get(data, "total_product_summa", ""))}
                                  icon={<RiStackFill />}
                                />
                                <TitleAndIconText
                                  title={t("Qo'shimcha xizmatlar").toUpperCase()}
                                  value={NumberToThousandFormat(get(data, "total_service_summa", ""))}
                                  icon={<RiShakeHandsFill />}
                                />
                                <TitleAndIconText
                                  title={t("Chegirma").toUpperCase()}
                                  value={NumberToThousandFormat(get(data, "discount_summa", ""))}
                                  icon={<RiMoneyDollarBoxFill />}
                                />
                                <TitleAndIconText
                                  title={t("Umumiy summa").toUpperCase()}
                                  value={NumberToThousandFormat(get(data, "total_summa", ""))}
                                  icon={<RiRefundLine />}
                                />

                                {get(data, "desc", "") ? (
                                  <TitleAndIconText
                                    title={t("Izoh").toUpperCase()}
                                    value={get(data, "desc", "")}
                                    icon={<RiSlideshowLine />}
                                  />
                                ) : (
                                  ""
                                )}
                                <Divider />
                                <TitleAndIconText
                                  title={t("Moderator").toUpperCase()}
                                  value={get(data, "user", "")}
                                  icon={<RiUserSettingsFill />}
                                />
                              </Flex>
                            </Card>
                          </Col>
                          <Col xs={24} md={8}>
                            <Card title={<CardTitle title={t("To'lov ma'lumotlari")} />}>
                              <Flex vertical gap={"large"}>
                                <TitleAndIconText
                                  title={t("Umumiy summa").toUpperCase()}
                                  value={NumberToThousandFormat(get(data, "total_summa", ""))}
                                  icon={<RiRefundLine />}
                                />
                                {get(data, "total_pay", "") ? (
                                  <>
                                    <Divider style={{ margin: "0" }} />
                                    <TitleAndIconText
                                      title={t("Birinchi to'lov").toUpperCase()}
                                      value={NumberToThousandFormat(
                                        Number(get(data, "cash", 0)) +
                                          Number(get(data, "card", 0)) +
                                          Number(get(data, "other", 0)),
                                      )}
                                      icon={<RiWallet3Fill />}
                                    />
                                    <TitleAndIconText
                                      title={t("Naqt").toUpperCase()}
                                      value={NumberToThousandFormat(get(data, "cash", ""))}
                                      icon={<RiCashLine />}
                                    />
                                    <TitleAndIconText
                                      title={t("Karta orqali").toUpperCase()}
                                      value={NumberToThousandFormat(get(data, "card", ""))}
                                      icon={<RiBankCardLine />}
                                    />
                                    <TitleAndIconText
                                      title={t("Boshqa").toUpperCase()}
                                      value={NumberToThousandFormat(get(data, "other", ""))}
                                      icon={<RiCopperCoinLine />}
                                    />
                                  </>
                                ) : (
                                  ""
                                )}
                                <Divider style={{ margin: "0" }} />
                                <TitleAndIconText
                                  title={t("Umumiy to'langan summa").toUpperCase()}
                                  value={NumberToThousandFormat(get(data, "total_pay", ""))}
                                  icon={<RiRefundFill />}
                                />
                                <TitleAndIconText
                                  title={t("Holati").toUpperCase()}
                                  value={
                                    get(data, "status", "") === "Qarzdorlik" ? (
                                      <Tag color={"red"}>
                                        {t("Qardorlik")} ({NumberToThousandFormat(get(data, "debt_balance", ""))})
                                      </Tag>
                                    ) : (
                                      <Tag color={"green"}>{t("To'langan")}</Tag>
                                    )
                                  }
                                  icon={<RiColorFilterFill />}
                                />
                                {get(data, "status", "") === "Qarzdorlik" && (
                                  <AddPaymentForTrade
                                    summa={get(data, "debt_balance", "")}
                                    refetch={refetch}
                                    item={data}
                                  />
                                )}
                              </Flex>
                            </Card>
                          </Col>
                        </Row>
                      </Tabs.TabPane>
                      <Tabs.TabPane tab={t("Mahsulotlar")} key="2">
                        <Products data={get(data, "products", [])} />
                      </Tabs.TabPane>
                      {
                        !isEmpty(
                          get(data, "services", []) && (
                            <Tabs.TabPane tab={t("Xizmatlar")} key="3">
                              <Services data={get(data, "services", [])} />
                            </Tabs.TabPane>
                          ),
                        )
                      }
                      {!(
                        Number(get(data, "cash", 0)) + Number(get(data, "card", 0)) + Number(get(data, "other", 0)) ===
                        Number(get(data, "total_summa", 0))
                      ) && (
                        <Tabs.TabPane tab={t("To'lovlar")} key="4">
                          <Row gutter={[20, 20]}>
                            <Col xs={24} md={16}>
                              <Payments data={get(data, "payments", [])} refetch={refetch} />
                            </Col>
                            <Col xs={24} md={8}>
                              <Card title={<CardTitle title={t("To'lov ma'lumotlari")} />}>
                                <Flex vertical gap={"large"}>
                                  <TitleAndIconText
                                    title={t("Umumiy summa").toUpperCase()}
                                    value={NumberToThousandFormat(get(data, "total_summa", ""))}
                                    icon={<RiRefundLine />}
                                  />
                                  {get(data, "total_pay", "") ? (
                                    <>
                                      <Divider style={{ margin: "0" }} />
                                      <TitleAndIconText
                                        title={t("Birinchi to'lov").toUpperCase()}
                                        value={NumberToThousandFormat(
                                          Number(get(data, "cash", 0)) +
                                            Number(get(data, "card", 0)) +
                                            Number(get(data, "other", 0)),
                                        )}
                                        icon={<RiWallet3Fill />}
                                      />
                                      <TitleAndIconText
                                        title={t("Naqt").toUpperCase()}
                                        value={NumberToThousandFormat(get(data, "cash", ""))}
                                        icon={<RiCashLine />}
                                      />
                                      <TitleAndIconText
                                        title={t("Karta orqali").toUpperCase()}
                                        value={NumberToThousandFormat(get(data, "card", ""))}
                                        icon={<RiBankCardLine />}
                                      />
                                      <TitleAndIconText
                                        title={t("Boshqa").toUpperCase()}
                                        value={NumberToThousandFormat(get(data, "other", ""))}
                                        icon={<RiCopperCoinLine />}
                                      />
                                    </>
                                  ) : (
                                    ""
                                  )}
                                  <Divider style={{ margin: "0" }} />
                                  <TitleAndIconText
                                    title={t("Umumiy to'langan summa").toUpperCase()}
                                    value={NumberToThousandFormat(get(data, "total_pay", ""))}
                                    icon={<RiRefundFill />}
                                  />
                                  <TitleAndIconText
                                    title={t("Holati").toUpperCase()}
                                    value={
                                      get(data, "status", "") === "Qarzdorlik" ? (
                                        <Tag color={"red"}>
                                          {t("Qardorlik")} ({NumberToThousandFormat(get(data, "debt_balance", ""))})
                                        </Tag>
                                      ) : (
                                        <Tag color={"green"}>{t("To'langan")}</Tag>
                                      )
                                    }
                                    icon={<RiColorFilterFill />}
                                  />
                                  {get(data, "status", "") === "Qarzdorlik" && (
                                    <AddPaymentForStorageProduct
                                      summa={get(data, "debt_balance", "")}
                                      refetch={refetch}
                                      item={data}
                                    />
                                  )}
                                </Flex>
                              </Card>
                            </Col>
                          </Row>
                        </Tabs.TabPane>
                      )}
                    </CustomTabs>
                  </>
                </>
              )}
            </>
          )}
        </Col>
      </Row>
    </>
  )
}

export default TradeDetailPage

function Products({ data }) {
  const { t } = useTranslation()

  // Create a base columns array
  const baseColumns = [
    {
      title: t("#"),
      dataIndex: "index",
      key: "index",
      render: (value, item, index) => {
        return <>{index + 1}</>
      },
    },
    {
      title: t("Nomi"),
      dataIndex: "product",
      key: "product",
      render: (value) => {
        return <>{get(value, "name", "")}</>
      },
    },
    {
      title: t("Narxi"),
      dataIndex: "price",
      key: "price",
      render: (value) => {
        return <>{NumberToThousandFormat(value)}</>
      },
    },
    {
      title: t("O'lcham turi"),
      dataIndex: "size_type",
      key: "size_type",
    },
  ]

  // Create format-specific columns that will be conditionally shown
  const formatColumns = [
    {
      title: t("Bo'yi"),
      dataIndex: "width",
      key: "width",
      render: (value, row) => {
        return row.size_type === "Formatli" ? <>{value}</> : null
      },
    },
    {
      title: t("Eni"),
      dataIndex: "height",
      key: "height",
      render: (value, row) => {
        return row.size_type === "Formatli" ? <>{value}</> : null
      },
    },
    {
      title: t("Soni"),
      dataIndex: "count",
      key: "count",
      render: (value) => {
        return <>{NumberToThousandFormat(value, t("ta"))}</>
      },
    },
  ]

  // Final column that should always be at the end
  const totalCountColumn = [
    {
      title: t("Umumiy miqdor"),
      dataIndex: "total_count",
      key: "total_count",
      render: (value, row) => {
        return <>{NumberToThousandFormat(value, row.product.format)}</>
      },
    },
  ]

  // Check if any product has size_type = "Formatli"
  const hasFormatliProducts = data.some((item) => item.size_type === "Formatli")

  // Combine columns based on whether we have formatli products
  const columns = hasFormatliProducts
    ? [...baseColumns, ...formatColumns, ...totalCountColumn]
    : [...baseColumns, ...totalCountColumn]

  return <CustomDataTable title={t("Mahsulotlar")} data={data} columns={columns} />
}

function Services({ data }) {
  const { t } = useTranslation()

  const columns = [
    {
      title: t("#"),
      dataIndex: "index",
      key: "index",
      render: (value, item, index) => {
        return <>{index + 1}</>
      },
    },
    {
      title: t("Nomi"),
      dataIndex: "service",
      key: "service",
      render: (value) => {
        return <>{get(value, "name", "")}</>
      },
    },
    {
      title: t("Narxi"),
      dataIndex: "price",
      key: "price",
      render: (value) => {
        return <>{NumberToThousandFormat(value)}</>
      },
    },
    {
      title: t("Miqdori"),
      dataIndex: "count",
      key: "count",
      render: (value) => {
        return <>{NumberToThousandFormat(value, t("ta"))}</>
      },
    },
  ]

  return <CustomDataTable title={t("Xizmatlar")} data={data} columns={columns} />
}

function Payments({ data, refetch }) {
  const { t } = useTranslation()

  const deleteMutate = useMutation({
    mutationFn: httpDeletePaymentTrade,
    onSuccess: () => {
      handleSuccessNotification(t("Muvaffaqiyatli bajarildi !"))
      refetch()
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const handleDelete = (id) => {
    deleteMutate.mutate(id)
  }

  const columns = [
    {
      title: t("#"),
      dataIndex: "index",
      key: "index",
      render: (value, item, index) => {
        return <>{index + 1}</>
      },
    },
    {
      title: t("Naqt"),
      dataIndex: "cash",
      key: "cash",
      render: (value) => {
        return <>{NumberToThousandFormat(value)}</>
      },
    },
    {
      title: t("Karta"),
      dataIndex: "card",
      key: "card",
      render: (value) => {
        return <>{NumberToThousandFormat(value)}</>
      },
    },
    {
      title: t("Boshqa"),
      dataIndex: "other",
      key: "other",
      render: (value) => {
        return <>{NumberToThousandFormat(value)}</>
      },
    },
    {
      title: t("Jami summa"),
      dataIndex: "total",
      key: "other",
      render: (value, row) => {
        return <>{NumberToThousandFormat(row.cash + row.card + row.other)}</>
      },
    },
    {
      title: t("Sana"),
      dataIndex: "date",
      key: "date",
      render: (value) => {
        return <>{formatTimeForUI(value)}</>
      },
    },
    {
      title: <RiListSettingsFill size={15} />,
      dataIndex: "id",
      key: "operation",
      align: "center",
      width: 50,
      render: (id) => (
        <Flex align="center" justify="space-between" gap={"small"}>
          <CustomModalConfirm trigger={<Button danger icon={<DeleteFilled />} />} onOk={() => handleDelete(id)} />
        </Flex>
      ),
    },
  ]

  return <CustomDataTable title={t("To'lovlar")} data={data} columns={columns} />
}

