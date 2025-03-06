const socketIo = require('socket.io');
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;

function initializeSocket(server) {
  io = socketIo(server, {
    // Creating a new Socket io server
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected: " + socket.id);

    socket.on("join", async (data) => {
      const { userID, userType } = data;

      console.log(`User ${userID} joined as ${userType}`);

      if (userType === "user") {
        await userModel.findByIdAndUpdate(userID, { socketId: socket.id });
      } else if (userType === "captain") {
        await captainModel.findByIdAndUpdate(userID, { socketId: socket.id });
      }
    });

    socket.on("update-location-captain", async (data) =>{
      const { captainId, location } = data;

      if(!location || !location.ltd || !location.lng){
        return socket.emit('error', { message: 'Invalid location data' });
      }

      await captainModel.findByIdAndUpdate(captainId, { 
        location:{
          ltd : location.ltd,
          lng : location.lng,
        }
       });
    })

    socket.on("payment-success", ({ rideId }) => {
      // console.log(`Payment successful for ride: ${rideId}`);
      
      // Notify captain that payment is completed
      io.emit(`payment-update-${rideId}`, { paymentCompleted: true });
  });

    socket.on("disconnect", () => {
      console.log("Client disconnected: " + socket.id);
    });

  });
}

const sendMessageToSocketId =(socketId, messageObject) =>{
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("Socket.io not initialized");
  }

}

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
