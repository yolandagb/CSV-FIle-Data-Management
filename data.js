const fs = require("fs");
const csv = require('csv-parser')
const { parse } = require("csv-parse");

const checkEarly =[];
const checkLate =[];
const fullNameSorted =[];
const companyNameSorted =[];


fs.createReadStream('Folder/data.csv')
    .pipe(csv())

    .on('data', function (row) {

        const earliest = [
            {
                checkin: row.LastCheckInDate
            }
        ]

        let checkin = earliest.map(function (row) {

            return `${row.checkin}`;

        }).sort(function (a, b) { 
            
            return a.LastCheckInDate - b.LastCheckInDate 
        })
       
        checkEarly.push(checkin)
})

    .on('data', function (row) {

        const latest = [
            {
                checkin: row.LastCheckInDate,
            }
        ]
        let checkin1 = latest.map(function (row) {

            return `${row.checkin}`;

        }).sort(function (a, b) {
            
            return b.LastCheckInDate - a.LastCheckInDate
        })

        checkLate.push(checkin1)

    })

    .on('data', function (row) {

        const costumers = [
            {
                firstname: row.Firstname,
                lastname: row.Lastname,
            }
        ]
        function names  (a,b){
            return a <b ? -1 : (a > b ? 1:0);
        }


        let  fullNames = costumers.map(function (row) {

            return `${row.firstname} ${row.lastname}`;

        }).sort(names)

        fullNameSorted.push(fullNames)

    })
    
    .on('data', function (row) {

        const companyName = [
            {
                company: row.Company
            }
        ]

        function name  (a,b){
            return a < b ? -1 : (a > b ? 1:0);
        }

        let companies = companyName.map(function (row) {

            return `${row.company}`;

        }).sort(name)

        companyNameSorted.push(companies)

    })

    .on('end', function () {
        console.table(checkEarly)
        console.table(checkLate);
        console.table(fullNameSorted);
        console.table(companyNameSorted);

    })


    