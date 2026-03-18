const fs = require('fs');

async function testFetch() {
  const fileBuf = fs.readFileSync('dummy.pdf');
  const blob = new Blob([fileBuf], { type: 'application/pdf' });
  const formData = new FormData(); 
  formData.append('file', blob, 'dummy.pdf');

  try {
    console.log("Sending fetch to port 3005...");
    const res = await fetch('http://localhost:3005/api/analyze', {
      method: 'POST',
      body: formData
    });
    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Response:", text);
  } catch(e) {
    console.log("Error:", e);
  }
}
testFetch();
