import { registerPlugin } from '@capacitor/core';

export interface PrintTestPlugin {
  printTest(options: { value: string }): Promise<{ value: string }>;
  
}

const PrintTest = registerPlugin<PrintTestPlugin>('PrintTest');



export default PrintTest;
