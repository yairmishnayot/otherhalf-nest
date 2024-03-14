import { IsNotEmpty } from 'class-validator';

export class ImportUsersDTO {
  @IsNotEmpty()
  users: singleImportedUserDTO[];
}

export class singleImportedUserDTO {
  firstName: string;
  lastName: string;
  phone: string;
  group: string;
  role: string;
  email: string;
  password?: string;
}
