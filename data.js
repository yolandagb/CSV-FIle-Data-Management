const fs = require("fs");
const csv = require('csv-parser')
const { parse } = require("csv-parse");


const earliestCheckIn = [];
const latestCheckIn = [];
const users = [

];
const companiesName = [];





fs.createReadStream('Folder/data.csv')
    .pipe(csv())
    .on('data', function (row) {
        const earliest = (row.LastCheckInDate);
        const checkin1 = {

            checkin: row.LastCheckInDate,
        }
        earliestCheckIn.push(checkin1)
    })


    .on('data', function (row) {
        const latest = (row.LastCheckInDate);
        const checkin2 = {

            checkin: row.LastCheckInDate,
        }
        latestCheckIn.push(checkin2)
    })

    .on('data', function (row) {
        const costumers = (row.Firstname, row.Surname);
        const user = {
            firstname: row.Firstname,
            surname: row.Surname,
        }
        users.push(user)
    })
    .on('data', function (row) {
        const company = (row.Company);
        const companyName = {
            company: row.Company,
        }
        companiesName.push(companyName)
    })
    .on('end', function () {
        console.table(earliestCheckIn)
        console.table(latestCheckIn)
        console.table(users)
        console.table(companiesName)



    })


    // Retrieve the customer with the earliest check in date.
    // Retrieve the customer with the latest check in date.
    // Retrieve a list of customer’s full names ordered alphabetically.
    // Retrieve a list of the companies user’s jobs ordered alphabetically.