/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// The ID of your GCS bucket
 const bucketName = 'mypicz-storage';

// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');
require('dotenv').config()

// Creates a client
const storage = new Storage();

async function makeBucketPublic() {
  await storage.bucket(bucketName).makePublic();

  console.log(`Bucket ${bucketName} is now publicly readable`);
}

makeBucketPublic().catch(console.error);