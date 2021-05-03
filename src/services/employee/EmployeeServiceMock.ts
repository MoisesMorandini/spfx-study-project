import { IEmployee, IEmployeeService } from "./IEmployeeService";

class EmployeeServiceMock implements IEmployeeService {
    static _employees: IEmployee[] = [
        {
            Title: 'Alex',
            LastName: 'Wilber',
            AdmissionDate: new Date('2000-11-30'),
            BirthdayDate: new Date('2000-11-30'),
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
            AdmissionDate: new Date('2020-04-09'),
            BirthdayDate: new Date('2020-04-09'),
            Unit: 'Unit 02',
            Division: 'Division 02',
            Team: 'Team 02'
        },
        {
            Title: 'Adele03',
            LastName: 'Vance',
            AdmissionDate: new Date('2019-04-04'),
            BirthdayDate: new Date('2019-04-04'),
            Division: 'Division 03',
            Team: 'Team 03',
            User: {
                Title: 'Adele',
                EMail: 'AdeleV@M365x704390.OnMicrosoft.com'
            }
        },
        {
            Title: 'Adele01',
            LastName: 'Vance',
            AdmissionDate: new Date('2018-04-30'),
            BirthdayDate: new Date('2018-04-30'),
            Unit: 'Unit 04',
            Division: 'Division 04',
            Team: 'Team 04',
            User: {
                Title: 'Adele',
                EMail: 'AdeleV@M365x704390.OnMicrosoft.com'
            }
        },
        {
            Title: 'Adele02',
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