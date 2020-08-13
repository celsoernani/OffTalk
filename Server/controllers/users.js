const users = [];

const addUser = ({ id, name }) => {
  const nameLower = name.trim().toLowerCase();
  const room = 'chat';
  const existingUser = users.find((user) => user.name === name);
  if (existingUser) {
    return { error: 'O usuário já está na sessão.' };
  }
  const user = {
    id,
    name: nameLower,
    player: room,
  };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
  return true;
};
const getUser = (id) => {
  const user = users.find((userFind) => userFind.id === id);
  if (user) {
    return { user };
  }
  return { error: 'O usuário saiu da sessão.' };
};

const getUsers = () => {
  if (users.length > 0) {
    return users;
  }
  return { error: 'Sem jogadores sessão.' };
};


export {
  addUser, removeUser, getUser, getUsers,
};
