export const timeIn: {
  nama: string;
  id: number;
  time_in: string;
  isLate: boolean;
}[] = [
  {
    nama: "John Doe",
    id: 4837265912,
    time_in: "2023-11-10T08:00:00",
    isLate: false,
  },
  {
    nama: "Jane Smith",
    id: 9173850246,
    time_in: "2023-11-10T08:15:00",
    isLate: false,
  },
  {
    nama: "Bob Johnson",
    id: 6251093478,
    time_in: "2023-11-10T08:30:00",
    isLate: false,
  },
  {
    nama: "Alice Brown",
    id: 8023461597,
    time_in: "2023-11-10T08:45:00",
    isLate: false,
  },
  {
    nama: "Charlie Wilson",
    id: 3947102856,
    time_in: "2023-11-10T09:00:00",
    isLate: false,
  },
  {
    nama: "Eva Davis",
    id: 5102738469,
    time_in: "2023-11-10T09:15:00",
    isLate: false,
  },
  {
    nama: "Frank Miller",
    id: 6789012345,
    time_in: "2023-11-10T09:30:00",
    isLate: false,
  },
  {
    nama: "Grace Taylor",
    id: 1357902468,
    time_in: "2023-11-10T09:45:00",
    isLate: false,
  },
  {
    nama: "Henry Anderson",
    id: 9876543210,
    time_in: "2023-11-10T10:00:00",
    isLate: false,
  },
  {
    nama: "Ivy Clark",
    id: 2468013579,
    time_in: "2023-11-10T10:15:00",
    isLate: true,
  },
];

export const employeeData: IEmployee[] = [
  {
    fullName: "John Doe",
    divisi: "Engineering",
    position: "Software Engineer",
    employeeID: 12345,
    joiningDate: new Date("2022-01-01"),
    endDate: null, // Assuming the employee is still active
    nikKTP: 123456789,
    npwp: 987654321,
    placeOfBirth: "Jakarta",
    sex: "Male",
    bloodType: "A",
    religion: "Islam",
    latestEducation: "S1",
    yearOfGraduation: 2015,

    phoneNumber: 1234567890,
    email: "john.doe@example.com",
    emergencyContact: 9876543210,
    emergencyContactName: "Jane Doe",
    address: "123 Main Street",
    kelurahan: "Menteng",
    kecamatan: "Central Jakarta",
    city: "Jakarta",
    province: "DKI Jakarta",
    zipCode: 12345,

    marritalStatus: "married",
    spouse: "Jane Doe",
    numberOfChildren: 2,
    tanggungan: 3,

    leavesRemaining: 20,
  },
];
