import { type NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/admin/:path*'],
};

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('Authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    // atob is deprecated but Buffer.from is not available in Next.js edge.
    const [user, password] = atob(authValue).split(':');

    if (user === 'template' && password === 'template1234') {
      return NextResponse.next();
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      {
        headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
        status: 401,
      },
    );
  }

  return NextResponse.json(
    { error: 'Please enter credentials' },
    {
      headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
      status: 401,
    },
  );
}
