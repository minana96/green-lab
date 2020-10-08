import time
from AndroidRunner.Device import Device

default_wait_time = 0.3


def tap(device: Device, x: int, y: int, sleep = 4):
    device.shell('input tap %s %s' % (x, y))
    # We need to wait for the display to update after the last click.
    # The time to update is vary. 
    time.sleep(sleep)


def chrome_launch(device: Device):
    # Uncheck allow
    tap(device, 142, 1595, default_wait_time)

    # Click continue
    tap(device, 719, 2265, default_wait_time)

    # Click no tnx
    tap(device, 242, 2274, default_wait_time)


def firefox(device: Device):
    # Click pixel to not time out screen
    tap(device, 382, 1202, default_wait_time)


def main(device: Device, *args, **kwargs):
    if device.current_activity().find('chrome') != -1:
        chrome_launch(device)