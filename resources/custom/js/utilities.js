function getUnique(count,array) {
    // Make a copy of the array
    var tmp = array.slice(array);
    var ret = [];

    for (var i = 0; i < count; i++) {
        var index = Math.floor(Math.random() * tmp.length);
        var removed = tmp.splice(index, 1);
        // Since we are only removing one element
        ret.push(removed[0]);
    }
    return ret;
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

Array.prototype.compare = function(testArr) {
    if (this.length != testArr.length) return false;
    for (var i = 0; i < testArr.length; i++) {
        if (this[i].compare) { //To test values in nested arrays
            if (!this[i].compare(testArr[i])) return false;
        }
        else if (this[i] !== testArr[i]) return false;
    }
    return true;
}