function toggleCustomInput() {
  const dropdown = document.getElementById("activity");
  const customInput = document.getElementById("customInput");

  if (dropdown.value === "Other") {
    customInput.style.display = "block";
    customInput.focus();
  } else {
    customInput.style.display = "none";
    customInput.value = "";
  }
}

document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const dropdownValue = document.getElementById("options").value;
  const customText = document.getElementById("customInput").value;
  let finalValue;

  if (dropdownValue === "Other") {
    finalValue = customText;
  } else {
    finalValue = dropdownValue;
  }

  alert("You selected: " + finalValue);
});
