import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";
import { Grid, IconButton, Tooltip } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";

import { Container } from "./styles";
import { verifyRole } from "core/utils/roles";
import useUrlGeneratedHook from "core/hooks/dashboard/urlHook";
import DisplayCharts from "app/components/charts/displayCharts";
import { useAppSelector } from "core/hooks/reduxHooks";
import { ClientService } from "core/api/client/clientService";
import { periodoAtual } from "core/utils/globalFunctions";
import useGenerateIndicationLinkHook from "core/hooks/generateLinkHook";
import DateRangeDisplay from "app/components/dateRange/dateRangeDisplay/dateRangeDisplay";
import {
  ContentHeader,
  ContentTitle,
  PageContentContainer,
} from "app/components/styles";
import {
  fetchChartBoletosStatus,
  fetchChartListSalesLiquiMonth,
  fetchChartListSalesLiquidadas,
  fetchChartPixStatus,
  fetchChartSalesMonth,
  fetchChartSalesStatus,
} from "core/querryes/charts/getChartsQuerry";
import theme from "core/theme/theme";
import Footer from "app/components/footer/Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  const basicUserInfo = useAppSelector((state) => state.auth.userInfo);

  const { isOpen, onClose, onOpen } = useGenerateIndicationLinkHook();
  const { setTempUrl } = useUrlGeneratedHook();

  const [initDateSalesYear, setInitDateSalesYear] = useState<
    Dayjs | null | undefined
  >(dayjs("2024-01-01"));
  const [finalDateSalesYear, setfinalDateSalesYear] = useState<
    Dayjs | null | undefined
  >(dayjs("2024-12-31"));

  const [initDateSalesMonth, setInitDateSalesMonth] = useState<
    Dayjs | null | undefined
  >(dayjs().startOf("month"));
  const [finalDateSalesMonth, setfinalDateSalesMonth] = useState<
    Dayjs | null | undefined
  >(dayjs().endOf("month"));

  const [isLoadingCharts, setIsLoadingCharts] = useState<boolean>(false);


  const areDataLoading = () => {
    return (
      boletoStatusData.isLoading ||
      pixStatusData.isLoading ||
      salesStatusData.isLoading ||
      salesMonthData.isLoading ||
      listSalesLiquiMonthData.isLoading ||
      listSalesLiquidadasData.isLoading ||
      isLoadingCharts
    );
  };

  const boletoStatusData = useQuery({
    queryKey: ["boletoStatusData", initDateSalesMonth, finalDateSalesMonth],
    refetchInterval: 60000,
    refetchOnWindowFocus: false,
    queryFn: () =>
      fetchChartBoletosStatus({
        dataInicial: String(initDateSalesMonth?.format("YYYY-MM-DD")),
        dataFinal: String(finalDateSalesMonth?.format("YYYY-MM-DD")),
      }),
  });

  const pixStatusData = useQuery({
    queryKey: ["pixStatusData", initDateSalesMonth, finalDateSalesMonth],
    refetchInterval: 60000,
    refetchOnWindowFocus: false,
    queryFn: () =>
      fetchChartPixStatus({
        dataInicial: String(initDateSalesMonth?.format("YYYY-MM-DD")),
        dataFinal: String(finalDateSalesMonth?.format("YYYY-MM-DD")),
      }),
  });

  const salesStatusData = useQuery({
    queryKey: ["salesStatusData", initDateSalesMonth, finalDateSalesMonth],
    refetchInterval: 60000,
    refetchOnWindowFocus: false,
    queryFn: () =>
      fetchChartSalesStatus({
        dataInicial: String(initDateSalesMonth?.format("YYYY-MM-DD")),
        dataFinal: String(finalDateSalesMonth?.format("YYYY-MM-DD")),
      }),
  });

  const salesMonthData = useQuery({
    queryKey: ["salesMonthData", finalDateSalesYear, initDateSalesYear],
    refetchInterval: 60000,
    refetchOnWindowFocus: false,
    queryFn: () =>
      fetchChartSalesMonth({
        dataInicial: String(initDateSalesYear?.format("YYYY-MM-DD")),
        dataFinal: String(finalDateSalesYear?.format("YYYY-MM-DD")),
      }),
  });

  const listSalesLiquiMonthData = useQuery({
    queryKey: [
      "listSalesLiquiMonthData",
      finalDateSalesYear,
      initDateSalesYear,
    ],
    refetchInterval: 60000,
    refetchOnWindowFocus: false,
    queryFn: () =>
      fetchChartListSalesLiquiMonth({
        dataInicial: String(initDateSalesYear?.format("YYYY-MM-DD")),
        dataFinal: String(finalDateSalesYear?.format("YYYY-MM-DD")),
      }),
  });

  const listSalesLiquidadasData = useQuery({
    queryKey: [
      "listSalesLiquidadasData",
      initDateSalesMonth,
      finalDateSalesMonth,
    ],
    refetchInterval: 60000,
    refetchOnWindowFocus: false,
    queryFn: () =>
      fetchChartListSalesLiquidadas({
        dataInicial: String(initDateSalesMonth?.format("YYYY-MM-DD")),
        dataFinal: String(finalDateSalesMonth?.format("YYYY-MM-DD")),
      }),
  });

  const handleRefreshCharts = () => {
    setIsLoadingCharts(true);
    boletoStatusData.refetch();
    pixStatusData.refetch();
    salesStatusData.refetch();
    salesMonthData.refetch();
    listSalesLiquiMonthData.refetch();
    listSalesLiquidadasData.refetch().then(() => {
      setIsLoadingCharts(false);
    });
  };

  const combinedData = {
    salesMonthData: salesMonthData.data,
    listSalesLiquiMonthData: listSalesLiquiMonthData.data,
  };

  if (basicUserInfo?.group === "CLIENT") {
    ClientService.getDeal();
    navigate("aulas");
  }

  if (basicUserInfo?.group === "INDICATION") {
    navigate("/vendas");
  }

  if (basicUserInfo?.group === "SELLER") {
    navigate("/links");
  }

  return (
    <PageContentContainer sx={{ gap: "1em" }}>
      <ContentHeader>
        <Tooltip title="Atualizar gráficos" onClick={handleRefreshCharts}>
          <IconButton>
            <CachedIcon sx={{ color: theme.COLORS.BLUE3 }} />
          </IconButton>
        </Tooltip>
      </ContentHeader>

      {verifyRole(basicUserInfo?.roles, ["ROLE_ADMIN"]) &&
        basicUserInfo?.group !== "INDICATION" && (
          <>
            <Container container>
              {!areDataLoading() && (
                <DateRangeDisplay
                  typeOfDatePicker="ano"
                  initialDate={initDateSalesYear}
                  endDate={finalDateSalesYear}
                  setInitialDate={setInitDateSalesYear}
                  setFinalDate={setfinalDateSalesYear}
                />
              )}
              <DisplayCharts
                chartType={"ColumnChart"}
                data={combinedData}
                charTitle={"Vendas no ano"}
                width={"100%"}
                height={"300px"}
                typeReq="SalesMonth"
                fetchingData={
                  salesMonthData.isLoading ||
                  listSalesLiquiMonthData.isLoading ||
                  isLoadingCharts
                }
                fullWidth={true}
                dataRange={periodoAtual("ano")}
              />
            </Container>

            <Container container>
              {!areDataLoading() && (
                <DateRangeDisplay
                  typeOfDatePicker="mes"
                  initialDate={initDateSalesMonth}
                  endDate={finalDateSalesMonth}
                  setInitialDate={setInitDateSalesMonth}
                  setFinalDate={setfinalDateSalesMonth}
                />
              )}
              <Grid container>
                <DisplayCharts
                  chartType={"PieChart"}
                  data={boletoStatusData.data}
                  charTitle={"Status vendas por Boletos"}
                  width={"100%"}
                  height={"300px"}
                  typeReq="Boletos"
                  fetchingData={boletoStatusData.isLoading || isLoadingCharts}
                  dataRange={periodoAtual("mes")}
                />
                <DisplayCharts
                  chartType={"PieChart"}
                  data={pixStatusData.data}
                  charTitle={"Status vendas por Pix"}
                  width={"100%"}
                  height={"300px"}
                  typeReq="Pix"
                  fetchingData={pixStatusData.isLoading || isLoadingCharts}
                  dataRange={periodoAtual("mes")}
                />
                <DisplayCharts
                  chartType={"PieChart"}
                  data={salesStatusData.data}
                  charTitle={"Status geral das vendas"}
                  width={"100%"}
                  height={"300px"}
                  typeReq="SalesStatus"
                  fetchingData={salesStatusData.isLoading || isLoadingCharts}
                  dataRange={periodoAtual("mes")}
                />

                <DisplayCharts
                  chartType={"Table"}
                  data={listSalesLiquidadasData.data}
                  charTitle={"Vendas dos vendedores"}
                  width={"100%"}
                  height={"300px"}
                  typeReq="SalesLiquidadas"
                  fetchingData={
                    listSalesLiquidadasData.isLoading || isLoadingCharts
                  }
                  dataRange={periodoAtual("mes")}
                />
              </Grid>
            </Container>
          </>
        )}
    </PageContentContainer>
  );
};

export default Dashboard;
