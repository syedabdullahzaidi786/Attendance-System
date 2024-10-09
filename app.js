// app.js

// Array to store students fetched from the CSV file
let students = [];

// Event listener for the CSV file upload
document.getElementById('csvFile').addEventListener('change', function(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const text = e.target.result;
            processCSV(text);
        };
        reader.readAsText(file);
    }
});

// Function to process CSV data and display students
function processCSV(data) {
    const rows = data.split('\n');
    students = rows.map(row => ({ name: row.trim(), status: '' })).filter(student => student.name);

    displayStudents();
}

// Function to display students on the page
function displayStudents() {
    const studentList = document.getElementById('students-list');
    studentList.innerHTML = '';  // Clear previous data

    students.forEach((student, index) => {
        const studentDiv = document.createElement('div');
        studentDiv.classList.add('student');

        const studentName = document.createElement('span');
        studentName.classList.add('student-name');
        studentName.textContent = student.name;
        
        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('buttons');

        const presentButton = document.createElement('button');
        presentButton.textContent = 'Present';
        presentButton.classList.add('present');
        presentButton.onclick = () => markAttendance(index, 'Present');

        const absentButton = document.createElement('button');
        absentButton.textContent = 'Absent';
        absentButton.classList.add('absent');
        absentButton.onclick = () => markAttendance(index, 'Absent');

        buttonsDiv.appendChild(presentButton);
        buttonsDiv.appendChild(absentButton);

        studentDiv.appendChild(studentName);
        studentDiv.appendChild(buttonsDiv);

        studentList.appendChild(studentDiv);
    });
}

// Function to mark attendance
function markAttendance(index, status) {
    students[index].status = status;
    alert(`${students[index].name} marked as ${status}!`);
}

// Function to submit attendance
function submitAttendance() {
    const attendanceData = students.map(student => ({
        name: student.name,
        status: student.status,
        timestamp: new Date().toLocaleString() // Add date and time
    }));

    // Convert the data to CSV format and download it
    downloadCSV(attendanceData);
}

// Function to convert attendance data to CSV format
function downloadCSV(data) {
    // CSV header
    let csvContent = "data:text/csv;charset=utf-8,Name,Status,Date and Time\n";

    // Loop through the data to create rows
    data.forEach(row => {
        const rowData = `${row.name},${row.status},${row.timestamp}\n`;
        csvContent += rowData;
    });

    // Create a download link and trigger download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "attendance.csv");
    document.body.appendChild(link);

    // Automatically click the link to download the file
    link.click();

    // Remove the link after downloading
    document.body.removeChild(link);
}





// Function to mark attendance
function markAttendance(index, status) {
    students[index].status = status;
    alert(`${students[index].name} marked as ${status}!`);
}

// Function to submit attendance
function submitAttendance() {
    const attendanceData = students.map(student => ({
        name: student.name,
        status: student.status,
        timestamp: new Date().toISOString() // ISO format for better compatibility
    }));

    // Convert the data to CSV format and download it
    downloadCSV(attendanceData);
}

// Function to convert attendance data to CSV format
function downloadCSV(data) {
    // CSV header
    let csvContent = "data:text/csv;charset=utf-8,Name,Status,Date and Time\n";

    // Loop through the data to create rows
    data.forEach(row => {
        const rowData = `${row.name},${row.status},${row.timestamp}\n`;
        csvContent += rowData;
    });

    // Create a download link and trigger download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "attendance.csv");
    document.body.appendChild(link);

    // Automatically click the link to download the file
    link.click();

    // Remove the link after downloading
    document.body.removeChild(link);
}
