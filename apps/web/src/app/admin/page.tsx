import { Box, Stack, Typography } from '@mui/material';

export default async function Page() {
  return (
    <Stack py={3} px={1} rowGap={3} minHeight='calc(100vh - 56px)' maxWidth='500px' mx='auto'>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Typography variant='h5' textAlign='center' sx={{ fontWeight: 'bold' }}>
          管理画面
        </Typography>
      </Box>
    </Stack>
  );
}
