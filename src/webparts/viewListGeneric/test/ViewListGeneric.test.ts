/// <reference types='jest' />

import * as React from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import { IViewListGenericProps } from '../components/IViewListGenericProps';
import { IViewListGenericState, ViewListGeneric } from '../components/ViewListGeneric';
import ListServiceMock from '../../../services/list/ListServiceMock';
import { IFieldInfo } from '@pnp/sp/fields';
import { DetailsList } from 'office-ui-fabric-react';

configure({ adapter: new Adapter() });


describe('testing ViewListGeneric component', () => {
    let viewListGenericComponent: ReactWrapper<IViewListGenericProps, IViewListGenericState>;
    let listServiceMockInstance: ListServiceMock = new ListServiceMock();

    beforeEach(() => {
        viewListGenericComponent = mount(React.createElement(ViewListGeneric, {
            listName: 'List Mock',
            listServiceInstace: listServiceMockInstance
        }));
    });

    afterEach(() => {
        viewListGenericComponent.unmount();
    })

    test('should display list name', () => {
        let listNameNode = viewListGenericComponent.find('h2').first().text();

        expect(listNameNode).toBe(viewListGenericComponent.props().listName);
    })

    test('should renders <DetailsList /> component', () => {
        const detailsList = viewListGenericComponent.find(DetailsList).first();

        expect(detailsList).toBeTruthy();
    });

    test('should <DetailsList /> component has the correct number of items', () => {
        viewListGenericComponent.update();
        const detailsList = viewListGenericComponent.find(DetailsList).first();
        expect(detailsList.props().items.length).toEqual(3);
    });


    test('should display the correct number of list items', () => {
        viewListGenericComponent.update();
        const detailsList = viewListGenericComponent.find(DetailsList).first();
        const listItemsLength = detailsList.find('.ms-List-cell').length;
        expect(listItemsLength).toBe(3);
    });

    test('should call GetListFields and GetListItems when component property is updated', async () => {
        const spyGetListFields = jest.spyOn(listServiceMockInstance, 'GetListFields');
        const spyGetListItems = jest.spyOn(listServiceMockInstance, 'GetListItems');

        viewListGenericComponent.setProps({
            listName: 'ListMock'
        })

        const listName = viewListGenericComponent.props().listName;
        const fields: IFieldInfo[] = await listServiceMockInstance.GetListFields(listName);

        expect(spyGetListFields).toHaveBeenCalledWith(listName);
        expect(spyGetListItems).toHaveBeenCalledWith(listName, fields);
    });

    test('should sorted ascending state Items, when click on column header', () => {
        const notSortedItemsMock =
            [
                { Title: "Avengers", Category: "Superhero Movie" },
                { Title: "The Boys", Category: "Superhero Movie" },
                { Title: "Justice League", Category: "Superhero Serie" }
            ]
        const sortedItemsMock =
            [
                { Title: "Avengers", Category: "Superhero Movie" },
                { Title: "Justice League", Category: "Superhero Serie" },
                { Title: "The Boys", Category: "Superhero Movie" }
            ]
        viewListGenericComponent.setState({
            items: notSortedItemsMock
        })

        const detailsList = viewListGenericComponent.find(DetailsList).first();
        const columnHeader = detailsList.find({ role: "button" }).first();

        columnHeader.simulate('click');

        expect(viewListGenericComponent.state('items')).toEqual(sortedItemsMock);
    })

    test('should sorted descendant state Items, when click on a column header and the column is already sorted ascending', () => {
        const sortedItemsMockAsc =
            [
                { Title: "Avengers", Category: "Superhero Movie" },
                { Title: "Justice League", Category: "Superhero Serie" },
                { Title: "The Boys", Category: "Superhero Movie" }
            ]
        const sortedItemsMockDesc =
            [
                { Title: "The Boys", Category: "Superhero Movie" },
                { Title: "Justice League", Category: "Superhero Serie" },
                { Title: "Avengers", Category: "Superhero Movie" }
            ]
        let columns = viewListGenericComponent.state('columns');

        viewListGenericComponent.setState({
            items: sortedItemsMockAsc,
            columns: columns.map(column => {
                column.isSorted = true;
                column.isSortedDescending = false;
                return column;
            })
        });
        const detailsList = viewListGenericComponent.find(DetailsList).first();
        const columnHeader = detailsList.find({ role: "button" }).first();
        columnHeader.simulate('click');

        expect(viewListGenericComponent.state('items')).toEqual(sortedItemsMockDesc);
    })
})