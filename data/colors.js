const fs = require('fs');

fs.readFile('/data.json', 'utf8', (err, data) => {
  try {
    const jsonData = JSON.parse(data);
  } catch (parseErr) {
    console.error("Error parsing JSON:", parseErr)
  }
})

