# Steps to replicate the Critical CSS experiment


This document gives a detailed overview of the sequence of steps that you need to execute to replicate the Critical CSS experiment using your laptop and Android mobile device. The steps describe not only installation but also customization for your own devices. Perform the steps in the presented order. For deeper information regarding the custom scripts inside `critical_css_experiment` folder, refer to the comments inside each script. 


1. Create a virtual environment called `venv` in the root folder of the repository. Make sure this is active from now on for any further interaction (`source venv/bin/activate`). Install all required python packages using `pip install -r requirements.txt`.

2. Follow *Step 5* from instructions [here](https://github.com/S2-group/android-runner/blob/master/CONTRIBUTING.md) to install the dependencies of `android-runner` for your platform (Linux or Mac OS).

3. Turn on `Developer Options` on your Android mobile device (detailed information depending on the Android version can be found [here](https://developer.android.com/studio/debug/dev-options)). Under `Developer Options`, turn on `USB debugging` and enable the `Stay Awake` option.

4. Plug in the mobile device to your laptop via USB cable and run the `adb devices` command to start up a daemon. The device's identifier should be displayed. If not, unplug the USB cable and try again. If this does not solve the problem, try restarting the mobile device. 

5. Add the device to the list in the `android_runner/devices.json` file by the format `<name>: <identifier>`. The `<indetifier>` is an output from the previous step whereas `<name>` should reflect the name of the device by your choice.

6. Navigate to `android-runner/AndroidRunner/Plugins/trepn` folder and install Trepn Profiler on the mobile device by running the `adb install com.quicinc.trepn.apk` command. Verify that the Trepn is installed by running the `adb shell pm list packages` command. It will list all APKs installed on the mobile device.

7. Once installed, open the Trepn Profiler application on the mobile device and navigate to `Settings>>Data Points`. Verify that the `Memory Usage` data point is displayed meaning that this metric can be collected from the mobile device.

8. Run `sudo apt install apktool` command to install [Apktool](https://github.com/iBotPeaches/Apktool). Retrieve the `framework-res.apk` from your mobile device with `adb pull /system/framework/framework-res.apk ./` command. Run `apktool d framework-res.apk` command to extract the `power_profile.xml` file. Make sure that the file is extracted with the `cat framework-res/res/xml/power_profile.xml` command. This file is required for the `batterystats` profiler which is used for energy consumption measurements. Move the file to the desired path. 

9. Navigate to `platform_tools/systrace` folder and run `python2 systrace.py -l` command. Verify that `freq` and `idle` points can be collected from the mobile device in the output of the command.

10. In the `android-runner/critical_css_experiment` folder, there are two configuration scripts, one for the experiment on the Chrome browser (`config_chrome.json`) and the other on Firefox (`config_firefox.json`). In both scripts, inside `devices` field [here](https://github.com/minana96/green-lab/blob/repo-organize/android_runner/critical_css_experiment/config_chrome.json#L4) and [here](https://github.com/minana96/green-lab/blob/repo-organize/android_runner/critical_css_experiment/config_firefox.json#L4), place the name of the device as listed in `devices.json` file in *Step 5*.

11. Run `ip a` command to see your local IP address. Change the `local_server_address` field [here](https://github.com/minana96/green-lab/blob/repo-organize/android_runner/critical_css_experiment/config_chrome.json#L12) and [here](https://github.com/minana96/green-lab/blob/repo-organize/android_runner/critical_css_experiment/config_firefox.json#L12) according to the format `http://<IP>:8000`, where `<IP>` stands for your IP address. 

12. Set the `powerprofile_path` field [here](https://github.com/minana96/green-lab/blob/repo-organize/android_runner/critical_css_experiment/config_chrome.json#L65) and [here](https://github.com/minana96/green-lab/blob/repo-organize/android_runner/critical_css_experiment/config_firefox.json#L65) to the path of the extracted `power_profile.xml` file from the *Step 8*.

13. In the `paths` field of the configuration scripts, you can see the paths to non-critical and critical versions of 50 web apps in the `subjects` folder that were used as subjects of this experiment. A total of 25 web apps were assigned to each browser randomly. The critical versions were created using [Critical](https://github.com/addyosmani/critical) tool and the process is automated in the `android_runner/critical_css_experiment/Scripts/apply_critical.py` script. **TODO: explain how to use the script and maybe add the possibility to enter width and height as parameters**. 

14. The `android_runner/critical_css_experiment/Scripts/add_get_on_load.py` script adds a custom `DOMContentLoaded` event listener into every subject. This listener sends an empty `Http GET` request that will be handled in the `android_runner/critical_css_experiment/Scripts/interaction.py` script and the profiling will be stopped upon handling the request. Run this script before the experiment with `python3 add_get_on_load.py <path/To/Directory/With/All/WebApps/> <server_address>` command. The first argument is the path to the `subjects` directory. The second argument is in the form of `http://<IP>:8001/` where `<IP>` is the local IP address of your laptop.

15. Clear the app data on both Firefox and Chrome browsers. This will be done after each run of the experiment in `android-runner` but not before the first run. It can be done either directly on the mobile device (go to `Settings>>Storage>>Other apps`, find Chrome and Firefox browsers and click `Clear storage` ) or programmatically via ADB (run commands `adb shell pm clear com.android.chrome` and `adb shell pm clear org.mozilla.firefox`).

16. The purpose of the `android_runner/critical_css_experiment/Scripts/after_launch.py` script is to programmatically tap buttons on the screen to remove the initial pop-up windows on the Chrome browser. The pop-ups appear when the app data of Chrome is cleared before every run and they prevent a target web app from launching. The coordinates in the `chrome_launch` method [here](https://github.com/minana96/green-lab/blob/repo-organize/android_runner/critical_css_experiment/Scripts/after_launch.py#L30) are customized for Nexus6P mobile device and Chrome version `V85.0.4183.127`. Customize the method with the coordinates of your mobile device and your version of the Chrome browser if needed. To visualize the coordinates on the mobile device, turn on the `Pointer location` option under the `Developer Options` on the phone. Open the cleared Chrome browser on the mobile device and observe (x, y) coordinates of the buttons that you need to tap to close the pop-ups. Adjust the `after_launch` method with one call of the `tap` method [here](https://github.com/minana96/green-lab/blob/repo-organize/android_runner/critical_css_experiment/Scripts/after_launch.py#L21) corresponding to one actual tap you performed. Repeat *Step 15* and clear Chrome app data upon the completion of this step.

17. Activate the virtual environment created in *Step 1* and navigate to the `green-lab` repository. The experiment can be started with `python3 android-runner <path_to_config_file>` command where `<path_to_config_file>` is either `android-runner/critical_css_experiment/config_chrome.json` or `android-runner/critical_css_experiment/config_firefox.json` for Chrome and Firefox experiments respectfully. Make sure that the brightness of the mobile device is set to a minimum and that no app sends push notification during the experiment. The phone should be connected to the same Wi-Fi network as the laptop.

18. You can stop the experiment any time by pressing any key on the keyboard. As the output, the `--progress` parameter will be yielded as the output. The parameter can be added to the command described in the previous to continue the experiment exactly where it was stopped. The ADB daemon can be terminated with `adb kill-server` command upon finishing the experiment.


