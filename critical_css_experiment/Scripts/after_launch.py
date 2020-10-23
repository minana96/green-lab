"""After launch script

This script will be executed after the target web app is launched 
but before profiling starts.

Chrome browser displays pop-up windows for customization when the
app data is cleared. This would prevent a web app from launching.
The purpose of this script is to interract programmatically with
Chrome so that all pop-ups would be closed before profiling starts.
The interaction is customized for Nexus6P mobile device and Chrome
version V85.0.4183.127.
"""

import time
from android_runner.AndroidRunner.Device import Device


default_wait_time = 0.3


def tap(device: Device, x: int, y: int, time_to_sleep = 4):
    """Executes a tap on a device's screen on (x, y) position with 
    waiting time for a resulting action
    """

    device.shell('input tap %s %s' % (x, y))
    time.sleep(time_to_sleep)


def chrome_launch(device: Device):
    """Performs three taps on the screen once Chrome browser is 
    launched to close all pop-ups
    """

    # Uncheck allow
    tap(device, 142, 1595, default_wait_time)

    # Click continue
    tap(device, 719, 2265, default_wait_time)

    # Click no thx
    tap(device, 242, 2274, default_wait_time)


def main(device: Device, *args, **kwargs):
    """Performs the pop-up interraction only if currently launched
    browser is Chrome
    """

    if device.current_activity().find('chrome') != -1:
        chrome_launch(device)
