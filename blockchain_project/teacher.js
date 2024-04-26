document.getElementById('closePopup').addEventListener('click', function() {
    closePopup();
});
var createStudentBtn = document.getElementById("createStudentBtn");
var putAttendanceBtn = document.getElementById("putAttendanceBtn");
var decrementAttendanceBtn = document.getElementById("decrementAttendanceBtn");
var displayAttendanceBtn = document.getElementById("displayAttendanceBtn");
var AllStudentsDisplayBtn = document.getElementById("AllStudentsBtn");

createStudentBtn.addEventListener("click", function() {
    // Show attendance details and hide display attendance details
    createStudentDetails.style.display = "block";
    putAttendanceDetails.style.display = "none";
    decrementAttendanceDetails.style.display = "none";
    displayAttendanceDetails.style.display = "none";
    document.getElementById('studentDetails').style.display = "none";
 });

putAttendanceBtn.addEventListener("click", function() {
    // Show attendance details and hide display attendance details
    createStudentDetails.style.display = "none";
    putAttendanceDetails.style.display = "block";
    decrementAttendanceDetails.style.display = "none";
    displayAttendanceDetails.style.display = "none";
    document.getElementById('studentDetails').style.display = "none";
});

decrementAttendanceBtn.addEventListener("click", function() {
    // Show attendance details and hide display attendance details
    createStudentDetails.style.display = "none";
    putAttendanceDetails.style.display = "none";
    decrementAttendanceDetails.style.display = "block";
    displayAttendanceDetails.style.display = "none";
    document.getElementById('studentDetails').style.display = "none";
});

displayAttendanceBtn.addEventListener("click", function() {
    // Show attendance details and hide display attendance details
    createStudentDetails.style.display = "none";
    putAttendanceDetails.style.display = "none";
    decrementAttendanceDetails.style.display = "none";
    displayAttendanceDetails.style.display = "block";
    document.getElementById('studentDetails').style.display = "none";
});

function showPopup(message) {
    document.getElementById('message').innerText = message;
    document.getElementById('popup').style.display = 'inline-block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

AllStudentsDisplayBtn.addEventListener("click", async function() {
    const accounts = await web3.eth.getAccounts();
    console.log('Sending transaction from account:', accounts[1]);
    const result = await contractInstance.methods.countStudents().call();
    console.log("Got student details length:", result);
    let studentDetails = [];

    for (let i = 0; i < result; i++) {
        let studentDetail = await contractInstance.methods.getstudentDetails(i).call();
        let percentage = studentDetail[3]/studentDetail[4];
        studentDetails.push({
            srn: studentDetail[0],
            fName: studentDetail[1],
            lName: studentDetail[2],
            present: studentDetail[3],
            NClasses: studentDetail[4],
            Percentage: percentage
        });
    }
        
    // Assuming you have already fetched the student details array

    // Get the student details container element
    let studentDetailsContainer = document.getElementById("studentDetails");
    document.getElementById('studentDetails').innerHTML = '';
    // Loop through the student details array and create HTML elements to display each student's information
    studentDetails.forEach(student => {
        // Create a div element to hold each student's information
        let studentDiv = document.createElement("div");

        studentDiv.classList.add("student");

        // Create HTML content for the student's information
        let studentContent = `
            <p><strong>SRN:</strong> ${student.srn}</p>
            <p><strong>First Name:</strong> ${student.fName}</p>
            <p><strong>Last Name:</strong> ${student.lName}</p>
            <p><strong>Present:</strong> ${student.present}</p>
            <p><strong>Total Classes:</strong> ${student.NClasses}</p>
            <p><strong>Percentage:</strong> ${student.Percentage}</p>
            <hr>
        `;

        // Set the HTML content of the student div
        studentDiv.innerHTML = studentContent;

        // Append the student div to the container
        studentDetailsContainer.appendChild(studentDiv);
        document.getElementById('studentDetails').style.display = "block";
    });
    createStudentDetails.style.display = "none";
    putAttendanceDetails.style.display = "none";
    decrementAttendanceDetails.style.display = "none";
    displayAttendanceDetails.style.display = "none";
    document.getElementById('studentDetails').style.display = "block";
});







