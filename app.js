document.addEventListener('DOMContentLoaded', () => {
  const mainWin = document.querySelector('#int')
  const problem = document.querySelector('#problem')
  const hintFeed = document.querySelector('#hint')
  const userAnswerHTML = '<form id="the-asnwwer" action=""><label id="number-label">Your Answer: <input type="number" id="number" name="number" min="1" max="99" placeholder="0"></label><div id="answer">Submit</div></form>'
  const playAgainHTML = 'Great Job!<br /><div id="play-again" onclick="window.location.reload()">Play Again</div>'
  var turns 
  var choice = null

  function hintOne (z) {
    return Math.floor(Math.random() * ((10 + z) - z) + (z + 1))
  }
  function hintTwo (z) {
    var hint = -1
    while (hint < 0) {
      hint = Math.floor(Math.random() * (z - (z - 10)) + (z - 10))
    }
    return hint
  }

  function shuffle (a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }

  // this is shuffling the hints and returns an array of hints
  function gHint (x) {
    let d = hintOne(x)
    let e = hintTwo(x)
    var hints = [x, d, e]
    return shuffle(hints)
  }

  // variables to be used to determine factors and divisors.
  var a = 0
  var b = 0
  var c = 0

  // get some random number range 1 to 12
  function factors () {
    return Math.floor(Math.random() * (12 - 1 + 1)) + 1
  }

  // return product
  function product (a, b) {
    return a * b
  }

  // Some light encouragment.
  const cheers = ['Great job!', 'You did it!', 'Yeah!', 'Congrats!', 'Way to go!', 'Keep it up!', 'Nice!']

  function pFeedback (ch) {
    return ch[Math.floor(Math.random() * (ch.length) + 0)]
  }

  // this returns whether user selected M or D
  function problemSelection (a) {
    for (var i = 0; i < a.length; i++) {
      if (a[i].checked) {
        return a[i].value
      }
    }
  }
  // Times tables
  function multiplication () {
    if (turns === 0) {
      mainWin.innerHTML = playAgainHTML
    } else {
      turns--
      a = factors()
      b = factors()
      c = product(a, b)
      var guessN = 0
      var hint = gHint(c)
      problem.innerHTML = '<div class="card"><div class="card-section"></div><div class="card-section">' + a + '</div><div class="card-section a-line">X</div><div class="card-section a-line">' + b + '</div><div class="answer-section"><input type="number" id="number" name="number" min="1" max="99" placeholder="0"></label></div></div><div id="answer">Submit</div>'
      let userAnswer = document.getElementById('number')
      let answerButton = document.querySelector('#answer')
      answerButton.addEventListener('click', () => {
        guessN = userAnswer.value
        if (guessN == c) {
          mainWin.innerHTML = 'Correct!<br />' + pFeedback(cheers)
          //hintFeed.innerHTML = ''
          multiplication()
        } else {
          //mainWin.innerHTML = ''
          mainWin.innerHTML = 'Try again. Here is a hint. The answer is one of these three numbers:<br /><div id="hint-series"><span class="hinted">' + hint[0] + '</span><span class="hinted">' + hint[1] + '</span><span class="hinted">' + hint[2] + '</span></div>'
        }
      })
    }
  }

  // Division tables
  function division () {
    if (turns === 0) {
      mainWin.innerHTML = playAgainHTML
    } else {
      turns--
      a = factors()
      b = factors()
      c = product(a, b)
      var guessN = 0
      var hint = gHint(a)
      problem.innerHTML = '<div class="card"><div class="card-section"></div><div class="card-section">' + c + '</div><div class="card-section a-line">&#247;</div><div class="card-section a-line">' + b + '</div><div class="answer-section"><input type="number" id="number" name="number" min="1" max="99" placeholder="0"></label></div></div><div id="answer">Submit</div>'
      let userAnswer = document.getElementById('number')
      let answerButton = document.querySelector('#answer')
      answerButton.addEventListener('click', () => {
        guessN = userAnswer.value
        if (guessN == a) {
          mainWin.innerHTML = 'Correct!<br />' + pFeedback(cheers)
          division()
        } else {
          mainWin.innerHTML = 'Try again. Here is a hint. The answer is one of these three numbers:<br /><div id="hint-series"><span class="hinted">' + hint[0] + '</span><span class="hinted">' + hint[1] + '</span><span class="hinted">' + hint[2] + '</span></div>'
        }
      })
    }
  }

  // this starts main sequence
  mainWin.innerHTML = 'Would you like to practice multiplication or division?<form id="formselection"><div id="problem-selection"><label for="multiplication"><input type="radio" id="multiplication" class="input-radio" value="multiplication" name="problem-selection">Multiplication </label><label for="division"><input type="radio" id="division" class="input-radio" value="division" name="problem-selection">Division</label></div></label><div id="user-turns">Submit</div></div></form>'
  const userTurns = document.querySelector('#user-turns')
  const userSelection = document.getElementsByName('problem-selection')
  userTurns.addEventListener('click', () => {
    choice = problemSelection(userSelection)
    mainWin.innerHTML = ''
    turns = 10
    if (choice === 'multiplication') {
      multiplication()
    } else if (choice === 'division') {
      division()
    }
  })
})
