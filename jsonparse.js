const fs = require("fs");

const jsonObject = JSON.parse(fs.readFileSync("./countries-50m.json", "utf8"));

let countryList = [];

function getValue(obj) {
    if (typeof obj === 'object') {
        for (key in obj) {
            if (key === "name" && typeof obj[key] !== "object"){
                console.log(obj[key]);
                countryList.push(obj[key]);
            }
            getValue(obj[key]);
        }
    } 
}

getValue(jsonObject);
console.log(countryList.length);

let outputText = "";

countryList.forEach(country => outputText += country + "\n");

/**
 * ファイル出力用
 */
//fs.writeFileSync("country_list.txt", outputText);