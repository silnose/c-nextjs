import Link from 'next/link';
import Head from 'next/head';

const Layout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charset='UTF-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='description' content='Best Podcasts page ever!' />
        <meta name='keywords' content='HTML, CSS, JavaScript, NextJS, Reat' />
        <meta name='author' content='Silnose' />
      </Head>
      <header>
        <Link href='/'>
          <a>Podcasts</a>
        </Link>
      </header>
      {children}
      <style jsx>
        {`
          body {
            margin: 0;
            font-family: system-ui;
            background: white;
          }

          header {
            color: #fff;
            background: #8756ca;
            padding: 15px;
            text-align: center;
          }
          header a {
            color: #fff;
            text-decoration: none;
            font-weight: 800;
          }
        `}
      </style>
    </>
  );
};
export default Layout;
