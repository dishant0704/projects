import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGODB_URI!, {
      dbName: "pwa-news-app-db",
    });
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Mongo DB Connected");
    });

    connection.on("error", (error) => {
      console.log(
        "Mongo DB connection error, Please make sure DB up and runing: ",
        error,
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something want wrong in connection to DB");
    console.log("Error: ", error);
  }
}
