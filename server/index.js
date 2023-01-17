const app = require('express')();
const http = require('http').createServer(app);
const origin = process.env.origin || 'http://localhost:3000'; // "http://192.168.1.66:3000";
const io = require('socket.io')(http, {
  cors: {
    //   origin: "http://localhost:3000", "http://192.168.1.66:3000"
    origin,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});


const takeNremoveElmtFromArray = (array) => {
  if(array.length === 1){
    return {index: 0, value: array[0], newArray: []} 
  }else{
    const rand = Math.random()*array.length;
    const indx = Math.floor(rand);
    return {index: indx, value: array[indx], newArray: array.filter(e => e !== array[indx])} 
  }
}

const create90array = (length = 90) => Array.from({length}, (_, i) => i + 1)


// clearInterval(interval);


const ROOM = 'lotobingo';
let players = [];
const NumberParty = []
let intervalGame = false;
var interval = false;
const getRoom = (socket) => {
  return socket.handshake.query.room !== '' ? socket.handshake.query.room : ROOM
}

io.on('connection', (socket) => {
  console.log(`a user connected (${players.length}): `, socket.id);
//   const currentRoom = getRoom(socket)
  
  socket.on('StartGame', () => {
    let array90 = create90array(90)
    const alreadyTake = []
    console.log('interval :: ', interval)
    clearInterval(interval);
    new Promise(resolve => {
      console.log('lauching game...')
      io.emit('startingGame', {});
      setTimeout(resolve, 1000)
    }).then(() => {

        interval = setInterval(function() {
        const values = takeNremoveElmtFromArray(array90)
        console.log("le numero est : "+values.value+'//'+alreadyTake)
        io.emit('currentNumber', { values : { value:values.value, taken: alreadyTake }});
        alreadyTake.push(values.value)
        if(values.newArray==0){
          clearInterval(interval);
        }
        array90=values.newArray
      }, 7000);
    })
    
  });

  socket.on('EndGame', () => {
        clearInterval(interval);
  });
  
//   RoomData[currentRoom].players.push({ id: socket.id, pts: 0 });
//   io.to(currentRoom).emit('userList', { players: RoomData[currentRoom].players });

//   const {players, theme, values, results, old} = RoomData[currentRoom]

//   console.log('userList : ', players, 'in room', currentRoom);
//   if (theme && values) {
//     io.to(socket.id).emit('getTheme', { theme, values, results, old });
//     console.log('getTheme', { theme, values, results });
//   }

  socket.on('addUser', (values) => {
    const userValues = { id: socket.id, name: values.name, cartons: [] }
    players.push(userValues)
    console.log(`user added ${socket.id}/${values.name}`);
    io.to(socket.id).emit('userAdded', userValues);
    io.emit('userList', { players });
  });

  socket.on('AddUpdateUserCarton', ({cartons}) => {
    players.map((user) => user.id === socket.id ? ({...user, cartons}) : user);
    console.log(`user carton added ${cartons.length}`);
  });

  socket.on('disconnect', () => {
    players = players.filter((user) => user.id !== socket.id) || [];
    console.log(`user disconnected ${socket.id}`);
    // results = results.filter((user) => user.id != socket.id) || []
    io.emit('userList', { players });
    // io.to(currentRoom).emit('userList', { players });
  });

//   socket.on('addNewGame', (newvalues) => {
//     let currentRoom = false
//     if(newvalues.room){
//       currentRoom = newvalues.room;
//       if(!RoomData[currentRoom]){
//         RoomData = {...RoomData, [currentRoom] : {
//           theme : 'No question...',
//           values : [],
//           results : [],
//           players : [],
//           old : [],
//         }}
//       }
//     }else{
//       currentRoom = getRoom(socket)
//     }
//     if(RoomData[currentRoom].values.length > 0){
//       RoomData[currentRoom].old = [...RoomData[currentRoom].old, {
//         theme: RoomData[currentRoom].theme,
//         values: RoomData[currentRoom].values,
//         results: RoomData[currentRoom].results
//       }]
//     }
//     if(newvalues.theme){
//       RoomData[currentRoom].theme = newvalues.theme;
//       if(newvalues.values){
//         RoomData[currentRoom].values = newvalues.values;
//       }
//     }
       
//     RoomData[currentRoom].results = [];

//     const {theme, values, old} = RoomData[currentRoom]

//     io.to(currentRoom).emit('RunVote', { theme, values, old });
//   });

//   socket.on('vote', (elm) => {
//     const currentRoom = getRoom(socket)
//     const {results} = RoomData[currentRoom]
//     // check si blacklisted
//     const isBlacklisted = results.find((user) => user.id === socket.id);
//     console.log('blacklisted', isBlacklisted);
//     if (!isBlacklisted) {
//       results.push({ id: socket.id, choice: elm });
//       console.log('voted', { id: socket.id, choice: elm }, results);
//     }
//     io.to(currentRoom).emit('refreshStats', results);
//   });
});

const port = process.env.PORT || 4000;
http.listen(port, () => {
  console.log(`listening on *:${port}`);
});