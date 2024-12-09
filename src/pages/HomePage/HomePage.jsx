import { Helmet } from 'react-helmet-async';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div>
        <h1>
          Phone<span>book</span>
        </h1>
      </div>
    </>
  );
}
