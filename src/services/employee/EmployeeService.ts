import { IEmployee, IEmployeeService } from "./IEmployeeService";
import { sp } from '@pnp/sp'

class EmployeeService implements IEmployeeService {
    static _listName: string = "Employee";

    async GetEmployeesBirthday(): Promise<IEmployee[]> {
        const today = new Date();
        const weekStart = this.getWeekStartDate(today);
        const weekFinish = this.getWeekFinishDate(today);
        const employeesBirthday: IEmployee[] = [];

        const employeesOfMonth: IEmployee[] = await sp.web.lists.getByTitle(EmployeeService._listName).items
            .filter(`MonthBirthday eq ${weekStart.getMonth() + 1} or MonthBirthday eq ${weekFinish.getMonth() + 1}`)
            .select("Title,LastName,BirthdayDate,AdmissionDate,User/Title,User/EMail").expand("User").get();

        employeesOfMonth.forEach(employee => {
            const employeedate = new Date(employee.BirthdayDate);
            if (employeedate.getTime() >= weekStart.getTime() && employeedate.getTime() < weekFinish.getTime()) {
                employeesBirthday.push(employee)
            }
        })
        return employeesBirthday;
    }

    private getWeekStartDate(today: Date): Date {
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        weekStart.setHours(0, 0, 0, 0);
        return weekStart;
    }

    private getWeekFinishDate(today: Date): Date {
        const weekFinish = new Date(today);
        weekFinish.setDate(today.getDate() + (7 - today.getDay()));
        weekFinish.setHours(0, 0, 0, 0);
        return weekFinish;
    }

    public async InsertEmployee(employee: IEmployee): Promise<void> {
        try {
            await sp.web.lists.getByTitle(EmployeeService._listName).items.add(employee);
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default EmployeeService;