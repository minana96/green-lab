from physalia.power_meters import MonsoonHVPMPowerMeter as HVPM
import time
#Enter your Monsoon's serial number
serial = 23171
#HVPM default voltage
voltage = 3.8
power_meter = HVPM(voltage, serial)
