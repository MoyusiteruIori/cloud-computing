import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  styled
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import Link from 'src/components/Link';

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
`
);

const TypographyH2 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(17)};
`
);

const ListItemWrapper = styled(Box)(
  () => `
    display: flex;
    align-items: center;
`
);

const MuiAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #e5f7ff;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

const TsAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #dfebf6;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

const NextJsAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: ${
      theme.palette.mode === 'dark'
        ? theme.colors.alpha.trueWhite[50]
        : theme.colors.alpha.black[10]
    };
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

function Hero() {
  const { t }: { t: any } = useTranslation();

  return (
    <Container maxWidth="lg">
      <Grid
        spacing={{ xs: 6, md: 10 }}
        justifyContent="center"
        alignItems="center"
        container
      >
        <Grid item md={8} pr={{ xs: 0, md: 3 }}>
          <TypographyH1
            sx={{
              mb: 2
            }}
            variant="h1"
          >
            {'2022 云计算课程项目'}
          </TypographyH1>
          <TypographyH2
            sx={{
              lineHeight: 1.5,
              pb: 4
            }}
            variant="h4"
            color="text.secondary"
            fontWeight="normal"
          >
            {t(
              '1951477 孟宇'
            )}
          </TypographyH2>
          <Button
            component={Link}
            href="/products/rangefilter"
            size="large"
            variant="contained"
          >
            {t('开始')}
          </Button>
          <ListItemWrapper sx={{ mt: 5, mb: 2 }}>
            <NextJsAvatar>
              <img src="/static/images/logo/next-js.svg" alt="NextJS" />
            </NextJsAvatar>
            <Typography variant="h6">
              <b>Built with Next.js </b>
              <Typography component="span" variant="subtitle2">
                {' '}
                - Next.js gives you the best developer experience with all the
                features you need for production.
              </Typography>
            </Typography>
          </ListItemWrapper>
          <ListItemWrapper
            sx={{
              mt: 5,
              mb: 2
            }}
          >
            <MuiAvatar>
              <img
                src="/static/images/logo/material-ui.svg"
                alt="MUI (Material-UI)"
              />
            </MuiAvatar>
            <Typography variant="h6">
              <b>Powered by MUI (Material-UI)</b>
              <Typography component="span" variant="subtitle2">
                {' '}
                - A simple and customizable component library to build faster,
                beautiful, and accessible React apps.
              </Typography>
            </Typography>
          </ListItemWrapper>
          <ListItemWrapper>
            <TsAvatar>
              <img src="/static/images/logo/typescript.svg" alt="Typescript" />
            </TsAvatar>
            <Typography variant="h6">
              <b>Built with Typescript</b>
              <Typography component="span" variant="subtitle2">
                {' '}
                - Tokyo features a modern technology stack and is built with
                React + Typescript.
              </Typography>
            </Typography>
          </ListItemWrapper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hero;
