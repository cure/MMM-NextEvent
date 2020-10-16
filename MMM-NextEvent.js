Module.register("MMM-NextEvent",{
	// Default module config.
	defaults: {
		event: "Next event",
		date: "3000-01-01",
		showHours: true,
		showMinutes: true,
		showSeconds: true,
		customInterval: 1000,
		daysLabel: 'd',
		hoursLabel: 'h',
		minutesLabel: 'm',
		secondsLabel: 's',
	},

	// set update interval
	start: function() {
		var self = this;
		self.getEvents();
		setInterval(function() {
			self.getEvents();
			self.updateDom(); // no speed defined, so it updates instantly.
		}, this.config.customInterval); 
	},

	updateDate: function(events) {
		//console.log(events)
		var now = moment().format("X")
		events.sort((a, b) => a.startDate.localeCompare(b.startDate))
		if ((typeof events[0] !== 'undefined') && (now >= events[0].startDate) && (now <= events[0].endDate)) {
			this.config.event = events[0].title;
			if ((now >= events[0].startDate) && (now <= events[0].endDate-10*60)) {
				this.config.date = "1000-10-10";
			} else if ((now >= events[0].startDate) && (now <= events[0].endDate-5*60)) {
				this.config.date = "1000-10-11";
			} else if ((now >= events[0].startDate) && (now <= events[0].endDate)) {
				this.config.date = "1000-10-12";
			}
		} else if (typeof events[0] !== 'undefined') {
			this.config.event = events[0].title;
			this.config.date = events[0].startDateJ;
		} else {
			this.config.event = "Next event";
			this.config.date = "0000-00-00";
		}
		this.updateDom(); // no speed defined, so it updates instantly.
	},

	getEvents: function() {
		var now = moment().format("X")
		var endOfDay = moment().endOf('day').format("X")
		var filterFn = (event) => {
			// Do not consider all-day events. Only consider events that start in the future or are currently on.
			if ((event.isFullday !== true) &&
			    ((event.startDate > now) && (event.startDate < endOfDay) ||
			     (event.startDate <= now) && (event.endDate >= now))) return true
		}
		var callbackFn = (events) => {
			this.updateDate(events)
		}
		this.sendNotification("CALEXT2_EVENT_QUERY", {filter:filterFn, callback:callbackFn})
	},

	getStyles: function() {
		return ["MMM-NextEvent.css"]
	},

	// Update function
	getDom: function() {
		var wrapper = document.createElement("div");

		var timeWrapper = document.createElement("div");
		var textWrapper = document.createElement("div");

		textWrapper.className = "align-left week dimmed medium";
		timeWrapper.className = "time bright xlarge light";
		textWrapper.innerHTML=this.config.event;

		var today = new Date(Date.now());
		var target = new Date(this.config.date);
		var timeDiff = target - today;

		// Set days, hours, minutes and seconds
		var diffDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
		var diffHours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var diffMinutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
		var diffSeconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
		
		// Build the output
		var hrs = '';
		var mins = '';
		var secs = '';
		var days = '';
		if (diffDays > 0) {
			days = diffDays + this.config.daysLabel;
		}

		if(this.config.showHours == true) hrs = diffHours + this.config.hoursLabel;
		if(this.config.showMinutes == true) mins = diffMinutes + this.config.minutesLabel;
		if(this.config.showSeconds == true) secs = diffSeconds + this.config.secondsLabel;

		if ((this.config.showMinutes == true) && (mins.length < 2)) { mins = "0" + mins; }
		if ((this.config.showSeconds == true) && (secs.length < 2)) { secs = "0" + secs; }

		if (this.config.date === "0000-00-00") {
			timeWrapper.innerHTML = "Not today!";
			timeWrapper.className = "time xlarge light green";
		} else if (this.config.date === "1000-10-10") {
			timeWrapper.innerHTML = "In progress";
			timeWrapper.className = "time bright xlarge light";
		} else if (this.config.date === "1000-10-11") {
			timeWrapper.innerHTML = "In progress";
			timeWrapper.className = "time xlarge light yellow";
		} else if (this.config.date === "1000-10-12") {
			timeWrapper.innerHTML = "In progress";
			timeWrapper.className = "time xlarge light red";
		} else if (this.config.date !== "3000-01-01") {
			timeWrapper.innerHTML = days + hrs + mins + secs;
		}
		if ((diffHours == 0) && (diffMinutes <= 5)) {
			timeWrapper.className = "time xlarge light red";
		} else if ((diffHours == 0) && (diffMinutes <= 10)) {
			timeWrapper.className = "time xlarge light yellow";
		}

		wrapper.appendChild(textWrapper);
		wrapper.appendChild(timeWrapper);

		return wrapper;
	}
});
