import { IDropdownOption } from "office-ui-fabric-react";

export interface IEmployee {
    firstName: string;
    lastName: string;
    birthdayDate: Date;
    admissionDate: Date;
    unit: string | number;
    division: string;
    team: string | number;
}


export interface IEmployeeService {

    InsertEmployee(employee: IEmployee): Promise<void>;

}