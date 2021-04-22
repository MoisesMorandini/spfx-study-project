export interface IEmployee {
    Title: string;
    LastName: string;
    BirthdayDate: Date;
    AdmissionDate: Date;
    Unit?: string | number;
    Division?: string;
    Team?: string | number;
    UserId?: string;
}


export interface IEmployeeService {

    InsertEmployee(employee: IEmployee): Promise<void>;

}