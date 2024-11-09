import { Box } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Navbar } from '../components/layout/Navbar';
import { SnackbarProvider } from '../context/SnackbarProvider';
import { ThemeProvider } from '../context/ThemeProvider';
import { TRPCProvider } from '../trpc/client';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ja'>
      <body>
        <TRPCProvider>
          <AppRouterCacheProvider options={{ key: 'css' }}>
            <ThemeProvider>
              <SnackbarProvider>
                <Navbar />
                <Box maxWidth='500px' mx='auto'>
                  {children}
                </Box>
              </SnackbarProvider>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}
