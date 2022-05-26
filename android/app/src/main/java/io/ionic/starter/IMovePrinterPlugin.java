package io.ionic.starter;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import cpcl.PrinterHelper;

@CapacitorPlugin(name = "iMovePrinter")
public class IMovePrinterPlugin extends Plugin {

    @PluginMethod()
    public void PrintTest(PluginCall call) {

        try {
            
            PrinterHelper.Barcode(PrinterHelper.BARCODE, PrinterHelper.code128, "2", "1", "50", "0", "340", true, "7", "0", "5", "0234565687");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @PluginMethod()
    public void Echo(PluginCall call) {

        String value = call.getString("value");

        JSObject ret = new JSObject();
        ret.put("value", value);
        call.resolve(ret);
    }
}
