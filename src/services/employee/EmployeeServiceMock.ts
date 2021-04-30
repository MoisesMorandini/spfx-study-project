import { IEmployee, IEmployeeService } from "./IEmployeeService";

class EmployeeServiceMock implements IEmployeeService {
    static _employees: IEmployee[] = [
        {
            Title: 'Alex',
            LastName: 'Wilber',
            AdmissionDate: new Date('2021-05-30'),
            BirthdayDate: new Date('2021-04-30'),
            Unit: 'Unit 01',
            Division: 'Division 01',
            Team: 'Team 01',
            User: {
                Title: 'Alex',
                EMail: 'AlexW@M365x704390.OnMicrosoft.com'
            }
        },
        {
            Title: 'Allan',
            LastName: 'Deyoung',
            AdmissionDate: new Date('2021-04-30'),
            BirthdayDate: new Date('2021-04-30'),
            Unit: 'Unit 02',
            Division: 'Division 02',
            Team: 'Team 02'
        },
        {
            Title: 'Adele',
            LastName: 'Vance',
            AdmissionDate: new Date('2021-04-30'),
            BirthdayDate: new Date('2021-04-30'),
            Division: 'Division 03',
            Team: 'Team 03',
            User: {
                Title: 'Adele',
                EMail: 'AdeleV@M365x704390.OnMicrosoft.com'
            }
        },
        {
            Title: 'Adele',
            LastName: 'Vance',
            AdmissionDate: new Date('2021-04-30'),
            BirthdayDate: new Date('2021-04-30'),
            Unit: 'Unit 04',
            Division: 'Division 04',
            Team: 'Team 04',
            User: {
                Title: 'Adele',
                EMail: 'AdeleV@M365x704390.OnMicrosoft.com'
            }
        },
        {
            Title: 'Adele',
            LastName: 'Vance',
            AdmissionDate: new Date('2021-04-30'),
            BirthdayDate: new Date('2021-04-30'),
            Unit: 'Unit 04',
            Division: 'Division 04',
            Team: 'Team 04',
            User: {
                Title: 'Adele',
                EMail: 'AdeleV@M365x704390.OnMicrosoft.com'
            }
        }
    ]

    GetEmployeesBirthday(): Promise<IEmployee[]> {
        return new Promise<IEmployee[]>((resolve) => {
            resolve(EmployeeServiceMock._employees);
        });
    }
    public InsertEmployee(employee: IEmployee): Promise<void> {
        return new Promise<any>((resolve) => {
            resolve(true);
        });
    }
}

export default EmployeeServiceMock;