const fs = require("fs");
const path = require("path");

// Function to convert CSV to JSON
function csvToJson(csvText) {
    const lines = csvText.split("\n").map(line => line.trim()).filter(line => line); // Remove empty lines
    const headers = lines[0].split(",");
    const result = [];

    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentLine = lines[i].split(",");

        headers.forEach((header, index) => {
            obj[header] = currentLine[index]?.trim(); // Handle missing values
        });

        result.push(obj);
    }
    return result;
}

// Read the CSV file
const filePath = path.join(__dirname, "data", "BigBasket.csv");

fs.readFile(filePath, "utf8", (err, csvText) => {
    if (err) {
        console.error("Error reading CSV file:", err);
        return;
    }

    const jsonData = csvToJson(csvText);
    console.log("JSON Data:", JSON.stringify(jsonData, null, 2));
});
