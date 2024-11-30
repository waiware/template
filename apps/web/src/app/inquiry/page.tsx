import { Stack } from '@mui/material';
import { Footer } from '~/components/layout/Footer';

export default function Page() {
  return (
    <Stack rowGap={3}>
      <iframe
        title='form'
        src='https://docs.google.com/forms/d/e/1FAIpQLSfhiY96wXjTGLdlV6u6vVuY4nP_wHKWr1W0O8abysLHvdywwQ/viewform?embedded=true'
        width='auto'
        height='1000'
      />
      <Footer />
    </Stack>
  );
}
