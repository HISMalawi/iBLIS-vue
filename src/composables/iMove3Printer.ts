import { registerPlugin } from '@capacitor/core';

export interface PrintTestPlugin {
  PrintTest(options: { value: string }): Promise<{ value: string }>;
  
}

const Printer = registerPlugin<PrintTestPlugin>('iMovePrinter');



export default Printer;
