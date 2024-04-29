import { Link } from 'react-router-dom';
import { TeamContext } from './main';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';

function EditTeam() {
  const [name, setName] = useState('');
  const [health, setHealth] = useState('');
  const [attack, setAttack] = useState('');
  const [speed, setSpeed] = useState('');
  const [validation, setValidation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [randomBabyName, setRandomBabyName] = useState('...');
  const { dispatch } = useContext(TeamContext);

  async function fetchName() {
    try {
      const res = await axios.get(
        'https://api.api-ninjas.com/v1/babynames?gender=neutral',
        {
          headers: {
            'X-Api-Key': `${import.meta.env.VITE_API_KEY}`,
          },
        }
      );
      console.log('set baby name');
      setName(res.data[0]);
    } catch (err) {
      console.log(err);
    }
  }

  function randomlyGenerateStats() {
    let firstNumber, secondNumber, thirdNumber;
    do {
      firstNumber = Math.floor(Math.random() * 6);
      secondNumber = Math.floor(Math.random() * (6 - firstNumber));
      thirdNumber = 10 - firstNumber - secondNumber;
    } while (thirdNumber > 5 || thirdNumber < 0);

    let numbersArray = [firstNumber, secondNumber, thirdNumber];
    for (let i = numbersArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbersArray[i], numbersArray[j]] = [numbersArray[j], numbersArray[i]];
    }
    setHealth(numbersArray[0]);
    setAttack(numbersArray[1]);
    setSpeed(numbersArray[2]);
  }

  return (
    <div className="edit-team">
      <Link to="/">{'<- Back'}</Link>
      <h1>Edit Team</h1>
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
          console.log('clicked button');
          setName('...');
          fetchName();
        }}
      >
        Randomly Generate Name
      </button>
      <button onClick={randomlyGenerateStats}>Randomly Generate Stats</button>
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
