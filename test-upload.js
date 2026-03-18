const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");

async function testUpload(port) {
  try {
    const form = new FormData();
    form.append("file", fs.createReadStream("dummy.pdf"));

    console.log(`Testing upload to port ${port}...`);
    const response = await axios.post(`http://localhost:${port}/api/analyze`, form, {
      headers: form.getHeaders(),
    });

    console.log(`Success on port ${port}:`, response.data);
  } catch (error) {
    if (error.response) {
      console.error(`Error on port ${port}: ${error.response.status} -`, error.response.data);
    } else {
      console.error(`Error on port ${port}:`, error.message);
    }
  }
}

testUpload(3005);
