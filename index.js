const idsFromHTML = {
  firstLoadingImage: document.getElementById("firstLoadingImageID"),
  mainContainer: document.getElementById("middleContainerID"),
  playBoxMainContainer: document.getElementById("playBoxMainContainerID"),
  playBoxSubMainContainer: document.getElementById("playBoxSubMainContainerID"),
  gameOverPage: document.getElementById("replacableElementsID"),
  declareWinnerSection: document.getElementById("declareWinnerID"),
  timerOfX: document.getElementById("timerXID"),
  timerOf0: document.getElementById("timer0ID"),
  choiceIndicatorOfX: document.getElementById("choiceIndicatorXID"),
  choiceIndicatorOf0: document.getElementById("choiceIndicator0ID"),
  videoX: document.getElementById("videoX"),
  canvasX: document.getElementById("canvasX"),
  video0: document.getElementById("video0"),
  canvas0: document.getElementById("canvas0"),
  cameraIconOfX: document.getElementById("cameraXID"),
  clickPhotoBtnOfX: document.getElementById("clickPhotoX"),
  cameraIconOf0: document.getElementById("camera0ID"),
  clickPhotoBtnOf0: document.getElementById("clickPhoto0"),
  bacVideo: document.getElementById("videoContainerID"),
  lastPageResultImage: document.getElementById("lastPageResultImageID"),
  lastPagePlayAgainBtnID: document.getElementById("lastPageHomeBtnID"),
  tossPage: document.getElementById("replacableElementsTwoID"),
  startGameOnTossPage: document.getElementById(
    "continueFromTossPageToGamePageID"
  ),
  tossWinnerDisplayOnTossPage: document.getElementById(
    "displayTossWinnerOnTossPageID"
  ),
  tossBtnOnTossPage: document.getElementById("tossButtonID"),
  displayAboutTossBtnOnTossPage: document.getElementById(
    "displayAboutTossBtnID"
  ),
  tossContentOnTossPageID: document.getElementById("tossContentID"),
  music: document.getElementById("introMusicID"),
};
var boxNum = 0;
var playBoxStageOne = "";
var playBoxs = "";
var playBoxsContent = "";
var player;
var timer = 0;
var play = 0;
var playerXScore = 0;
var player0Score = 0;
var myInterval;
var timerCount = 0;
var boxsContent;
var resultArray = new Array();
var takeUserXName;
var takeUser0Name;
var imageXDataUrl;
var image0DataUrl;
var leagueCount = 0;
var leagueWinnerXCount = 0;
var leagueWinner0Count = 0;
var leagueWinnerDrawCount = 0;
var logicIndicator;
var result;
var resultArrayIDs;

// On Clicking the PLAY Btn in First Loading Page.
function goToTakeUserName() {
  idsFromHTML.firstLoadingImage.style.display = "none";
  document.getElementById("replacableElementsThreeID").style.display = "flex";
  idsFromHTML.bacVideo.innerHTML = `<video autoplay muted loop id="videoBackground">
                <source src="/videoFiles/backgroundTwo.mp4" type="video/mp4">
            </video>`;
}

// On Click of Camera Icon in user name input page.
async function openCamera(player) {
  if (player == "X") {
    idsFromHTML.canvasX.style.display = "none";
    idsFromHTML.videoX.style.display = "inline";
    idsFromHTML.cameraIconOfX.style.display = "none";
    idsFromHTML.clickPhotoBtnOfX.style.display = "inline";
    document.getElementById("iconFirstXID").style.display = "none";
    let stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    idsFromHTML.videoX.srcObject = stream;
  } else if (player == "0") {
    idsFromHTML.canvas0.style.display = "none";
    idsFromHTML.video0.style.display = "inline";
    idsFromHTML.cameraIconOf0.style.display = "none";
    idsFromHTML.clickPhotoBtnOf0.style.display = "inline";
    document.getElementById("iconFirst0ID").style.display = "none";
    let stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    idsFromHTML.video0.srcObject = stream;
  }
}

// On Clicking the "Click Photo" Btn in user name input page.
function takePicture(player) {
  if (player == "X") {
    idsFromHTML.canvasX.style.display = "inline";
    idsFromHTML.canvasX
      .getContext("2d")
      .drawImage(
        idsFromHTML.videoX,
        0,
        0,
        idsFromHTML.canvasX.width,
        idsFromHTML.canvasX.height
      );
    imageXDataUrl = idsFromHTML.canvasX.toDataURL("imageX/jpeg");
    idsFromHTML.videoX.style.display = "none";
    idsFromHTML.clickPhotoBtnOfX.style.display = "none";
    idsFromHTML.cameraIconOfX.style.display = "inline";
  } else if (player == "0") {
    idsFromHTML.canvas0.style.display = "inline";
    idsFromHTML.canvas0
      .getContext("2d")
      .drawImage(
        idsFromHTML.video0,
        0,
        0,
        idsFromHTML.canvas0.width,
        idsFromHTML.canvas0.height
      );
    image0DataUrl = idsFromHTML.canvas0.toDataURL("image0/jpeg");
    idsFromHTML.video0.style.display = "none";
    idsFromHTML.clickPhotoBtnOf0.style.display = "none";
    idsFromHTML.cameraIconOf0.style.display = "inline";
  }
}

// On Clicking the "Continue" Btn on the user input page.
function goToToss() {
  takeUserXName = document.getElementById("userXNameInputID").value;
  takeUser0Name = document.getElementById("user0NameInputID").value;
  document
    .getElementById("userNameInputPageHeadingID")
    .classList.remove("userNameInputPageHeading");

  if (takeUser0Name && takeUserXName) {
    idsFromHTML.tossPage.style.display = "flex";
    idsFromHTML.startGameOnTossPage.style.display = "none";
    idsFromHTML.tossWinnerDisplayOnTossPage.style.display = "none";
    idsFromHTML.tossBtnOnTossPage.style.display = "inline";
    idsFromHTML.displayAboutTossBtnOnTossPage.style.display = "inline";
    idsFromHTML.tossContentOnTossPageID.style.display = "none";

    idsFromHTML.tossBtnOnTossPage.disabled = false;
    document.getElementById("replacableElementsThreeID").style.display = "none";

    document.getElementById("playerGivenNameInGamePageXID").innerText =
      takeUserXName;
    document.getElementById("playerGivenNameInGamePage0ID").innerText =
      takeUser0Name;
  } else {
    document
      .getElementById("userNameInputPageHeadingID")
      .classList.add("userNameInputPageHeading");
  }
}

// On Clicking the "Start Toss" Btn on the Toss page.
function onClickingTossBtn() {
  var abc = 0;
  var tossTimeInterval = setInterval(displayTossTimer, 200);
  player = Math.floor(Math.random() * 2) + 1;
  result = 0;

  function displayTossTimer() {
    abc += 1;
    player == 1 ? (player = 2) : (player = 1);
    idsFromHTML.tossContentOnTossPageID.style.display = "flex";
    if (player == 1) {
      idsFromHTML.tossContentOnTossPageID.innerText = "X";
    } else if (player == 2) {
      idsFromHTML.tossContentOnTossPageID.innerText = "0";
    }
    idsFromHTML.tossBtnOnTossPage.disabled = true;
    if (abc == 10) {
      clearInterval(tossTimeInterval);
      idsFromHTML.startGameOnTossPage.style.display = "inline";
      idsFromHTML.displayAboutTossBtnOnTossPage.style.display = "none";
      idsFromHTML.tossBtnOnTossPage.style.display = "none";
      idsFromHTML.tossWinnerDisplayOnTossPage.style.display = "inline";

      if (player == 1) {
        idsFromHTML.tossWinnerDisplayOnTossPage.innerText = `${takeUserXName} - (Player X) WON the TOSS`;
      } else if (player == 2) {
        idsFromHTML.tossWinnerDisplayOnTossPage.innerText = `${takeUser0Name} - (Player 0) WON the TOSS`;
      }
    }
  }

  idsFromHTML.music.innerHTML = `<audio autoplay>
                <source src="audioFiles/secondIntro.mp3" type="audio/mp3" id="">
            </audio>`;
}

// On Clicking the "Start Game" Btn on the Toss page.
function displayPlayBox() {
  clearInterval(myInterval);
  document.getElementById("leagueCountOnPlayGamePageID").innerText = `League ${
    leagueCount + 1
  }`;
  document.getElementById(
    "points0OnPlayGamePageID"
  ).innerText = `Points of 0 is : ${leagueWinner0Count}`;
  document.getElementById(
    "pointsXOnPlayGamePageID"
  ).innerText = `Points of X is : ${leagueWinnerXCount}`;
  if (image0DataUrl) {
    document.getElementById("palyGamePageImage0").src = image0DataUrl;
  }
  if (imageXDataUrl) {
    document.getElementById("palyGamePageImageX").src = imageXDataUrl;
  }

  idsFromHTML.tossPage.style.display = "none";
  idsFromHTML.mainContainer.style.display = "flex";
  timer = 0;
  boxNum = 0;
  play = 0;
  playerXScore = 0;
  player0Score = 0;

  if (!idsFromHTML.playBoxSubMainContainer) {
    idsFromHTML.playBoxSubMainContainer = document.createElement("div");
    idsFromHTML.playBoxSubMainContainer.setAttribute(
      "id",
      "playBoxSubMainContainerID"
    );
    idsFromHTML.playBoxMainContainer.appendChild(
      idsFromHTML.playBoxSubMainContainer
    );
  }

  for (let i = 1; i <= 3; i++) {
    // Creating a Second container for the boxes :
    playBoxStageOne = document.createElement("div");
    playBoxStageOne.setAttribute("id", `playBoxStageOneID${i}`);
    playBoxStageOne.classList.add("playBoxStageOneClass");
    idsFromHTML.playBoxSubMainContainer.appendChild(playBoxStageOne);

    for (let j = 1; j <= 3; j++) {
      // Creating the boxes :
      playBoxs = document.createElement("div");
      boxNum += 1;
      playBoxs.setAttribute("id", `playBoxsID${boxNum}`);
      playBoxs.classList.add(
        "playBoxsClass",
        `playBoxsClassRow${j}`,
        `playBoxsClassColumn${i}`
      );
      playBoxs.addEventListener("click", displayElementInBoxOnClick);
      playBoxsContent = document.createTextNode("");
      playBoxs.appendChild(playBoxsContent);
      playBoxStageOne.appendChild(playBoxs);
    }
  }
  timerFunction();
}

// Timer Part on tha main play game page :
function timerFunction() {
  myInterval = setInterval(displayTimer, 1000);
  timerCount = 0;

  function displayTimer() {
    timerCount += 1;
    if (player == 1) {
      idsFromHTML.timerOfX.innerText = timerCount;
      idsFromHTML.timerOf0.innerText = 0;

      idsFromHTML.choiceIndicatorOfX.innerText = "Your Chance";
      idsFromHTML.choiceIndicatorOf0.innerText = "";
      idsFromHTML.choiceIndicatorOfX.style.color = "yellow";

      document.getElementById("logoXID").classList.add("logoHighlight");
      document.getElementById("logo0ID").classList.remove("logoHighlight");

      idsFromHTML.music.innerHTML = `<audio autoplay>
                <source src="audioFiles/time.mp3" type="audio/mp3" id="">
            </audio>`;

      if (play == 1) {
        play = 0;
      }
    } else if (player == 2) {
      idsFromHTML.timerOf0.innerText = timerCount;
      idsFromHTML.timerOfX.innerText = 0;

      idsFromHTML.choiceIndicatorOf0.innerText = "Your Chance";
      idsFromHTML.choiceIndicatorOfX.innerText = "";
      idsFromHTML.choiceIndicatorOf0.style.color = "yellow";

      document.getElementById("logo0ID").classList.add("logoHighlight");
      document.getElementById("logoXID").classList.remove("logoHighlight");

      idsFromHTML.music.innerHTML = `<audio autoplay>
                <source src="audioFiles/time.mp3" type="audio/mp3" id="">
            </audio>`;

      if (play == 1) {
        play = 0;
      }
    }
    if (timerCount > 9) {
      clearInterval(myInterval);
      timerCount = 0;
      player == 1 ? (player = 2) : (player = 1);
      if (play == 1) {
        play = 0;
      }
      if (timer < 90) {
        timerFunction();
      }
    }
  }
}

// Display Part - Displaying the squares for the game :
function displayElementInBoxOnClick() {
  if (player == 1 && play == 0) {
    boxsContent = document.createTextNode("X");
    if (document.getElementById(this.id).innerText.length < 1) {
      document.getElementById(this.id).appendChild(boxsContent);
      play = 1;
      timer += 10;
      player = 2;
      timerCount = 0;
    }
  } else if (player == 2 && play == 0) {
    boxsContent = document.createTextNode("0");
    if (document.getElementById(this.id).innerText.length < 1) {
      document.getElementById(this.id).appendChild(boxsContent);
      play = 1;
      timer += 10;
      player = 1;
      timerCount = 0;
    }
  }
  if (result == 0) {
    logicPart();
  }
}

// Logic validation function called by the logicPart() function :
function logicFunction(firstIndex, secondIndex, thirdIndex) {
  if (
    resultArray[firstIndex] == "X" &&
    resultArray[secondIndex] == "X" &&
    resultArray[thirdIndex] == "X"
  ) {
    playerXScore = 1;
    colorDisplayAfterWinning(firstIndex, secondIndex, thirdIndex);
    logicIndicator = "XWON";
  } else if (
    resultArray[firstIndex] == "0" &&
    resultArray[secondIndex] == "0" &&
    resultArray[thirdIndex] == "0"
  ) {
    player0Score = 1;
    colorDisplayAfterWinning(firstIndex, secondIndex, thirdIndex);
    logicIndicator = "0WON";
  }
  return logicIndicator;
}

// Function to display the color of the box after winning the game :
function colorDisplayAfterWinning(firstIndex, secondIndex, thirdIndex) {
  document.getElementById(resultArrayIDs[firstIndex]).style.color = "yellow";
  document.getElementById(resultArrayIDs[secondIndex]).style.color = "yellow";
  document.getElementById(resultArrayIDs[thirdIndex]).style.color = "yellow";
}

// Logic Part :
function logicPart() {
  // There are total 8 test cases :
  logicIndicator = "";
  resultArray = [];
  resultArrayIDs = [];
  for (let i = 1; i <= 9; i++) {
    resultArray.push(document.getElementById(`playBoxsID${i}`).innerText);
    resultArrayIDs.push(`playBoxsID${i}`);
  }

  // LOGIC PART USING IF CONDITION :
  // if (logicIndicator) {
  //     logicFunction(0, 1, 2);
  //     logicFunction(0, 3, 6);
  //     logicFunction(0, 4, 8);
  //     logicFunction(3, 4, 5);
  //     logicFunction(6, 7, 8);
  //     logicFunction(6, 4, 2);
  //     logicFunction(1, 4, 7);
  //     logicFunction(2, 5, 8);
  // }

  // LOGIC PART USING TERNARY OPERATOR :
  let finalLogicValue = logicFunction(0, 1, 2)
    ? logicFunction(0, 1, 2)
    : logicFunction(0, 3, 6)
    ? logicFunction(0, 3, 6)
    : logicFunction(0, 4, 8)
    ? logicFunction(0, 4, 8)
    : logicFunction(3, 4, 5)
    ? logicFunction(3, 4, 5)
    : logicFunction(6, 7, 8)
    ? logicFunction(6, 7, 8)
    : logicFunction(6, 4, 2)
    ? logicFunction(6, 4, 2)
    : logicFunction(1, 4, 7)
    ? logicFunction(1, 4, 7)
    : logicFunction(2, 5, 8)
    ? logicFunction(2, 5, 8)
    : "Draw";

  // Final Checking :
  if (finalLogicValue == "XWON") {
    clearInterval(myInterval);
    result = 1;
    setTimeout(function () {
      endGamePage("X");
    }, 2000);
  } else if (finalLogicValue == "0WON") {
    clearInterval(myInterval);
    result = 1;
    setTimeout(function () {
      endGamePage("0");
    }, 2000);
  } else if (timer == 90) {
    clearInterval(myInterval);
    setTimeout(function () {
      endGamePage("Draw");
    }, 2000);
  }
}

// Function for the Last page of the game (i.e. result display page) :
function endGamePage(val) {
  idsFromHTML.gameOverPage.style.display = "flex";
  idsFromHTML.mainContainer.style.display = "none";
  leagueCount += 1;
  if (leagueCount <= 5) {
    if (val == "X") {
      endGamePageXWinner();
    } else if (val == "0") {
      endGamePage0Winner();
    } else {
      idsFromHTML.lastPageResultImage.src = "/imgFiles/user2.png";

      leagueWinnerDrawCount += 1;
      idsFromHTML.declareWinnerSection.innerText = `League ${leagueCount} was Draw`;
      if (leagueWinnerDrawCount >= 3) {
        idsFromHTML.declareWinnerSection.innerText = `Finally No one Wins the Game`;
        idsFromHTML.lastPagePlayAgainBtnID.style.display = "none";
        idsFromHTML.lastPageResultImage.src = "/imgFiles/user2.png";
      }
    }
  } else {
    if (val == "X") {
      endGamePageXWinner();
    } else if (val == "0") {
      endGamePage0Winner();
    } else {
      idsFromHTML.declareWinnerSection.innerText = `Finally No one Wins the Game`;
      idsFromHTML.lastPageResultImage.src = "/imgFiles/user2.png";
      idsFromHTML.lastPagePlayAgainBtnID.style.display = "none";
    }
  }

  idsFromHTML.lastPagePlayAgainBtnID.addEventListener(
    "click",
    lastPageHomeBtnOnClick
  );
  idsFromHTML.music.innerHTML = `<audio autoplay>
                <source src="audioFiles/success.mp3" type="audio/mp3" id="">
            </audio>`;
  idsFromHTML.bacVideo.innerHTML = ``;
}

function endGamePageXWinner() {
  idsFromHTML.lastPageResultImage.src = "/imgFiles/user2.png";
  if (imageXDataUrl) {
    idsFromHTML.lastPageResultImage.src = imageXDataUrl;
  }
  leagueWinnerXCount += 1;

  idsFromHTML.declareWinnerSection.innerText = `${takeUserXName} Won the League ${leagueCount}`;
  if (leagueWinnerXCount >= 3) {
    idsFromHTML.declareWinnerSection.innerText = `Finally ${takeUserXName} Won the Game`;
    idsFromHTML.lastPagePlayAgainBtnID.style.display = "none";
    idsFromHTML.lastPageResultImage.src = "/imgFiles/user2.png";
    if (imageXDataUrl) {
      idsFromHTML.lastPageResultImage.src = imageXDataUrl;
    }
  }
}

function endGamePage0Winner() {
  idsFromHTML.lastPageResultImage.src = "/imgFiles/user2.png";
  if (image0DataUrl) {
    idsFromHTML.lastPageResultImage.src = image0DataUrl;
  }
  leagueWinner0Count += 1;

  idsFromHTML.declareWinnerSection.innerText = `${takeUser0Name} Won the League ${leagueCount}`;
  if (leagueWinner0Count >= 3) {
    idsFromHTML.declareWinnerSection.innerText = `Finally ${takeUser0Name} Won the Game`;
    idsFromHTML.lastPagePlayAgainBtnID.style.display = "none";
    idsFromHTML.lastPageResultImage.src = "/imgFiles/user2.png";
    if (image0DataUrl) {
      idsFromHTML.lastPageResultImage.src = image0DataUrl;
    }
  }
}

// On Clicking the Restart Game Btn in last page :
function lastPageHomeBtnOnClick() {
  idsFromHTML.music.innerHTML = `<audio autoplay loop>
                <source src="audioFiles/mainIntroAudio.mp3" type="audio/mp3" id="">
            </audio>`;
  idsFromHTML.bacVideo.innerHTML = `<video autoplay muted loop id="videoBackground">
                <source src="/videoFiles/backgroundTwo.mp4" type="video/mp4">
            </video>`;
  idsFromHTML.gameOverPage.style.display = "none";
  idsFromHTML.playBoxMainContainer.removeChild(
    idsFromHTML.playBoxSubMainContainer
  );
  idsFromHTML.playBoxSubMainContainer = "";

  goToToss();

  timer = 0;
  timerCount = 0;
  player = Math.floor(Math.random() * 2) + 1;
}

// 1 == X
// 2 == 0
