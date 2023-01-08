# HAMSTERWARS backend

MAIN PROBLEMS:

1. Upload images to MongoDB. Trouble uploading and displaying the images in the frontend.
   The uploading issues was solved with slightly adjusting the tutorial code from here:
   https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/

2. I have managed to upload images to the MongoDB, however, now I had 2 collection in my db: hamsters and images.
   In order to grab the images from the images collections and attach it to the hamsters collection, I have tried using the aggregation method. No success. You can view the method in the backend folder "severOLD.js".

3. I managed to connect together the collection but images were still not displayed.

4. After spending 1 week on this task, I moved on to another solution, try to use Google Cloud Storage to store all the photos and in the GET requests reference the link to the collection there. After a few days of struggle I did not manage to solve the issue due to FREE account restrictions.

5. Last try was to just move all the images to the public/images folder. Which solved the issue.
