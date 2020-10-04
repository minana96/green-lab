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
    tap(device, 81, 906, default_wait_time)

    # Click continue
    tap(device, 281, 1213, default_wait_time)

    # Click no tnx
    tap(device, 141, 1221, default_wait_time)


def opera_launch(device: Device):
    # Opera animation
    time.sleep(default_wait_time)

    # Click continue
    tap(device, 382, 1202, default_wait_time)

    # Click disagree
    tap(device, 432, 1213, default_wait_time*3)

    # Click done
    tap(device, 625, 1224, default_wait_time)


def main(device: Device, *args, **kwargs):
    if device.current_activity().find('chrome') != -1:
        chrome_launch(device)
    elif device.current_activity().find('opera') != -1:
        opera_launch(device)