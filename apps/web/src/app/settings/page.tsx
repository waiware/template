import { Stack, Typography } from '@mui/material';
import { PageSubNavigation } from './_components/PageSubNavigation';
import { UserSettings } from './_components/UserSettings';

export default async function Home() {
  return (
    <Stack px={1}>
      <PageSubNavigation />
      <Stack py={3} px={1} rowGap={1}>
        <Typography variant='h5' textAlign='center' sx={{ fontWeight: 'bold' }}>
          設定
        </Typography>
      </Stack>
      <UserSettings />
    </Stack>
  );
}
