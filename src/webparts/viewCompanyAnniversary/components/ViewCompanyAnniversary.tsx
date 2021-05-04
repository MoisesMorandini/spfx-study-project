import * as React from 'react';
import styles from './ViewCompanyAnniversary.module.scss';
import { IViewCompanyAnniversaryProps } from './IViewCompanyAnniversaryProps';
import { IEmployee, IEmployeeService } from '../../../services/employee/IEmployeeService';
import { IButtonStyles, IconButton, Spinner, SpinnerSize, Stack } from 'office-ui-fabric-react';
import EmployeeCard from '../../../components/EmployeeCard/EmployeeCard';

export interface IViewCompanyAnniversaryState {
  employeesCompanyAnniversary: IEmployee[];
  isLoading: boolean;
}

export interface EmployeeYearStarsProps {
  employeeYears: number;
  isStarFilled: boolean[];
}

export default class ViewCompanyAnniversary extends React.Component<IViewCompanyAnniversaryProps, IViewCompanyAnniversaryState> {
  private employeeService: IEmployeeService;
  private starsNumber = 10;
  constructor(props: IViewCompanyAnniversaryProps) {
    super(props);

    this.employeeService = props.employeeService;
    this.state = {
      employeesCompanyAnniversary: [],
      isLoading: false
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.getEmployeesCompanyAnniversary();
  }

  private async getEmployeesCompanyAnniversary() {
    const employees = await this.employeeService.GetEmployeesCompanyAnniversary();
    this.setState({
      employeesCompanyAnniversary: employees,
      isLoading: false
    })
  }

  private specialEventStyleIcon: IButtonStyles = {
    icon: { color: '#0078d4', fontSize: 36, padding: 0, margin: 0 },
    root: { width: 36, height: 72, padding: 0, margin: 0 }
  }

  private getStarStyle = (isFilled: boolean): IButtonStyles => {
    return {
      icon: { color: `${isFilled ? '#ffb900' : '##201f1e'}`, fontSize: 14, padding: 0, margin: 0 },
      flexContainer: { justifyContent: "flex-start", alignSelf: "center" },
      root: { width: 14, height: 28, padding: 0, margin: 0 }
    }
  }

  private EmployeeYearStars: React.FunctionComponent<EmployeeYearStarsProps> = ({ employeeYears, isStarFilled }: EmployeeYearStarsProps): React.ReactElement => {
    return (
      <div className={styles.date}>
        <span>{employeeYears} {employeeYears > 1 ? 'Years' : 'Year'}</span>
        <div className={styles.star}>
          {
            isStarFilled.map((star: boolean) => {
              const style = this.getStarStyle(star);
              return <IconButton styles={style} iconProps={{ iconName: 'FavoriteStar' }} title="FavoriteStar" ariaLabel="FavoriteStar" />
            })
          }
          <span>{employeeYears > 10 && '...'}</span>
        </div>
      </div>
    )
  }

  public render(): React.ReactElement<IViewCompanyAnniversaryProps> {
    const { isLoading, employeesCompanyAnniversary } = this.state;
    return (
      <Stack className={styles.viewCompanyAnniversary}>
        <div className={styles.companyAnniversaryTitle}>
          <IconButton styles={this.specialEventStyleIcon} iconProps={{ iconName: 'SpecialEvent' }} title="BirthdayCake" ariaLabel="BirthdayCake" />
          <span className={styles.companyAnniversaryMessage}>Company anniversaries this week</span>
        </div>
        <div className={styles.companyAnniversaryCards}>
          {
            isLoading ? <Spinner size={SpinnerSize.large} className={styles.loading} /> :
              employeesCompanyAnniversary.length > 0 && employeesCompanyAnniversary.map((employee: IEmployee) => {
                const employeeAdmissionDate: Date = new Date(employee.AdmissionDate);
                const employeeYears: number = new Date().getFullYear() - employeeAdmissionDate.getFullYear();
                const isStarFilled: boolean[] = [];

                for (let i: number = 0; i < this.starsNumber; i++) {
                  i < employeeYears ? isStarFilled.push(true) : isStarFilled.push(false);
                }
                return (
                  <EmployeeCard name={`${employee.Title} ${employee.LastName}`} date={employee.AdmissionDate} email={employee.User && employee.User.EMail}
                    admission={(
                      <this.EmployeeYearStars employeeYears={employeeYears} isStarFilled={isStarFilled} />
                    )}>
                  </EmployeeCard>
                )
              })
          }
        </div>
      </Stack>
    );
  }
}
