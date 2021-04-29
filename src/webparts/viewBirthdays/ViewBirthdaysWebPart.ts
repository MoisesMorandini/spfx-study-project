import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Environment, EnvironmentType, Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import ViewBirthdays from './components/ViewBirthdays';
import { IViewBirthdaysProps } from './components/IViewBirthdaysProps';
import { IEmployeeService } from "../../services/employee/IEmployeeService";

import { sp } from '@pnp/sp/presets/all';
import EmployeeServiceMock from '../../services/employee/EmployeeServiceMock';
import EmployeeService from '../../services/employee/EmployeeService';

export interface IViewBirthdaysWebPartProps { }

export default class ViewBirthdaysWebPart extends BaseClientSideWebPart<IViewBirthdaysWebPartProps> {
  private employeeService: IEmployeeService;
  public render(): void {
    const element: React.ReactElement<IViewBirthdaysProps> = React.createElement(
      ViewBirthdays,
      {
        employeeService: this.employeeService
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit() {
    await super.onInit();
    sp.setup({
      spfxContext: this.context
    });
    this.employeeService = Environment.type === EnvironmentType.Local ? new EmployeeServiceMock() : new EmployeeService();
  }


  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  // @ts-ignore
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
