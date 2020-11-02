import 'isomorphic-fetch';
import Error from './_error';
import ChannelGrid from '../components/ChannelGrid';
import Layout from '../components/Layout';

export default class extends React.Component {
  render() {
    const { channels, statusCode } = this.props;

    if (statusCode !== 200) {
      return <Error statusCode={statusCode} />;
    }
    return (
      <Layout title='Podcasts'>
        <ChannelGrid channels={channels} />
      </Layout>
    );
  }
}

export async function getServerSideProps({ res }) {
  try {
    let req = await fetch('https://api.audioboom.com/channels/recommended');
    let { body: channels } = await req.json();

    return { props: { channels, statusCode: 200 } };
  } catch (error) {
    let statusCode = 503;
    res.statusCode = statusCode;
    return { props: { channels: null, statusCode: statusCode } };
  }
}
