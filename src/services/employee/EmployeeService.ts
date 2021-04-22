import { IEmployee, IEmployeeService } from "./IEmployeeService";
import { sp } from '@pnp/sp'

class EmployeeService implements IEmployeeService {
    public async InsertEmployee(employee: IEmployee): Promise<void> {
        await sp.web.lists.getByTitle("Employee").items.add(employee);
    }
}

export default EmployeeService;