/// <reference types='jest'/>

import * as React from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import { INewEmployeeProps } from '../components/INewEmployeeProps'
import NewEmployee, { INewEmployeeState } from '../components/NewEmployee'
import EmployeeServiceMock from '../../../services/employee/EmployeeServiceMock'

import { PrimaryButton, TextField, DatePicker } from 'office-ui-fabric-react';
import { IEmployee } from '../../../services/employee/IEmployeeService';
configure({ adapter: new Adapter() });

fdescribe('Testing NewEmployee component', () => {
    let newEmployeeComponent: ReactWrapper<INewEmployeeProps, INewEmployeeState>
    let employeeServiceMock: EmployeeServiceMock = new EmployeeServiceMock();

    beforeEach(() => {
        newEmployeeComponent = mount(React.createElement(NewEmployee, {
            employeeService: employeeServiceMock
        }));
    });

    afterEach(() => {
        newEmployeeComponent.unmount();
    })

    test('Should change the state OnChange a TextField component', () => {
        const firstName: string = 'LoremIpsum';

        const textField = newEmployeeComponent.find(TextField).find('input[name="firstName"]');
        textField.simulate('change', { target: { name: 'firstName', value: `${firstName}` } });

        expect(newEmployeeComponent.state('firstName')).toEqual(firstName);
    });

    test('Should show a message when a TextField receives FocusIn, but when focus is out the TextField stay empty', () => {
        const textField = newEmployeeComponent.find(TextField).find('input[name="firstName"]');
        textField.simulate('blur');
        const message = newEmployeeComponent.find(TextField).find('div[role="alert"]');
        expect(message.length).toEqual(1);
    });

    test('Should not show a message when a TextField receives FocusIn, but when focus is out the TextField stay empty', () => {
        const firstName: string = 'LoremIpsum';
        const textField = newEmployeeComponent.find(TextField).find('input[name="firstName"]');
        textField.simulate('change', { target: { name: 'firstName', value: `${firstName}` } });
        textField.simulate('blur');


        const message = newEmployeeComponent.find(TextField).find('div[role="alert"]');
        expect(message.length).toEqual(0);
    });

    test('Should change the admissionDate state when select a new date in a DatePicker component', () => {
        const dateSimulated = new Date();
        const day: string = "15";
        dateSimulated.setDate(parseInt(day));

        newEmployeeComponent.find(DatePicker).find('input[name="admissionDate"]').simulate('click').update();
        simulateSelectDayInCalendar(day);

        expect(newEmployeeComponent.state('admissionDate').toISOString().slice(0, 10)).toEqual(dateSimulated.toISOString().slice(0, 10));
    })

    test('Should change the birthdayDate state when select a new date in a DatePicker component', () => {
        const dateSimulated = new Date();
        const day: string = "16";
        dateSimulated.setDate(parseInt(day));

        newEmployeeComponent.find(DatePicker).find('input[name="birthdayDate"]').simulate('click').update();
        simulateSelectDayInCalendar(day);

        expect(newEmployeeComponent.state('birthdayDate').toISOString().slice(0, 10)).toEqual(dateSimulated.toISOString().slice(0, 10));
    })

    test('Should call InsertEmployee() with the correct state values', () => {
        const employee: INewEmployeeState = {
            firstName: 'Lorem',
            lastName: 'Ipsum',
            birthdayDate: new Date(1999, 1, 1),
            admissionDate: new Date(),
            unit: 'Unit Ipsom',
            division: 'Divison Ipsom',
            team: 'Team Ipsom',
            userId: '123'
        }
        newEmployeeComponent.setState(employee);

        const spy = jest.spyOn(employeeServiceMock, 'InsertEmployee');
        newEmployeeComponent.find(PrimaryButton).simulate('submit');

        expect(spy).toHaveBeenCalled();
    })

    const simulateSelectDayInCalendar = (day: string) => {
        newEmployeeComponent.find('button[role="gridcell"]').find('span').filterWhere((date) => date.text() === day).simulate('click');
    }

})