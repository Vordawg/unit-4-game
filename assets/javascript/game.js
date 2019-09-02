var starWarsCharacters = [];

function getRandomInt(max) {
    var randomNumber = Math.floor(Math.random() * Math.floor(max));
    return randomNumber;
}

function getHealthPoints() {
    var myRandomNumber = getRandomInt(100) + 100;

    if (starWarsCharacters.length > 0) {
        var healthPointsArray = [];
        for (var loop = 0; loop < starWarsCharacters.length; loop++) {
            healthPointsArray.push(starWarsCharacters[loop].getHealthPoints)
        }

        while (healthPointsArray.indexOf(myRandomNumber) >= 0) {
            myRandomNumber = getRandomInt(100) + 100;
        }
    }

    return myRandomNumber;
}

function getAttackPower() {
    var myRandomNumber = getRandomInt(9) + 1;

    if (starWarsCharacters.length > 0) {
        var attackPowerArray = [];
        for (var loop = 0; loop < starWarsCharacters.length; loop++) {
            attackPowerArray.push(starWarsCharacters[loop].getAttackPower)
        }

        while (attackPowerArray.indexOf(myRandomNumber) >= 0) {
            myRandomNumber = getRandomInt(9) + 1;
        }
    }

    return myRandomNumber
}

function getCounterAttackPower() {

    var myRandomNumber = getRandomInt(25) + 1;

    if (starWarsCharacters.length > 0) {
        var counterAttackPowerArray = [];
        for (var loop = 0; loop < starWarsCharacters.length; loop++) {
            counterAttackPowerArray.push(starWarsCharacters[loop].counterAttackPower)
        }

        while (counterAttackPowerArray.indexOf(myRandomNumber) >= 0) {
            myRandomNumber = getRandomInt(25) + 1;
        }
    }

    return myRandomNumber
}

function setupCharacter(characterName) {
    var warriors = {
        name: "",
        healthPoints: 0,
        attackPowerBase: 0,
        attackPower: 0,
        counterAttackPower: 0,

        setName: function (input) {
            this.name = input;
        },

        setHealthPoints: function (input) {
            this.healthPoints = input;
        },

        setAttackPowerBase: function (input) {
            this.attackPowerBase = input;
        },

        setCounterAttackPower: function (input) {
            this.counterAttackPower = input;
        },

        resetCharacterOnScreen: function () {
            var imageName = this.name.replace(" ", "");
            imageName = imageName.replace("-", "");

            var characterID = starWarsCharacters.length - 1;

            var characterHtml = "";

            characterHtml = '<div class="card border-success border-30" style="width:200px; height:180px">';
            characterHtml += '<div class="card-body">';
            characterHtml += '<p class="card-title text-center">' + this.name + '</p>';
            characterHtml += '<img src="assets/images/' + imageName + '.jpg" style="width:150px; height:80px" class="card-img-top"';
            characterHtml += 'id="' + starWarsCharacters[characterID] + '">';
            characterHtml += '<p class="text-center">' + this.healthPoints + '</p>'
            characterHtml += '</div>';
            characterHtml += '</div>';

            var characterNameID = "#characterChoice" + characterID;
            $(characterNameID).html(characterHtml);
        }
    };

    warriors.setName(characterName);
    warriors.setHealthPoints(getHealthPoints());
    warriors.setAttackPowerBase(getAttackPower());
    warriors.setCounterAttackPower(getCounterAttackPower());
    starWarsCharacters.push(warriors);
    warriors.resetCharacterOnScreen()
}

function initCharacters() {
    while (starWarsCharacters.length > 0) {
        starWarsCharacters.pop();
    }
    setupCharacter("Obi-Wan Kenobi");
    console.log(starWarsCharacters[0]);
    setupCharacter("Luke Skywalker");
    console.log(starWarsCharacters[1]);
    setupCharacter("Darth Sidious");
    console.log(starWarsCharacters[2]);
    setupCharacter("Darth Maul");
    console.log(starWarsCharacters[3]);
}



initCharacters();
