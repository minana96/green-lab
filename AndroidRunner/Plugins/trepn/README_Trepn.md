# Trepn Plugin
This plugin collects data via the Trepn profiler, e.g., power consumption, battery temperature, CPUs frequency.

## Configuration
Below an example configuration is found:
```json
  "profilers": {
    "trepn": {
      "sample_interval": 100,
      "data_points": ["battery_power", "mem_usage"]
    }
  }
```