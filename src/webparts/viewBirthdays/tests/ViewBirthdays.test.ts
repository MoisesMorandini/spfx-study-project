/// <reference types='jest'/>

import * as React from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import { IViewBirthdaysProps } from '../components/IViewBirthdaysProps';
import ViewBirthdays, { IViewBirthdaysState } from '../components/ViewBirthdays';
import { IEmployeeService } from '../../../services/employee/IEmployeeService';
import EmployeeServiceMock from '../../../services/employee/EmployeeServiceMock';
import { DocumentCard, Spinner } from 'office-ui-fabric-react';

configure({ adapter: new Adapter() });

describe('Testing ViewBirthdays component', () => {
    let viewBirthdaysComponent: ReactWrapper<IViewBirthdaysProps, IViewBirthdaysState>;
    let employeeServiceInstance: IEmployeeService = new EmployeeServiceMock();

    beforeEach(() => {
        viewBirthdaysComponent = mount(React.createElement(ViewBirthdays, {
            employeeService: employeeServiceInstance
        }));
    });

    afterEach(() => {
        viewBirthdaysComponent.unmount();
    });

    test('Should render <ViewBirthdays /> component', () => {
        expect(viewBirthdaysComponent).toBeTruthy();
    });

    test('Should display the correct number of <DocumentCard />', () => {
        const quantity: number = 5;
        viewBirthdaysComponent.update();
        const documentCard = viewBirthdaysComponent.find(DocumentCard);

        expect(documentCard.length).toBe(quantity);
    });

    test('Should not render <DocumentCard /> ', () => {
        viewBirthdaysComponent.setState({
            employeesBirthday: []
        });
        viewBirthdaysComponent.update();
        const documentCard = viewBirthdaysComponent.find(DocumentCard);
        expect(documentCard.length).toEqual(0);
    });

    test('Should <Spinner /> when isLoading state is true ', () => {
        viewBirthdaysComponent.setState({
            isLoading: true
        });
        viewBirthdaysComponent.update();
        const documentCard = viewBirthdaysComponent.find(Spinner);
        expect(documentCard).toBeTruthy();
    });

    test('Should call GetEmployeesBirthday on render <ViewBirthdays /> ', () => {
        const spy = spyOn(employeeServiceInstance, 'GetEmployeesBirthday');
        const component = mount(React.createElement(ViewBirthdays, {
            employeeService: employeeServiceInstance
        }));

        expect(component).toBeTruthy();
        expect(spy).toBeCalled();
    });

});