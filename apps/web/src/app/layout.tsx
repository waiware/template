import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
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
              {children}
            </SnackbarProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
