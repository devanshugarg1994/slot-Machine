export function getAssetKey  (path: string) {
   const fileName: string =  path.substring(path.lastIndexOf('/')+1);
   const fileNameComponents: string []=   fileName.split(".");
   return fileNameComponents[0];
}