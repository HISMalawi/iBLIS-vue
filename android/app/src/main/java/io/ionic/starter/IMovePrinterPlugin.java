package io.ionic.starter;

import android.annotation.SuppressLint;
import android.bluetooth.BluetoothAdapter;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Log;
import android.widget.Toast;

import com.getcapacitor.Bridge;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import cpcl.PrinterHelper;

@CapacitorPlugin(name = "iMovePrinter")
public class IMovePrinterPlugin extends Plugin {

    private BluetoothAdapter mBluetoothAdapter;

    @PluginMethod()
    public void PrintTest(PluginCall call) {

        Context context;

        Global global = new Global();

        context = global.getContext();

        JSObject ret = new JSObject();

        try {

            PrinterHelper.portClose();

            int i = PrinterHelper.portOpenBT( context,"FC:58:FA:17:CE:7F");

            ret.put("value", i);

			if(i==0){
                PrinterHelper.printAreaSize("0","200","200","100","1");
                PrinterHelper.AutCenter(PrinterHelper.TEXT,"0","0",100,4,"Text");
                PrinterHelper.Form();
                PrinterHelper.Print();
				PrinterHelper.portClose();
			}


        } catch (Exception e) {
            e.printStackTrace();

            ret.put("value", e);
        }

        call.resolve(ret);
    }

    @PluginMethod()
    public void Echo(PluginCall call) {

        String value = call.getString("value");

        JSObject ret = new JSObject();
        ret.put("value", value);
        call.resolve(ret);
    }


    //EnableBluetooth
    @SuppressLint("MissingPermission")
    private boolean EnableBluetooth(){
        boolean bRet = false;
        mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
        if(mBluetoothAdapter != null){
            if(mBluetoothAdapter.isEnabled())
                return true;
            mBluetoothAdapter.enable();
            try {
                Thread.sleep(500);
            }catch (InterruptedException e){
                e.printStackTrace();
            }
            if(!mBluetoothAdapter.isEnabled()){
                bRet = true;
                Log.d("PRTLIB", "BTO_EnableBluetooth --> Open OK");
            }
        }else{
            Log.d("HPRTSDKSample", (new StringBuilder("Activity_Main --> EnableBluetooth ").append("Bluetooth Adapter is null.")).toString());
        }
        return bRet;
    }
}
