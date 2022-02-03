/* eslint-disable max-len */
export const maxID = (array) => Math.max(...array.map((user) => user.id));
export const findUser = (array, user) => array.find((cur) => cur.id === user);

export const addUser = ({ current, user }) => ([
  ...current,
  {
    id: (maxID(current) === -Infinity ? 1 : maxID(current) + 1),
    ...user,
  },
]);

export const removeUser = ({ current, delUser }) => current.filter((user) => user.id !== delUser.id);
export const editUser = ({ current, main }) => current.map((user) => {
  const mainuser = findUser(current, main.id);
  return (user.id === main.id ? { ...mainuser, name: main.name, email: main.email } : user);
});
