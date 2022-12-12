import { useState, useEffect, useCallback } from 'react';

import Head from 'next/head';

import ExtendedSidebarLayout from 'src/layouts/ExtendedSidebarLayout';

import PageHeader from 'src/components/PageHeaderDocs'

import { Grid } from '@mui/material';
import { useRefMounted } from 'src/hooks/useRefMounted';

import type { Customer } from 'src/models/customer'
import { customersApi } from 'src/mocks/customers';

import PageTitleWrapper from 'src/components/PageTitleWrapper';

import Results from 'src/content/Customers/Results';
import Skeleton from '@mui/material/Skeleton';

function ManagementCustomers() {
  const isMountedRef = useRefMounted();
  const [customers, setCustomers] = useState<Customer[]>([]);

  const getCustomers = useCallback(async () => {
    try {
      const response = await customersApi.getCustomers();

      if (isMountedRef()) {
        setCustomers(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  return (
    <>
      <Head>
        <title>顾客列表</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader heading='顾客列表' subheading='顾客列表' />
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
          {customers.length !== 0 ? (
            <Results customers={customers} />
          ) : (
            [1, 2, 3, 4, 5, 6, 7, 8].map((_) => <Skeleton variant='rectangular' height={50} width={"100%"} sx={{mt: 3}}/>)
          )}
        </Grid>
      </Grid>
    </>
  );
}

ManagementCustomers.getLayout = (page) => (
    <ExtendedSidebarLayout>{page}</ExtendedSidebarLayout>
);

export default ManagementCustomers;
