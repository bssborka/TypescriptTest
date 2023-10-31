import * as Fs from 'fs';
const md5 = require("md5");

interface Directory{	
 	path: string;
}

type Content={md5code: string, content:string}


let existingContent:Content[]=[];
class FS {

 directory: Directory;
 constructor(d:any){
	this.directory=d;
   
}

    store(filename: string, content: string){
        storeData(filename,content);
          console.log("File "+filename+" created");   
                  
    }
   
		
     get(filename: string){   
        
        let y="";
        Fs.readFile(filename+".txt", function (err, data) {
            if (err) {
                return console.error(err);
            }      
            y=data.toString();
            
            for( let i:number=0;i<existingContent.length;i++){                    
                if(y==existingContent[i].md5code){
                  console.log(existingContent[i].content);
                  break;
                }               
         } 
        });
     }
		
}

function storeData(filename:string , content:string){
    Fs.writeFile(filename+'.txt', md5(content), function(err){
        if(err){
            return console.error(err);
        }
       
    }); 
      if(existingContent.find(x=>{x.content==content})==undefined){
            fillArr(md5(content), content);               
       }  
    return existingContent;
}
function fillArr(m:string , c:string){
    existingContent.push({md5code: m, content: c});
    return existingContent;
}

let fs = new FS("/");
fs.store("filename1", "a very long string1");
fs.store("filename2", "a very long string1");
fs.store("filename3", "a very long string3");
let result1 = fs.get("filename1");// gets 'a very long string1'
let result2 = fs.get("filename2");// gets 'a very long string1'
let result3 = fs.get("filename3");// gets 'a very long string3'


