import { useState, useEffect, useCallback } from 'react';

import Head from 'next/head';

import ExtendedSidebarLayout from 'src/layouts/ExtendedSidebarLayout';

import PageHeader from 'src/components/PageHeaderDocs'

import { Grid } from '@mui/material';
import { useRefMounted } from 'src/hooks/useRefMounted';

import type { YearStatistics } from 'src/models/statistics';
import { statisticsApi } from 'src/mocks/statistics';

import PageTitleWrapper from 'src/components/PageTitleWrapper';

import AutoTable from 'src/components/AutoTable';
import Skeleton from '@mui/material/Skeleton';

import {
  Box,
  Card,
  Typography,
  Divider,
  alpha,
  Stack,
  styled,
  useTheme
} from '@mui/material';
import { Chart } from 'src/components/Chart';
import type { ApexOptions } from 'apexcharts';
const DotLegend = styled('span')(
  ({ theme }) => `
      border-radius: 22px;
      width: ${theme.spacing(1.8)};
      height: ${theme.spacing(1.8)};
      display: inline-block;
      margin-right: ${theme.spacing(0.8)};
      border: ${theme.colors.alpha.white[100]} solid 2px;
  `
);

const CardWrapper = styled(Card)(
  ({ theme }) => `
      background: ${alpha(theme.colors.alpha.black[10], 0.08)};
  `
);

function YearChart(labels: string[], cost: number[], price: number[], volume: number[]) {
  const theme = useTheme();

  const chart3Options: ApexOptions = {
    stroke: {
      curve: 'smooth',
      colors: [
        theme.colors.info.main,
        theme.colors.error.main,
        theme.colors.success.main
      ],
      width: 3
    },
    theme: {
      mode: theme.palette.mode
    },
    chart: {
      background: 'transparent',
      toolbar: {
        show: false
      }
    },
    colors: [
      theme.colors.info.main,
      theme.colors.error.main,
      theme.colors.success.main
    ],
    fill: {
      opacity: 1,
      colors: [
        theme.colors.info.main,
        theme.colors.error.main,
        theme.colors.success.main
      ],
      type: 'solid'
    },
    labels,
    dataLabels: {
      enabled: false
    },
    grid: {
      strokeDashArray: 5,
      borderColor: theme.palette.divider
    },
    legend: {
      show: false
    },
    yaxis: {
      show: false
    }
  };

  const chart3Data = [
    {
      name: 'volume',
      data: volume
    },
    {
      name: 'cost',
      data: cost
    },
    {
      name: 'price',
      data: price
    }
  ];

  return (
    <Card>
      <Box
        display="flex"
        alignItems="center"
        p={3}
        justifyContent="space-between"
      >
        <Box>
          <Typography
            component="div"
            sx={{
              fontSize: `${theme.typography.pxToRem(17)}`
            }}
            gutterBottom
            variant="h3"
          >
            {'Sales'}
          </Typography>
          <Typography
            component="div"
            fontWeight="normal"
            color="text.secondary"
            variant="h5"
          >
            {'按年销售统计'}
          </Typography>
        </Box>
      </Box>
      <CardWrapper
        sx={{
          mx: 3,
          p: 3
        }}
      >
        <Stack
          direction="row"
          divider={
            <Divider
              sx={{
                background: `${theme.colors.alpha.black[10]}`
              }}
              orientation="vertical"
              flexItem
            />
          }
          justifyContent="space-evenly"
          alignItems="center"
          spacing={4}
        >
          <Box py={2} textAlign="center">
            <Typography
              variant="h4"
              fontWeight="normal"
              color="text.secondary"
              gutterBottom
            >
              {"年销量"}
            </Typography>
            <Box display="flex" alignItems="center" justifyContent="center">
              <DotLegend
                style={{
                  background: `${theme.colors.info.main}`
                }}
              />
            </Box>
          </Box>
          <Box py={2} textAlign="center">
            <Typography
              variant="h4"
              fontWeight="normal"
              color="text.secondary"
              gutterBottom
            >
              {'年售价'}
            </Typography>
            <Box display="flex" alignItems="center" justifyContent="center">
              <DotLegend
                style={{
                  background: `${theme.colors.success.main}`
                }}
              />
            </Box>
          </Box>
          <Box py={2} textAlign="center">
            <Typography
              variant="h4"
              fontWeight="normal"
              color="text.secondary"
              gutterBottom
            >
              {'年成本'}
            </Typography>
            <Box display="flex" alignItems="center" justifyContent="center">
              <DotLegend
                style={{
                  background: `${theme.colors.error.main}`
                }}
              />
            </Box>
          </Box>
        </Stack>
      </CardWrapper>
      <Box px={3}>
        <Chart
          options={chart3Options}
          series={chart3Data}
          type="line"
          height={318}
        />
      </Box>
    </Card>
  );
}


function StatisticsByYear() {
  const isMountedRef = useRefMounted();
  const [statistics, setStatistics] = useState<YearStatistics[]>([]);

  const getStatistics = useCallback(async () => {
    try {
      const response = await statisticsApi.getStatByYear();

      if (isMountedRef()) {
        setStatistics(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getStatistics();
  }, [getStatistics]);

  return (
    <>
      <Head>
        <title>商品销量统计</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader heading='销量统计' subheading='按年销量进行销量统计' />
      </PageTitleWrapper>

      <Grid
        sx={{ px: 4 }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={12}>
          {
            statistics.length !== 0 ? (
              <AutoTable 
              dataframe={statistics}
              keyMapper={{'cost': '成本', 'volume': '订单数', 'price': '售价', 'year': '年份'}}
              keyName={'p_category'}
              selectableProps={['p_category']}
              />
            ) : (
              [1, 2, 3, 4, 5, 6, 7, 8].map((_) => <Skeleton variant='rectangular' height={50} width={"100%"} sx={{mt: 3}}/>)
            )
          }
        </Grid>
        <Grid item xs={12}>
          {
            statistics.length !== 0 ? (
              YearChart(statistics.map((s) => s.year.toString()), statistics.map((s) => s.volume), statistics.map((s) => s.cost), statistics.map((s) => s.price))
            ) : (
              <Skeleton variant='rectangular' height={200} width={"100%"} sx={{mt: 3}}/>
              )
          }
        </Grid>
      </Grid>
    </>
  );
}

StatisticsByYear.getLayout = (page) => (
    <ExtendedSidebarLayout>{page}</ExtendedSidebarLayout>
);

export default StatisticsByYear;
