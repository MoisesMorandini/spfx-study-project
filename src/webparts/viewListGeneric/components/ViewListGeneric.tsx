import * as React from 'react';
import styles from './ViewListGeneric.module.scss';
import { IViewListGenericProps } from './IViewListGenericProps';
import { IFieldInfo, sp, SPRest } from "@pnp/sp/presets/all";
import { DetailsList, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import IListService from '../../../services/IListService';

export interface IViewListGenericState {
  items: any[];
  columns: IColumn[];
  listName: string;
}

export interface IColumnsName {
  Title: string;
  InternalName: string;
}

export class ViewListGeneric extends React.Component<IViewListGenericProps, IViewListGenericState> {
  private listService: IListService;


  constructor(props: IViewListGenericProps) {
    super(props);

    this.listService = this.props.listServiceInstace;

    this.state = {
      items: [],
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
    const { items, columns } = this.state;

    return (
      <div className={styles.viewListGeneric}>
        <h2 className={styles.title} >{this.props.listName}</h2>
        <DetailsList
          onShouldVirtualize={() => false}
          items={items}
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
    const fields: IFieldInfo[] = await this.listService.GetListFields(this.props.listName);

    const items: any[] = await this.listService.GetListItems(this.props.listName, fields);

    const columns: IColumn[] = this._prepareColumns(fields);

    this.setState({
      items: items,
      columns: columns,
    })
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

  private _renderItemColumn = (item: any[], index: number, column: IColumn) => {
    const fieldContent = item[column.fieldName as keyof any[]];
    return this._checkIfPersonPicker(fieldContent) ? <span>{fieldContent.Title}</span> : <span>{fieldContent}</span>;
  }

  private _checkIfPersonPicker(fieldContent: any) {
    return fieldContent && fieldContent['Title'] ? true : false;
  }

  public _onColumnClick = (event: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const { columns } = this.state;
    let { items } = this.state;

    let isSortedDescending = column.isSortedDescending;

    // If we've sorted this column, flip it.
    if (column.isSorted) {
      isSortedDescending = !isSortedDescending;
    }

    // Sort the items.
    items = this._copyAndSort(items, column.fieldName!, isSortedDescending);
    console.log('--------------------------------------')
    console.log(items);

    // Reset the items and columns to match the state.
    this.setState({
      items,
      columns: columns.map(col => {
        col.isSorted = col.key === column.key;

        if (col.isSorted) {
          col.isSortedDescending = isSortedDescending;
        }

        return col;
      }),
    });
  };

  public _copyAndSort = <T,>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] => {
    const key = columnKey as keyof T;
    return items.slice(0).sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
  }
}
