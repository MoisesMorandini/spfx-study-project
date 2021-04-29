import { IEmployee, IEmployeeService } from "./IEmployeeService";

class EmployeeServiceMock implements IEmployeeService {
    GetEmployeesBirthday(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    public InsertEmployee(employee: IEmployee): Promise<void> {
        return new Promise<any>((resolve) => {
            resolve(true);
        });
    }
}

export default EmployeeServiceMock;