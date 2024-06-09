import mysql from 'mysql';
import fs from 'fs';
import path from 'path';

const connection = mysql.createConnection({
    host: '150.136.175.102',
    database: 'fullstack',
    user: 'gliu',
    password: 'benray1110',
});

connection.connect();
connection.query(
    'select * from  users' ,
    (err, people) => {
    if (err) console.log(err);
    console.log("Here are the current people")
    console.log( people )
});
connection.end();


/*
fs.readFile(path.join(__dirname, 'people-data.json'), 'utf8', (err, contents) => {
    if (err) return console.log(err);
    let people = JSON.parse(contents)
    let index = 1
    const peopleInArray = people.map(person => [
        index++,
        person.name,
        person.age,
    ]);
    console.log(peopleInArray)
    connection.query(
        'INSERT INTO users (id, name, age) VALUES ?',
        [peopleInArray],
        (err, people) => {
        if (err) console.log(err);
        console.log("Done inserting people!")
    });

    connection.end();
});
*/