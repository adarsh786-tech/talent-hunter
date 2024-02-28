import mongoose from "mongoose";
export async function connect() {
  try {
    mongoose.connect(process.env.MONGODB_URI!);

    const connectionStatus = mongoose.connection;
    connectionStatus.on("connected", () => {
      console.log("Database Connected Successfully");
    });
    connectionStatus.on("error", (err) => {
      console.log(
        `Database Error!! Please check connection with DB. Error: ${err}`
      );
    });
  } catch (error) {
    throw new Error(`Something went wrong!! ERROR: ${error}`);
  }
}
