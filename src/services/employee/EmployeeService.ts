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
        console.log('employeesOfMonth');
        console.log(employeesOfMonth);
        employeesOfMonth.forEach(employee => {
            const employeeDate = new Date(employee.BirthdayDate);
            employeeDate.setFullYear(today.getFullYear());
            this.filterEmployeeByWeekDate(employeeDate, weekStart, weekFinish) && employeesBirthday.push(employee);
        })
        return employeesBirthday;
    }

    async GetEmployeesCompanyAnniversary(): Promise<IEmployee[]> {
        const today = new Date();
        const weekStart = this.getWeekStartDate(today);
        const weekFinish = this.getWeekFinishDate(today);
        const companyAnniversaries: IEmployee[] = [];

        const employeesOfMonth: IEmployee[] = await sp.web.lists.getByTitle(EmployeeService._listName).items
            .filter(`MonthAdmission eq ${weekStart.getMonth() + 1} or MonthAdmission eq ${weekFinish.getMonth() + 1}`)
            .select("Title,LastName,BirthdayDate,AdmissionDate,User/Title,User/EMail").expand("User").get();

        employeesOfMonth.forEach(employee => {
            const employeeDateOriginal = new Date(employee.AdmissionDate);
            const employeeDatePrepareted = new Date(employeeDateOriginal);
            employeeDatePrepareted.setFullYear(today.getFullYear());
            if (employeeDateOriginal.getFullYear() !== today.getFullYear() && this.filterEmployeeByWeekDate(employeeDatePrepareted, weekStart, weekFinish)) {
                companyAnniversaries.push(employee);
            }
        })

        return companyAnniversaries;
    }

    private filterEmployeeByWeekDate(employeeDate: Date, weekStart: Date, weekFinish: Date): boolean {
        return employeeDate.getTime() >= weekStart.getTime() && employeeDate.getTime() < weekFinish.getTime() ? true : false;
    }

    public async InsertEmployee(employee: IEmployee): Promise<void> {
        try {
            await sp.web.lists.getByTitle(EmployeeService._listName).items.add(employee);
        } catch (error) {
            throw new Error(error);
        }
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
}

export default EmployeeService;