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
//declared a constant  to access our specific row, wich is mapped first and then sorted (notworkingthis bit)        

        const earliest = [
            {
                checkin: row.LastCheckInDate
            }
        ]

        let checkin = earliest.map(function (row) {

            return [row.checkin] ;

        }).sort(function (a, b) { 
            
            return a.LastCheckInDate - b.LastCheckInDate 
        })

        console.error(checkin)

        checkEarly.push(checkin)
})

    .on('data', function (row) {

        const latest = [
            {
                checkin: row.LastCheckInDate,
            }
        ]

        function name  (a,b){
            return a < b ? -1 : (a > b ? 1:0);
        }

        let checkin1 = latest.map(function (row) {

            return [row.checkin];

        }).sort(function (a, b) {
            
            return b.LastCheckInDate - a.LastCheckInDate
        })
        
        console.error(checkin1)
        checkLate.push(checkin1)

    })

    .on('data', function (row) {

        const costumers = [
            {
                firstname: row.Firstname,
                lastname: row.Lastname,
            }
        ]

        function name  (a,b){
            return a < b ? -1 : (a > b ? 1:0);
        }

        let  fullNames = costumers.map(function (row) {

            return [row.firstname,row.lastname].join(" ");

        }).sort(function(a, b){

            return b-a
        })
        console.error(fullNames)


        fullNameSorted.push(fullNames)

    })
    
    .on('data', function (row) {


        const companyName = [
            {
                company: row.Company
            }
        ]
    // we tried here a different approach here for the mapping and sorting bit

        function name  (a,b){
            return a < b ? -1 : (a > b ? 1:0);
        }

        let companies = companyName.map(function (row) {

            return [row.company];

        }).sort(name)

        companyNameSorted.push(companies)
        console.error(companies)

    })

    // listens to the end of the CSV
    .on('end', function () {
    // we decided to display the date printed for  better access instead of a console.log
        console.table(checkEarly)
        console.table(checkLate);
        console.table(fullNameSorted);
        console.table(companyNameSorted);

    })


    