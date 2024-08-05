import { PORT, URL } from "../constants";
export const PORT = 5048;
export const URL = "http://localhost";
const coursesContainer = document.getElementById("coursesContainer");
const addCourseBtn = document.querySelector(".add-course-btn");

function getQueryParameter() {
  var url = window.location.href;
  var urlObj = new URL(url);
  var params = new URLSearchParams(urlObj.search);
  return params.get("id");
}

const fetchDetailsFromId = async (id) => {
  const response = await fetch(`${URL}:${PORT}/api/College/${id}`);
  const data = await response.json();
  return data;
};

const CollegeId = getQueryParameter();
if (CourseId) {
  // fetch details and show them
  const data = fetchDetailsFromId(CollegeId);
  document.getElementById("collegeId").innerHTML = data.CollegeId;
  document.getElementById("name").innerHTML = data.CollegeName;
  document.getElementById("email").innerHTML = data.EmailId;
  document.getElementById("contact").innerHTML = data.ContactNumber;
  document.getElementById("nationality").innerHTML = data.Nationality;
  document.getElementById("documentType").innerHTML = data.DocumentType;
  document.getElementById("documentNumber").innerHTML = data.DocumentNumber;
  document.getElementById("currentstreetaddress").innerHTML =
    data.CurrentAddress.split($)[0];
  document.getElementById("currentstreetaddressline2").innerHTML =
    data.CurrentAddress.split($)[1];
  document.getElementById("currentcity").innerHTML =
    data.CurrentAddress.split($)[2];
  document.getElementById("currentstate").innerHTML =
    data.CurrentAddress.split($)[3];
  document.getElementById("currentpostal").innerHTML =
    data.CurrentAddress.split($)[4];
  document.getElementById("permanentstreetaddress").innerHTML =
    data.PermanentAddress.split($)[0];
  document.getElementById("permanentstreetaddressline2").innerHTML =
    data.PermanentAddress.split($)[1];
  document.getElementById("permanentcity").innerHTML =
    data.PermanentAddress.split($)[2];
  document.getElementById("permanentstate").innerHTML =
    data.PermanentAddress.split($)[3];
  document.getElementById("permanentpostal").innerHTML =
    data.PermanentAddress.split($)[4];
}

addCourseBtn.addEventListener("click", function () {
  const newCourseRow = document.createElement("div");
  newCourseRow.classList.add("row");
  const newCourseCol = document.createElement("div");
  newCourseCol.classList.add("col-md-6");
  const newBranchCol = document.createElement("div");
  newBranchCol.classList.add("col-md-6");
  
  newCourseRow.innerHTML = `
        <div class="row" id="coursesContainer">
              <div class="col-md-6">
                <label for="courses">Courses</label>
                <div class="input-group">
                  <select class="form-control" id="courses" name="coursesType">
                    <option>btech</option>
                    <option>m tech</option>
                    <option>bca</option>
                    <option>mca</option>
                  </select>
                  <div class="input-group-append">
                    <button type="button" class="btn btn-danger btn-xs remove-course-btn ">-</button>
                  </div>
                </div>
              </div>
            <div class="col-md-6">
                <label for="branch">Branch</label>
                <input
                  name="branchType"
                  type="text"
                  class="form-control"
                  id="branch"
                  placeholder="Enter your branch"
                />
              </div>
        </div>
                    
                `;
                
  coursesContainer.appendChild(newCourseRow);

  newCourseRow
    .querySelector(".remove-course-btn")
    .addEventListener("click", function () {
      newCourseRow.remove();
    });
});

const handleSubmit = async (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  const collegeDetails = getCollegeDetails(data);
  
  const request = new Request(`${URL}:${PORT}/api/College`, {
    method: "POST",
    body: collegeDetails,
  });
  const updateRequest = new Request(`${URL}:${PORT}/api/College${collegeId}`, {
    method: "PUT",
    body: collegeDetails,
  });
  let response;
  if(collegeId) {
    response = await fetch(updateRequest);
  } else {
    response = await fetch(request);
  }


  if (response.ok) {
    const result = response.json();
    alert(
      `College details added successfully and registration id : ${result.RegistrationId}`
    );
  } else {
    alert("Failed to add college details");
  }
};

const handleCheckbox = (event) => {
  const checked = event.target.checked;
  console.log(document.getElementById("currentstreetaddress").value);
  if (checked) {
    document.getElementById("permanentstreetaddress").value =
      document.getElementById("currentstreetaddress").value;
    document.getElementById("permanentstreetaddressline2").value =
      document.getElementById("currentstreetaddressline2").value;
    document.getElementById("permanentcity").value =
      document.getElementById("currentcity").value;
    document.getElementById("permanentstate").value =
      document.getElementById("currentstate").value;
    document.getElementById("permanentpostal").value =
      document.getElementById("currentpostal").value;
  } else {
    document.getElementById("permanentstreetaddress").value = "";
    document.getElementById("permanentstreetaddressline2").value = "";
    document.getElementById("permanentcity").value = "";
    document.getElementById("permanentstate").value = "";
    document.getElementById("permanentpostal").value = "";
  }
};

const getCollegeDetails = (data) => {
  const CurrentAddress = getCurrentAddress(data);
  const PermanentAddress = getPermanentAddress(data);
  const CollegeId = data.get("collegeId");
  const CollegeName = data.get("collegename");
  const Courses = getCoursesDetails();
  const RegistrationDate = new Date();
  const EmailId = data.get("email");
  const ContactNumber = data.get("contact");
  const DocumentType = data.get("documenttype");
  const DocumentNumber = data.get("documentnumber");
  const Nationality = data.get("nationality");
  const RegistrationId = `${CollegeName.substring(0, 2)}${CollegeId.substring(
    0,
    2
  )}${new Date(RegistrationDate).getFullYear()}`;

  return {
    CurrentAddress,
    PermanentAddress,
    CollegeId,
    CollegeName,
    Courses,
    RegistrationDate,
    EmailId,
    ContactNumber,
    DocumentNumber,
    DocumentType,
    Nationality,
    RegistrationId,
  };
};

const getPermanentAddress = (data) => {
  const PermanentStreetAddress = data.get("permanentstreetaddress");
  const PermanentStreetAddressLine2 = data.get("permanentstreetaddressline2");
  const PermanentCity = data.get("permanentcity");
  const PermanentState = data.get("permanentstate");
  const PermanentPostal = data.get("permanentpostal");
  return `${PermanentStreetAddress}$${PermanentStreetAddressLine2}$${PermanentCity}$${PermanentState}$${PermanentPostal}`;
};
const getCurrentAddress = (data) => {
  const CurrentStreetAddress = data.get("currentstreetaddress");
  const CurrentStreetAddressLine2 = data.get("currentstreetaddressline2");
  const CurrentCity = data.get("currentcity");
  const CurrentState = data.get("currentstate");
  const CurrentPostal = data.get("currentpostal");

  return `${CurrentStreetAddress}$${CurrentStreetAddressLine2}$${CurrentCity}$${CurrentState}$${CurrentPostal}`;
};

const getCoursesDetails = () => {
  const courses = document.getElementsByName("coursesType");
  const branches = document.getElementsByName("branchType");

  const coursesData = {};
  for (let i = 0; i < courses.length; i++) {
    coursesData[courses[i].options[courses[i].selectedIndex].value] =
      branches[i].value;
  }
  return coursesData;
};

document.querySelector("form").addEventListener("submit", handleSubmit);
document
  .getElementById("addressCheck")
  .addEventListener("change", handleCheckbox);
