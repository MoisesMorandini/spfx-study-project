import * as React from 'react';
import styles from './NewEmployee.module.scss';
import { INewEmployeeProps } from './INewEmployeeProps';
import { Spinner, PrimaryButton, Stack, TextField, DatePicker, ITextFieldProps, SpinnerSize } from 'office-ui-fabric-react';
import { PeoplePicker, PrincipalType } from '@pnp/spfx-controls-react/lib/PeoplePicker';
import { IPersonaProps } from '@pnp/spfx-controls-react/node_modules/office-ui-fabric-react/lib/components/Persona/Persona.types'
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
  requestNewEmployee?: boolean;
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
      admissionDate: new Date(),
      requestNewEmployee: false
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

  private formatDate = (date: Date): string => {
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear() % 100);
  };

  private handleDate = (fieldName: string, date: Date): void => {
    this.setState({ ...this.partialState(fieldName, date) });
  }

  private handlePeoplePicker = (items: IPersonaProps[]): void => {
    this.setState({ ...this.state, userId: items[0].id })
  }

  private handleSubmit = async (event) => {
    this.setState({ requestNewEmployee: true })
    event.preventDefault();
    await this.addEmployee();
  }

  private addEmployee = async () => {
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

    await this.employeeService.InsertEmployee(newEmployee);
    this.setState({ requestNewEmployee: false });
  }

  public render(): React.ReactElement<INewEmployeeProps> {
    const admissionDate: ITextFieldProps = {
      name: "admissionDate"
    }
    const birthdayDate: ITextFieldProps = {
      name: "birthdayDate"
    }

    return (
      <div className={styles.newEmployee} >
        <Stack className={styles.container}>
          <h2 className={styles.labelForm}>Add New Employee</h2>

          <Stack className={styles.form}>
            <form onSubmit={this.handleSubmit}>
              <TextField disabled={this.state.requestNewEmployee} placeholder="Enter value here" name="firstName" label={"First Name"} onChange={this.handleChange}
                required={true} onGetErrorMessage={this.getRequiredErrorMessage} validateOnLoad={false} validateOnFocusOut />
              <TextField disabled={this.state.requestNewEmployee} placeholder="Enter value here" name="lastName" label={"Last Name"} onChange={this.handleChange}
                required={true} onGetErrorMessage={this.getRequiredErrorMessage} validateOnLoad={false} validateOnFocusOut />
              <DatePicker disabled={this.state.requestNewEmployee} label="Birthday Date" ariaLabel="Select a date" value={this.state.birthdayDate} formatDate={this.formatDate}
                onSelectDate={(e) => this.handleDate("birthdayDate", e)} isRequired allowTextInput={true} textField={birthdayDate} />
              <DatePicker disabled={this.state.requestNewEmployee} label="Admission Date" ariaLabel="Select a date" value={this.state.admissionDate} formatDate={this.formatDate}
                onSelectDate={(e) => this.handleDate("admissionDate", e)} isRequired allowTextInput={true} textField={admissionDate} />

              <TextField disabled={this.state.requestNewEmployee} placeholder="Enter value here" name="unit" label={"Unit"} onChange={this.handleChange} />
              <TextField disabled={this.state.requestNewEmployee} placeholder="Enter value here" name="division" label={"Division"} onChange={this.handleChange} />
              <TextField disabled={this.state.requestNewEmployee} placeholder="Enter value here" name="team" label={"Team"} onChange={this.handleChange} />

              <PeoplePicker context={this.props.context as any} titleText="User" showtooltip={true} ensureUser={true}
                onChange={this.handlePeoplePicker} showHiddenInUI={false} principalTypes={[PrincipalType.User]}
                placeholder="Enter value here"
              />

              <div className={styles.button}>
                <PrimaryButton name="addEmployee" type="submit" disabled={this.state.requestNewEmployee} >Add</PrimaryButton>
                {this.state.requestNewEmployee && <Spinner size={SpinnerSize.medium} className={styles.loading} />}
              </div>
            </form>
          </Stack>


        </Stack>
      </div>
    );
  }
}
