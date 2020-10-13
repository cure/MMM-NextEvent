# MMM-NextEvent

## Screenshot
![Screenshot](https://github.com/cure/MMM-NextEvent/raw/main/screenshots/screenshot1.png)
![Screenshot](https://github.com/cure/MMM-NextEvent/raw/main/screenshots/screenshot2.png)
![Screenshot](https://github.com/cure/MMM-NextEvent/raw/main/screenshots/screenshot3.png)
![Screenshot](https://github.com/cure/MMM-NextEvent/raw/main/screenshots/screenshot4.png)

## Description

This is a module for [MagicMirror²](https://github.com/MichMich/MagicMirror/) which counts down to the next calendar event today. It is a slightly modified version of Boaz Arad's [MMM-CountDown](https://github.com/boazarad/MMM-CountDown), who did the hard work, thank you!

This module requests an event list from [MMM-CalExt2](https://github.com/MMM-CalendarExt2/MMM-CalendarExt2) for the current date, and displays a countdown in hours and minutes to the next event. If there is no event later today, it displays a happy 'Not today!' message.

## Installation

```
cd ~/MagicMirror/modules
git clone --depth=1 https://github.com/cure/MMM-NextEvent
```
## Configuration

To use this module, add the following configuration block to the modules array in the `config/config.js` file:

```js
var config = {
    modules: [
        {
            module: 'MMM-NextEvent',
            config: {
                // See configuration options
            }
        }
    ]
}
```

### Configuration options

| Option           | Description                                                                                                           |
| ---------------- | --------------------------------------------------------------------------------------------------------------------- |
| `position`       | *Required* Where do you want to place the counter (use standard magicmirror positions)                                |
| `event`          | Name of the title displayed above counter when there is no next event. Default is 'Next event'                        |
| `showHours`      | Decide whether or not to display the hours. Default is true                                                           |
| `showMinutes`    | Decide whether or not to display the minutes. Default is true                                                         |
| `showSeconds`    | Decide whether or not to display the seconds. Default is true                                                         |
| `customInterval` | Change the update interval which will help reduce load if you are only showing specific time metrics. Default is 1000 |
| `daysLabel`      | Choose how you wish to display your Days label. Default is d                                                          |
| `hoursLabel`     | Choose how you wish to display your Hours label. Default is h                                                         |
| `minutesLabel`   | Choose how you wish to display your Minutes label. Default is m                                                       |
| `secondsLabel`   | Choose how you wish to display your Seconds label. Default is m                                                       |
