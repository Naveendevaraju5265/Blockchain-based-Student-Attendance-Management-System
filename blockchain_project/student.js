
var putAttendanceBtn = document.getElementById("putAttendanceBtn");
var displayAttendanceBtn = document.getElementById("displayAttendanceBtn");
var attendanceDetails = document.getElementById("attendanceDetails");
var displayAttendanceDetails = document.getElementById("displayAttendanceDetails");
document.getElementById('closePopup').addEventListener('click', function() {
    closePopup();
});


// Add event listener to Put Attendance button
putAttendanceBtn.addEventListener("click", function() {
    // Show attendance details and hide display attendance details
    attendanceDetails.style.display = "block";
    displayAttendanceDetails.style.display = "none";
});

// Add event listener to Display Attendance button
displayAttendanceBtn.addEventListener("click", function() {
    // Show display attendance details and hide attendance details
    attendanceDetails.style.display = "none";
    displayAttendanceDetails.style.display = "block";
});



function showPopup(message) {
    document.getElementById('message').innerText = message;
    document.getElementById('popup').style.display =  "inline-block";
}

function closePopup() {
    document.getElementById('popup').style.display = "none";
}
