const fs = require("fs");
const csv = require('csv-parser')
const { parse } = require("csv-parse");

//We declare constasnt for later on display the data in tables
const checkEarly =[];
const checkLate =[];
const fullNameSorted =[];
const companyNameSorted =[];

//Putting the fs. method to read the file
fs.createReadStream('Folder/data.csv')

//Checking for errors before truing to pipe the data

    .on('error', () => {
       
    })
// starts to pipe data into which is listening to 5 events now
    .pipe(csv())
// returns each line row by row. in specific cases the row requested
    .on('data', function (row) {

        

        const earliest = [
            {
                checkin: row.LastCheckInDate
            }
        ].sort(function (a, b) { 
            
            return a.LastCheckInDate - b.LastCheckInDate 
        })

        let checkin = earliest.map(function (row) {

            return [row.checkin] ;

        })
       
        checkEarly.push(checkin)
})

    .on('data', function (row) {

        const latest = [
            {
                checkin: row.LastCheckInDate,
            }
        ].sort(function (a, b) {
            
            return b.LastCheckInDate - a.LastCheckInDate
        })

        let checkin1 = latest.map(function (row) {

            return [row.checkin];

        })


        checkLate.push(checkin1)

    })

    .on('data', function (row) {

        const costumers = [
            {
                firstname: row.Firstname,
                lastname: row.Lastname,
            }
        ].sort(function(a, b){

            return b-a
        })
        

        
        let  fullNames = costumers.map(function (row) {

            return [row.firstname,row.lastname].join(" ");

        })

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

            return [row.company];

        }).sort(name)

        companyNameSorted.push(companies)

    })

    // listens to the end of the CSV
    .on('end', function () {
        console.table(checkEarly)
        console.table(checkLate);
        console.table(fullNameSorted);
        console.table(companyNameSorted);

    })


    