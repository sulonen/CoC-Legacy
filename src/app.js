angular.module('app', ['ui.router'])

    .config(function ($stateProvider) {
      $stateProvider.state('intro', {
        url: '',
        controller: 'IntroCtrl as intro',
        templateUrl: 'templates/intro.html'
      });
      $stateProvider.state('step1', {
        url: '/step1',
        controller: 'Step1Ctrl as step1',
        templateUrl: 'templates/step1.html'
      });
      $stateProvider.state('step2', {
        url: '/step2',
        controller: 'Step2Ctrl as step2',
        templateUrl: 'templates/step2.html'
      });
      $stateProvider.state('step3', {
        url: '/step3',
        controller: 'Step3Ctrl as step3',
        templateUrl: 'templates/step3.html'
      });
      $stateProvider.state('step4', {
        url: '/step4',
        controller: 'Step4Ctrl as step4',
        templateUrl: 'templates/step4.html'
      });
      $stateProvider.state('step5', {
        url: '/step5',
        controller: 'Step5Ctrl as step5',
        templateUrl: 'templates/step5.html'
      });
      $stateProvider.state('step6', {
        url: '/step6',
        controller: 'Step6Ctrl as step6',
        templateUrl: 'templates/step6.html'
      });
      $stateProvider.state('step7', {
        url: '/step7',
        controller: 'Step7Ctrl as step7',
        templateUrl: 'templates/step7.html'
      });
      $stateProvider.state('step8', {
        url: '/step8',
        controller: 'Step8Ctrl as step8',
        templateUrl: 'templates/step8.html'
      });
      $stateProvider.state('final', {
        url: '/final',
        controller: 'FinalCtrl as final',
        templateUrl: 'templates/final.html'
      });
      $stateProvider.state('json', {
        url: '/json',
        controller: 'JSONCtrl as json',
        templateUrl: 'templates/json.html'
      });
    })

    .service('dataService', function ($http) {
      this.getData = function (callback) {
        $http.get('mock/seed.json')
            .then(callback)
      };

      // JSON
      this.data = {};
      this.character = {};
      this.characteristics = {};
      this.rolls = {};
      this.personalData = {};
      this.income = {};
      this.skills1 = {};
      this.skills2 = {};
      this.skills3 = {};
      this.weapons = {};
      this.ranged = {};

      // Temporary
      this.tempSkills1 = {};
      this.tempSkills2 = {};
      this.tempSkills3 = {};
      this.defaultSkillPoints = 0;

      // Final
      this.json = {};

      //angular.element(document.querySelector('.ng-scope')).injector().get('dataService')
    })

    .controller('IntroCtrl', function IntroCtrl($scope, dataService) {
      var intro = this;

      dataService.getData(function (response) {
        dataService.data = response.data;
        dataService.character = dataService.data.character;
        dataService.characteristics = dataService.character.characteristics;
        dataService.rolls = dataService.character.rolls;
        dataService.personalData = dataService.character.personalData;
        dataService.income = dataService.character.income;
        dataService.skills1 = dataService.character.skills1;
        dataService.skills2 = dataService.character.skills2;
        dataService.skills3 = dataService.character.skills3;
        dataService.weapons = dataService.character.weapons;
        dataService.ranged = dataService.character.ranged;
      });
    })

    .controller('Step1Ctrl', function Step1Ctrl($scope, dataService) {
      var step1 = this;

      $scope.moveThis = '';
      $scope.moveValue = function (event) {
        if ($scope.moveThis == '' && event.target.value != '') {
          $scope.moveThis = event.target.value;
          event.target.value = '';
          event.target.className = 'score';
        } else if ($scope.moveThis != '' && event.target.value == '') {
          event.target.value = $scope.moveThis;
          event.target.className += ' populated';
          $scope.moveThis = '';
        }
      };

      $scope.update = function () {
        dataService.characteristics.str[1] = parseInt(document.getElementById('str').value);
        dataService.characteristics.con[1] = parseInt(document.getElementById('con').value);
        dataService.characteristics.pow[1] = parseInt(document.getElementById('pow').value);
        dataService.characteristics.dex[1] = parseInt(document.getElementById('dex').value);
        dataService.characteristics.app[1] = parseInt(document.getElementById('app').value);
      };
    })

    .controller('Step2Ctrl', function Step2Ctrl($scope, dataService) {
      var step2 = this;

      $scope.moveThis = '';
      $scope.moveValue = function (event) {
        if ($scope.moveThis == '' && event.target.value != '') {
          $scope.moveThis = event.target.value;
          event.target.value = '';
          event.target.className = 'score';
        } else if ($scope.moveThis != '' && event.target.value == '') {
          event.target.value = $scope.moveThis;
          event.target.className += ' populated';
          $scope.moveThis = '';
        }
      };

      $scope.update = function () {
        dataService.characteristics.siz[1] = parseInt(document.getElementById('siz').value);
        dataService.characteristics.int[1] = parseInt(document.getElementById('int').value);
      };
    })

    .controller('Step3Ctrl', function Step3Ctrl($scope, dataService) {
      var step3 = this;

      $scope.moveThis = '';
      $scope.moveValue = function (event) {
        if ($scope.moveThis == '' && event.target.value != '') {
          $scope.moveThis = event.target.value;
          event.target.value = '';
          event.target.className = 'score';
        } else if ($scope.moveThis != '' && event.target.value == '') {
          event.target.value = $scope.moveThis;
          event.target.className += ' populated';
          $scope.moveThis = '';
        }
      };

      $scope.update = function () {
        dataService.characteristics.edu[1] = parseInt(document.getElementById('edu').value);
      };

      $scope.calcScores = function () {
        dataService.personalData.age = dataService.characteristics.edu[1] + 6;
        dataService.characteristics.san[1] = dataService.characteristics.pow[1] * 5;
        dataService.rolls.idea[1] = dataService.characteristics.int[1] * 5;
        dataService.rolls.luck[1] = dataService.characteristics.pow[1] * 5;
        dataService.rolls.know[1] = dataService.characteristics.edu[1] * 5;

        var damageCalc = dataService.characteristics.str[1] + dataService.characteristics.siz[1];
        if (damageCalc < 13) {
          dataService.rolls.damageBonus[1] = '-1d6';
        } else if (12 < damageCalc && damageCalc < 17) {
          dataService.rolls.damageBonus[1] = '-1D4';
        } else if (16 < damageCalc && damageCalc < 25) {
          dataService.rolls.damageBonus[1] = '+0';
        } else if (24 < damageCalc && damageCalc < 33) {
          dataService.rolls.damageBonus[1] = '+1D4';
        } else if (32 < damageCalc && damageCalc < 41) {
          dataService.rolls.damageBonus[1] = '+1D6';
        } else if (40 < damageCalc && damageCalc < 57) {
          dataService.rolls.damageBonus[1] = '+2D6';
        } else if (56 < damageCalc && damageCalc < 73) {
          dataService.rolls.damageBonus[1] = '+3D6';
        } else if (72 < damageCalc && damageCalc < 89) {
          dataService.rolls.damageBonus[1] = '+4D6';
        } else {
          dataService.rolls.damageBonus[1] = 'ERR';
        }

        dataService.rolls.mythos99[1] = 99;
        dataService.rolls.hitpoints[1] = Math.ceil((dataService.characteristics.con[1]
            + dataService.characteristics.siz[1]) / 2);
        dataService.rolls.magicpoints[1] = dataService.characteristics.pow[1];
        dataService.rolls.sanpoints[1] = dataService.characteristics.san[1];

        dataService.personalData.occupationPoints = dataService.characteristics.edu[1] * 20;
        dataService.personalData.interestPoints = dataService.characteristics.int[1] * 5;
        dataService.personalData.totalPoints = dataService.personalData.occupationPoints
            + dataService.personalData.interestPoints;
      };
    })

    .controller('Step4Ctrl', function Step4Ctrl($scope, dataService) {
      var step4 = this;

      $scope.characteristics = dataService.characteristics;
      $scope.rolls = dataService.rolls;
    })

    .controller('Step5Ctrl', function Step5Ctrl($scope, dataService) {
      var step5 = this;
      $scope.invalidAge = false;

      $scope.characteristics = dataService.characteristics;
      $scope.personalData = dataService.personalData;
      $scope.income = dataService.income;

      $scope.tempAge = $scope.personalData.age;
      $scope.tempEdu = $scope.characteristics.edu[1];

      $scope.changeAge = function () {
        $scope.tempOccupationPoints = $scope.personalData.occupationPoints;
        var ageDifference = $scope.tempAge - $scope.personalData.age;
        //console.log('ageDifference == ' + ageDifference);
        if (60 > ageDifference && ageDifference > 49) {
          $scope.tempEdu += 6;
          $scope.tempOccupationPoints += 100;
        } else if (50 > ageDifference && ageDifference > 39) {
          $scope.tempEdu += 4;
          $scope.tempOccupationPoints += 80;
        } else if (40 > ageDifference && ageDifference > 29) {
          $scope.tempEdu += 3;
          $scope.tempOccupationPoints += 60;
        } else if (30 > ageDifference && ageDifference > 19) {
          $scope.tempEdu += 2;
          $scope.tempOccupationPoints += 40;
        } else if (20 > ageDifference && ageDifference > 9) {
          $scope.tempEdu += 1;
          $scope.tempOccupationPoints += 20;
        }

        if ($scope.tempAge >= 40) {
          $scope.personalData.agePenalty[1] = Math.ceil(($scope.tempAge - 40) / 10);
        }

        if ($scope.personalData.agePenalty[0] == 'con') {
          var tempCon = $scope.characteristics.con[1] - $scope.personalData.agePenalty[1];
          var tempHP = Math.ceil((tempCon + $scope.characteristics.siz[1]) / 2);

          if (tempCon > 0 && tempHP > 2) {
            $scope.personalData.age = $scope.tempAge;
            $scope.characteristics.edu[1] = $scope.tempEdu;
            $scope.characteristics[$scope.personalData.agePenalty[0]][1]
                -= $scope.personalData.agePenalty[1];

            dataService.personalData.occupationPoints = $scope.tempOccupationPoints;
            dataService.personalData.totalPoints = dataService.personalData.occupationPoints
                + dataService.personalData.interestPoints;

            $scope.calcScores();
          } else {
            $scope.invalidAge = true;
            $scope.tempAge = $scope.personalData.age;
            $scope.tempEdu = $scope.characteristics.edu[1];
            $scope.tempOccupationPoints = $scope.tempEdu * 20;
            $scope.personalData.agePenalty = ['str', 0];
          }
        } else {
          $scope.personalData.age = $scope.tempAge;
          $scope.characteristics.edu[1] = $scope.tempEdu;
          $scope.characteristics[$scope.personalData.agePenalty[0]][1]
              -= $scope.personalData.agePenalty[1];

          dataService.personalData.occupationPoints = $scope.tempOccupationPoints;
          dataService.personalData.totalPoints = dataService.personalData.occupationPoints
              + dataService.personalData.interestPoints;

          $scope.calcScores();
        }
      };

      $scope.getIncome = function () {
        var roll = Math.floor(Math.random() * 10) + 1;
        $scope.personalData.annualIncome = $scope.income[$scope.personalData.era][roll][0];
        $scope.personalData.additionalAssets = $scope.income[$scope.personalData.era][roll][1];
      };

      $scope.calcScores = function () {
        dataService.personalData.age = $scope.personalData.age;
        dataService.personalData.agePenalty = $scope.personalData.agePenalty;

        dataService.rolls.know[1] = dataService.characteristics.edu[1] * 5;

        var damageCalc = dataService.characteristics.str[1] + dataService.characteristics.siz[1];
        if (damageCalc < 13) {
          dataService.rolls.damageBonus[1] = '-1d6';
        } else if (12 < damageCalc && damageCalc < 17) {
          dataService.rolls.damageBonus[1] = '-1D4';
        } else if (16 < damageCalc && damageCalc < 25) {
          dataService.rolls.damageBonus[1] = '+0';
        } else if (24 < damageCalc && damageCalc < 33) {
          dataService.rolls.damageBonus[1] = '+1D4';
        } else if (32 < damageCalc && damageCalc < 41) {
          dataService.rolls.damageBonus[1] = '+1D6';
        } else if (40 < damageCalc && damageCalc < 57) {
          dataService.rolls.damageBonus[1] = '+2D6';
        } else if (56 < damageCalc && damageCalc < 73) {
          dataService.rolls.damageBonus[1] = '+3D6';
        } else if (72 < damageCalc && damageCalc < 89) {
          dataService.rolls.damageBonus[1] = '+4D6';
        } else {
          dataService.rolls.damageBonus[1] = 'ERR';
        }

        dataService.rolls.hitpoints[1] = Math.ceil((dataService.characteristics.con[1]
            + dataService.characteristics.siz[1]) / 2);
        //console.log('hitpoints == ' + dataService.rolls.hitpoints[1]);
        dataService.rolls.magicpoints[1] = dataService.characteristics.pow[1];
        dataService.rolls.sanpoints[1] = dataService.characteristics.san[1];
      };
    })

    .controller('Step6Ctrl', function Step6Ctrl($scope, dataService) {
      var step6 = this;

      $scope.personalData = dataService.personalData;
    })

    .controller('Step7Ctrl', function Step7Ctrl($scope, dataService) {
      var step7 = this;

      dataService.skills1.dodge[1] = dataService.characteristics.dex[1] * 2;
      dataService.skills3.langOwn[1] = dataService.characteristics.edu[1] * 5;
      if (dataService.skills3.langOwn[1] > 99) {
        dataService.skills3.langOwn[1] = 99;
      }

      dataService.tempSkills1 = angular.copy(dataService.skills1);
      dataService.tempSkills2 = angular.copy(dataService.skills2);
      dataService.tempSkills3 = angular.copy(dataService.skills3);

      $scope.characteristics = dataService.characteristics;
      $scope.rolls = dataService.rolls;
      $scope.personalData = dataService.personalData;
      $scope.skills1 = dataService.skills1;
      $scope.skills2 = dataService.skills2;
      $scope.skills3 = dataService.skills3;
      $scope.weapons = dataService.weapons;
      $scope.tempSkills1 = dataService.tempSkills1;
      $scope.tempSkills2 = dataService.tempSkills2;
      $scope.tempSkills3 = dataService.tempSkills3;
      $scope.totalPoints = dataService.personalData.totalPoints;
      $scope.availablePoints = dataService.personalData.totalPoints;
      $scope.defaultSkillPoints = dataService.defaultSkillPoints;

      $scope.json = dataService.json;

      $scope.getDefaultSkillPoints = function () {
        var defaultPoints = 0;
        for (var skill1 in $scope.skills1) {
          defaultPoints += $scope.skills1[skill1][1];
        }
        for (var skill2 in $scope.skills2) {
          defaultPoints += $scope.skills2[skill2][1];
        }
        for (var skill3 in $scope.skills3) {
          defaultPoints += $scope.skills3[skill3][1];
        }

        return defaultPoints;
      };

      $scope.defaultSkillPoints = $scope.getDefaultSkillPoints();

      $scope.getProposedSkillPoints = function () {
        var proposedPoints = 0;
        for (var skill1 in $scope.tempSkills1) {
          proposedPoints += $scope.tempSkills1[skill1][1];
        }
        for (var skill2 in $scope.tempSkills2) {
          proposedPoints += $scope.tempSkills2[skill2][1];
        }
        for (var skill3 in $scope.tempSkills3) {
          proposedPoints += $scope.tempSkills3[skill3][1];
        }

        return proposedPoints;
      };

      $scope.resetSkills = function () {
        dataService.skills1.dodge[1] = dataService.characteristics.dex[1] * 2;
        dataService.skills3.langOwn[1] = dataService.characteristics.edu[1] * 5;

        $scope.tempSkills1 = angular.copy($scope.skills1);
        $scope.tempSkills2 = angular.copy($scope.skills2);
        $scope.tempSkills3 = angular.copy($scope.skills3);
        $scope.availablePoints = dataService.personalData.totalPoints;

        document.getElementById('availablePoints').className = 'available-points';
      };

      $scope.updateAvailablePoints = function () {
        var displayPoints = document.getElementById('availablePoints');
        var proposedPoints = $scope.getProposedSkillPoints();
        var pointsDifference = proposedPoints - $scope.defaultSkillPoints;
        $scope.availablePoints = $scope.totalPoints - pointsDifference;

        $scope.availablePoints < 0 ? displayPoints.className
            = 'available-points red' : displayPoints.className = 'available-points';
        //console.log('default points == ' + $scope.defaultSkillPoints);
        //console.log('proposed points == ' + proposedPoints);
        //console.log('points difference == ' + pointsDifference);
      };

      $scope.update = function () {
        dataService.skills1 = $scope.tempSkills1;
        dataService.skills2 = $scope.tempSkills2;
        dataService.skills3 = $scope.tempSkills3;

        dataService.weapons.fist[1] = dataService.skills2.fist[1];
        dataService.weapons.fist[2] = '1D3 ' + $scope.rolls.damageBonus[1];
        dataService.weapons.grapple[1] = dataService.skills2.grapple[1];
        dataService.weapons.head[1] = dataService.skills2.headbutt[1];
        dataService.weapons.head[2] = '1D4 ' + $scope.rolls.damageBonus[1];
        dataService.weapons.kick[1] = dataService.skills2.kick[1];
        dataService.weapons.kick[2] = '1D6 ' + $scope.rolls.damageBonus[1];

        dataService.json.personalData = dataService.personalData;
        dataService.json.characteristics = dataService.characteristics;
        dataService.json.rolls = dataService.rolls;
        dataService.json.skills1 = dataService.skills1;
        dataService.json.skills2 = dataService.skills2;
        dataService.json.skills3 = dataService.skills3;
        dataService.json.weapons = dataService.weapons;
      };
    })

    .controller('Step8Ctrl', function Step8Ctrl($scope, dataService) {
      var step8 = this;

      $scope.name = dataService.personalData.name;
    })

    .controller('FinalCtrl', function FinalCtrl($scope, dataService) {
      var final = this;

      $scope.character = dataService.character;
      $scope.characteristics = dataService.characteristics;
      $scope.rolls = dataService.rolls;
      $scope.personalData = dataService.personalData;
      $scope.skills1 = dataService.skills1;
      $scope.skills2 = dataService.skills2;
      $scope.skills3 = dataService.skills3;
      $scope.weapons = dataService.weapons;

      // $scope.createPDF = function() {

      // };
    })

    .controller('JSONCtrl', function Step4Ctrl($scope, dataService) {
      var json = this;

      $scope.personalData = dataService.personalData;
      $scope.json = dataService.json;
      $scope.output = JSON.stringify($scope.json, null, '\t');
    })

    .controller('Rolls1Ctrl', function () {
      this.rolls = rollDice(5, 3, 0);
      this.reroll = function () {
        document.getElementById('str').value = '';
        document.getElementById('str').className = 'score';
        document.getElementById('con').value = '';
        document.getElementById('con').className = 'score';
        document.getElementById('pow').value = '';
        document.getElementById('pow').className = 'score';
        document.getElementById('dex').value = '';
        document.getElementById('dex').className = 'score';
        document.getElementById('app').value = '';
        document.getElementById('app').className = 'score';
        var list = document.getElementById('rolls1').getElementsByTagName('input');
        for (var i = 0; i < list.length; i++) {
          list[i].className = 'score populated';
        }
        this.rolls = rollDice(5, 3, 0);
      };
    })

    .controller('Rolls2Ctrl', function () {
      this.rolls = rollDice(2, 2, 6);
      this.reroll = function () {
        document.getElementById('siz').value = '';
        document.getElementById('siz').className = 'score';
        document.getElementById('int').value = '';
        document.getElementById('int').className = 'score';
        var list = document.getElementById('rolls2').getElementsByTagName('input');
        for (var i = 0; i < list.length; i++) {
          list[i].className = 'score populated';
        }
        this.rolls = rollDice(2, 2, 6);
      };
    })

    .controller('Rolls3Ctrl', function () {
      this.rolls = rollDice(1, 3, 3);
      this.reroll = function () {
        document.getElementById('edu').value = '';
        document.getElementById('edu').className = 'score';
        var list = document.getElementById('rolls3').getElementsByTagName('input');
        for (var i = 0; i < list.length; i++) {
          list[i].className = 'score populated';
        }
        this.rolls = rollDice(1, 3, 3);
      };
    });

/*
 * Utility functions
 */
function rollDice(numRolls, numDice, modifier) {
  var rolls = [];
  for (var i = 0; i < numRolls; i++) {
    var roll = 0;
    for (var t = 0; t < numDice; t++) {
      roll += Math.floor(Math.random() * 6) + 1;
    }
    roll += modifier;
    rolls.push(roll);
  }
  rolls.sort(function (a, b) {
    return b - a;
  });
  return rolls;
}
