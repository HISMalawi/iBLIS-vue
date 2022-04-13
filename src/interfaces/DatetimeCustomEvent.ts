import { DatetimeChangeEventDetail } from "@/interfaces/DatetimeChangeEventDetail";
export interface DatetimeCustomEvent extends CustomEvent {
  detail: DatetimeChangeEventDetail;
  target: HTMLIonDatetimeElement;
}
