export default function Page() {
  return (
    <main className='flex min-h-screen gap-y-5 flex-col py-5 w-full'>
      <div className='w-full py-6 px-2 flex flex-col gap-y-6 bg-white border border-lime-600 rounded'>
        <iframe
          title='form'
          src='https://docs.google.com/forms/d/e/1FAIpQLSfhiY96wXjTGLdlV6u6vVuY4nP_wHKWr1W0O8abysLHvdywwQ/viewform?embedded=true'
          width='auto'
          height='1000'
        />
      </div>
    </main>
  );
}
