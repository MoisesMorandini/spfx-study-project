import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Environment, EnvironmentType, Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import ViewLibrary from './components/ViewLibrary';
import { IViewLibraryProps } from './components/IViewLibraryProps';
import { sp } from '@pnp/sp/presets/all';
import ILibraryService from '../../services/library/ILibraryService';
import LibraryService from '../../services/library/LibraryService';
import LibraryServiceMock from '../../services/library/LibraryServiceMock';

export interface IViewLibraryWebPartProps {

}

export default class ViewLibraryWebPart extends BaseClientSideWebPart<IViewLibraryWebPartProps> {
  private libraryService: ILibraryService;

  public render(): void {
    const element: React.ReactElement<IViewLibraryProps> = React.createElement(
      ViewLibrary,
      {
        libraryService: this.libraryService
      }
    );
    ReactDom.render(element, this.domElement);
  }

  protected async onInit() {
    await super.onInit();
    sp.setup({
      spfxContext: this.context
    });

    this.libraryService = Environment.type === EnvironmentType.Local ? new LibraryServiceMock() : new LibraryService();
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  // @ts-ignore
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
