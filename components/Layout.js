import Link from 'next/link';
import Head from 'next/head';
import { useLoading } from '../hooks/useLoading';

const Layout = ({ children, title }) => {
  const loading = useLoading();
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
      <style jsx global>
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
          /* Make clicks pass-through */
          #nprogress {
            pointer-events: none;
          }

          #nprogress .bar {
            background: #ffb25b !important;

            position: fixed;
            z-index: 1031;
            top: 0;
            left: 0;

            width: 100%;
            height: 2px;
          }

          /* Fancy blur effect */
          #nprogress .peg {
            display: block;
            position: absolute;
            right: 0px;
            width: 100px;
            height: 100%;
            box-shadow: 0 0 10px #ffb25b, 0 0 5px #ffb25b;
            opacity: 1;

            -webkit-transform: rotate(3deg) translate(0px, -4px);
            -ms-transform: rotate(3deg) translate(0px, -4px);
            transform: rotate(3deg) translate(0px, -4px);
          }

          /* Remove these to get rid of the spinner */
          #nprogress .spinner {
            display: block;
            position: fixed;
            z-index: 1031;
            top: 15px;
            right: 15px;
          }

          #nprogress .spinner-icon {
            width: 18px;
            height: 18px;
            box-sizing: border-box;

            border: solid 2px transparent;
            border-top-color: #ffb25b;
            border-left-color: #ffb25b;
            border-radius: 50%;

            -webkit-animation: nprogress-spinner 400ms linear infinite;
            animation: nprogress-spinner 400ms linear infinite;
          }

          .nprogress-custom-parent {
            overflow: hidden;
            position: relative;
          }

          .nprogress-custom-parent #nprogress .spinner,
          .nprogress-custom-parent #nprogress .bar {
            position: absolute;
          }

          @-webkit-keyframes nprogress-spinner {
            0% {
              -webkit-transform: rotate(0deg);
            }
            100% {
              -webkit-transform: rotate(360deg);
            }
          }
          @keyframes nprogress-spinner {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </>
  );
};
export default Layout;
