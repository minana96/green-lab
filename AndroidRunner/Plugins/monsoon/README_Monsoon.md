# Monsoon Plugin

Automated tests using a Monsoon Power Monitor with Android Runner and [Luis Cruz](https://scholar.google.com/citations?user=O13oaH0AAAAJ&hl=en)'s [Physalia](https://tqrg.github.io/physalia/).

## Device Preparation
Follow Luis's [tutorial](https://tqrg.github.io/physalia/monsoon_tutorial.html) for preparing an LG Nexus 5X.  Other devices should be able to work if configured similarly.

## Install
Follow the instructions in Luis's Physalia [repository](https://github.com/tqrg/physalia) or Android Runner's [version](https://github.com/EricZielinski/physalia), which includes a small change to the energy consumption calculation to include voltage.

## Monsoon Setup
In total, 6 wires and cables will be needed:
* 2 wires hooked up to the phone and Monsoon's banana connectors (red and black).
* The phone's USB connected to the front of the Monsoon's USB-A port.
* A USB-A/B connected to workstation and to the front of the Monsoon.  This allow for adb connections to go from wired to wireless seamlessly.
  * Leave cable unplugged from the host machine if the test device hasn't yet been connected via adb to the host machine.  Plug it into host machine after executing Android Runner's Monsoon plugin.
  * Leave it plugged into host machine otherwise.
* A USB A/B connected to the back of the Monsoon needs to be connected to host machine. This is the how the host machine will communicate to Monsoon to power the device.
* A power cable from the back of the Monsoon to a power source.

Note, it's advised to not use a USB hub for optimal performance.

Turn on Monsoon.

## Configuring Device Settings with First Test Run
The plugin uses the same structure as other Android Runner plugins.  The only difference is that there's no guarantee that Monsoon is already providing power to the device, which will be the case when the Monsoon is turned on.  To factor in this, we added the Physalia script below.  The serial number of your Monsoon *must* be included in this script. Follow the path **AndroidRunner/Plugins/monsoon/script** and find `power_device.py`. Enter your Monsoon serial number in the serial parameter and save.  This action is required only once.
```
from physalia.power_meters import MonsoonHVPMPowerMeter
power_meter = MonsoonHVPMPowerMeter(voltage=3.8, serial=23171)
```

The configuration file should look like this:
```
{
...
  "devices": {
    "nexus5x": {
      "power_device": "my_path/androidrunner/android-runner/AndroidRunner/Plugins/monsoon/script/power_device.py"
    }
...
  "profilers":{
    "monsoon": {
        }
...
}
```
As seen above, there are no available options under the Monsoon profiler.  

Follow these instructions to power on the phone:
1. Leave the USB-A/B passthrough cable disconnected from host machine.  Note, this is the cable that connects to Monsoon next to the Nexus 5X's USB cable.  
2. Execute `python android-runner android-runner/examples/monsoon/config.json`.  May need to execute this as a privileged user with something like `sudo`.
3. Turn on the Android device once terminal output shows *Monsoon is ready*.
4. Ignore the terminal output; the point of this exercise is to power on the device and configure it - not to run experiments just yet.  Wait for phone to boot up.
5. Ensure the time settings are correct.
6. Enable *Developer Options*.  *Open Settings -> About Phone -> Build Number* and then tap several times.
7. Connect to the local WiFi network.  Make note of the device's IP address and enter that into Android Runner's `devices.json` file along with port 5555.  See below:
```
{
  "nexus5x": "192.168.2.7:5555"
}
```
8. Disable lock screen in **Security**.  The screen will turn off after a maximum of 30 minutes, so the plugin will ensure that the screen wakes up before every run.  It will also cause the screen to go asleep after every run.  The **Stay Awake** settings under **Developer Options** applies only to devices that are in a charging state, which doesn't apply to Monsoon-configured devices during profiling.
9. Under **Display** options, make sure the run duration of any future experiment doesn’t exceed the screen timeout (max 30 minutes), plus an extra minute or so to account for sleep calls.

## Things to know before running first real experiment
1. The field `reset_adb_among_runs` should either be set to **false** or not be included in the config.
2. The `duration` of each run must not exceed 30 minutes, or 1,800,000 milliseconds if the phone screen needs to be on during the experiment.  Note, `time_between_run` is not affected by this requirement.
3. Don't forget to add the phone's IP address and port to `devices.json`.
4. For best stability, make sure the device is as close to the router as possible.  The device may disconnect from the adb server if the WiFi connection isn't stable.

## Running the experiment
It's time to run a real experiment.
1. Terminate the adb server if one exists.  Leave USB passthrough unplugged from host machine.
2. Execute `python android-runner android-runner/examples/monsoon/config.json` or whatever path the experiment's config file needs.
3. Once the phone is booted and connected to WiFi, connect USB passthrough to host machine.  Physalia will first connect to the device via USB adb. It will then connect to it via WiFi adb.
4. The experiment will be automated from this point on.  
5. The device will remain connected to adb over WiFi after the experiment is over, so any future experiments can be run without disconnecting or reconnecting any cables if desired.

## Results
Physalia will provide joules, the duration in milliseconds and an error flag field per run with a default sampling rate of 5 kHz.  The `error_flag` will be set to *False* if Monsoon’s `sampleEngine` returns a list of lists that contains timestamps, current and voltage. The results will be saved and aggregated in the same way as other plugins.

## Troubleshooting
**usb.core.USBError: [Errno 32] Pipe error**\
Restart the Monsoon.  Likely the result of the device disconnecting from the adb server while Monsoon is profiling.\
**Phone turned on but is losing power**\
Make sure the device's time settings are correct.\
**Permission error**\
You may need to run the experiment as a privileged user.\
**Phone Stuck in Bootloop**\
The Nexus 5X phone has a few bugs within the hardware/firmware that can sometimes brick the phone unexpectedly.  It's recommended to perform a factory reset via fastboot and twrp to see if that fixes the bootloop before trying other more extreme measures.\
**Experiment Not Progressing**\
Occasionally, the test device may go offline in WiFi mode and transition to dropping the connection while the adb server is still up.  Terminate the experiment, re-establish the adb connection with test device and use the experiment's progress xml file to restart where it hanged.      
