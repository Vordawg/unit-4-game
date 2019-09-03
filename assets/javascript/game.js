var starWarsCharacters = [];
var attacherId = -1;
var defenderId = -1;

var lightsaberTurnOnAudio = new Audio("assets/audio/LightsaberTurnOn.mp3");
var lightsaberClashAudio = new Audio("assets/audio/LightsaberClash.mp3");

function getRandomInt(max) {
    var randomNumber = Math.floor(Math.random() * Math.floor(max));
    return randomNumber;
}

function getHealthPoints() {
    var myRandomNumber = getRandomInt(100) + 100;

    if (starWarsCharacters.length > 0) {
        var healthPointsArray = [];
        for (var loop = 0; loop < starWarsCharacters.length; loop++) {
            healthPointsArray.push(starWarsCharacters[loop].healthPoints)
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
            attackPowerArray.push(starWarsCharacters[loop].attackPower)
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
        value: 0,
        attacker: false,

        setName: function (input) {
            this.name = input;
        },

        setHealthPoints: function (input) {
            this.healthPoints = input;
        },

        setAttackPowerBase: function (input) {
            this.attackPowerBase = input;
            this.setAttackPower();
        },

        setAttackPower: function () {
            this.attackPower += this.attackPowerBase;
        },

        setCounterAttackPower: function (input) {
            this.counterAttackPower = input;
        },

        setValue: function () {
            this.value = starWarsCharacters.length - 1;
        },

        resetCharacterOnScreen: function () {
            var imageName = this.name.replace(" ", "");
            imageName = imageName.replace("-", "");

            var characterID = starWarsCharacters.length - 1;

            var characterHtml = "";

            characterHtml = '<div class="card border-success" style="width:200px; height:180px">';
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
    warriors.setValue();
    warriors.resetCharacterOnScreen();
}

function initCharacters() {

    $("#characterChoice0").html("");
    $("#characterChoice1").html("");
    $("#characterChoice2").html("");
    $("#characterChoice3").html("");

    $("#availableEnemyCharacter0").html("");
    $("#availableEnemyCharacter1").html("");
    $("#availableEnemyCharacter2").html("");
    $("#availableEnemyCharacter3").html("");

    $("#attackingCharacter").html("");
    $("#defendingCharacter").html("");

    $("#resetButton").hide();

    clearDisplayMessage();

    while (starWarsCharacters.length > 0) {
        starWarsCharacters.pop();
    }

    attacherId = -1;
    defenderId = -1;

    setupCharacter("Obi-Wan Kenobi");
    console.log(starWarsCharacters[0]);
    setupCharacter("Luke Skywalker");
    console.log(starWarsCharacters[1]);
    setupCharacter("Darth Sidious");
    console.log(starWarsCharacters[2]);
    setupCharacter("Darth Maul");
    console.log(starWarsCharacters[3]);
}

function getCharacterCardHTML(characterNumber, borderstyle) {
    var imageName = starWarsCharacters[characterNumber].name.replace(" ", "");
    imageName = imageName.replace("-", "");

    var characterHtml = "";

    characterHtml = '<div class="card ' + borderstyle + ' border-30" style="width:200px; height:180px">';
    characterHtml += '<div class="card-body">';
    characterHtml += '<p class="card-title text-center">' + starWarsCharacters[characterNumber].name + '</p>';
    characterHtml += '<img src="assets/images/' + imageName + '.jpg" style="width:150px; height:80px" class="card-img-top"';
    characterHtml += 'id="' + starWarsCharacters[characterNumber] + '">';
    characterHtml += '<p class="text-center">' + starWarsCharacters[characterNumber].healthPoints + '</p>'
    characterHtml += '</div>';
    characterHtml += '</div>';

    return characterHtml;
}

function setAttackingCharacterOnScreen(input) {
    var borderStyle = "border-success";
    var characterHtml = getCharacterCardHTML(input, borderStyle);

    $("#attackingCharacter").html(characterHtml);
}

function setAvailableDefendingCharacterOnScreen(input) {
    var borderStyle = "border-dark bg-danger";
    var characterHtml = getCharacterCardHTML(input, borderStyle);

    var characterNameID = "#availableEnemyCharacter" + input;
    $(characterNameID).html(characterHtml);
}

function setDefendingCharacterOnScreen(input) {
    var borderStyle = "border-sucess bg-dark text-white";
    var characterHtml = getCharacterCardHTML(input, borderStyle);

    var characterNameID = "#defendingCharacter";
    $(characterNameID).html(characterHtml);
}

function areAllEnemiesDefeated() {
    var allDefeated = true;
    for (var loop = 0; loop < starWarsCharacters.length; loop++) {
        if (loop != attacherId && starWarsCharacters[loop].healthPoints > 0) {
            allDefeated = false;
        }
    }
    return allDefeated;
}

function setDisplayMessage(message) {
    $("#userMessage").html("<h5>" + message + "</h5>");
}

function clearDisplayMessage() {
    $("#userMessage").html("");
}

$("#resetButton").on("click", function () {
    initCharacters();
});

$(".initCharacters").on("click", function () {
    console.log(this.id);
    $("#characterChoice0").html("");
    $("#characterChoice1").html("");
    $("#characterChoice2").html("");
    $("#characterChoice3").html("");

    attacherId = this.id[this.id.length - 1];
    setAttackingCharacterOnScreen(attacherId);

    for (var loop = 0; loop < starWarsCharacters.length; loop++) {
        if (loop != attacherId) {
            setAvailableDefendingCharacterOnScreen(loop);
        }
    }

    lightsaberTurnOnAudio.play();
    clearDisplayMessage();
});

$(".enemyCharacters").on("click", function () {
    if (defenderId < 0) {
        console.log(this.id);
        defenderId = this.id[this.id.length - 1];

        var removeEnemy = "#" + this.id;
        $(removeEnemy).html("");
        setDefendingCharacterOnScreen(defenderId);
        lightsaberTurnOnAudio.play();
        clearDisplayMessage();
    }
});

$("#attackButton").on("click", function () {
    var theUserMessage = "";

    if (starWarsCharacters[attacherId].healthPoints <= 0) {

    }
    else if (attacherId >= 0 && defenderId >= 0) {
        lightsaberClashAudio.play();

        starWarsCharacters[defenderId].healthPoints -= starWarsCharacters[attacherId].attackPower;
        starWarsCharacters[attacherId].healthPoints -= starWarsCharacters[defenderId].counterAttackPower;

        setAttackingCharacterOnScreen(attacherId);
        setDefendingCharacterOnScreen(defenderId);

        var allDefeated = areAllEnemiesDefeated();
        var theDefenderMessage = "";

        if (starWarsCharacters[defenderId].healthPoints > 0 && starWarsCharacters[attacherId].healthPoints > 0) {
            theUserMessage = "You attacked " + starWarsCharacters[defenderId].name + " for " + starWarsCharacters[attacherId].attackPower + " damage";
            theDefenderMessage = starWarsCharacters[defenderId].name + " attacked you back for " + starWarsCharacters[defenderId].counterAttackPower + " damage";

            setDisplayMessage(theUserMessage + "<br>" + theDefenderMessage);

            starWarsCharacters[attacherId].setAttackPower();
        }
        else if (starWarsCharacters[attacherId].healthPoints <= 0) {
            theUserMessage = "You have been defeated...GAME OVER!!!";
            setDisplayMessage(theUserMessage);

            $("#resetButton").show();
        }
        else if (starWarsCharacters[defenderId].healthPoints <= 0 && !allDefeated) {
            theUserMessage = "You have defeated " + starWarsCharacters[defenderId].name + ", you can chose another enemy.";
            defenderId = -1;
            $("#defendingCharacter").html("");

            setDisplayMessage(theUserMessage);
            setAttackingCharacterOnScreen(attacherId);
            starWarsCharacters[attacherId].setAttackPower();
        }
        else if (starWarsCharacters[defenderId].healthPoints <= 0 && allDefeated) {
            theUserMessage = "You Won!!! GAME OVER!!!";
            setDisplayMessage(theUserMessage);
            $("#defendingCharacter").html("");
            $("#resetButton").show();
        }

    }
    else {
        theUserMessage = "No enemy here.";
        setDisplayMessage(theUserMessage);
    }
});

initCharacters();
