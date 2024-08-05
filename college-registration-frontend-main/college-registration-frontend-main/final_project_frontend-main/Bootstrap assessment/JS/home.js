// import { PORT, URL } from "../constants";
export const PORT = 5048;
export const API_URL = "http://localhost";
const mock = fetchdata();
//[
//   {
//     CurrentAddress: "Harda$$Harda$Madhya Pradesh$461331",
//     PermanentAddress: "Harda$$Harda$Madhya Pradesh$461331",
//     CollegeId: "IGEC",
//     CollegeName: "indira gandhi",
//     Courses: {
//       btech: "CS, IT, MECH",
//       "m tech": "CS, IT, MECH",
//     },
//     RegistrationDate: "2024-08-04T18:15:55.256Z",
//     EmailId: "Parasharashi02@gmail.com",
//     ContactNumber: "961 795 3882",
//     DocumentNumber: "5546",
//     DocumentType: "Identity Card",
//     Nationality: "Indian",
//     RegistrationId: "inIG2024",
//   },
//   {
//     CurrentAddress: "Harda$$Harda$Madhya Pradesh$461331",
//     PermanentAddress: "Harda$$Harda$Madhya Pradesh$461331",
//     CollegeId: "IGEC",
//     CollegeName: "indira gandhi",
//     Courses: {
//       btech: "CS, IT, MECH",
//       "m tech": "CS, IT, MECH",
//     },
//     RegistrationDate: "2024-08-04T18:15:55.256Z",
//     EmailId: "Parasharashi02@gmail.com",
//     ContactNumber: "961 795 3882",
//     DocumentNumber: "5546",
//     DocumentType: "Identity Card",
//     Nationality: "Indian",
//     RegistrationId: "inIG2024",
//   },
// ];

const fetchdata = async () => {
  const response = await fetch(`${API_URL}:${PORT}/api/College`);
  const data = response.json();
  return data;
};

const tableBody = document.querySelector("tbody");

mock.map((data, index) => {
  const row = document.createElement("tr");
  row.innerHTML = `<th scope="row ">${index + 1}</th>
            <td>${data.RegistrationId}</td>
            <td>${data.CollegeName}</td>
            <td>${data.EmailId}</td>
            <td>${data.ContactNumber}</td>
            <td>${data.RegistrationDate}</td>
            <td><a href="../HTML/register.html?id=${data.CollegeId}">
              <button class="btn btn-secondary btn-sm me-2">
                <i class="bi bi-pencil-square me-1"></i>Edit
              </button></a>
              <button class="btn btn-secondary btn-sm">
                <i class="bi bi-trash3-fill me-1"></i>Delete
              </button>
            </td>`;
  tableBody.appendChild(row);
});
