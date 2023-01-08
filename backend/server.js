const express = require('express');
const cors = require('cors');
const mongodb = require('mongodb');
require('dotenv/config');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
// Serve static files from the public/images folder
app.use('/images', express.static('public/images'));

const client = new mongodb.MongoClient(process.env.DB, { useNewUrlParser: true });
client.connect((err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  const db = client.db();
  const hamstersCollection = db.collection('hamsters');

  /* GET hamsters */
  app.get('/hamsters', async (req, res) => {
    try {
      const hamsters = await hamstersCollection.find({}).toArray();

      // Modify each hamster object to include the image URL
      const hamstersWithImageUrls = hamsters.map((hamster) => {
        return {
          ...hamster,
          imageUrl: `/images/${hamster.id}.jpg`,
        };
      });

      res.status(200).send(hamstersWithImageUrls);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal server error' });
    }
  });

  /* POST new hamsters */
  app.post('/hamsters', async (req, res) => {
    const newHamster = req.body;
    try {
      await hamstersCollection.insertOne(newHamster);
      res.send({ msg: 'Hamster added', hamster: newHamster });
    } catch (error) {
      res.status(500).send({ msg: 'Error adding hamster', error });
    }
  });

  /* UPDATE by ID */
  app.put('/update/:id', async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        res.status(400).send({ error: 'Bad request' });
      }
      const data = req.body;
      const result = await hamstersCollection.updateOne({ _id: new mongodb.ObjectId(id) }, { $set: data });
      if (result.matchedCount === 0) {
        res.status(404).send({ error: 'Not found' });
      } else {
        res.status(200).send({ msg: 'Hamster updated' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal server error' });
    }
  });

  /* DELETE by ID */
  app.delete('/delete/:id', async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).send({ error: 'Bad request' });
      }
      const result = await hamstersCollection.deleteOne({ id });
      if (result.deletedCount === 0) {
        res.status(404).send({ error: 'Not found' });
      } else {
        res.status(200).send({ msg: 'Hamster deleted' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal server error' });
    }
  });
});

/* app.get('/images', async (req, res) => {
  try {
    const [objects] = await storage.bucket(process.env.GOOGLE_CLOUD_STORAGE_BUCKET).getFiles();
    const imageUrls = objects.map(
      (object) => `https://storage.googleapis.com/${process.env.GOOGLE_CLOUD_STORAGE_BUCKET}/${object.name}`
    );
    res.status(200).send(imageUrls);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
}); */

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
