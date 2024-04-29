import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { TeamContext } from './main';

function Home() {
  const { state } = useContext(TeamContext);
  let players = [];

  for (let player of state.team) {
    players.push(
      <div className="ul-wrapper">
        <li className="player-name">{player.name}</li>
        <ul className="inner-list">
          <li>Health: {player.health}</li>
          <li>Attack: {player.attack}</li>
          <li>Speed: {player.speed}</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="home">
      <Link to="/edit-team">Edit Team</Link>
      <h1>Players</h1>
      <ul>{players.map((e) => e)}</ul>
    </div>
  );
}

export default Home;
