const fs = require('fs');
const low = require('lowdb')

//https://github.com/typicode/lowdb usage instructions
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

//initiate a blank database if it doesn't exist


const initializeDb = () => {
    let dbTemplate = {
    files: []
  }
  db.defaults(dbTemplate).write()
}

initializeDb()


exports.upload = (req, res, next) => {
  console.log(req.files)
  console.log(req.body)
  const timestamp = Date.now()

  console.log(req.files.image.name) 
  
  let fullFileName = req.files.image.name
  let fileNameExtension = fullFileName.split(".").pop()

  const filename = Buffer.from(`${timestamp}-${req.files.image.name}`).toString('base64') + `.${fileNameExtension}`;
  req.files.image.mv(`/${filename}`);
  
  let fileData = {
    name: req.files.image.name,
    filetype: fileNameExtension,
    filename: filename,
    filepath: `/img/${filename}`,
    timestamp: timestamp,
    meta: req.body
  }

  // //write the file description to the database
  db.get("files").push(fileData).write()
  
  res.redirect('/');
};

exports.data = (req, res, next) => {

  res.json(db.get("files").value())

}


// exports.display = async (req, res) => {
//   //list all image names and urls
  
//   let fileData = db.get("files").value()
  
//   let fileDataList = fileData.map((file)=>{
//     return `<li><a href="${file.filepath}">${file.filename}</a></li>`
//   })
  
//   res.set('Content-Type', 'text/html');
//   return res.end(`<ul>${fileDataList}</ul>`)
// };

// exports.preview = async (req, res) => {
//   //show all images
  
//   let fileData = db.get("files").value()
  
//   let fileDataList = fileData.map((file)=>{
//     return `<li>
//       <span>${file.filename}</span>
//       <a href="${file.filepath}">
//         <img width="100%" src="${file.filepath}" />
//       </a>
//     </li>`
//   })

//   res.set('Content-Type', 'text/html');
//   return res.end(`<ul>${fileDataList}</ul>`)
  
// };

exports.listByFilename = async (req, res) => {
  //output all image titles
  
  let fileData = db.get("files").sortBy("filename").value()
  res.json(fileData);
  
};

// exports.listByTimestamp = async (req, res) => {
//   //output all image titles, most recent first
  
//   let fileData = db.get("files").sortBy("timestamp").value().reverse()
//   res.json(fileData.reverse())
  
// };

exports.remove = (req, res) => {
  
  db.get("files").remove(()=>{return true}).write()
  let images = fs.readdirSync('/');
  
  for(let image of images) {
    fs.unlinkSync(`/${image}`);
  }
  
  initializeDb()

  res.redirect('/');
}
