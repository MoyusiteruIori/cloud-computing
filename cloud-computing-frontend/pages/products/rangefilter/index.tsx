import { useState, useEffect, useCallback } from 'react';

import Head from 'next/head';

import ExtendedSidebarLayout from 'src/layouts/ExtendedSidebarLayout';

import PageHeader from 'src/components/PageHeaderDocs'

import { Grid } from '@mui/material';
import { useRefMounted } from 'src/hooks/useRefMounted';

import type { Product } from 'src/models/product_stat';
import { productsApi } from '@/mocks/product_stat';

import PageTitleWrapper from 'src/components/PageTitleWrapper';

import AutoTable from 'src/components/AutoTable';

import Skeleton from '@mui/material/Skeleton';

function ProductBySex() {
  const isMountedRef = useRefMounted();
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = useCallback(async () => {
    try {
      const response = await productsApi.getProductsByPriceRange(0, 10);

      if (isMountedRef()) {
        setProducts(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <>
      <Head>
        <title>商品销量统计</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader heading='商品统计' subheading='按照价格区间查询商品' />
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
          {products.length !== 0 ? (
            <AutoTable 
            dataframe={products}
            keyMapper={{
              'cost': '成本',
              'pcategory': '商品类别',
              'pid': '商品id',
              'pname': '商品名称',
              'price': '商品价格'
            }}
            keyName={'pid'}
            selectableProps={['pcategory', 'pid', 'pname']}
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
