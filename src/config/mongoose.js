import mongoose from "mongoose";

const options = {
  keepAlive: true,
  poolSize: 5,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const MONGO_URI = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;

export default async () => {
  await mongoose
    .connect(MONGO_URI, options)
    .then((db) => {
      console.log(
        "\x1b[36m%s\x1b[0m",
        `[Mongoose][_v: ${db.version}] Connected to the database`,
        db.connection.name
      );
    })
    .catch((err) =>
      console.log(
        "\x1b[41m%s\x1b[0m",
        `[Mongoose] Error connecting to database`,
        err
      )
    );
};