"""Bofore run script

This script will be executed before every run.

Its purpose is to start the local web server from a target web app's
own directory so that all dependencies would be accessed using
correct paths.
"""

from android_runner.AndroidRunner.Device import Device
from CriticalCSSExperiment.Scripts.Server import start 


# noinspection PyUnusedLocal
def main(device: Device, *args: tuple, **kwargs: dict):
    path = args[0]
    start(path)

