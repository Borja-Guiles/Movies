var mysql = require('mysql');
require('console.table');

var query = "";

var conmysql = mysql.createConnection({
    host:       'localhost',
    user:       'root',
    password:   'admin',
    database :  'mysqldb'
});

function getArgument(argument){
    var index = process.argv.indexOf(argument);

    return (index === -1) ? null : process.argv[index + 1];
}

conmysql.connect(function(error){
    if(error){
        console.log();
        console.log('Error connecting to MySQL ' + error.message);
        return;
    }
    console.log();
    console.log('Connected to mySQl');

});

function showMovies(){
    query = "SELECT * FROM movies;";

    conmysql.query(query,function (err, rows){
        console.log();
        console.log("Showing all movies");
        console.log();

        console.table(rows);

        console.log("Nº of movies: " + rows.length);
    });
}

function insertMovie(){
    var title       = getArgument('-title');
    var description = getArgument('-description');
    var rating      = getArgument('-rating');
    var release     = getArgument('-release');

    query = "INSERT INTO movies(title,description,rating,`release`) VALUES (?,?,?,?)";


    var values = [title, description, rating,release];

    query = mysql.format(query, values);

    conmysql.query(query, function (error, result) {
        if (error) {
            console.log('The following error occured while trying to insert a new record ' + error.message);
        }
        console.log();
        console.log('Created new artist with id ' + result.insertId);
    })
}

function updateMovie(){
    var id          = getArgument('-id');
    var title       = getArgument('-title');
    var description = getArgument('-description');
    var rating      = getArgument('-rating');
    var release     = getArgument('-release');

    query = "UPDATE movies SET title = ?,description = ?,rating = ?,`release` = ? WHERE id = ?";

    var values = [title, description, rating,release,id];


    query = mysql.format(query, values);

    conmysql.query(query, function (error, result) {
        if (error) {
            console.log('The following error occured while trying to insert a new record ' + error.message);
        }
        console.log();
        console.log('Updated artist with id ' + id);
    })
}

function deleteMovie(){
    var id = getArgument('-id');

    query = "DELETE FROM movies WHERE id = ?";

    var artist_id = [id];

    query = mysql.format(query, artist_id);

    conmysql.query(query, function (error, result) {
        if (error) {
            console.log('The following error occured while trying to insert a new record ' + error.message);
        }
        console.log();
        console.log('Deleted artist with id ' + id);
    })
}

var action = getArgument('-action');

switch(action){
    case "insert":
        insertMovie();
        break;

    case "update":
        updateMovie();
        break;

    case "delete":
        deleteMovie();
        break;
}


showMovies();

conmysql.end(function(error) {
    if(error){
        console.log();
        console.log('Error connecting to MySQL ' + error.message);
        return;
    }
    console.log();
    console.log('Connected to mySQl');
});
