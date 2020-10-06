from AndroidRunner.Device import Device
from CriticalCSSExperiment.Scripts.Server import start 


# noinspection PyUnusedLocal
def main(device: Device, path: str, *args: tuple, **kwargs: dict):
    start(path)

