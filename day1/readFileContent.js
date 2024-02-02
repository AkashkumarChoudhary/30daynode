const fs = require('fs');
async function readFileContent(filePath){
    try{
        const data =  await fs.promises.readFile(filePath , "utf8");
        if(data){
            console.log(data);
        }
        else{
            console.log("File is empty ");
        }
    } catch(error) {
        console.error('Error reading file : ${error.code}: no such file exists: ${filePath}');
    }
}

async function readFile(){
await readFileContent('test-files/empty-file.txt');
await readFileContent('test-files/nonexistent-file.txt');
await readFileContent('test-files/file1.txt');
}

readFile();