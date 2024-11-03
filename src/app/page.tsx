import { trpc } from '~/trpc/server';

export default async function Home() {
  const { questions } = await trpc.question.list();

  return (
    <div>
      <main>
        {questions.map(v => {
          return (
            <div key={v.id}>
              {v.title}
              <br />
              {v.body}
            </div>
          );
        })}
      </main>
      <footer>{/*  */}</footer>
    </div>
  );
}
