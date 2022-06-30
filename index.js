

var Connection = require('tedious').Connection;
var config = {
    server: "localhost",
    authentication: {
        type: 'default',
        options: {
            userName: 'sa', //update me
            password: '1qaz@WSX'  //update me
        }
    },
    options: {
        encrypt: false,
        database: 'Test'  //update me
    }
}

var connection = new Connection(config);
connection.on('connect', function(err) {
    console.log("Connected");  
    executeStatement();
});

connection.connect();

var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES;  

function executeStatement() {  
    var queryscript = "select Id, Name from dbo.Test"

    request = new Request(queryscript, function(err) {  
    if (err) {  
        console.log(err);}  
    });  
    var result = "";  
    request.on('row', function(columns) {  
        columns.forEach(function(column) {  
          if (column.value === null) {  
            console.log('NULL');  
          } else {  
            var j = JSON.parse(column.value);
            result+= column.value + " ";  
          }  
        });  
        console.log(result);  
        result ="";  
    });  

    // Close the connection after the final event emitted by the request, after the callback passes
    request.on("requestCompleted", function (rowCount, more) {
        connection.close();
        console.log("Closed");  

    });
    connection.execSql(request);  
}  




