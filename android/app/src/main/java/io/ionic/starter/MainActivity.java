package io.ionic.starter;

import android.content.Context;
import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Context context = this.getApplicationContext();

        Global global = new Global();

        global.setContext(context);

        registerPlugin(IMovePrinterPlugin.class);
    }
}
