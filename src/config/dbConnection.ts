import mongoose from "mongoose";

export const connect = async () => {
  try {
    console.log("process.env.MONGO_URI", process.env.MONGO_URI);

    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Mongodb connected");
    });
    connection.on("error", (err) => {
      console.log(
        "Mongodb connection error , please make sure db is up and running: " +
          err
      );
      process.exit();
    });
  } catch (error) {
    console.log("error on mongo connect :", { error });
  }
};

// import mongoose from "mongoose";

// let isConnected = false; // Track connection status

// export const connect = async () => {
//   try {
//     if (isConnected) {
//       console.log("Already connected to MongoDB");
//       return; // If already connected, exit early
//     }

//     console.log("process.env.MONGO_URI", process.env.MONGO_URI);

//     await mongoose.connect(process.env.MONGO_URI!);
//     const connection = mongoose.connection;

//     connection.on("connected", () => {
//       isConnected = true; // Mark as connected
//       console.log("Mongodb connected");
//     });

//     connection.on("error", (err) => {
//       console.log(
//         "Mongodb connection error, please make sure db is up and running: " +
//           err
//       );
//       process.exit();
//     });
//   } catch (error) {
//     console.log("Error on mongo connect:", { error });
//   }
// };
