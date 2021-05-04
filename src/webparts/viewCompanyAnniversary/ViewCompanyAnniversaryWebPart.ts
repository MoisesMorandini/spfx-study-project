import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import ViewCompanyAnniversary from './components/ViewCompanyAnniversary';
import { IViewCompanyAnniversaryProps } from './components/IViewCompanyAnniversaryProps';

import { sp } from '@pnp/sp/presets/all';
import EmployeeServiceMock from '../../services/employee/EmployeeServiceMock';
import EmployeeService from '../../services/employee/EmployeeService';
import { IEmployeeService } from "../../services/employee/IEmployeeService";

export interface IViewCompanyAnniversaryWebPartProps { }

export default class ViewCompanyAnniversaryWebPart extends BaseClientSideWebPart<IViewCompanyAnniversaryWebPartProps> {
  private employeeService: IEmployeeService;
  public render(): void {
    const element: React.ReactElement<IViewCompanyAnniversaryProps> = React.createElement(
      ViewCompanyAnniversary,
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

  //@ts-ignore
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
