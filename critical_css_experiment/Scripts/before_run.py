"""Bofore run script

This script will be executed before every run.

Its purpose is to start a local web server from a target web app's
directory so that all dependent resources would be accessed using 
correct paths.
"""

from android_runner.AndroidRunner.Device import Device
from critical_css_experiment.Scripts.Server import start 


# noinspection PyUnusedLocal
def main(device: Device, *args: tuple, **kwargs: dict):
    path = args[0]
    start(path)

