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


# Steps to configure battery stats

The instructions for installation are [here](https://github.com/S2-group/android-runner/tree/master/AndroidRunner/Plugins/batterystats). Basically, you need to 
make sure you have Python2, then they give an istructions how to retrieve `power_profile.xml` via APKTool. I did not follow that since there is already APKtool
package for Ubuntu. What I did was:

- `sudo apt install apktool` to install apktool
- I connected my device and ran `adb devices` to start up adb
- I pulled the apk with `adb pull /system/framework/framework-res.apk ./` 
- Then I used apk tool to extract an xml file with `apktool d framework-res.apk`
- Then you can make sure it's successful and inspect it with `cat framework-res/res/xml/power_profile.xml` or however you want and move that file whenever you
want to

As for the third step in installation, you have to run `sudo apt update && sudo apt install android-sdk` and, once you install it, check if you have in `Android/Sdk/platform-tools/systrace/systrace.py` file. I already had android-sdk and this file, but in case you don't find it (I read that in Ubuntu's repository it may not be there), you can just retrieve `platform-tools` folder from [this link](https://dl.google.com/android/repository/platform-tools-latest-linux.zip).  
Once you get it, you need to navigate to `systrace` folder and run `python2 systrace.py -l` (with adb running and your phone connected) abd check whether you can
see `freq` and `idle` in the output.

You can see the `config_battery.json` file I pushed. You need to change `powerprofile_path` to the path of your `power_profile.xml` and `systrace_path` to the
path of your `systrace.py`. Of course, change the name of the phone and path to some web app you want to test.

**Important Note**: This profiler gives two types of outputs per run, one is `Joule_results...csv` files that calculates an overall energy from `dumpsys` battery 
prfiler and the other type of files are `results_...csv` files that use `systrace` and break out energy consumption by different hardware components. For me, these types of files with `systrace` could not be collected. In `android-runner` configuration, they have an option `"enable_systrace_parsing": false` (you see it in my config). This is apparently something common, cause this systrace does not work on all devices (lol). Anyway, since we don't need that energy by component output,we only care about overall energy, you can safely leave this option on `false` as I did. If you want to, you can try setting it to `true` and see if it gives you any errors, but either way we won't use those files produces by `systrace`. 



