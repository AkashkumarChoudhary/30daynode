const path = require('path');

function checkFileExtension (filePath , expectedExt){
    const actualExt = path.extname(filePath);

    if(actualExt === expectedExt){
        console.log('File has the expected extension:' , expectedExt);
    }
    else{
        console.log('File does not have the expected extension. \nExpected: ${expectedExt} \n Actual : ${actualExt}');
    }
}

checkFileExtension('file1.txt' , '.txt');
checkFileExtension('/day5/1tomjerry-animation-cartoon-cat-wallpaper-preview.jpg', '.png');