const request = require('request');
const fs = require('fs');

const url = process.argv[2];
const filePath = process.argv[3];

const fetcher = (url, filePath) => {
    request(url, (error, response, body) => {
        if (error) {
            console.error('Error downloading the file:', error);
            return;
        }

        if (response.statusCode !== 200) {
            console.error('Failed to fetch resource. Status code:', response.statusCode);
            return;
        }

        fs.writeFile(filePath, body, (err) => {
            if (err) {
                console.error('Error saving the file:', err);
                return;
            }
            console.log(`Downloaded and saved ${body.length} bytes to ${filePath}`);
        });
    });
};

fetcher(url, filePath);
