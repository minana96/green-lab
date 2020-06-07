# Monsoon Plugin

Automated tests using a Monsoon Power Monitor with Android Runner and [Luis Cruz](https://scholar.google.com/citations?user=O13oaH0AAAAJ&hl=en)'s [Physalia](https://tqrg.github.io/physalia/).

## Preparation
Follow Luis's [tutorial](https://tqrg.github.io/physalia/monsoon_tutorial.html) for preparing a Nexus5x.  Currently it's the only phone supported, but more phones may be compatible in the future.

## Install
We made a small change to Physalia by allowing the adb connection to persist via WiFi after an experiment completes.  It makes running multiple experiments faster and more hands-off.  You can always terminate the adb connection yourself if you wish with `adb kill-server`.  The change is included in this [repository](https://github.com/EricZielinski/physalia).  You may also use the [original](https://github.com/tqrg/physalia) if you prefer.

## Configuring Device Settings with Monsoon and Physalia
It's necessary to configure your phone's settings before running experiments with Android Runner.  It's especially important to ensure that the phone's time settings are correct and that it's able to connect to the local WiFi network.  Follow these steps to configure the phone:
1. Plug USB cable on the back of the Monsoon to your computer.
2. Power on Monsoon.
3. Enter your Monsoon's serial number into the example script below and execute. Once executed, the Monsoon will provide power to the device.
```
from physalia.power_meters import MonsoonHVPMPowerMeter
power_meter = MonsoonHVPMPowerMeter(voltage=3.8, serial=23171)
```

4. Turn on the device.  Note, Physalia will attempt to establish an adb connection in order to run an experiment, so just ignore the output in the terminal.
5. Make a mental note of the device's IP address in the local network, since you'll need that information in order to use the plugin with Android Runner.  If possible, assign a static IP address to the device.

## Android Runner Monsoon Plugin
The plugin uses the same structure as other Android Runner plugins.  The only differences are that it's the only plugin that interfaces with external hardware (excluding the device itself) and that the adb connection is via WiFi in order to prevent the phone from receiving power via a computer's USB port.  Because of these differences, we had to deviate slightly with the standard way plugins are integrated within Android Runner.

Follow these steps before using the plugin:
1. In order to use Android Runner with Monsoon, find the module `power_device.py` in `AndroidRunner/Plugins/monsoon/Script/` and enter the serial number of your Monsoon, which can be found on the back.   

2. The config file needs to look something like this:
```
{
...
  "devices": {
    "nexus5x": {
      "power_device": "/home/exz1199/Documents/Thesis/androidrunner/android-runner/AndroidRunner/Plugins/monsoon/Script/power_device.py"
    }
...
  "profilers":{
    "monsoon": {
        }
...
}
```
As you can see, there are no parameters under the profiler.  Change the device path match your system's.  The field `reset_adb_among_runs` should either be set to **false** or not be included in the config.  The reason being is that using this feature would require several hands-on steps per run that are inconsistent with the purpose of Android Runner's automation goals.

3. The device.json file needs to include the IP address of your phone.
```
{
  "nexus5x": "192.168.2.7:5555"
}
```

## Running the experiment
Once the above steps are completed, it's time to run the experiment.  The experiment can be executed in the same way as other plugins (`python androidrunner androidrunner/path_to_config`).  But for this particular plugin, you'll need to follow a few more steps if there is no adb connection.  
1. Once the command to start Android Runner is executed, the program will follow the path in the config file to find the script with Physalia and execute it.  
2. Output in the terminal should appear.  Turn on the mobile device and give it time to fully boot.  
3. Once it's fully booted, unplug the device's USB cable from the front of the Monsoon and plug it into your computer.  You should see a notification in the terminal that a device has been found.  
4. You'll have 10 seconds to unplug the device's USB cable and plug it back into the front of the Monsoon before the experiment starts.

The above steps are necessary only in the case where the phone is not already powered on or if the adb connection no longer exists.  Once the adb connection is made, you should be able to run experiments without having to unplug and replug the USB cable.  Note, you'll see the same output appear twice.  That's because Android Runner first executes power_device.py by following the path in the config file.  Shortly thereafter, the Monsoon plugin module imports power_device.py in order to extract the results of the run, which causes it to be executed again.

## Results
Monsoon will provide energy usage in joules, the duration in milliseconds and an error flag field per run.  The results will be saved and aggregated in the same way as other plugins.

## Troubleshooting
**Phone turns off unexpectedly**\
It's important to give the device time to boot up if you're just turning it on.  Unplugging the device's USB cable from Monsoon will cause it to turn off otherwise.\
**Phone turned on but is losing power**\
Make sure the device's time settings are correct.\
**Error device offline**\
adb connections can sometimes go offline.  The easiest way to fix this is to turn off the WiFi connection on the mobile device.  Then, on your computer, type adb connect [ip address:5555].  Then turn on WiFi on the mobile device.\
**Permission error**\
You may need to run the experiment as a privileged user.\
**Bootloop**\
The Nexus5x phone has a few bugs within the hardware/firmware that can sometimes brick the phone unexpectedly.  It's recommended to perform a factory reset via fastboot and twrp to see if that fixes the bootloop.    
