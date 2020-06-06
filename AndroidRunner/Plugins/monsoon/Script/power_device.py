from physalia.power_meters import MonsoonHVPMPowerMeter as HVPM
import time
import click

click.secho(
    "Turn on phone when Monsoon is ready",
    fg='yellow'
)
time.sleep(1)
power_meter = HVPM(3.8, serial=23171)
click.secho(
    "Unplug mobile device USB from computer and plug it back into Monsoon if adb not already connected via WiFi",
    fg='yellow'
)
time.sleep(10)
