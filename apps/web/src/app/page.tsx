import { Stack, Typography } from '@mui/material';
import { Footer } from '~/components/layout/Footer';

export default async function Home() {
  return (
    <Stack>
      <Stack py={3} px={1} rowGap={3} minHeight='calc(100vh - 56px)' maxWidth='500px' mx='auto'>
        <Stack pt={3} px={1} rowGap={1}>
          <Typography variant='h5' textAlign='center' sx={{ fontWeight: 'bold' }}>
            テンプレート
          </Typography>
          <Typography variant='body1' textAlign='center'>
            テンプレート
          </Typography>
        </Stack>
      </Stack>
      <Footer />
    </Stack>
  );
}
