// //fs stands for file system, used to interact with files.
const fs = require("fs");

// //creating a file, synchronously called using writeFIleSYnc

// // fs.writeFileSync(
// //   "./test.txt",
// //   "Hi, the content is again changed, i am changing constantly, why am i so unstable?"
// // );

// //async write file
// fs.writeFile("./test.txt", "this is async", (err) => {});

// //utf-8 is a encoding, how to decode the txt file???
// const result = fs.readFileSync("./contacts.txt", "utf-8");

// fs.readFile("./contacts.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(data);
// });

// console.log(result);

// //append file
fs.appendFileSync("./test.txt", "\nthis is appended text");

//source, destination _copyfiles
fs.cpSync("./test.txt", "./test2.txt");

//delete files
fs.unlinkSync("./test2.txt");

//stats
const stats = fs.statSync("./test.txt");
// console.log(stats);

console.log(stats.isFile());

fs.mkdirSync("my-docs");

fs.rmdirSync("my-docs");