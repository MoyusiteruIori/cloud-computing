import { useState, useEffect, useCallback } from 'react';

import Head from 'next/head';

import ExtendedSidebarLayout from 'src/layouts/ExtendedSidebarLayout';

import PageHeader from 'src/components/PageHeaderDocs'

import { Grid } from '@mui/material';
import { useRefMounted } from 'src/hooks/useRefMounted';

import type { ProductStatBySex } from 'src/models/product_stat';
import { productsApi } from '@/mocks/product_stat';

import PageTitleWrapper from 'src/components/PageTitleWrapper';

import AutoTable from 'src/components/AutoTable';
import Skeleton from '@mui/material/Skeleton';

function ProductBySex() {
  const isMountedRef = useRefMounted();
  const [maleLike, setMaleLike] = useState<ProductStatBySex[]>([]);
  const [femaleLike, setFemaleLike] = useState<ProductStatBySex[]>([]);

  const getStatistics = useCallback(async () => {
    try {
      // const response1 = await productsApi.getProductStatBySex("1");
      // const response2 = await productsApi.getProductStatBySex("2");
      const response = await Promise.all([productsApi.getProductStatBySex("1"), productsApi.getProductStatBySex("2")])

      if (isMountedRef()) {
        setMaleLike(response[0]);
        setFemaleLike(response[1]);
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
        <PageHeader heading='商品统计' subheading='最受男/女性欢迎的商品统计' />
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
          {maleLike.length !== 0 ? (
            <AutoTable 
            dataframe={maleLike}
            keyMapper={{
              'c_sex': '性别',
              'cost': '成本',
              'price': '售价',
              'profit': '利润',
              'p_id': '商品id',
              'p_name': '商品名称',
              'p_category': '商品类别',
              'count': '售出数量'
            }}
            keyName={'p_id'}
            selectableProps={['p_category, p_id, p_name']}
            />
          ) : (
            [1, 2, 3, 4, 5, 6, 7, 8].map((_) => <Skeleton variant='rectangular' height={50} width={"100%"} sx={{mt: 3}}/>)
          )}
        </Grid>
        <Grid item xs={12}>
          {femaleLike.length !== 0 ? (
            <AutoTable 
            dataframe={femaleLike}
            keyMapper={{
              'c_sex': '性别',
              'cost': '成本',
              'price': '售价',
              'profit': '利润',
              'p_id': '商品id',
              'p_name': '商品名称',
              'p_category': '商品类别',
              'count': '售出数量'
            }}
            keyName={'p_id'}
            selectableProps={['p_category, p_id, p_name']}
            />
          ) : (
            [1, 2, 3, 4, 5, 6, 7, 8].map((_) => <Skeleton variant='rectangular' height={50} width={"100%"} sx={{mt: 3}}/>)
          )}
        </Grid>
      </Grid>
    </>
  );
}

ProductBySex.getLayout = (page) => (
    <ExtendedSidebarLayout>{page}</ExtendedSidebarLayout>
);

export default ProductBySex;
