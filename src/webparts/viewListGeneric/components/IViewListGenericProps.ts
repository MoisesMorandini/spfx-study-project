import { WebPartContext } from "@microsoft/sp-webpart-base";
import IListService from "../../../services/IListService";

export interface IViewListGenericProps {
  spcontext: WebPartContext;
  listName: string;
  ListServiceInstace: IListService
}
