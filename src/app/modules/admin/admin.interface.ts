export interface Name {
  firstName: string;
  lastName: string;
}

export interface Admin {
  role: "admin";
  password?: string;
  name: Name;
  phoneNumber: string;
  address: string;
}

export default Admin;
