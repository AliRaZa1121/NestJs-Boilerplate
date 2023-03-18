import * as multer from "multer";
import * as fs from "fs";
import { CreateMediaDto } from "src/media/dto/create-media.dto";
import { MediaType } from "src/utilities/enums";

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/storage");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let uploadFile = file.originalname.split(".");
    let name = `${uniqueSuffix}.${uploadFile[uploadFile.length - 1]}`;
    cb(null, name);
  },
});

export async function checkIfFileExistsInDir(
  filePath: string
): Promise<boolean> {
  const path = `public/${filePath}`;
  return fs.existsSync(path);
}

export async function getFileData(
  file: Express.Multer.File
): Promise<CreateMediaDto> {
  const path = `${process.env.STORAGE_PATH}/${file.filename}`;
  const fileType = file.mimetype;
  const fileData: CreateMediaDto = {
    type: MediaType.FILE,
    path: path,
  };
  if (fileType.match(`application`)) {
    fileData.type = MediaType.FILE;
  } else if (fileType.match(`image`)) {
    fileData.type = MediaType.IMAGE;
  } else if (fileType.match(`video`)) {
    fileData.type = MediaType.VIDEO;
  } else if (fileType.match(`audio`)) {
    fileData.type = MediaType.AUDIO;
  }
  return fileData;
}
