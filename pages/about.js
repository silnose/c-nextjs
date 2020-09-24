export default class extends React.Component {
  render() {
    return (
      <div class='about-section'>
        <h5>About this course</h5>
        <h1>Let me introduce NextJS</h1>
        <p>
          Next.js gives you the best developer experience with all the features
          you need for production:
          <br /> hybrid static & server rendering, TypeScript support, smart
          bundling, route pre-fetching, and more. <br />
          No config needed.
        </p>
        <div className='platzi-picture'>
          <img src='/platzi-logo.png' alt='platzi' />
        </div>

        <style jsx>{`
          span,
          img,
          h5,
          p,
          h1 {
            text-align: center;
          }
          img {
            height: 300px;
          }
          .platzi-picture {
            text-align: center;
            width: 100%;
          }
          body {
            background-image: linear-gradient(
              to right,
              #f78ca0 0%,
              #f9748f 19%,
              #fd868c 60%,
              #fe9a8b 100%
            );
            height: 100%;
            color: white;
          }
          :global(html) {
            height: 100%;
          }
        `}</style>
      </div>
    );
  }
}
