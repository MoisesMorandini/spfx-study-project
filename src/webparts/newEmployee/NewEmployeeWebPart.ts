import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Environment, EnvironmentType, Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'NewEmployeeWebPartStrings';
import NewEmployee from './components/NewEmployee';
import { INewEmployeeProps } from './components/INewEmployeeProps';

import { sp, SPRest } from "@pnp/sp/presets/all";
import { IEmployeeService } from '../../services/employee/IEmployeeService';
import EmployeeServiceMock from '../../services/employee/EmployeeServiceMock';

export interface INewEmployeeWebPartProps {
  // description: string;
}

export default class NewEmployeeWebPart extends BaseClientSideWebPart<INewEmployeeWebPartProps> {
  private employeeService: IEmployeeService;

  public render(): void {
    const element: React.ReactElement<INewEmployeeProps> = React.createElement(
      NewEmployee,
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

    //change the condition for add EmployeeService(not mock)
    this.employeeService = Environment.type === EnvironmentType.Local ? new EmployeeServiceMock() : new EmployeeServiceMock();
  }
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  //@ts-ignore
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            // {
            //   groupName: strings.BasicGroupName,
            //   groupFields: [
            //     PropertyPaneTextField('description', {
            //       label: strings.DescriptionFieldLabel
            //     })
            //   ]
            // }
          ]
        }
      ]
    };
  }
}
