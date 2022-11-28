const fs = require("fs");
const csv = require('csv-parser')
const { parse } = require("csv-parse");


fs.createReadStream('Folder/data.csv')
    .pipe(csv())

    // .on('data', function (row) {
    //     const earliest = [{ checkin: row.LastCheckInDate }]

    //     let fullNames = costumers.map(function (row) {

    //         return `${row.firstname} ${row.lastame}`;
    //     })
    //     console.log(fullNames)

    //     .sort(function (a, b) { return a.LastCheckInDate - b.LastCheckInDate })
    //     console.log(earliest)

    // })
    // .on('data', function (row) {
    //     const latest = [
    //         {
    //             checkin: row.LastCheckInDate,
    //         }
    //     ]
    //     let fullNames = costumers.map(function (row) {

    //         return `${row.firstname} ${row.lastame}`;
    //     })
    //     console.log(fullNames)

    // })

    .on('data', function (row) {
        const costumers = [{
            firstname: row.Firstname,
            lastame: row.Lastame,
        }]

        let fullNames = costumers.map(function (row) {

            return `${row.firstname} ${row.lastame}`;
        })
        fullNames.sort(function (a, b) { return a.fullNames - b.fullNames })
        console.log(fullNames)

    })
    .on('data', function (row) {

        const companyName = [
            {
                company: row.Company
            }
        ]

        let companies = companyName.map(function (row) {

            return `${row.company}`;
        })
        companies.sort(function (a, b) { return a.fullNames - b.fullNames })

        console.log(companies)
    })
    .on('end', function () {



    })


    // Retrieve the customer with the earliest check in date.
    // Retrieve the customer with the latest check in date.
    // Retrieve a list of customer’s full names ordered alphabetically.
    // Retrieve a list of the companies user’s jobs ordered alphabetically.