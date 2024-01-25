import fs from "fs";
import { parse } from "csv-parse";

export let cachedData: any[] | null = null;

export const parseCsv = async(): Promise<any[]> =>{
   return new Promise((resolve, reject) => {

     if (cachedData) {
      resolve(cachedData);
    }

    let data:any = [];
fs.createReadStream("./Data/food.csv")
  .pipe(
    parse({
      delimiter: ",",
      columns: true,
      ltrim: true,
    })
  )
  .on("data", function (row) {
    // This will push the object row into the array
    data.push(row);
  })
  .on("error", function (error) {
    console.log(error.message);
  })
  .on("end", function () {
    // Here log the result array
    // console.log(data);
    console.log("cashed csv data");
  });
  cachedData = data;
  resolve(data);
  })
}
