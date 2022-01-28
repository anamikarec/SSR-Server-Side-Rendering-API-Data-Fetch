const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');
const server = http.createServer(function(req, res) {
    if(req.url==='/' && req.method=='GET'){
        handleHomePage(req, res);
    }
    if(req.url === '/users/1' && req.method === 'GET')
    handleUsersPage(req, res,1);

    if(req.url === '/users/2' && req.method === 'GET')
    handleUsersPage(req, res,2);

    if(req.url === '/users/3' && req.method === 'GET')
    handleUsersPage(req, res,3);

    if(req.url === '/users/4' && req.method === 'GET')
    handleUsersPage(req, res,4);
})


const handleUsersPage = (req, res,id)=>{
    fs.readFile(path.join(__dirname, "templates","user.html"), 'utf8', (err, data)=>{
       if(err){
            res.writeHead(404);
            res.send("Something went wrong");
            return;
        }
        let template = data;
        https.get("https://reqres.in/api/users/" + id,(httpResponse)=>{
            console.log(httpResponse.statusCode);
            let data = '';
            httpResponse.on('data', (chunk)=>{
                data += chunk;
            })
            httpResponse.on('end', ()=>{
                const response = JSON.parse(data);
                console.log(response);
                const options = {
                    name : response.data.first_name + ' ' + response.data.last_name,
                    img_src : response.data.avatar,
                    email : response.data.email,
                }
                console.log(options);
                for(let key in options) {
                    const value = options[key];
                    template = template.replace(`{${key}}`,value);
                }

                res.writeHead(200);
                res.end(template);
            })
        })
    })
}

const handleHomePage = (req, res)=>{
    fs.readFile(path.join(__dirname,"templates","index.html"),"utf8",(err,data)=>{
        let template = data;

        const options = {
            Document:"Home Page",
            name:"Anamika",
            wlcm_msg:"Welcome to the home page of the website"
        }

        for(let key in options){
            const value = options[key];
            template = template.replace(`{${key}}`,value);
        }

        console.log(template);
        res.writeHead(200);
        res.end(template);
    })
}


server.listen("4000",(err)=>{
    console.log("listen on port 4000");
})

















// // path
// const path = require('path');
// console.log("path",path);

// // global level
// console.log(__filename);
// console.log(__dirname);

// console.log(1,path.basename(__filename));
// console.log(2,path.dirname(__filename));
// console.log(3,path.extname(__filename));

// object
// console.log(4,path.parse(__filename));

// join
// console.log(5,path.join(__dirname,'test','hello.html'));

// file systems
// const fs = require('fs');

// // async in nature => Blocking Code
// // read to a file
// fs.readFile(path.join(__dirname,'hello.txt'),'utf8',(err,data)=>{
//     if(err){
//         console.error(err);
//         return;
//     }
//     console.log(data);
// })

// // read to a file
// // sync in nature => Non-Blocking Code
// const data = fs.readFileSync(path.join(__dirname,'hello.txt'),"utf8");
// console.log(data);

// // write to a file
// fs.writeFile(path.join(__dirname,'hello.txt'),"HELLO",(err)=>{
// if(err){
//     console.error(err);
//     return;
// }
// console.log("File Created");
// })

// // rename a file without folder
// // fs.rename(path.join(__dirname,'hello.txt'),path.join(__dirname,'hello2.txt'),err=>{
// //     if(err){
// //         console.log(err);
// //         return;
// //     }
// //     console.log("File Renamed");
// // })

// // rename a file using folder
// // fs.mkdir(path.join(__dirname,'test'),err=>{
// //     if(err){
// //         console.log(err);
// //         return;
// //     }
// //     fs.rename(path.join(__dirname,'hello.txt'),path.join(__dirname,'hello2.txt'),err=>{
// //         if(err){
// //             console.log(err);
// //             return;
// //         }
// //         console.log("File Renamed");
// //     })
// // })


