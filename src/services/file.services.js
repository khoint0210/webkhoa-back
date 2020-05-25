import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

import constants from '../config/constants';

aws.config.update({
  accessKeyId: constants.AWS_ACCESS_ID,
  secretAccessKey: constants.AWS_SECRET_KEY,
});
aws.config.region = 'ap-southeast-1';

const s3 = new aws.S3();

export default multer({
  storage: multerS3({
    s3,
    bucket: 'fba-website/files',
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      const filename = `${Date.now().toString()}-${file.originalname}`;
      cb(null, filename);
    },
  }),
});
