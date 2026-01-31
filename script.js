function analyzeHealth() {

  let age = +document.getElementById("age").value;
  let bp = +document.getElementById("bp").value;
  let sugar = +document.getElementById("sugar").value;
  let temp = +document.getElementById("temp").value;
  let height = +document.getElementById("height").value;
  let weight = +document.getElementById("weight").value;
  let spo2 = +document.getElementById("spo2").value;

  if (age < 0) {
    document.getElementById("result").innerHTML =
      "Age cannot be negative.";
    return;
  }

  let issues = [];
  let tests = [];
  let dos = [];
  let donts = [];
  let foods = [];

  /* ===== EXISTING CORE LOGIC (PRESERVED) ===== */
  if (bp > 140) {
    issues.push("Risk of hypertension");
    tests.push("BP monitoring, ECG");
    donts.push("Excess salt");
  }

  if (sugar > 180) {
    issues.push("Risk of diabetes");
    tests.push("HbA1c, Fasting Sugar");
    donts.push("Sugar, sweets");
  }

  if (temp > 38) {
    issues.push("Possible infection");
    tests.push("CBC");
  }

  if (spo2 && spo2 < 94) {
    issues.push("Low oxygen saturation");
    tests.push("Chest X‑ray");
  }

  /* ===== EXTENDED LOGIC ===== */
  if (height && weight) {
    let bmi = (weight / ((height/100)**2)).toFixed(1);
    issues.push("BMI: " + bmi);
    if (bmi > 25) {
      donts.push("Junk food");
      dos.push("Daily walking");
    }
  }

  dos.push("Adequate hydration");
  dos.push("Proper sleep");
  foods.push("Fruits");
  foods.push("Green vegetables");

  document.getElementById("result").innerHTML = `
    <b>Observations:</b><br>${issues.join("<br>") || "Normal findings"}<br><br>
    <b>Suggested Tests:</b><br>${tests.join("<br>") || "None"}<br><br>
    <b>Do:</b><br>${dos.join("<br>")}<br><br>
    <b>Don't:</b><br>${donts.join("<br>")}<br><br>
    <b>Food Suggestions:</b><br>${foods.join("<br>")}<br><br>
    <i>This is an early screening, not a diagnosis. Consult a physician.</i>
  `;

  drawChart(bp, sugar, temp, spo2);
}

/* ===== CHART ===== */
function drawChart(bp, sugar, temp, spo2) {
  const ctx = document.getElementById("vitalChart").getContext("2d");
  if (window.vitalChart) window.vitalChart.destroy();

  window.vitalChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["BP", "Sugar", "Temp", "SpO₂"],
      datasets: [{
        data: [bp, sugar, temp, spo2 || 0],
        backgroundColor: "#0b5e6b"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } }
    }
  });
}

/* ===== ENTER → NEXT INPUT ===== */
document.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    const fields = [...document.querySelectorAll("input, select, textarea")];
    const i = fields.indexOf(document.activeElement);
    if (fields[i + 1]) {
      fields[i + 1].focus();
      e.preventDefault();
    }
  }
});