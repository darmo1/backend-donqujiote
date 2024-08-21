export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: Function,
) => {
  if (!file) return cb(new Error('File is empty'), false); //second parameter is if we accepto or not the file in this case file is not accepted

  const fileExtension = file.mimetype.split('/')[1];
  const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];

  if( validExtensions.includes( fileExtension ) ){
  return cb(null, true);
  }

  cb(null, false)
};
