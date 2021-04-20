import * as React from 'react';
import styles from './NewEmployee.module.scss';
import { INewEmployeeProps } from './INewEmployeeProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { PrimaryButton, DefaultButton, Stack, TextField, DatePicker, Dropdown, IDropdownOption, IDropdownStyles } from 'office-ui-fabric-react';
import { IEmployee, IEmployeeService } from '../../../services/employee/IEmployeeService';


export interface INewEmployeeState {
  firstName: string;
  lastName: string;
  birthdayDate: Date;
  admissionDate: Date;
  unit: IDropdownOption;
  division: string;
  team: IDropdownOption;
}

const options: IDropdownOption[] = [
  { key: '', text: '' },
  { key: 'optionOne', text: 'OptionOne' },
  { key: 'optionTwo', text: 'OptionTwo' },
  { key: 'optionThree', text: 'OptionThree' }
];

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
      unit: { key: '', text: '' },
      division: '',
      team: { key: '', text: '' },
    }
  }

  private handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({ ...this.partialState(name, value) });
  }

  private partialState(field, value) {
    var partialState: INewEmployeeState = { ...this.state };
    partialState[field] = value;
    return partialState;
  }

  private addEmployee = (event) => {
    try {
      const newEmployee: IEmployee = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        birthdayDate: this.state.birthdayDate,
        admissionDate: this.state.admissionDate,
        unit: this.state.unit.key,
        division: this.state.division,
        team: this.state.team.key,
      }

      this.employeeService.InsertEmployee(newEmployee);

    } catch (err) {
      throw new Error(err);
    }
  }

  private getErrorMessage = (value: string): string => {
    return value.length > 0 ? '' : `This field is required.`;
  };

  private formatDate = (date?: Date): string => {
    return !date ? '' : date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear() % 100);
  };

  private handleDate = (fieldName, date: Date) => {
    this.setState({ ...this.partialState(fieldName, date) });
  }

  private handleDropDown = (fieldName, option, index) => {
    this.setState({ ...this.partialState(fieldName, option) });
  }

  public render(): React.ReactElement<INewEmployeeProps> {
    return (
      <div className={styles.newEmployee}>
        <Stack className={styles.container}>

          <h2 className={styles.labelForm}>Add New Employee</h2>

          <Stack className={styles.form}>
            <TextField placeholder="Enter value here" name="firstName" label={"First Name"} onChange={this.handleChange}
              required={true} onGetErrorMessage={this.getErrorMessage} validateOnLoad={false} validateOnFocusOut />
            <TextField placeholder="Enter value here" name="lastName" label={"Last Name"} onChange={this.handleChange}
              required={true} onGetErrorMessage={this.getErrorMessage} validateOnLoad={false} validateOnFocusOut />
            <DatePicker label="Birthday Date" ariaLabel="Select a date"
              value={this.state.birthdayDate} formatDate={this.formatDate} onSelectDate={(e) => this.handleDate("birthdayDate", e)}
              isRequired allowTextInput
            //  className={styles.control}
            />
            <DatePicker label="Admission Date" ariaLabel="Select a date"
              value={this.state.admissionDate} formatDate={this.formatDate} onSelectDate={(e) => this.handleDate("admissionDate", e)}
              isRequired allowTextInput
            //  className={styles.control} 
            />
            <Dropdown
              placeholder="Select an option" label="Unit" options={options}
              onChange={(e, option, index) => this.handleDropDown("unit", option, index)}
            />
            <TextField placeholder="Enter value here" name="division" label={"Division"} onChange={this.handleChange}
              required={true} onGetErrorMessage={this.getErrorMessage} validateOnLoad={false} validateOnFocusOut />
            <Dropdown
              placeholder="Select an option" label="Team" options={options}
              onChange={(e, option, index) => this.handleDropDown("team", option, index)}
            />

          </Stack>
          <div className={styles.button}>
            <PrimaryButton onClick={this.addEmployee}>Add</PrimaryButton>
            <DefaultButton className={styles.buttonCancel}>Cancel</DefaultButton>
          </div>
        </Stack>
      </div>
    );
  }
}
