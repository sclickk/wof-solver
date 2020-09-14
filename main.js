$('body').append('<span>Called letters:</span>');
$('body').append('<input id="calledLetters" type="text">');
$('body').append('<button id="addBonusRoundLetters">Add bonus round letters</button>');
$('body').append(`<p>Search ${words.length} possible words<p/>`);
$('body').append('<input id="userInput" type="text"/>');
$('body').append('<button id="solveWord">Solve for word</button>');
$('body').append('<input id="tossupOption" type="checkbox"/>');
$('body').append('<span>Toss-Up?</span>');
$('body').append('<input id="showAsList" type="checkbox"/>');
$('body').append('<span>Show as list?</span>');
$('body').append('<p id="wordDisplay"></p>');

var showAsList = $('#showAsList')[0];
var addBonusRoundLetters = $('#addBonusRoundLetters')[0];
var blank_chars = "_~*";

var usedCharacters = function (word) {
  var char_arr = [];
  word = word.toUpperCase();
  for (var i = 0; i < word.length; i++) {
    var c = word[i];
    if (blank_chars.indexOf(c) == -1) {
      if (char_arr.indexOf(c) == -1) {
        char_arr.push(c);
      }
    }
  }
  char_arr = char_arr.sort();
  return char_arr;
}

var wordsMatch = function (word1, word2, tossup) {
  /**
   * The obvious case.
   */
  if (word1 == word2) {
    return true;
  }

  /**
   * Make sure the length of both words are the same.
   */
  if (word1.length != word2.length) {
    return false;
  }

  var matches_with_underscores = true;
  var indices_of_underscores = [];
  for (let i = 0; i < word1.length; i++) {
    var c = word1[i];
    var d = word2[i];
    if (blank_chars.indexOf(c) == -1) {
      if (c != d) {
        matches_with_underscores = false;
      }
    } else {
      indices_of_underscores.push(i);
    }
  }

  if (!matches_with_underscores) {
    return false;
  } else {
    if (!tossup) {
      var used_chars = usedCharacters(word1);
      var called_letters = $('#calledLetters')[0].value.split("");
      var all_chars = used_chars.concat(called_letters);
      for (var i = 0; i < indices_of_underscores.length; i++) {
        var c = indices_of_underscores[i];
        if (all_chars.indexOf(word2[c]) != -1) {
          return false;
        }
      }
    }
    return true;
  }
}

/**
 * Solve for an individual word.
 */
var solveForWord = function () {
  var input = $("#userInput")[0].value;
  input = input.toUpperCase();
  $('#wordDisplay').text("");
  var tossupOption = $("#tossupOption")[0];
  /**
   * Cycle through the word dictionary.
   */
  for (var i = 0; i < words.length; i++) {
    var c = words[i].toUpperCase();
    if (wordsMatch(input, c, tossupOption.checked)) {
      $('#wordDisplay').append(c + (showAsList.checked ? "<br/>" : " "));
    }
  }
}

$('#solveWord').on('click', function () {
  solveForWord();
});

$('#userInput').on('keypress', function () {
  var key = event.keyCode;
  if (key == 13) {
    solveForWord();
  }
});

addBonusRoundLetters.onclick = function () {
  var letters = "RSTLNE";
  $("#calledLetters").val(
    $("#calledLetters").val() + letters
  );
}