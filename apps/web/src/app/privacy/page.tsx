export default function Page() {
  return (
    <main className='flex min-h-screen gap-y-5 flex-col py-5 w-full'>
      <div className='w-full py-6 px-2 flex flex-col gap-y-6 bg-white border border-lime-600 rounded'>
        <h1 className='leading-1 font-bold text-center'>プライバシーポリシー</h1>
        <div className='flex flex-col gap-y-3'>
          <p>
            本サービスは、以下のプライバシーポリシーを定め、個人の情報に関する保護法（平成十五年法律第五十七号、以下「個人情報保護法」）を遵守すると共に、適切なプライバシー情報の保護に努めます。
          </p>
        </div>
        <h2 className='leading-3 font-bold'>1. 利用目的</h2>
        <div className='flex flex-col gap-y-3'>
          <p>当サイトでは、お問い合わせの際、名前やメールアドレス等の個人情報を入力いただく場合がございます。</p>
          <p>
            取得した個人情報は、お問い合わせに対する回答や必要な情報を電子メールなどをでご連絡する場合に利用させていただくものであり、これらの目的以外では利用いたしません。
          </p>
        </div>
        <h2 className='leading-3 font-bold'>2. 広告の配信について</h2>
        <div className='flex flex-col gap-y-3'>
          <p>当ブログでは、第三者配信の広告サービス「Google Adsense」を利用しています。</p>
          <p>
            このような広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するために、アクセスに関する情報Cookieを使用することがあります。
          </p>
          <p>
            Cookieは、ユーザーが当サイトあるいは他サイトを閲覧された際、使用されたコンピューターやデバイス内に記録されます。ただし、この情報には、お名前・ご住所・メールアドレス・電話番号など個人を特定できるものは一切含まれません。
          </p>
          <p>
            Cookieによる情報収集を好まれない場合、ユーザーご自身でブラウザで受け入れを拒否するよう設定することも可能です。ただし、この設定により一部のコンテンツが正しく機能しない場合、またサービスが受けられない場合がございます。あらかじめご了承ください。
          </p>
          <p>
            なお、設定方法に関しては
            <a className='text-blue-600' href='https://policies.google.com/technologies/partner-sites?hl=ja'>
              Google ポリシーと規約
            </a>
            にてご確認いただけます
          </p>
        </div>
        <h2 className='leading-3 font-bold'>3. アクセス解析ツールについて</h2>
        <div className='flex flex-col gap-y-3'>
          <p>当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。</p>
          <p>
            このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しております。トラフィックデータは匿名で収集されており、個人を特定するものではありません。
          </p>
          <p>
            ユーザーは、Cookieを無効化することにより、データの収集を拒否することができます。お使いのブラウザより設定をご確認ください。
          </p>
          <p>
            なお、この規約に関しては、
            <a className='text-blue-600' href='https://marketingplatform.google.com/about/analytics/terms/jp/'>
              Google アナリティクス利用規約
            </a>
            および
            <a className='text-blue-600' href='https://policies.google.com/technologies/partner-sites?hl=ja'>
              Google ポリシーと規約
            </a>
            でご確認いただけます。
          </p>
        </div>
        <h2 className='leading-3 font-bold'>4. 免責事項</h2>
        <div className='flex flex-col gap-y-3'>
          <p>
            当サイトからのリンクやバナーなどで移動したサイトで提供される情報、サービス等について一切の責任を負いません。
          </p>
          <p>
            また当サイトのコンテンツ・情報について、できる限り正確な情報を提供するように努めておりますが、正確性や安全性を保証するものではありません。情報が古くなっていることもございます。
          </p>
          <p>当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。</p>
        </div>
        <h2 className='leading-3 font-bold'>5. 著作権について</h2>
        <div className='flex flex-col gap-y-3'>
          <p>当ブログは著作権や肖像権の侵害を目的としたものではありません。</p>
          <p>
            著作権や肖像権に関して問題がございましたら、お問い合わせフォームより遠慮なくご連絡くださいませ。迅速に対応いたします。
          </p>
        </div>
        <h2 className='leading-3 font-bold'>6. プライバシーポリシーの変更</h2>
        <div className='flex flex-col gap-y-3'>
          <p>当サイトは、必要に応じて本ポリシーを更新することがあります。</p>
        </div>
        <h2 className='leading-3 font-bold'>7. お問い合わせ</h2>
        <div className='flex flex-col gap-y-3'>
          <p>
            本ポリシーに関するお問い合わせは、
            <a className='text-blue-600' href='https://forms.gle/MXTGGj1Q2oLvjGCd9'>
              こちら
            </a>
            までお願いいたします。
          </p>
        </div>
      </div>
    </main>
  );
}
