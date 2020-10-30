"""Before run script

This script will be executed before every run.

Its purpose is to start a local web server from a target web app's
directory so that all dependent resources would be accessed using 
correct paths.
"""

from AndroidRunner.Device import Device
from critical_css_experiment.Scripts.web_server import start


# noinspection PyUnusedLocal
def main(device: Device, *args: tuple, **kwargs: dict):
    subject_dir_path = args[0]
    start(subject_dir_path)


