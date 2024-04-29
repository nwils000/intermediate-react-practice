import { Link } from 'react-router-dom';
import { TeamContext } from './main';
import { useContext, useState } from 'react';

function EditTeam() {
  const [name, setName] = useState('');
  const [health, setHealth] = useState('');
  const [attack, setAttack] = useState('');
  const [speed, setSpeed] = useState('');
  const [validation, setValidation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { dispatch } = useContext(TeamContext);

  return (
    <div>
      <Link to="/">{'<- Back'}</Link>
      <h1>About Page</h1>
      <label>Name</label>
      <input
        value={name}
        type="text"
        placeholder="Player Name"
        onChange={(e) => {
          setValidation('');
          if (e.target.value.length <= 15) {
            setName(e.target.value);
          }
        }}
      />
      <label>Health</label>
      <input
        value={health}
        type="number"
        min="0"
        placeholder="(0-10)"
        onChange={(e) => {
          setValidation('');
          if (e.target.value <= 5) {
            setHealth(Number(e.target.value));
          }
        }}
      />
      <label>Attack</label>
      <input
        value={attack}
        type="number"
        min="0"
        placeholder="(0-10)"
        onChange={(e) => {
          setValidation('');
          if (e.target.value <= 5) {
            setAttack(Number(e.target.value));
          }
          console.log(attack);
        }}
      />
      <label>Speed</label>
      <input
        value={speed}
        type="number"
        min="0"
        placeholder="(0-10)"
        onChange={(e) => {
          setValidation('');
          if (e.target.value <= 5) {
            setSpeed(Number(e.target.value));
          }
        }}
      />
      <button
        onClick={() => {
          console.log(typeof health);
          if (
            (health + attack + speed <= 10 && name && health != '') ||
            (health === 0 && attack != '') ||
            (attack === 0 && speed != '') ||
            speed === 0
          ) {
            dispatch({
              type: 'ADD_PLAYER',
              teamMember: {
                name: name,
                health: health,
                attack: attack,
                speed: speed,
              },
            });
            setErrorMessage('');
            setValidation(`${name} added to the team`);
            setName('');
            setAttack('');
            setHealth('');
            setSpeed('');
          } else if (health + attack + speed > 10) {
            setErrorMessage('');
            setErrorMessage(`${name}'s total skill points exceed 10`);
          } else {
            setErrorMessage('');
            setErrorMessage(`1 or more input fields are empty`);
          }
        }}
      >
        Add Player
      </button>
      <div style={{ color: 'green' }}>{validation}</div>
      <div style={{ color: 'red' }}>{errorMessage}</div>
    </div>
  );
}

export default EditTeam;
