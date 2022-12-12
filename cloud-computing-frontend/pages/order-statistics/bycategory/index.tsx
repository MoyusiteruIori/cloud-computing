import { useState, useEffect, useCallback } from 'react';

import Head from 'next/head';

import ExtendedSidebarLayout from 'src/layouts/ExtendedSidebarLayout';

import PageHeader from 'src/components/PageHeaderDocs'

import { Grid } from '@mui/material';
import { useRefMounted } from 'src/hooks/useRefMounted';

import type { CategoryStatistics } from 'src/models/statistics';
import { statisticsApi } from 'src/mocks/statistics';

import PageTitleWrapper from 'src/components/PageTitleWrapper';

import AutoTable from 'src/components/AutoTable';
import Skeleton from '@mui/material/Skeleton';

function StatisticsByCategory() {
  const isMountedRef = useRefMounted();
  const [statistics, setStatistics] = useState<CategoryStatistics[]>([]);

  const getStatistics = useCallback(async () => {
    try {
      const response = await statisticsApi.getStatByCategory();

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
        <PageHeader heading='销量统计' subheading='按商品类别进行销量统计' />
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
              keyMapper={{'cost': '成本', 'count': '订单数', 'price': '售价', 'profit': '利润', 'p_category': '类别'}}
              keyName={'p_category'}
              selectableProps={['p_category']}
              />
            ) : (
              [1, 2, 3, 4, 5, 6, 7, 8].map((_) => <Skeleton variant='rectangular' height={50} width={"100%"} sx={{mt: 3}}/>)
            )
          }
        </Grid>
      </Grid>
    </>
  );
}

StatisticsByCategory.getLayout = (page) => (
    <ExtendedSidebarLayout>{page}</ExtendedSidebarLayout>
);

export default StatisticsByCategory;
