from AndroidRunner.Device import Device
from CriticalCSSExperiment.Scripts.Server import stop


# noinspection PyUnusedLocal
def main(device: Device, *args: tuple, **kwargs: dict):
    stop()

