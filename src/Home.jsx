import { Link } from 'react-router-dom';

const Title = () => {
  return <h1>Hello World!</h1>;
};

function Home() {
  return (
    <div>
      <Link to="/edit-team">Team Summary</Link>
      <Title />
    </div>
  );
}

export default Home;
