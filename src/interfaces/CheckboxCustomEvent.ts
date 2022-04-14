import { CheckboxChangeEventDetail } from "./CheckboxChangeEventDetail";

export interface CheckboxCustomEvent<T = any> extends CustomEvent {
    detail: CheckboxChangeEventDetail<T>;
    target: HTMLIonCheckboxElement;
  }