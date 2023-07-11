const express = require("express");
const cors = require("cors");
const axios = require("axios");
const Redis = require("redis");

let redisClient;

(async () => {
  redisClient = Redis.createClient(); // inside createClient we can pass a parameter as url to pass the url and port for production server.

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

const DEFAULT_EXPIRATION = 3600;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/photos", async (req, res) => {
  const albumId = req.query.albumId;
  try {
    const cacheData = await redisClient.get(`photos?albumId=${albumId}`);
    if (cacheData) {
      return res.json(JSON.parse(cacheData));
    } else {
      try {
        const { data } = await axios.get(
          "https://jsonplaceholder.typicode.com/photos",
          { params: { albumId } }
        );
        await redisClient.set(
          `photos?albumId=${albumId}`,
          JSON.stringify(data),
          {
            EX: DEFAULT_EXPIRATION,
          }
        );
        res.json(data);
      } catch (setError) {
        console.log(setError);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/photos/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const cacheData = await redisClient.get(`photos:${id}`);
    if (cacheData) {
      return res.json(JSON.parse(cacheData));
    } else {
      try {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/photos/${id}`
        );
        await redisClient.set(`photos:${id}`, JSON.stringify(data), {
          EX: DEFAULT_EXPIRATION,
        });
        res.json(data);
      } catch (setError) {
        console.log(setError);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000);
