import * as React from 'react';
import styles from './ViewBirthdays.module.scss';
import { IViewBirthdaysProps } from './IViewBirthdaysProps';
import { IEmployee, IEmployeeService } from '../../../services/employee/IEmployeeService';
import {
  Stack, DocumentCard, IconButton, IButtonStyles, Spinner, SpinnerSize, Persona, PersonaSize,
} from 'office-ui-fabric-react';

export interface IViewBirthdayState {
  employeesBirthday: IEmployee[];
  isLoading: boolean;
}

export default class ViewBirthdays extends React.Component<IViewBirthdaysProps, IViewBirthdayState> {
  private employeeService: IEmployeeService;
  private urlSharepoint: string = 'https://m365x704390.sharepoint.com/sites/RH/_layouts/15/userphoto.aspx?size=L&accountname='
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
    const eventDateStyleIcon: IButtonStyles = {
      icon: { color: '#0078d4', fontSize: 16, padding: 0, margin: 0 },
      flexContainer: { justifyContent: "flex-start", alignSelf: "center" },
      root: { width: 16, height: 32, padding: 0, margin: 0 }
    }
    return (
      <Stack className={styles.viewBirthdays}>
        <div className={styles.title}>
          <IconButton styles={birthdayCakeStyleIcon} iconProps={{ iconName: 'BirthdayCake' }} title="BirthdayCake" ariaLabel="BirthdayCake" />
          <span className={styles.titleMessage}>Week Birthdays</span>
        </div>

        <div className={styles.containerCards}>
          {
            isLoading ? <Spinner size={SpinnerSize.large} className={styles.loading} /> :
              employeesBirthday.length > 1 &&
              employeesBirthday.map(employee => {
                const birthdayDate = new Date(employee.BirthdayDate);
                const month = birthdayDate.getMonth() > 9 ? birthdayDate.getMonth() + 1 : `0${birthdayDate.getMonth() + 1}`;
                const day = birthdayDate.getDate() > 9 ? birthdayDate.getDate() + 1 : `0${birthdayDate.getDate() + 1}`;
                return (
                  <DocumentCard key={employee.Title} className={styles.card} >
                    {
                      <>
                        <Persona
                          className={styles.persona}
                          text={`${employee.Title} ${employee.LastName}`}
                          secondaryText={employee.Unit as string}
                          size={PersonaSize.size48}
                          showSecondaryText={true}
                          imageUrl={`${this.urlSharepoint}${employee.User && employee.User.EMail}`}
                          imageAlt={`${employee.Title} photo`}
                        >
                          <div className={styles.birthdayDate}>
                            <IconButton styles={eventDateStyleIcon} iconProps={{ iconName: 'EventDate' }} title="EventDate" ariaLabel="EventDate" />
                            <span>{`${month}/${day}`}</span>

                          </div>
                        </Persona>
                      </>
                    }
                  </DocumentCard>
                )
              })
          }
        </div>
      </Stack>
    );
  }
}
