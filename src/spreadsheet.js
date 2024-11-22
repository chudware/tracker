let editIndex = null;

document
  .getElementById("workForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const workStart = document.getElementById("workStart").value;
    const workEnd = document.getElementById("workEnd").value;
    const lunchStart = document.getElementById("lunchStart").value;
    const lunchEnd = document.getElementById("lunchEnd").value;
    const workDate = document.getElementById("workDate").value;

    const workTime = calculateTime(workStart, workEnd);
    const lunchTime = calculateTime(lunchStart, lunchEnd);

    const entry = {
      name: name,
      workTime: workTime,
      lunchTime: lunchTime,
      workDate: workDate,
    };

    if (editIndex !== null) {
      updateEntry(entry, editIndex);
    } else {
      saveEntry(entry);
    }

    displayEntries();
    document.getElementById("workForm").reset();
    editIndex = null;
  });

function calculateTime(startTime, endTime) {
  const start = new Date(`1970-01-01T${startTime}`);
  const end = new Date(`1970-01-01T${endTime}`);
  const diff = end - start;
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.round((diff % 3600000) / 60000);
  return `${hours} hours ${minutes} minutes`;
}

function saveEntry(entry) {
  let entries = JSON.parse(localStorage.getItem("entries")) || [];
  entries.push(entry);
  localStorage.setItem("entries", JSON.stringify(entries));
}

function displayEntries() {
  const entriesBody = document.getElementById("entriesBody");
  entriesBody.innerHTML = "";

  const entries = JSON.parse(localStorage.getItem("entries")) || [];
  entries.forEach((entry, index) => {
    const row = `<tr>
                        <td>${entry.name}</td>
                        <td>${entry.workTime}</td>
                        <td>${entry.lunchTime}</td>
                        <td>${entry.workDate}</td>
                        <td>
                            <button onclick="editEntry(${index})">Edit</button>
                            <button onclick="deleteEntry(${index})">Delete</button>
                        </td>
                     </tr>`;
    entriesBody.innerHTML += row;
  });
}

function editEntry(index) {
  const entries = JSON.parse(localStorage.getItem("entries")) || [];
  const entry = entries[index];

  document.getElementById("name").value = entry.name;
  const workTime = entry.workTime.split(" ");
  const workHours = parseInt(workTime[0]);
  const workMinutes = parseInt(workTime[2]);
  document.getElementById("workStart").value = formatTime(
    workHours,
    workMinutes
  );
  document.getElementById("workEnd").value = formatTime(
    workHours + 8,
    workMinutes
  );
  const lunchTime = entry.lunchTime.split(" ");
  const lunchHours = parseInt(lunchTime[0]);
  const lunchMinutes = parseInt(lunchTime[2]);
  document.getElementById("lunchStart").value = formatTime(
    lunchHours,
    lunchMinutes
  );
  document.getElementById("lunchEnd").value = formatTime(
    lunchHours + 1,
    lunchMinutes
  );
  document.getElementById("workDate").value = entry.workDate;

  editIndex = index;
}

function formatTime(hours, minutes) {
  const formatted = new Date(1970, 0, 1, hours, minutes);
  return formatted.toTimeString().slice(0, 5);
}

function updateEntry(updatedEntry, index) {
  let entries = JSON.parse(localStorage.getItem("entries")) || [];
  entries[index] = updatedEntry;
  localStorage.setItem("entries", JSON.stringify(entries));
}

function deleteEntry(index) {
  let entries = JSON.parse(localStorage.getItem("entries")) || [];
  entries.splice(index, 1);
  localStorage.setItem("entries", JSON.stringify(entries));
  displayEntries();
}

displayEntries();
