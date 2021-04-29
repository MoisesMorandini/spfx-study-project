import * as React from 'react';
import styles from './ViewBirthdays.module.scss';
import { IViewBirthdaysProps } from './IViewBirthdaysProps';
import { IEmployee, IEmployeeService } from '../../../services/employee/IEmployeeService';

export interface IViewBirthdayState {
  employeesBirthday: IEmployee[];
}

export default class ViewBirthdays extends React.Component<IViewBirthdaysProps, IViewBirthdayState> {
  private employeeService: IEmployeeService;
  constructor(props) {
    super(props);

    this.employeeService = props.employeeService;
    this.state = {
      employeesBirthday: []
    }
  }

  componentDidMount() {
    console.log('did mount')
    this.getEmployeesBirthday();
  }

  private async getEmployeesBirthday() {
    console.log('vou pegar employess')
    const employees = await this.employeeService.GetEmployeesBirthday();
    console.log(employees)
    this.setState({
      employeesBirthday: employees
    })
  }


  public render(): React.ReactElement<IViewBirthdaysProps> {
    return (
      <div className={styles.viewBirthdays}>
        <h1>TEST TEST TEST  12312</h1>
      </div>
    );
  }
}
