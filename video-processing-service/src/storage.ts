import { Storage } from '@google-cloud/storage';
import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';
import e from 'express';


const storage = new Storage();

const rawVideoBucketName = "rk-raw-videos";
const processedVideoBucketName = "rk-processed-videos";

const localRawVideoDirectory = "./raw-videos";
const localProcessedVideoDirectory = "./processed-videos";

export function setUpDirectories(){
    ensureDirectoryExists(localRawVideoDirectory);
    ensureDirectoryExists(localProcessedVideoDirectory);
}

export function convertVideo(rawVideoName: string, processedVideoName: string){
    return new Promise<void>((resolve, reject)=>{
    ffmpeg(`${localRawVideoDirectory}/${rawVideoName}`)
        .outputOptions("-vf", "scale=-1:360")
        .on("end", ()=>{
            console.log("Finished processing video.");
            resolve();
        })
        .on("error", (err)=>{
            console.log(`An error occured:  ${err.message}`);
            reject(err);
        })
        .save(`${localProcessedVideoDirectory}/${processedVideoName}`);
    });
}

export async function downloadRawVideo(fileName: string) {
    await storage.bucket(rawVideoBucketName)
        .file(fileName)
        .download({destination: `${localRawVideoDirectory}/${fileName}`});
    
        console.log(`gs://${rawVideoBucketName}/${fileName} downloaded to ${localRawVideoDirectory}/${fileName}.`);
}

export async function uploadProcessedVideo(fileName: string) {
    const bucket = storage.bucket(processedVideoBucketName);
    await bucket.upload(`${localProcessedVideoDirectory}/${fileName}`, {
        destination: fileName
    });

    console.log(`${localProcessedVideoDirectory}/${fileName} uploaded to gs://${processedVideoBucketName}/${fileName}`)

    await bucket.file(fileName).makePublic();
}


export async function deleteRawVideo(fileName: string) {
    return deleteFile(`${localRawVideoDirectory}/${fileName}`);
}

export async function deleteProcessedVideo(fileName: string) {
    return deleteFile(`${localProcessedVideoDirectory}/${fileName}`);
}


function deleteFile(filePath: string): Promise<void> {
    return new Promise((resolve, reject)=>{
        if(fs.existsSync(filePath)){
            fs.unlink(filePath,(err)=>{
                if(err){
                    console.log(`Error deleting file ${filePath}.`);
                    reject(err);
                }else{
                    console.log(`File ${filePath} deleted.`);
                    resolve();
                }
            })
        }else{
            console.log(`File ${filePath} does not exist.`);
        }
    });
}

function ensureDirectoryExists(dirPath: string) {
    if(!fs.existsSync(dirPath)){
        fs.mkdirSync(dirPath, {recursive: true});
        console.log(`Directory ${dirPath} created.`);
    }
}
