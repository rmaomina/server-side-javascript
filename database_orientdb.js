var OrientDB = require('orientjs');

var server = OrientDB({
    host: '127.0.0.1',
    port: 2424,
    username: 'root',
    password: 'rmaomina',
});

var db = server.use('server-side-javascript');
console.log('Using Database:'  + db.name);

// var rec = db.record.get('#34:0') //node
//    .then(
//       function(record){
//          console.log('Loaded Record:', record);
//        }
//    );

/* 
 * CRUD
 * CREATE
 * READ
 * UPDATE
 * DELETE
 */