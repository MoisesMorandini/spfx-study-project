import * as React from 'react';
import styles from './ViewBirthdays.module.scss';
import { IViewBirthdaysProps } from './IViewBirthdaysProps';
import { IEmployee, IEmployeeService } from '../../../services/employee/IEmployeeService';
import { Stack, IconButton, IButtonStyles, Spinner, SpinnerSize } from 'office-ui-fabric-react';
import EmployeeCard from '../../../components/EmployeeCard/EmployeeCard';

export interface IViewBirthdaysState {
  employeesBirthday: IEmployee[];
  isLoading: boolean;
}

export default class ViewBirthdays extends React.Component<IViewBirthdaysProps, IViewBirthdaysState> {
  private employeeService: IEmployeeService;
  constructor(props) {
    super(props);
    this.employeeService = props.employeeService;
    this.state = {
      employeesBirthday: [],
      isLoading: false
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.getEmployeesBirthday();
  }

  private async getEmployeesBirthday() {
    const employees = await this.employeeService.GetEmployeesBirthday();
    this.setState({
      employeesBirthday: employees,
      isLoading: false
    })
  }

  public render(): React.ReactElement<IViewBirthdaysProps> {
    const { employeesBirthday, isLoading } = this.state;
    const birthdayCakeStyleIcon: IButtonStyles = {
      icon: { color: '#0078d4', fontSize: 36, padding: 0, margin: 0 },
      root: { width: 36, height: 72, padding: 0, margin: 0 }
    }

    return (
      <Stack className={styles.viewBirthdays}>
        <div className={styles.titleBirthdays}>
          <IconButton styles={birthdayCakeStyleIcon} iconProps={{ iconName: 'BirthdayCake' }}
            title="BirthdayCake" ariaLabel="BirthdayCake" />
          <span className={styles.birthdayMessage}>Birthdays of this Week</span>
        </div>
        <div className={styles.birthdayCards}>
          {
            isLoading ? <Spinner size={SpinnerSize.large} className={styles.loading} />
              : employeesBirthday.length > 0 && employeesBirthday.map(employee => {
                return (
                  <EmployeeCard key={employee.Title} name={`${employee.Title} ${employee.LastName}`} date={employee.BirthdayDate}
                    email={employee.User && employee.User.EMail} />
                )
              })
          }
        </div>
      </Stack>
    );
  }
}
