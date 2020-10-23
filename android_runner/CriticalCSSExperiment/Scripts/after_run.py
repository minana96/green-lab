"""After run script

This script will be executed upon completion of each run.

Its purpose is to stop the local web server.
"""

from android_runner.AndroidRunner.Device import Device
from CriticalCSSExperiment.Scripts.Server import stop 


# noinspection PyUnusedLocal
def main(device: Device, *args: tuple, **kwargs: dict):
    stop()

