export const initialTeamState = {
  team: [],
};

export const teamReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PLAYER':
      return {
        ...state,
        team: [
          ...state.team,
          {
            name: action.teamMember.name,
            health: action.teamMember.health,
            attack: action.teamMember.attack,
            speed: action.teamMember.speed,
          },
        ],
      };
  }
};
