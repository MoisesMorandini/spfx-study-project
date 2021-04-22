import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IEmployeeService } from "../../../services/employee/IEmployeeService";

export interface INewEmployeeProps {
  employeeService: IEmployeeService;
  context: WebPartContext;
}
