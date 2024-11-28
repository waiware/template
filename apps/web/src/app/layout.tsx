import { Box } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Footer } from '~/components/layout/Footer/Footer';
import { Navbar } from '~/components/layout/Navbar';
import { generateMetadataObject } from '~/utils/generateMetadataObject';
import { SnackbarProvider } from '../context/SnackbarProvider';
import { ThemeProvider } from '../context/ThemeProvider';

export const metadata = generateMetadataObject();

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ja'>
      <body>
        <AppRouterCacheProvider options={{ key: 'css' }}>
          <ThemeProvider>
            <SnackbarProvider>
              <Navbar />
              <Box maxWidth='500px' mx='auto' minHeight='100vh'>
                {children}
              </Box>
              <Footer />
            </SnackbarProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
