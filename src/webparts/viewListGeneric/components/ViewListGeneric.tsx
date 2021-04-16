import * as React from 'react';
import styles from './ViewListGeneric.module.scss';
import { IViewListGenericProps } from './IViewListGenericProps';
import { IFieldInfo, sp, SPRest } from "@pnp/sp/presets/all";
import { DetailsList, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import IListService from '../../../services/IListService';

export interface IViewListGenericState {
  sortedItems: any[];
  columns: IColumn[];
  listName: string;
}

export interface IColumnsName {
  Title: string;
  InternalName: string;
}

export default class ViewListGeneric extends React.Component<IViewListGenericProps, IViewListGenericState> {
  private listService: IListService;


  constructor(props: IViewListGenericProps) {
    super(props);

    this.listService = this.props.ListServiceInstace;

    this.state = {
      sortedItems: [],
      columns: [],
      listName: this.props.listName
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
    try {
      const fields: IFieldInfo[] = await this.listService.GetListFields(this.props.listName);

      const items: any[] = await this.listService.GetListItems(this.props.listName, fields);

      const columns: IColumn[] = this._prepareColumns(fields);

      this.setState({
        sortedItems: items,
        columns: columns,
      })
    } catch (error) {
      console.log(error);
    }
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
          ariaLabel: `Column operations for ${this.props.listName}, Press to sort on ${this.props.listName}`,
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
    return fieldContent && fieldContent['Title'] ? true : false;
  }
}
