import { WebPartContext } from "@microsoft/sp-webpart-base";
import IListService from "../../../services/IListService";

export interface IViewListGenericProps {
  listName: string;
  listServiceInstace: IListService
}
