import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileUploaderService {

  constructor() { }

  isValidExtension(fileName: string, extensions: string[]): boolean { 
    if (!extensions.some(extension => fileName.includes(extension))) {
      console.error('Invalid file extension');
      return false;
    }
    
    return true;
  }
}
