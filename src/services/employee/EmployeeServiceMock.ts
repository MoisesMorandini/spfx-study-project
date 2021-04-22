import { IEmployee, IEmployeeService } from "./IEmployeeService";

class EmployeeServiceMock implements IEmployeeService {
    public InsertEmployee(employee: IEmployee): Promise<any> {
        return new Promise<any>((resolve) => {
            resolve(true);
        });
    }
}

export default EmployeeServiceMock;