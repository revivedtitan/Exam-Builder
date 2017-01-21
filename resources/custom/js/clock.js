var timeinterval;

function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    return {
        'total': t,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function initializeClock(endtime) {

    function updateClock() {
        var t = getTimeRemaining(endtime);
        var hour = ('0' + t.hours).slice(-2);
        var minutes = ('0' + t.minutes).slice(-2);
        var seconds = ('0' + t.seconds).slice(-2);

        $('.titleClock').html(hour + ":" + minutes + ":" + seconds);

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    updateClock();
    timeinterval = setInterval(updateClock, 1000);
}

function stopClock() {
    clearInterval(timeinterval);
}