import { trpc } from '~/trpc/server';

export default async function Home() {
  const { greeting } = await trpc.hello({ text: 'テスト' });

  return (
    <div>
      <main>{greeting}</main>
      <footer>{/*  */}</footer>
    </div>
  );
}
