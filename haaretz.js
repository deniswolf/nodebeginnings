var http = require('http'),
    url = require('url');

function getDataFromRemote() {
  var remoteResource = url.parse('http://www.haaretz.com');

  http.get(remoteResource, function (response) {

    // we expect text in UTF8, not default binary data
    response.setEncoding('utf8');

    var collectedData = '';

    response
    // a lot of different things could happen to response
      .on('data',function (data) {
        console.log('Hey, I got '+data);
        collectedData = collectedData + data;
      })
      .on('error', function(error){
        console.log('Oops, they throw stones!');
        // shut down everything
        process.exit();
      })
      .on('end', function  () {
        console.log('Oh, did we get something?');
        console.log(collectedData);
      });
  })
    .on('error', function (error){
      console.log('Argh, was not able to request !');
    });
}

module.exports = getDataFromRemote;