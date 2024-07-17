const fs = require("fs");
const os = require("os");

//number of threads, mine 16
console.log(os.cpus().length);

//this is a blocking operation... it will block the code until the file is read
// console.log("Start reading file");
// const result = fs.readFileSync("architecture.txt", "utf-8");

// console.log(result);

// //this is a non blocking operation... it will not block the code, it will let others code run while it reads the file...
// const result2 = fs.readFile("architecture.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// console.log("Do something else");

//default thread pool size = 4
//maximum thread pool size depends upon the core of the machine...
