var dabba = document.getElementById("mylist"); // Use correct UL id

function addtask() {
    var task = document.getElementById("add").value.trim(); // Trim spaces
    if (task === '') {
        alert("You must write something");
        return;
    }

    let li = document.createElement("li");
    li.textContent = task;

    let span = document.createElement("span");
    span.innerHTML = "\u00d7"; // Cross (delete) button
    span.onclick = function () {
        this.parentElement.remove();
        saveData();
    };

    li.appendChild(span);
    dabba.appendChild(li);
    document.getElementById("add").value = ''; // Clear input

    saveData(); // Save updated list
}

// Event listener for checking/unchecking tasks
dabba.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
}, false);

// Save tasks to localStorage
function saveData() {
    localStorage.setItem("data", dabba.innerHTML);
}

// Retrieve saved tasks on page load
function getData() {
    dabba.innerHTML = localStorage.getItem("data") || ""; // Set list from storage
    attachDeleteListeners(); // Reattach delete button events after load
}

// Ensure delete buttons work after reloading
function attachDeleteListeners() {
    let spans = dabba.getElementsByTagName("span");
    for (let span of spans) {
        span.onclick = function () {
            this.parentElement.remove();
            saveData();
        };
    }
}

getData(); // Load tasks on startup
