export class ImportUsersDTO {
  users: singleImportedUserDTO[];
}

export class singleImportedUserDTO {
  first_name: string;
  last_name: string;
  phone: string;
  group: string;
  role: string;
  email: string;
}
