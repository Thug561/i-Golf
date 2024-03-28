package com.djangostars.azyan;
import android.app.Notification;  
import android.app.NotificationChannel;  
import android.app.NotificationManager;  
import android.content.Context;  
import android.content.Intent;  
import android.content.pm.PackageManager;  
import android.location.Criteria;  
import android.location.Location;  
import android.location.LocationManager;  
import android.os.Build;  
import android.support.v4.content.ContextCompat;
import com.facebook.react.bridge.Arguments;  
import com.facebook.react.bridge.Promise;  
import com.facebook.react.bridge.ReactApplicationContext;  
import com.facebook.react.bridge.ReactContextBaseJavaModule;  
import com.facebook.react.bridge.ReactMethod;  
import com.facebook.react.bridge.WritableMap;  
import com.facebook.react.bridge.WritableNativeMap;
/**
 * Created by AGulchenko on 5/7/18.
 */
public class GeoLocationModule extends ReactContextBaseJavaModule {  
    public static final String CHANNEL_ID = "ExampleService_Channel";
    public GeoLocationModule(ReactApplicationContext reactContext) {
        super(reactContext);
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID,"testName", NotificationManager.IMPORTANCE_DEFAULT);
            NotificationManager manager = reactContext.getSystemService(NotificationManager.class);
            manager.createNotificationChannel(channel);
        }
    }
@Override
    public String getName() {
        return "GeoLocation";
    }
@ReactMethod
    public void startService(String token, String user_id, String id, String url_string, Promise promise) {
        WritableMap result = Arguments.createMap();
        result.putString("ststus", "success");
        try {
            Intent serviceIntent = new Intent(getReactApplicationContext(), GeoLocationService.class);
            serviceIntent.putExtra("token", token);
            serviceIntent.putExtra("user_id", user_id);
            serviceIntent.putExtra("id", id);
            serviceIntent.putExtra("url_string", url_string);
            getReactApplicationContext().startService(serviceIntent);
            promise.resolve(result);
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject("rrrrr",e);
            return;
        }
}
@ReactMethod
    public void stopService(Promise promise) {
        String result = "Success";
        try {
            Intent serviceIntent = new Intent(getReactApplicationContext(), GeoLocationService.class);
            getReactApplicationContext().stopService(serviceIntent);
        } catch (Exception e) {
            promise.reject(e);
            return;
        }
        promise.resolve(result);
    }
@ReactMethod
    public void getLocation( Promise promise) {
        WritableMap res = Arguments.createMap();
        try {
            LocationManager locationManager = null;
locationManager = (LocationManager) this.getReactApplicationContext().getSystemService(Context.LOCATION_SERVICE);
            int permissionCheck = ContextCompat.checkSelfPermission(this.getReactApplicationContext(),
                    android.Manifest.permission.ACCESS_FINE_LOCATION);
            if (permissionCheck == PackageManager.PERMISSION_GRANTED) {
                Criteria criteria = new Criteria();
                String bestProvider = locationManager.getBestProvider(criteria, false);
                Location location = locationManager.getLastKnownLocation(bestProvider);
                if(location != null) {
                    res.putDouble("latitude", location.getLatitude());
                    res.putDouble("longitude", location.getLongitude());
                    promise.resolve(res);
                }
}
        } catch (Exception e) {
            promise.reject(e);
            return;
        }
    }
}