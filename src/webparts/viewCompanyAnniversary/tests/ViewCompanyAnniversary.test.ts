/// <reference types='jest'/>

import * as React from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import { IViewCompanyAnniversaryProps } from '../components/IViewCompanyAnniversaryProps';
import ViewCompanyAnniversary, { IViewCompanyAnniversaryState } from '../components/ViewCompanyAnniversary';
import { IEmployee, IEmployeeService } from '../../../services/employee/IEmployeeService';
import EmployeeServiceMock from '../../../services/employee/EmployeeServiceMock';
import { Spinner } from 'office-ui-fabric-react';
import EmployeeCard from '../../../components/EmployeeCard/EmployeeCard';

configure({ adapter: new Adapter() });

describe('Testing ViewCompanyAnniversary component', () => {
    let viewCompanyAnniversaryComponent: ReactWrapper<IViewCompanyAnniversaryProps, IViewCompanyAnniversaryState>;
    let employeeServiceInstance: IEmployeeService = new EmployeeServiceMock();

    beforeEach(() => {
        viewCompanyAnniversaryComponent = mount(React.createElement(ViewCompanyAnniversary, {
            employeeService: employeeServiceInstance
        }));
    });

    afterEach(() => {
        viewCompanyAnniversaryComponent.unmount();
    });

    test('Should render <ViewCompanyAnniversary /> component', () => {
        expect(viewCompanyAnniversaryComponent).toBeTruthy();
    });

    test('Should display the correct number of <EmployeeCard />', () => {
        const quantity: number = 5;
        viewCompanyAnniversaryComponent.update();
        const employeeCard = viewCompanyAnniversaryComponent.find(EmployeeCard);

        expect(employeeCard.length).toBe(quantity);
    });

    test('Should not render <EmployeeCard /> ', () => {
        viewCompanyAnniversaryComponent.setState({
            employeesCompanyAnniversary: []
        });
        viewCompanyAnniversaryComponent.update();
        const employeeCard = viewCompanyAnniversaryComponent.find(EmployeeCard);
        expect(employeeCard.length).toEqual(0);
    });

    test('Should <Spinner /> when isLoading state is true ', () => {
        viewCompanyAnniversaryComponent.setState({
            isLoading: true
        });
        viewCompanyAnniversaryComponent.update();
        const documentCard = viewCompanyAnniversaryComponent.find(Spinner);
        expect(documentCard).toBeTruthy();
    });

    test('Should call GetEmployeesCompanyAnniversary on render <ViewCompanyAnniversary /> ', () => {
        const spy = spyOn(employeeServiceInstance, 'GetEmployeesCompanyAnniversary');
        const component = mount(React.createElement(ViewCompanyAnniversary, {
            employeeService: employeeServiceInstance
        }));

        expect(component).toBeTruthy();
        expect(spy).toBeCalled();
    });

    test('Should display the correct number of Stars filled and not filled', () => {
        const employee: IEmployee[] = [
            {
                Title: 'Alex',
                LastName: 'Wilber',
                AdmissionDate: new Date('2015-11-30'),
                BirthdayDate: new Date('2015-11-30'),
                Unit: 'Unit 01',
                Division: 'Division 01',
                Team: 'Team 01',
                User: {
                    Title: 'Alex',
                    EMail: 'AlexW@M365x704390.OnMicrosoft.com'
                }
            }
        ]
        const totalNumberIcons: number = 10;
        const currentDate: Date = new Date();
        const numStars: number = currentDate.getFullYear() - employee[0].AdmissionDate.getFullYear();
        viewCompanyAnniversaryComponent.setState({
            employeesCompanyAnniversary: employee
        })
        viewCompanyAnniversaryComponent.update();
        const icons = viewCompanyAnniversaryComponent.find(EmployeeCard).first().find("i");

        let iconsFilled: number = 0;
        let iconsNotFilled: number = 0;
        icons.forEach(icon => {
            getComputedStyle(icon.getDOMNode()).getPropertyValue('color') === "rgb(255, 185, 0)" ? iconsFilled++ : iconsNotFilled++;
        })

        expect(iconsFilled).toEqual(numStars);
        expect(iconsNotFilled).toEqual(totalNumberIcons - numStars);
    });
});

