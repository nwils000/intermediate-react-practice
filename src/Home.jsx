import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { TeamContext } from './main';

const Title = () => {
  return <h1>Hello World!</h1>;
};

function Home() {
  const { state } = useContext(TeamContext);
  let players = [];

  for (let player of state.team) {
    players.push(
      <ul>
        <li>Name: {player.name}</li>
        <li>Health: {player.health}</li>
        <li>Attack: {player.attack}</li>
        <li>Speed: {player.speed}</li>
      </ul>
    );
  }

  return (
    <div>
      <Link to="/edit-team">Edit Team</Link>
      <h1>Players</h1>
      <ul>{players.map((e) => e)}</ul>
      <Title />
    </div>
  );
}

export default Home;
