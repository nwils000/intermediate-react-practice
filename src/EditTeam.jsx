import { Link } from 'react-router-dom';

function EditTeam() {
  return (
    <div>
      <Link to="/">{'<- Back'}</Link>
      <h1>About Page</h1>
      <input type="text" placeholder="Player 1" />
      <input type="text" placeholder="Player 2" />
      <input type="text" placeholder="Player 3" />
      <input type="text" placeholder="Player 4" />
    </div>
  );
}

export default EditTeam;
