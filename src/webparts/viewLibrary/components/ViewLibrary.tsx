import * as React from 'react';
import styles from './ViewLibrary.module.scss';
import { IViewLibraryProps } from './IViewLibraryProps';

import {
  Stack, DocumentCard, DocumentCardStatus, DocumentCardTitle, IconButton, Spinner, SpinnerSize
} from 'office-ui-fabric-react';
import ILibraryService, { IDocumentLibrary } from '../../../services/library/ILibraryService';

export interface IViewLibraryState {
  libraryList: IDocumentLibrary[],
  isLoading: boolean
}

export default class ViewLibrary extends React.Component<IViewLibraryProps, IViewLibraryState> {
  private libraryService: ILibraryService;

  constructor(props: IViewLibraryProps) {
    super(props);
    this.libraryService = props.libraryService;

    this.state = {
      libraryList: [],
      isLoading: false
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.getLibrariesList();
  }

  private getLibrariesList = async () => {
    const list = await this.libraryService.GetLibraries();
    this.setState({
      libraryList: list,
      isLoading: false
    })
  }

  public render(): React.ReactElement<IViewLibraryProps> {
    const { libraryList } = this.state;

    const styleIcon = {
      icon: { color: '#0078d4', fontSize: 24, padding: 0, margin: 0 },
      root: { width: 48, height: 48, padding: 0, margin: 0 }
    }

    return (
      <Stack className={styles.viewLibrary}>
        {
          this.state.isLoading ? <Spinner size={SpinnerSize.large} className={styles.loading} /> :
            libraryList.length > 0 && libraryList.map(library => {
              return (
                <DocumentCard className={styles.container} >
                  <div className={styles.cardTitle}>
                    <IconButton styles={styleIcon} iconProps={{ iconName: 'Folder' }} title="Folder" ariaLabel="Folder" />
                    <DocumentCardTitle className={styles.title} title={library.Title} shouldTruncate />
                  </div>
                  <DocumentCardStatus className={styles.documentCardStatus} statusIcon="Page"
                    status={library.ItemCount > 1 ? `${library.ItemCount} Documents` : `${library.ItemCount} Document`} />
                </DocumentCard>
              )
            })
        }
      </Stack>
    );
  }
}
