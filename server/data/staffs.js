import bcrypt from "bcryptjs";

const staffs = [
  {
    fName: "Eugene",
    lName: "Tin",
    email: "eugene@staffemail.apu.edu.my",
    password: "qwerty123",
    dob: "1992-12-16T06:08:27Z",
    gender: "Male",
    course: ["620efc959828b44e6e912d86", "620efc959828b44e6e912d9a"],
  },
  {
    fName: "Eujin",
    lName: "Tin",
    email: "eujin@staffemail.apu.edu.my",
    password: "qwerty123",
    dob: "1992-12-16T06:08:27Z",
    gender: "Male",
    course: ["620efc959828b44e6e912d86", "620efc959828b44e6e912d9a"],
    isAdmin: true,
  },
];

staffs.map(staffs => (staffs.password = bcrypt.hashSync(staffs.password, 10)));

export default staffs;
