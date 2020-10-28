# Steps to configure experiment

**Step 1**: Create a virtual environment called `venv` in the root folder of the repository. Make sure this is active from now on for any further interaction (`source venv/bin/activate`). Install all required python packages using `pip install -r requirements.txt`.

**Step 2**: Follow the Step 5 from instructions [here](https://github.com/S2-group/android-runner/blob/master/CONTRIBUTING.md) to install the dependencies of android-runner for your platform (Linux or Mac OS).

**Step 3**: Turn on `Developer Options` on your Android mobile device (detailed information depending on the Android version can be found [here](https://developer.android.com/studio/debug/dev-options)). Under `Developer Options`, turn on `USB debugging` and enable `Stay Awake` option.

**Step 4**: Plug in the mobile device to your laptop via USB and run `adb devices` command to start up a deamon. You should see the device's identifier. If not, unplug the USB cable and try again. If this does not solve the problem, try restarting the mobile device. 

**Step 5**: Add the device to the list in the `android_runner/devices.json` file by the format `<name>: <identifier>`. The `<indetifier>` is an output from the previous step whereas `<name>` should reflect the name of the device by your choice.

**Step 6**: Navigate to `android-runner/AndroidRunner/Plugins/trepn` and install Trepn profiler on the mobile device by running `adb install com.quicinc.trepn.apk` command. You can verify that Trepn installed by running `adb shell pm list packages`. It will list all apks installed on the mobile device.

**Step 7**: Once installed, open the Trepn application on the mobile device and navigate to `Settings>>Data Points`. Verify that `Memory Usage` data point is dipsplayed witch means that this metric can be collected from the mobile device.

**Step 8**: Run `sudo apt install apktool` command to install apktool. Make sure that the mobile device is connected via USB and run `adb devices` command to start up an adb client. Pull the `framework-res.apk` from your mobile device with `adb pull /system/framework/framework-res.apk ./` command. Run `apktool d framework-res.apk` command to extract `power_profile.xml` file. Make sure that the file is extracted with `cat framework-res/res/xml/power_profile.xml` command. The file is needed for `batterystats` profiler used for the energy consumption measurments. 

**Step 9**: Make sure that the mobile device is connected via USB and the adb client is started with `adb devices`. Navigate to `platform_tools/systrace` folder and run `python2 systrace.py -l` command. Verify that you can collect `freq` and `idle` from the mobile device in the output of the command.

**Step 10**: In the `android-runner/critical_css_experiment` folder, there are two configuration scripts: one for Chrome (`config_chrome.json`) and one for Firefox (`config_firefox.json`). For both, inside `devices` field, place the name of the device as listed in `devices.json` file. In `paths` field, you should list paths to 50 apps in each, 25 subjects with and without critical css technique applied. Each app has it's browser assigned in the table in the report.

**Step 7**: Clear the app data for Firefox and Chrome (this will be done after each run in the experiment, but not before the first run). You can also do it with 
commands `adb shell pm clear com.android.chrome` and `adb shell pm clear org.mozilla.firefox`.

**Step 8**: You need to call `android-runner/CriticalCSSExperiment/Scripts/AddJS.py` script with two  arguments: the path to folder with all subjects and `http://<IP>:8001/` where `<IP>` is IP adress of your laptop. This will add small JavaScript onload event handler inside `<head>` of each `index.html` file that will send empty GET request when the page is loaded. In the `android-runner/CriticalCSSExperiment/Scripts/interaction.py` script, this GET request is handled and profiling stops (you can delete the print statement inside the handler and just put `pass`).

**Step 9**: In `android-runner/CriticalCSSExperiment/Scripts/after_launch.py` there is a script that will be run after browser is launched but before web app is 
loaded. Customize the methods with the coordinates of the phone to remove all initial pop-up windows. You can get the coordinates eaither with running MonkeyPlayer with `<path_to_monkeyrunner> android-runner/MonkeyPlayer/monkeyRecorder.py` or just turn on Pointer location option under the Developer Options on the phone.

**Step 10**: You can run the experiment with `python3 android-runner <path_to_config_file>`. Make sure that brightness is set to minimum and that no app sends push notification during the experiment. The phone should be connected to the same wifi network as the laptop. The phone stops charging once the experiments starts, so we may set Screen timeout for the phone to max (30 mins is max for my phone) and probably add some empty interaction for firefox in `after_launch.py` script just to keep the screen on. Make sure that you start the experiment with 100% battery.

**Step 11**: You can stop the experiment with pressing `Ctrl+C` and you'll get the `--progress` parameter at the end which you can add next time you run the same 
configuration file. You'll continue where you left off. The adb deamon can be killed with `adb kill-server`.


