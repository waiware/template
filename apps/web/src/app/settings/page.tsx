import { Stack, Typography } from '@mui/material';
import { PageSubNavigation } from './_components/PageSubNavigation';

export default async function Home() {
  return (
    <Stack px={1}>
      <PageSubNavigation />
      <Stack pt={3} px={1} rowGap={1}>
        <Typography variant='h5' textAlign='center' sx={{ fontWeight: 'bold' }}>
          設定
        </Typography>
      </Stack>
    </Stack>
  );
}
