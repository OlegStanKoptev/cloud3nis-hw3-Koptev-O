import React from 'react';

export const MyContext = React.createContext({
  notes: 0,
  setNotes: () => {},
  listUpdateState: false,
  updateList: () => {},
});
