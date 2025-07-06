const API_URL = "https://script.google.com/macros/s/AKfycbyDwjMoewtnJfNkPjAHGab7ZTeUf6bsnW-2Ch4ZkPbdFa__qGJY40hg1JA1Mc6CXy_e/exec";

function checkSerial() {
  const inputEl = document.getElementById("csw-serialInput");
  const input = inputEl.value.trim().toUpperCase();
  const resultDiv = document.getElementById("csw-result");
  const checkBtn = document.querySelector(".csw-check-btn");

  resultDiv.style.display = "block";
  resultDiv.className = "csw-result loading";
  resultDiv.innerHTML = "🔎 Verifying serial number...";
  inputEl.disabled = true;
  checkBtn.disabled = true;
  checkBtn.innerText = "Verifying...";

  if (!input) {
    resultDiv.className = "csw-result error";
    resultDiv.innerHTML = "❗ Please enter a serial number or IMEI.";
    inputEl.disabled = false;
    checkBtn.disabled = false;
    checkBtn.innerText = "VERIFY";
    return;
  }

  fetch(`${API_URL}?serial=${input}`)
    .then(res => res.json())
    .then(data => {
      if (data.found) {
        resultDiv.className = "csw-result success";
        resultDiv.innerHTML = `
          ✅ Serial <strong>${input}</strong> is a <strong>genuine product</strong> distributed by <strong>Solar E</strong>.<br><br>
          Thank you for trusting our products! For support, please contact your nearest reseller or visit our official website.
        `;
      } else {
        resultDiv.className = "csw-result error";
        resultDiv.innerHTML = `
          ❌ <strong>Not found!</strong><br>
          Serial <strong>${input}</strong> does not exist in our verified database.
        `;
      }
    })
    .catch(() => {
      resultDiv.className = "csw-result error";
      resultDiv.innerHTML = "⚠️ An error occurred while connecting to the server. Please try again later.";
    })
    .finally(() => {
      inputEl.disabled = false;
      checkBtn.disabled = false;
      checkBtn.innerText = "VERIFY";
    });
}
