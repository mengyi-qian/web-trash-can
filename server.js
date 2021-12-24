const express = require('express');
const app = module.exports = express();
const routes = require('./routes');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(fileUpload());

//standard routes for displaying webpages and files
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/img/:file', function(req, res) {
  res.sendFile(__dirname + '/.data/'+req.params.file);
});

//Simple interfaces for viewing data
app.get('/data', routes.data)


// app.get('/display', routes.display);
// app.get('/preview', routes.preview);
app.get('/list', routes.listByFilename);
// app.get('/listByTimestamp', routes.listByTimestamp);

//Post-only routes for upload and destructive operations
app.get('/remove', routes.remove);
app.post('/upload', routes.upload);

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
