import { SearchbarChangeEventDetail } from "./SearchbarChangeEventDetail";

export interface SearchbarCustomEvent extends CustomEvent {
    detail: SearchbarChangeEventDetail;
    target: HTMLIonSearchbarElement;
  }