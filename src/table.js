let allEmployees = [];

function generateTableRows() {
  const tableBody = document
    .getElementById("employeeTable")
    .getElementsByTagName("tbody")[0];
  tableBody.innerHTML = "";

  fetch("api/employees.json")
    .then((response) => response.json())
    .then((data) => {
      allEmployees = data;
      renderTable(allEmployees);
    });
}

function renderTable(data) {
  const tableBody = document
    .getElementById("employeeTable")
    .getElementsByTagName("tbody")[0];
  tableBody.innerHTML = "";

  data.forEach((employee) => {
    const row = document.createElement("tr");
    row.setAttribute("data-employee-id", employee.id);

    [
      employee.name,
      employee.phone,
      employee.email,
      employee.employmentType,
      employee.jobTitle,
      employee.activity,
    ].forEach((text, index) => {
      const cell = document.createElement("td");
      if (index === 5) { 
        const activityButton = document.createElement("button");
        activityButton.textContent = text;
        activityButton.classList.add("btn-status");
        cell.appendChild(activityButton);
      } else {
        cell.textContent = text;
      }
      row.appendChild(cell);
    });

    // Edit button
    const editCell = document.createElement("td");
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => openEditModal(employee));
    editCell.appendChild(editButton);
    row.appendChild(editCell);

    // Delete button
    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("btn-delete");
    deleteButton.addEventListener("click", () => {
      if (confirm(`Are you sure you want to delete ${employee.name}?`)) {
        fetch(`api/employees/${employee.id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              alert(`${employee.name} deleted successfully!`);
              generateTableRows();
            } else {
              throw new Error("Error deleting employee");
            }
          })
          .catch((error) => {
            console.error("Error deleting employee:", error);
          });
      }
    });
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    tableBody.appendChild(row);
  });
}

function filterTable() {
  const input = document.getElementById("searchInput");
  const filter = input.value.toLowerCase();

  const filteredEmployees = allEmployees.filter((employee) => {
    return (
      employee.name.toLowerCase().includes(filter) ||
      employee.phone.toLowerCase().includes(filter) ||
      employee.email.toLowerCase().includes(filter) ||
      employee.employmentType.toLowerCase().includes(filter) ||
      employee.jobTitle.toLowerCase().includes(filter)
    );
  });

  renderTable(filteredEmployees);
}

function openEditModal(employee) {
  const modal = document.getElementById("editModal");
  const nameInput = document.getElementById("editName");
  const phoneInput = document.getElementById("editPhone");
  const emailInput = document.getElementById("editEmail");
  const employmentTypeInput = document.getElementById("editEmploymentType");
  const jobTitleInput = document.getElementById("editJobTitle");
  const saveButton = document.getElementById("saveButton");

  nameInput.value = employee.name;
  phoneInput.value = employee.phone;
  emailInput.value = employee.email;
  employmentTypeInput.value = employee.employmentType;
  jobTitleInput.value = employee.jobTitle;

  modal.style.display = "block";

  saveButton.onclick = () => {
    const updatedEmployee = {
      id: employee.id,
      name: nameInput.value,
      phone: phoneInput.value,
      email: emailInput.value,
      employmentType: employmentTypeInput.value,
      jobTitle: jobTitleInput.value,
    };

    fetch(`api/employees/${updatedEmployee.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEmployee),
    })
      .then((response) => {
        if (response.ok) {
          alert("Employee updated successfully!");
          closeModal(modal);
          generateTableRows(); 
        } else {
          throw new Error("Error updating employee");
        }
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
      });
  };
}

function closeModal(modal) {
  modal.style.display = "none";
}

generateTableRows(); 
document.getElementById("closeModalButton").addEventListener("click", () => closeModal(document.getElementById("editModal")));
