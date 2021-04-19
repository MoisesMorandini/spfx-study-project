import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Environment, EnvironmentType, Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneDropdown, IPropertyPaneDropdownOption } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'ViewListGenericWebPartStrings';
import { ViewListGeneric } from './components/ViewListGeneric';
import { IViewListGenericProps } from './components/IViewListGenericProps';
import { sp, SPRest } from "@pnp/sp/presets/all";
import ListService from '../../services/ListService';
import ListServiceMock from '../../services/ListServiceMock';
import IListService from '../../services/IListService';

export interface IViewListGenericWebPartProps {
  listName: string;
}

var spObj: SPRest = null;

export default class ViewListGenericWebPart extends BaseClientSideWebPart<IViewListGenericWebPartProps> {
  private lists: IPropertyPaneDropdownOption[];
  private listsDropdownDisabled: boolean = true;
  private listServiceInstace: IListService;
  private mockListName: string = 'List Mock';

  constructor() {
    super();
  }

  public render(): void {
    const element: React.ReactElement<IViewListGenericProps> = React.createElement(
      ViewListGeneric,
      {
        listName: Environment.type === EnvironmentType.Local ? this.mockListName : this.properties.listName,
        listServiceInstace: this.listServiceInstace
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit() {
    await super.onInit();
    sp.setup({
      spfxContext: this.context
    });
    spObj = sp;

    this.listServiceInstace = Environment.type === EnvironmentType.Local ? new ListServiceMock() : new ListService();
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  // @ts-ignore
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
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneDropdown('listName', {
                  label: strings.ListNameFieldLabel,
                  options: this.lists,
                  disabled: this.listsDropdownDisabled,
                })
              ]
            }
          ]
        }
      ]
    };
  }

  protected onPropertyPaneConfigurationStart(): void {
    this.loadLists().then((lists: IPropertyPaneDropdownOption[]) => {
      this.lists = lists;
      this.context.propertyPane.refresh();
    })
  }

  private async loadLists(): Promise<IPropertyPaneDropdownOption[]> {
    this.listsDropdownDisabled = true;

    const dropdopwnObjects: IPropertyPaneDropdownOption[] = [];
    var key: number = 0;
    await spObj.web.lists.get().then((lists) => {
      lists.forEach(list => {
        dropdopwnObjects.push({
          key: list.Title,
          text: list.Title
        })
        key++;
      })
    })

    this.listsDropdownDisabled = false;
    return dropdopwnObjects;
  }
}
