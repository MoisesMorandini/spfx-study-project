import * as React from 'react';
import styles from './ViewListGeneric.module.scss';
import { IViewListGenericProps } from './IViewListGenericProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IFieldInfo, IList, sp, SPRest } from "@pnp/sp/presets/all";
import { DetailsList, buildColumns, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import ViewListGenericServiceMock from '../services/ViewListGenericServiceMock';
import ListService from '../services/ListService'
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';

export interface IViewListGenericState {
  sortedItems: any[];
  columns: IColumn[];
  listName: string;
}

export interface IColumnsName {
  Title: string;
  InternalName: string;
}

var spObj: SPRest = null;

export default class ViewListGeneric extends React.Component<IViewListGenericProps, IViewListGenericState> {
  constructor(props: IViewListGenericProps) {
    super(props);

    sp.setup({
      spfxContext: this.props.spcontext
    });
    spObj = sp;

    this.state = {
      sortedItems: [],
      columns: [],
      listName: Environment.type === EnvironmentType.Local ? 'List Mock' : this.props.listName
    };
  }

  componentDidMount() {
    this._renderListAsync();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.listName !== this.props.listName) {
      this._renderListAsync();
    }
  }

  public render(): React.ReactElement<IViewListGenericProps> {
    const { sortedItems, columns } = this.state;

    return (
      <div className={styles.viewListGeneric}>
        <h2 className={styles.title} >{this.props.listName}</h2>
        <DetailsList
          items={sortedItems}
          columns={columns}
          className={styles.row}
          onRenderItemColumn={this._renderItemColumn}
          onColumnHeaderClick={this._onColumnClick}
          ariaLabelForSelectionColumn="Toggle selection"
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          checkButtonAriaLabel="select row"

        />
      </div>
    )
  }

  private async _renderListAsync() {
    const viewList: IViewListGenericState = Environment.type === EnvironmentType.Local
      ? await this._getMockListData() : await this._getDataFromSharepoint(this.props.listName);

    this.setState({
      sortedItems: viewList.sortedItems,
      columns: viewList.columns,
    })
  }

  private async _getMockListData(): Promise<IViewListGenericState> {
    const viewListGenericServiceMock = new ViewListGenericServiceMock();

    const items = await viewListGenericServiceMock.GetListItems();
    const columns: IColumn[] = await viewListGenericServiceMock.GetColumnsName().then((columnsName: IFieldInfo[]) => {
      return this._prepareColumns(columnsName);
    });

    return {
      sortedItems: items,
      columns
    } as IViewListGenericState;
  }

  private async _getDataFromSharepoint(listName: string): Promise<IViewListGenericState> {
    const listService = new ListService();

    const list: IList = await listService.getList(spObj, listName);

    const fields: IFieldInfo[] = await listService.getColumnsName(list);

    const items: any[] = await listService.getListItems(list, fields);

    const columns: IColumn[] = this._prepareColumns(fields);
    return {
      sortedItems: items,
      columns: columns
    } as IViewListGenericState;
  }

  private _prepareColumns(columns: IFieldInfo[]): IColumn[] {
    const columnsPrepared: IColumn[] = [];
    let keyIndex: number = 0;
    columns.forEach(column => {
      columnsPrepared.push(
        {
          key: String(keyIndex),

          name: column.Title,
          fieldName: column.InternalName,

          className: `${styles.column}`,
          ariaLabel: `Column operations for ${this.state.listName}, Press to sort on ${this.state.listName}`,
          minWidth: 70,
          maxWidth: 90,
        }
      );
      keyIndex++;
    })

    return columnsPrepared;
  }

  private _onColumnClick = (event: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const { columns } = this.state;
    let { sortedItems } = this.state;

    let isSortedDescending = column.isSortedDescending;

    // If we've sorted this column, flip it.
    if (column.isSorted) {
      isSortedDescending = !isSortedDescending;
    }

    // Sort the items.
    sortedItems = this._copyAndSort(sortedItems, column.fieldName!, isSortedDescending);

    // Reset the items and columns to match the state.
    this.setState({
      sortedItems: sortedItems,
      columns: columns.map(col => {
        col.isSorted = col.key === column.key;

        if (col.isSorted) {
          col.isSortedDescending = isSortedDescending;
        }

        return col;
      }),
    });
  };

  private _renderItemColumn = (item: any[], index: number, column: IColumn) => {
    const fieldContent = item[column.fieldName as keyof any[]];
    return this.checkIfPersonPicker(fieldContent) ? <span>{fieldContent.Title}</span> : <span>{fieldContent}</span>;
  }

  private _copyAndSort = <T,>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] => {
    const key = columnKey as keyof T;
    return items.slice(0).sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
  }

  private checkIfPersonPicker(fieldContent: any) {
    return fieldContent && fieldContent['Title'] ? true : false
  }

}
