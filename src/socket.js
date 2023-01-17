import io from 'socket.io-client';

const socketserver = process.env.REACT_APP_SOCKETSERVER || 'http://localhost:4000'; // "http://192.168.1.66:4000";
// const currentRoom = window.location.pathname.split('/')[1];
// export const socket = io(socketserver, {
//   query: {
//     room: currentRoom !== 'admin' && currentRoom !== 'create' ? currentRoom : 'livevote',
//   },
// });
export const socket = io(socketserver);
export function sendMessage(id, value) {
  socket.emit(id, value);
}

export function addPlayer(name) {
  socket.emit('addPlayer', name);
}

export function userAdded(callBack) {
  socket.on('userAdded', (values) => {
    callBack(values);
  });
}

export function updateUserList(callBack) {
  socket.on('userList', ({ players }) => {
    callBack(players);
  });
}
export function startingGame(callBack) {
  socket.on('startingGame', () => {
    callBack();
  });
}

export function refreshCurrentNumber(callBack) {
  socket.on('currentNumber', ({ values }) => {
    callBack(values);
  });
}

export function updateMessageList(callBack) {
  socket.on('message', ({ message }) => {
    callBack(message);
  });
}

export function startGame(callBack) {
  socket.on('RunVote', ({ theme, values, old }) => {
    callBack({ theme, values, old });
  });
}
export function getTheme(callBack) {
  socket.on('getTheme', ({ theme, values, results, old }) => {
    callBack({ theme, values, results, old });
  });
}
export function refreshStat(callBack) {
  socket.on('refreshStats', (results) => {
    callBack(results);
  });
}