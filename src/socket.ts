// import socketIO from 'socket.io';

// export const initSocket = (server) => {
//   const io = socketIO(server);
//   io.on('connection', (socket) => {
//     console.log('User Connected');
//     socket.on('chat message', (message) => {
//       io.emit('chat message', message);
//     });

//     socket.on('disconnect', () => {
//       console.log('User disconnected');
//     });
//   });
//   return io;
// };
