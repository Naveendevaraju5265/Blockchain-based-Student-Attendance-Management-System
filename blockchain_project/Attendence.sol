pragma solidity ^0.4.18;

contract Owned {
    address owner;
    
    function Owned() public {
        owner = msg.sender;
    }
    
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
}

contract AttendanceSheet is Owned {
    
    struct Student {
        uint age;
        string fName;
        string lName;
        uint present;
        uint NClasses;
        uint attendanceValue;
    }
    
    mapping (string => Student) studentList;
    string[] public studentSRNs; // Array to store student SRNs
    
    // Event to log student creation
    event StudentCreationEvent(
       string fName,
       string lName,
       uint age
    );
    
    // Function to add a new student
    function createStudent(string _srn, uint _age, string _fName, string _lName) onlyOwner public {
        require(bytes(studentList[_srn].fName).length == 0); // Check if student already exists
        
        Student storage student = studentList[_srn];
        
        student.age = _age;
        student.fName = _fName;
        student.lName = _lName;
        student.present = 0;
        student.NClasses = 0;
        studentSRNs.push(_srn);
        
        // Log student creation event
        StudentCreationEvent(_fName, _lName, _age);
    }

    // Function to increment attendance for a student
    function incrementAttendance(string _srn, uint _present, uint _NClasses) onlyOwner public {
        if (_present == 0) {
        studentList[_srn].present = _present;
        studentList[_srn].NClasses = _NClasses;
     } else {
        studentList[_srn].present += _present;
        studentList[_srn].NClasses += _NClasses;
       }

 
    }
    //Function to decrement attendence for a student
    function decrementAttendance(string _srn) onlyOwner public {
        studentList[_srn].attendanceValue = studentList[_srn].attendanceValue-1;
    }
    
    
    // Function to get details of a particular student
    function getParticularStudent(string _srn) public view returns (string, string, uint, uint, uint) {
        return (studentList[_srn].fName, studentList[_srn].lName, studentList[_srn].age, studentList[_srn].present, studentList[_srn].NClasses);
    }

    function getstudentDetails(uint _index) public view returns (string, string, string, uint, uint){
        require( _index < studentSRNs.length)
        string _srn = studentSRNs[_index]; 
        return(_srn,studentList[_srn].fName, studentList[_srn].lName, studentList[_srn].present, studentList[_srn].NClasses)
    }



    // Function to get total number of students
    function countStudents() view public returns (uint) {
        return studentSRNs.length;
    }

}