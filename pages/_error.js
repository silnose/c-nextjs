import Layout from '../components/Layout';
import Link from 'next/link';
function Error({ statusCode }) {
  return (
    <>
      <Layout title='Oops :('>
        {statusCode === 404 ? (
          <div className='message'>
            <h1>Page not found :(</h1>
            <p>
              <Link href='/'>
                <a>Back to Home</a>
              </Link>
            </p>
          </div>
        ) : (
          <div className='message'>
            <h1>Oops something is wrong</h1>
            <p>Give us some seconds and try later please</p>
          </div>
        )}
        <style jsx>{`
          .message {
            padding: 100px 30px;
            text-align: center;
          }
          h1 {
            margin-bottom: 2em;
          }
          a {
            color: #8756ca;
          }
        `}</style>
      </Layout>
    </>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
