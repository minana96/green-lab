"""After run script

This script will be executed upon completion of each run.

Its purpose is to stop the local web server.
"""

from AndroidRunner.Device import Device
from critical_css_experiment.Scripts.web_server import stop 


# noinspection PyUnusedLocal
def main(device: Device, *args: tuple, **kwargs: dict):
    stop()

