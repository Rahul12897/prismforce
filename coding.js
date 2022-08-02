const fs=require('fs');// importing file system module
const { stringify } = require('querystring');// importing stringify by destructuring from querystring module
var list=[];
var i=0;
let input= fs.readFileSync('./file.txt');
let data = JSON.parse(input);
//creating an array for expense for 12 months
while(i<12)
{
    list[i]=0;// filling all 12 months with 0
    i=i+1;
}
var j=0;
// Now replacing the array pos where expense is not 0 with real expenses and adding if more than one data is given for same month where expenses are stored in an array with array indexs equal to months or array index 0 refers to Jan and so on    
while(j<((data["expenseData"]).length) )
   { list[(data["expenseData"][j]["startDate"][6])-1]=list[(data["expenseData"][j]["startDate"][6])-1]+data["expenseData"][j]["amount"];
    j=j+1;
   }
var list2=[];
var i=0;
//creating an array for expense for 12 months
while(i<12)
{
    list2[i]=0;//filling all 12 months with 0
    i=i+1;
}
var j=0;
//Now replacing the array pos where revenue is not 0 with real revenues and adding if more than one data is given for same month where revenues are stored in an array with array indexs equal to months or array index 0 refers to Jan and so on    
while( j< ((data["revenueData"]).length))
{
    list2[(data["revenueData"][j]["startDate"][6])-1]=list2[(data["revenueData"][j]["startDate"][6])-1]+(data["revenueData"][j]["amount"]);
    j=j+1;
}
list3=[];
var i=0;
//creating balance array by subtracting respective revenue and expenses monthwise
while(i<12)
{
    list3[i]=(list2[i]-list[i]);
    i=i+1;
}
var i=0;
var array=[];
dict={};
while(i<12)
{
    dict={"amount": list3[i] ,"startDate": `2020-0${i+1}-01T00:00:00.000Z.`};//putting the amount and start date in  object
    array[i]=dict;//putting object in array
    i=i+1;
}
var result={"balance":array};// putting array in object and naming it balance
var json =(JSON.stringify(result));// convert to string for writing in file
fs.writeFile('output.txt', json, function (err) {// writing in file output.txt
    if (err) throw err;
    });
