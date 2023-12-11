interface IEmployee
  extends IEmployeeDetails,
    IContactAndAddress,
    IFamily,
    ILeaves {}

interface IEmployeeDetails {
  fullName: string;
  divisi: string;
  position: string;
  employeeID: number;
  joiningDate: date;
  endDate: date;
  nikKTP: number;
  npwp: number;
  placeOfBirth: string;
  sex: "Male" | "Female";
  bloodType: "A" | "B" | "AB" | "O";
  religion:
    | "Islam"
    | "Katholik"
    | "Konghuchu"
    | "Hindu"
    | "Buddha"
    | "Protestan";
  latestEducation: "SMA" | "D3" | "S1" | "S2" | "S3" | "others";
  yearOfGraduation: number;
}

interface IContactAndAddress {
  phoneNumber: number;
  email: string;
  emergencyContact: number;
  emergencyContactName: string;
  address: string;
  kelurahan: string;
  kecamatan: string;
  city: string;
  province: string;
  zipCode: number;
}

interface IFamily {
  marritalStatus: "single" | "divorced" | "married";
  spouse: string | null;
  numberOfChildren: number;
  tanggungan: number;
}

interface ILeaves {
  leavesRemaining: number;
}
