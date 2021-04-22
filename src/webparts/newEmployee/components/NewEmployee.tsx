import * as React from 'react';
import styles from './NewEmployee.module.scss';
import { INewEmployeeProps } from './INewEmployeeProps';
import { PrimaryButton, Stack, TextField, DatePicker } from 'office-ui-fabric-react';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";

import { IEmployeeService, IEmployee } from '../../../services/employee/IEmployeeService';

export interface IUser {
  id: string;
  secondaryText: string;
}

export interface INewEmployeeState {
  firstName: string;
  lastName: string;
  birthdayDate: Date;
  admissionDate: Date;
  unit?: string;
  division?: string;
  team?: string;
  userId?: string;
}

export default class NewEmployee extends React.Component<INewEmployeeProps, INewEmployeeState> {
  private employeeService: IEmployeeService;

  constructor(props) {
    super(props);
    this.employeeService = props.employeeService;

    this.state = {
      firstName: '',
      lastName: '',
      birthdayDate: new Date(),
      admissionDate: new Date()
    }
  }

  private addEmployee = (): void => {
    try {
      const newEmployee: IEmployee = {
        Title: this.state.firstName,
        LastName: this.state.lastName,
        BirthdayDate: this.state.birthdayDate,
        AdmissionDate: this.state.admissionDate,
        Unit: this.state.unit,
        Division: this.state.division,
        Team: this.state.team,
        UserId: this.state.userId
      }

      this.employeeService.InsertEmployee(newEmployee);
    } catch (err) {
      throw new Error(err);
    }
  }

  private handleChange = (event: React.FormEvent<HTMLTextAreaElement>): void => {
    const target = event.target as HTMLTextAreaElement;
    const name = target.name;
    const value = target.value;

    this.setState({ ...this.partialState(name, value) });
  }

  private partialState(field: string, value: string | Date | IUser): INewEmployeeState {
    var partialState: INewEmployeeState = { ...this.state };
    partialState[field] = value;
    return partialState;
  }

  private getRequiredErrorMessage = (value: string): string => {
    return value.length > 0 ? '' : `This field is required.`;
  };

  private formatDate = (date?: Date): string => {
    return !date ? '' : date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear() % 100);
  };

  private handleDate = (fieldName: string, date: Date): void => {
    this.setState({ ...this.partialState(fieldName, date) });
  }

  private handlePeoplePicker = (items: IUser[]): void => {
    this.setState({ ...this.state, userId: items[0].id })
  }

  public render(): React.ReactElement<INewEmployeeProps> {
    return (
      <div className={styles.newEmployee}>
        <Stack className={styles.container}>
          <h2 className={styles.labelForm}>Add New Employee</h2>

          <Stack className={styles.form}>

            <TextField placeholder="Enter value here" name="firstName" label={"First Name"} onChange={this.handleChange}
              required={true} onGetErrorMessage={this.getRequiredErrorMessage} validateOnLoad={false} validateOnFocusOut />
            <TextField placeholder="Enter value here" name="lastName" label={"Last Name"} onChange={this.handleChange}
              required={true} onGetErrorMessage={this.getRequiredErrorMessage} validateOnLoad={false} validateOnFocusOut />
            <DatePicker label="Birthday Date" ariaLabel="Select a date" value={this.state.birthdayDate} formatDate={this.formatDate}
              onSelectDate={(e) => this.handleDate("birthdayDate", e)} isRequired />
            <DatePicker label="Admission Date" ariaLabel="Select a date" value={this.state.admissionDate} isRequired
              formatDate={this.formatDate} onSelectDate={(e) => this.handleDate("admissionDate", e)} />
            <TextField placeholder="Enter value here" name="unit" label={"Unit"} onChange={this.handleChange} />
            <TextField placeholder="Enter value here" name="division" label={"Division"} onChange={this.handleChange} />
            <TextField placeholder="Enter value here" name="team" label={"Team"} onChange={this.handleChange} />
            <PeoplePicker context={this.props.context as any} titleText="User" showtooltip={true} ensureUser={true}
              onChange={this.handlePeoplePicker} showHiddenInUI={false} principalTypes={[PrincipalType.User]} />

          </Stack>

          <div className={styles.button}>
            <PrimaryButton onClick={this.addEmployee}>Add</PrimaryButton>
          </div>

        </Stack>
      </div>
    );
  }
}
