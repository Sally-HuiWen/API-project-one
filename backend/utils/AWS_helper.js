const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

// Configuration for S3
const BUCKET_NAME = process.env.S3_BUCKET;
const S3_LOCATION = `https://${BUCKET_NAME}.s3.amazonaws.com/`;
const ALLOWED_EXTENSIONS = new Set(['pdf', 'png', 'jpg', 'jpeg', 'gif']);

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET,
  region: process.env.S3_REGION, // Optional: specify your bucket's region
});

/**
 * Generate a unique filename.
 * @param {string} filename - The original filename.
 * @returns {string} - A unique filename with the same extension.
 */
const getUniqueFilename = (filename) => {
  const ext = filename.split('.').pop().toLowerCase();
  const uniqueFilename = uuidv4();
  return `${uniqueFilename}.${ext}`;
};

/**
 * Upload a file to S3.
 * @param {Buffer | ReadableStream} fileContent - The file content to upload.
 * @param {string} filename - The original filename.
 * @param {string} contentType - The file's content type (e.g., 'image/jpeg').
 * @param {string} acl - The S3 Access Control List (default: public-read).
 * @returns {Promise<Object>} - The result of the upload operation.
 */
const uploadFileToS3 = async (fileContent, filename, contentType, acl = 'public-read') => {
  const uniqueFilename = getUniqueFilename(filename);

  const params = {
    Bucket: BUCKET_NAME,
    Key: uniqueFilename,
    Body: fileContent,
    ContentType: contentType,
    ACL: acl,
  };

  try {
    const data = await s3.upload(params).promise();
    return { url: `${S3_LOCATION}${uniqueFilename}` };
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    return { errors: error.message };
  }
};

/**
 * Remove a file from S3.
 * @param {string} fileUrl - The full URL of the file to delete.
 * @returns {Promise<Object>} - The result of the deletion operation.
 */
const removeFileFromS3 = async (fileUrl) => {
  const key = fileUrl.split('/').pop(); // Extract the file key from the URL

  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
  };

  try {
    await s3.deleteObject(params).promise();
    return { success: true };
  } catch (error) {
    console.error('Error removing file from S3:', error);
    return { errors: error.message };
  }
};

module.exports = {
  uploadFileToS3,
  removeFileFromS3,
};