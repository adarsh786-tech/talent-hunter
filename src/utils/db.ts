import mongoose from "mongoose";

const connect = async () => {
  // const USERNAME = "talenthunterdev";
  // const PASSWORD = "R43YxGvbn8oGRSY4";
  // const MONGODB_URI = `mongodb+srv://${USERNAME}:${PASSWORD}@projectcluster.onz6l8x.mongodb.net/TalentHunterAuth?retryWrites=true&w=majority`;

  if (mongoose.connections[0].readyState) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MONGODB Conenction Successfull");
  } catch (error) {
    throw new Error(`Error Connecting to MONGODB. Error: ${error}`);
  }
};

export default connect;

// import mongoose from 'mongoose';

// mongoose.connect('mongodb://localhost:27017/mydatabase', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch((err) => console.error('MongoDB connection error:', err));
