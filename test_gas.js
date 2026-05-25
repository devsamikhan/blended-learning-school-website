fetch("https://script.google.com/macros/s/AKfycbx8e1AHn4J-2cFX5lUf3pdL41P0qimkiXPnou9up0xNvaq6L5GQrfVaLBpPZG3EHiAV/exec", {
  method: "POST",
  headers: { "Content-Type": "text/plain;charset=utf-8" },
  body: JSON.stringify({formType: "Contact", fullName: "Test", email: "test@test.com", message: "Hello"})
}).then(res => res.text()).then(console.log).catch(console.error);
