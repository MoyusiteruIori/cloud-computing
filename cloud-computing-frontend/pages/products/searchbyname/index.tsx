import { useState, useEffect, useCallback } from 'react';

import Head from 'next/head';

import ExtendedSidebarLayout from 'src/layouts/ExtendedSidebarLayout';

import PageHeader from 'src/components/PageHeaderDocs'

import { Grid, Button } from '@mui/material';
import { useRefMounted } from 'src/hooks/useRefMounted';

import type { ProductOrder } from 'src/models/product_stat';
import { productsApi } from '@/mocks/product_stat';

import PageTitleWrapper from 'src/components/PageTitleWrapper';

import AutoTable from 'src/components/AutoTable';
import TextField from '@mui/material/TextField';
import Skeleton from '@mui/material/Skeleton';

function ProductBySex() {
  const isMountedRef = useRefMounted();
  const [orders, setOrders] = useState<ProductOrder[]>([]);
  const [name, setName] = useState<string>('Reaper');
  const [trigger, setTrigger] = useState<boolean>(false);

  const getProducts = useCallback(async () => {
    try {
      const response = await productsApi.getRelatedOrdersByPName(name);

      if (isMountedRef()) {
        setOrders(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getProducts();
  }, [getProducts, trigger]);

  return (
    <>
      <Head>
        <title>商品销量统计</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader heading='商品统计' subheading='按照商品名查询订单' />
      </PageTitleWrapper>

      <Grid
        sx={{ px: 4 }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={8}>
            <TextField 
            fullWidth 
            id="fullWidth" 
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setName(event.target.value) }}
            />
        </Grid>

        <Grid item xs={2}>
            <Button 
            variant="contained"
            onClick={(_) => { setTrigger(!trigger);} }
            >
                查询
            </Button>
        </Grid>
        <Grid item xs={12}>
          {orders.length !== 0 ? (
            <AutoTable 
            dataframe={orders}
            keyMapper={{
              'cid': '顾客id',
              'cname': '顾客名',
              'cost': '成本',
              'csex': '顾客性别',
              'num': '商品数',
              'oid': '订单id',
              'otime': '订单时间',
              'pcategory': '产品类别',
              'pid': '产品id',
              'pname': '产品名',
              'price': '价格'
            }}
            keyName={'oid'}
            selectableProps={['pcategory', 'pid', 'pname', 'oid', 'otime']}
            />
          ) : (
            (
              [1, 2, 3, 4, 5, 6, 7, 8].map((_) => <Skeleton variant='rectangular' height={50} width={"100%"} sx={{mt: 3}}/>)
            )
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
