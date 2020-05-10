/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import { Storage } from 'aws-amplify';
import * as mime from 'react-native-mime-types';

const uuid = require('react-native-uuid');

class ImageStore {
  folder: string;

  constructor(folder: string) {
    this.folder = folder;
  }

  public async fetchImages(keys) {
    try {
      const compiledImages = await keys.map((key) => {
        return this.fetchImageFromStore(key);
      });
      return compiledImages;
    } catch (error) {
      console.log(`Fetch Images error: ${error}`);
      return [];
    }
  }

  private async fetchImageFromStore(key) {
    try {
      const response = await Storage.get(key);
      return response;
    } catch (error) {
      console.log(`Fetch Image error: ${error}`);
      return [];
    }
  }

  public async uploadImagesToStore(images, folder) {
    this.folder = folder;
    const keys = await images.map((image) => {
      return this.uploadFile(image);
    });
    return keys;
  }

  /*
  private async uploadFileINCONSTRUCT(file) {
    try {
      const rawFile = await this.getFileBlob(file);
      const blob = await rawFile.blob();
      const uploadedFile = await Storage.put(
        this.generateKey(),
        blob,
        this.getFileMeta(file),
      );
      console.log({ uploadFile: uploadedFile.key });
      return uploadedFile.key;
    } catch (error) {
      console.log(`Upload images error ${error}`);
      return [];
    }
  }
 */

  async uploadFile(file) {
    try {
      const uploadedFile = await fetch(file).then((rawFile) => {
        return rawFile.blob().then((blob) => {
          return Storage.put(
            this.generateKey(),
            blob,
            this.getFileMeta(file),
          );
        });
      });
      return uploadedFile.key;
    } catch (error) {
      console.log(`Upload images error ${error}`);
      return [];
    }
  }

  private generateKey() {
    // eslint-disable-next-line prefer-template
    return this.folder + '/' + uuid();
  }

  /*
  private async getFileBlob(file) {
    const blob = await fetch(file).then((rawFile) => {
      return rawFile.blob;
    });
    return blob;
  }
  */

  private getFileMeta(file) {
    const fileType = mime.lookup(file);
    return {
      level: 'public',
      contentType: fileType,
    };
  }

  async removeImages(keys) {
    try {
      const response = await keys.map((key) => {
        return this.removeFile(key);
      });
      return response;
    } catch (error) {
      console.log(`Delete images error: ${error}`);
      return [];
    }
  }

  async removeFile(key) {
    try {
      const response = await Storage.remove(key);
      console.log(`Success delete ${response}`);
      return response;
    } catch (error) {
      console.log(`Delete image error: ${error}`);
      return [];
    }
  }


}


export default ImageStore;
