/// <reference types='jest'/>

import * as React from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import ViewLibrary, { IViewLibraryState } from '../components/ViewLibrary';
import { IViewLibraryProps } from '../components/IViewLibraryProps';
import ILibraryService, { IDocumentLibrary } from '../../../services/library/ILibraryService';
import LibraryServiceMock from '../../../services/library/LibraryServiceMock';
import { DocumentCard, DocumentCardStatus, DocumentCardTitle, IconButton } from 'office-ui-fabric-react';

configure({ adapter: new Adapter() });

describe('Testing ViewLibrary component', () => {
    let viewLibraryComponent: ReactWrapper<IViewLibraryProps, IViewLibraryState>
    let libraryServiceMock: ILibraryService = new LibraryServiceMock();
    const documentLibrary: IDocumentLibrary[] = [
        {
            Title: "Contracts",
            ItemCount: 1
        },
        {
            Title: "Employee",
            ItemCount: 2
        }
    ];

    beforeEach(() => {
        viewLibraryComponent = mount(React.createElement(ViewLibrary, {
            libraryService: libraryServiceMock
        }))
    });

    afterEach(() => {
        viewLibraryComponent.unmount();
    })

    test('Should render <ViewLibrary/> component', () => {
        expect(viewLibraryComponent).toBeTruthy();
    });

    test('Should display the correct quantity of </>, <IconButton />, <DocumentCardTitle /> and <DocumentCardStatus />', () => {

        const quantity: number = 2;
        viewLibraryComponent.setState({ libraryList: documentLibrary });
        const documentCard = viewLibraryComponent.find(DocumentCard);
        expect(documentCard.length).toEqual(quantity);
        expect(documentCard.find(IconButton).length).toEqual(quantity);
        expect(documentCard.find(DocumentCardTitle).length).toEqual(quantity);
        expect(documentCard.find(DocumentCardStatus).length).toEqual(quantity);
    });

    test('Should not render <DocumentCard />', () => {
        viewLibraryComponent.setState({ libraryList: [] });
        const documentCard = viewLibraryComponent.find(DocumentCard).length;
        expect(documentCard).toEqual(0);
    });

    test('Should check Title of libraryList state used in <DocumentCardTitle />', () => {
        viewLibraryComponent.setState({ libraryList: documentLibrary });
        const cardStatus = viewLibraryComponent.find(DocumentCard).find(DocumentCardTitle);
        expect(cardStatus.length).toEqual(2);
        expect(cardStatus.first().text()).toEqual(`${documentLibrary[0].Title}`);
        expect(cardStatus.last().text()).toEqual(`${documentLibrary[1].Title}`);
    });

    test('Should check ItemCount of libraryList state used in <DocumentCardStatus />', () => {
        viewLibraryComponent.setState({ libraryList: documentLibrary });
        const cardStatus = viewLibraryComponent.find(DocumentCard).find(DocumentCardStatus);
        expect(cardStatus.find('i').length).toEqual(2);
        expect(cardStatus.first().text()).toEqual(`${documentLibrary[0].ItemCount} Document`);
        expect(cardStatus.last().text()).toEqual(`${documentLibrary[1].ItemCount} Documents`);
    });

});
