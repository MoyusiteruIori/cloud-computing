import { useTranslation } from 'react-i18next';

import {
  Grid,
  Typography,
} from '@mui/material';

function PageHeader() {
  const { t }: { t: any } = useTranslation();

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {t('顾客信息')}
          </Typography>
          <Typography variant="subtitle2">
            {t(
              '所有订单中出现的顾客的列表'
            )}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default PageHeader;
