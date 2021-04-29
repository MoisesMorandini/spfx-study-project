import { WebPartContext } from "@microsoft/sp-webpart-base";
import ILibraryService from "../../../services/library/ILibraryService";

export interface IViewLibraryProps {
    libraryService: ILibraryService;
}
