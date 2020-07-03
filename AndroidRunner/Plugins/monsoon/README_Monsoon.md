# Monsoon Plugin

Automated tests using a Monsoon Power Monitor with Android Runner and [Luis Cruz](https://scholar.google.com/citations?user=O13oaH0AAAAJ&hl=en)'s [Physalia](https://tqrg.github.io/physalia/).

## Preparation
Follow Luis's [tutorial](https://tqrg.github.io/physalia/monsoon_tutorial.html) for preparing an LG Nexus 5X.

## Install
Follow the instructions in Luis's Physalia [repository](https://github.com/tqrg/physalia).

## Monsoon Setup
In total, 6 wires and cables will be needed:
* 2 wires hooked up to the phone and Monsoon's banana connectors (red and black).
* The phone's USB connected to the front of the Monsoon's USB-A port.
* A USB-B connected to workstation and to the front of the Monsoon.  This allow for adb connections to go from wired to wireless seamlessly.
  * Leave cable unplugged from the host machine if the test device hasn't yet been connected via adb to the host machine.  Plug it into host machine after executing Android Runner's Monsoon plugin.
  * Possible to leave it plugged into host machine otherwise.
* A USB connected to the back of the Monsoon needs to be connected to workstation.  This is the how the workstation will communicate to Monsoon to power the device.
* A power cable from the back of the Monsoon to a power source.

Note, it's advised to not use a USB hub for optimal performance.

Turn on Monsoon.

## Configuring Device Settings with First Test Run
It's necessary to configure the test device's settings before running experiments with Android Runner.  Use this simple script to tell Monsoon to provide power to the device.  Make sure to enter your own Monsoon's serial number.
```
from physalia.power_meters import MonsoonHVPMPowerMeter
power_meter = MonsoonHVPMPowerMeter(voltage=3.8, serial=23171)
```
Power on the device once the script is executed and follow these instructions:
1. Ignore the terminal output; the point of this exercise is to power on the device and configure it - not to run experiments with Physalia.
1. Ensure the time settings are correct.
2. Enable developer options.  Open settings -> about phone -> build number and then tap several times.
3. Connect to the local WiFi network.  Make note of the device's IP address and enter that into Android Runner's `devices.json` file.
4. Disable lock screen in `Security`.  The screen will turn off after a maximum of 30 minutes, so plugin will ensure that the screen wakes up before every run by waking up the screen before every run.  It will also cause the screen to go asleep after every run.  The `Stay Awake` settings under `Developer Options` applies only to devices that are in a charging state, which doesn't apply to Monsoon-configured devices.
5. Under `Display` options, make sure the screen stays on for the duration of the experiment, plus an extra minute or two.

## Android Runner Monsoon Plugin
The plugin uses the same structure as other Android Runner plugins.  The only difference is that there's no guarantee that Monsoon is already providing power to the device, which will be the case when the Monsoon is turned on.  To factor in this, we added the simple script used above.  The serial number of your Monsoon *must* be included in this script.  See below:

Follow these steps before using the plugin:
1. In order to use Android Runner with Monsoon, find the module `power_device.py` in `AndroidRunner/Plugins/monsoon/script/` and enter the serial number of your Monsoon, which can be found on the back.  This procedure has to be done only once.

2. The config file needs to include the path to the script.
```
{
...
  "devices": {
    "nexus5x": {
      "power_device": "my_path/androidrunner/android-runner/AndroidRunner/Plugins/monsoon/script/power_device.py",
    }
...
  "profilers":{
    "monsoon": {
        }
...
}
```
As seen above, there are no parameters under the Monsoon profiler.  The field `reset_adb_among_runs` should either be set to **false** or not be included in the config.

3. `devices.json` needs the IP address of the device.  This is because Physalia will have already established a WiFi connection with the device over adb before Android Runner runs through its normal adb connection process.
```
{
  "nexus5x": "192.168.2.7:5555"
}
```

4. The `duration` of each run must not exceed 30 minutes, or 1,800,000 milliseconds if the phone screen needs to be on during the experiment.  Note, `time_between_run` is not affected by this requirement.

## Running the experiment
Once the above steps are completed, it's time to run the experiment.  The experiment can be executed in the same way as other plugins (`python android-runner android-runner/path_to_config`).  But for this particular plugin, you'll need to follow a few more steps if there is no adb connection.  
1. Once the command to start Android Runner is executed, the program will follow the path in the config file to find the script with Physalia and execute it.  
2. Output in the terminal should appear.  Turn on the phone if it's not on already.  When it's fully booted, plug the USB passthrough cable into the workstation.
3. The experiment will be automated from this point on.  
4. The device will remain connected to adb over WiFi after the experiment is over, so any future experiments can be run without disconnecting or reconnecting any cables.

## Results
Monsoon will provide energy usage in joules, the duration in milliseconds and an error flag field per run with a default sampling rate of 5 kHz.  The results will be saved and aggregated in the same way as other plugins.  

## Troubleshooting
**usb.core.USBError: [Errno 32] Pipe error**\
Restart the Monsoon.  Likely the result of the device disconnecting from the adb server while Monsoon is profiling.
**Phone turned on but is losing power**\
Make sure the device's time settings are correct.\
**Permission error**\
You may need to run the experiment as a privileged user.\
**Phone Stuck in Bootloop**\
The Nexus 5X phone has a few bugs within the hardware/firmware that can sometimes brick the phone unexpectedly.  It's recommended to perform a factory reset via fastboot and twrp to see if that fixes the bootloop before trying other more extreme measures.\
**Experiment Not Progressing**
Occasionally, the test device may go offline in WiFi mode and transition to dropping the connection while the adb server is still up.  Terminate the experiment, re-establish the adb connection with test device and use the experiment's progress xml file to restart where it hanged.      
