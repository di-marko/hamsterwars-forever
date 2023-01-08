const express = require('express');
const cors = require('cors');
const mongodb = require('mongodb');
const multer = require('multer');
const GridFSBucket = require('mongodb').GridFSBucket;
const fs = require('fs');
const Buffer = require('Buffer');
require('dotenv/config');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const client = new mongodb.MongoClient(process.env.DB, { useNewUrlParser: true });
client.connect((err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  const db = client.db();
  const hamstersCollection = db.collection('hamsters');
  const storage = new GridFSBucket(db, { bucketName: 'images' });

  // Multer configuration
  const upload = multer({ storage: multer.memoryStorage() });

  /* GET hamsters */
  app.get('/hamsters', async (req, res) => {
    try {
      const hamsters = await db
        .collection('hamsters')
        .aggregate([
          {
            $project: {
              HamsterId: 1,
              name: 1,
              age: 1,
              favFood: 1,
              loves: 1,
              wins: 1,
              defeats: 1,
              games: 1,
              imgName: 1,
            },
          },
          {
            $lookup: {
              from: 'images',
              localField: 'HamsterId',
              foreignField: 'hamsterId',
              as: 'images',
            },
          },
        ])

        .toArray();

      res.status(200).send(hamsters);
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
      const { id } = req.params;
      if (!id) {
        res.status(400).send({ error: 'Bad request' });
      }
      const data = req.body;
      const result = await hamstersCollection.updateOne({ id }, { $set: data });
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

  app.post('/upload', upload.single('image'), async (req, res) => {
    try {
      const image = req.file;
      const metadata = req.body;
      const hamsterId = metadata.hamsterId;
      const src = `data:${image.mimetype};base64,${image.buffer.toString('base64')}`;
      const alt = metadata.alt;

      // Store the image in the images collection
      const imageObject = {
        img: {
          data: image.buffer,
          contentType: image.mimetype,
        },
        src: src,
        alt: alt,
        hamsterId: hamsterId,
      };
      const imageId = (await storage.insertOne(imageObject)).insertedId;

      // Update the hamster object in the hamsters collection
      await hamstersCollection.updateOne({ id: hamsterId }, { $push: { images: imageObject } });

      res.send({ msg: 'Image uploaded', imageId });
    } catch (error) {
      res.status(500).send({ msg: 'Error uploading image', error });
    }
  });

  /* PUT /update/:id */
  app.post('/upload/:id', upload.single('imageFile'), async (req, res) => {
    const { id } = req.params;
    const image = req.file;
    // Validate the request
    if (!id || !image) {
      return res.status(400).send({ msg: 'Bad request' });
    }

    // Check if the hamster exists
    const hamster = await hamsters.findOne({ id });
    if (!hamster) {
      return res.status(404).send({ msg: 'Hamster not found' });
    }

    // Save the image to the database
    const uploadStream = storage.openUploadStream(image.originalname, {
      metadata: { hamsterId: id },
    });
    fs.createReadStream(image.path).pipe(uploadStream);

    uploadStream.on('error', (err) => {
      console.error(err);
      return res.status(500).send({ msg: 'Error uploading file' });
    });

    uploadStream.on('finish', (result) => {
      console.log(`File uploaded successfully with id: ${result._id}`);
      res.send({ msg: 'File uploaded successfully' });
    });
  });

  app.get('/images', async (req, res) => {
    try {
      const images = await db.collection('images').find({}).toArray();
      res.status(200).send(images);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal server error' });
    }
    console.log(images);
  });

  app.get('/images/:id', async (req, res) => {
    try {
      // Extract the ID parameter from the request
      const { id } = req.params;

      // Query the database for the image data
      const image = await db.collection('images').findOne({ _id: id });

      // If the image is not found, send a 404 Not Found response
      if (!image) {
        res.status(404).send({ error: 'Image not found' });
        return;
      }
      const imageData = image.data;
      const buffer = Buffer.from(imageData, 'binary');
      res.set('Content-Type', image.contentType);
      res.send(buffer);
      // Send the image data to the client
      res.status(200).send(image);
    } catch (error) {
      // If there is an error, send a 500 Internal Server Error response
      console.error(error);
      res.status(500).send({ error: 'Internal server error' });
    }
  });

  app.listen(4000, () => console.log('Running on port 4000'));
});
