document.getElementById("employee-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }

  fetch("/api/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Employee data saved:", data);
    })
    .catch((error) => {
      console.error("Error saving employee data:", error);
    });
});
