# Steps to configure experiment

**Step 0**: Create a virtual environment called `venv` in the root folder of the repository. Make sure this is active from now on for any further interaction (`source venv/bin/activate`) and install all required python packages using `pip install -r requirements.txt`.

**Step 1**: Follow the instructions from [here](https://github.com/S2-group/android-runner/blob/master/CONTRIBUTING.md) to install everything needed for 
android-runner.

**Step 2**: Turn on Developer Options, USB debugging and enable Stay Awake option under Developer Options on the phone.

**Step 3**: Plug in the phone via USB and run `adb devices` command to start up a deamon. You should see the device's identifier. Add this to `devices.json` file 
and give it any name you want.

**Step 4**: Navigate to `android-runner/AndroidRunner/Plugins/trepn` and install Trepn profiler on the phone with `adb install com.quicinc.trepn.apk`. You can 
verify that it's installed by running `adb shell pm list packages`, it will list apks of all apps installed on the phone.

**Step 5**: Go to Trepn app on the phone, navigate to `Settings>>Data Points` and verify that you can collect Baterry Power and Memory Usage.

**Step 6**: In `android-runner/CriticalCSSExperiment` there are two configuration scripts, one for Chrome (`config_chrome.json`) and one for Firefox 
(`config_firefox.json`). For both, inside `devices` field, you should place the name of the device as listed in `devices.json`. In `paths` field, you should list
paths to 50 apps in each, 25 subjects with and without critical css technique applied. Each app has it's browser assigned in the table in the report.

**Step 7**: Clear the app data for Firefox and Chrome (this will be done after each run in the experiment, but not before the first run). You can also do it with 
commands `adb shell pm clear com.android.chrome` and `adb shell pm clear org.mozilla.firefox`.

**Step 8**: You need to call `android-runner/CriticalCSSExperiment/Scripts/AddJS.py` script with two 
arguments: the path to folder with all subjects and `http://<IP>:8001/` where `<IP>` is IP adress of your laptop. This will add small JavaScript onload event 
handler inside `<head>` of each `index.html` file that will send empty GET request when the page is loaded. In the `android-runner/CriticalCSSExperiment/Scripts/
interaction.py` script, this GET request is handled and profiling stops (you can delete the print statement inside the handler and just put `pass`).

**Step 9**: In `android-runner/CriticalCSSExperiment/Scripts/after_launch.py` there is a script that will be run after browser is launched but before web app is 
loaded. Customize the methods with the coordinates of the phone to remove all initial pop-up windows. You can get the coordinates eaither with running MonkeyPlayer 
with `<path_to_monkeyrunner> android-runner/MonkeyPlayer/monkeyRecorder.py` or just turn on Pointer location option under the Developer Options on the phone.

**Step 10**: You can run the experiment with `python3 android-runner <path_to_config_file>`. Make sure that brightness is set to minimum and that no app sends push
notification during the experiment. The phone should be connected to the same wifi network as the laptop. The phone stops charging once the experiments starts, so
we may set Screen timeout for the phone to max (30 mins is max for my phone) and probably add some empty interaction for firefox in `after_launch.py` script just
to keep the screen on. Make sure that you start the experiment with 100% battery.

**Step 11**: You can stop the experiment with pressing `Ctrl+C` and you'll get the `--progress` parameter at the end which you can add next time you run the same 
configuration file. You'll continue where you left off. The adb deamon can be killed with `adb kill-server`.

