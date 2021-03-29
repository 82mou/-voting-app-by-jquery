console.warn("This script is development version.");
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ 2:
/***/ function(module, exports, __webpack_require__) {

"use strict";


var TRANSITION_END = 'transitionend'; // 2つ指定していると2回バインドされる
var ANIMATION_END = 'animationend'; // 2つ指定していると2回バインドされる

/*
 * 初期化
 */
var database = firebase.database();
var refTitle = database.ref('title');
var refCount = database.ref('count');
var refName = database.ref('name');
var refSound = database.ref('sound');
var refPushComment = database.ref('pushComment');
var refView = database.ref('view');
var refCountStop = database.ref('countStop');
var $titleForm = $('#js-title-form');
var $title = $('.js-title');
var titleObj = {};
var nameObj = {};
var $post = $('.js-post');
var $pushComment = $('.js-push-comment-text');
var pushCommentObj = {};
var countObj = {};

var $count = $('.js-count');

var countStop = false;

var $layer = $('.js-layer');
var $layerCountStop = $('.js-layer-count-stop');

var silentA = false;
var silentB = false;
var silentC = false;
var silentD = false;

/*
 * View
 * ・タイトル表示
 * ・カウント表示
 * ・名前表示
 * ・サウンド設定
 * ・コメント表示
 */

var defRenderTitle = function defRenderTitle(titleObj) {
  $title.text(titleObj.value);
};

var renderTitle = function renderTitle(titleObj) {
  $title.text(titleObj.title);
};

var defRenderCount = function defRenderCount(countObj) {
  $('.js-count-' + countObj.id).text(countObj.value);
};

var renderCount = function renderCount(countObj) {
  for (var key in countObj) {
    if (parseInt($('.js-count-' + key).text(), 10) !== countObj[key]) {
      $('.js-count-' + key).text(countObj[key]);
      var $targetCountObjPost = $('.js-count-' + key).closest('.js-post');
      $targetCountObjPost.addClass('is-animated');

      if (key === 'a') {
        if (silentA === true) {
          return;
        }
        playSound(soundListA);
      } else if (key === 'b') {
        if (silentB === true) {
          return;
        }
        playSound(soundListB);
      } else if (key === 'c') {
        if (silentC === true) {
          return;
        }
        playSound(soundListC);
      } else if (key === 'd') {
        if (silentD === true) {
          return;
        }
        playSound(soundListD);
      }
    }
  }
};

var defRenderName = function defRenderName(nameObj) {
  $('.js-name-' + nameObj.id).text(nameObj.value);
};

var renderName = function renderName(nameObj) {
  for (var key in nameObj) {
    $('.js-name-' + key).text(nameObj[key]);
  }
};

var defSound = function defSound(soundObj) {
  if (soundObj.id === 'soundA') {
    if (soundObj.value === '') {
      silentA = true;
    } else {
      silentA = false;
      soundListA = soundList[soundObj.value];
    }
  } else if (soundObj.id === 'soundB') {
    if (soundObj.value === '') {
      silentB = true;
    } else {
      silentB = false;
      soundListB = soundList[soundObj.value];
    }
  } else if (soundObj.id === 'soundC') {
    if (soundObj.value === '') {
      silentC = true;
    } else {
      silentC = false;
      soundListC = soundList[soundObj.value];
    }
  } else if (soundObj.id === 'soundD') {
    if (soundObj.value === '') {
      silentD = true;
    } else {
      silentD = false;
      soundListD = soundList[soundObj.value];
    }
  }
};

var sound = function sound(soundObj) {
  for (var key in soundObj) {
    if (key === 'soundA') {
      if (soundObj[key] === '') {
        silentA = true;
      } else {
        silentA = false;
        soundListA = soundList[soundObj[key]];
      }
    } else if (key === 'soundB') {
      if (soundObj[key] === '') {
        silentB = true;
      } else {
        silentB = false;
        soundListB = soundList[soundObj[key]];
      }
    } else if (key === 'soundC') {
      if (soundObj[key] === '') {
        silentC = true;
      } else {
        silentC = false;
        soundListC = soundList[soundObj[key]];
      }
    } else if (key === 'soundD') {
      if (soundObj[key] === '') {
        silentD = true;
      } else {
        silentD = false;
        soundListD = soundList[soundObj[key]];
      }
    }
  }
};

var defRenderPushComment = function defRenderPushComment(pushCommentObj) {
  $pushComment.text(pushCommentObj.value);
  setTimeout(function () {
    $pushComment.addClass('is-animate');
  });
};

var renderPushComment = function renderPushComment(pushCommentObj) {
  $pushComment.text(pushCommentObj.pushComment);
  setTimeout(function () {
    $pushComment.addClass('is-animate');
  });
};

/*
 * サウンド
 */
var ctx = void 0,
    soundList = void 0,
    soundListA = void 0,
    soundListB = void 0,
    soundListC = void 0,
    soundListD = void 0,
    loadSound = void 0,
    playSound = void 0;

loadSound = function loadSound(sound) {
  var xml = void 0;
  xml = new XMLHttpRequest();
  xml.responseType = 'arraybuffer';
  xml.open('GET', sound.url, true);
  xml.onload = function () {
    ctx.decodeAudioData(xml.response, function (data) {
      sound.data = data;
    }, function (e) {
      //alert(e.err);
    });
  };
  xml.send();
};
playSound = function playSound(sound) {
  var bufferSource = void 0;
  if (!sound.data) {
    return;
  }
  bufferSource = ctx.createBufferSource();
  bufferSource.buffer = sound.data;
  bufferSource.connect(ctx.destination);
  bufferSource.start(0);
};
window.AudioContext = window.AudioContext || window.webkitAudioContext;
ctx = new AudioContext();
soundList = [{ url: 'https://lig824.github.io/event/public/assets/lib/media/decision13.mp3', data: null }, { url: 'https://lig824.github.io/event/public/assets/lib/media/clearing1.mp3', data: null }, { url: 'https://lig824.github.io/event/public/assets/lib/media/tin1.mp3', data: null }, { url: 'https://lig824.github.io/event/public/assets/lib/media/decision12.mp3', data: null }];
soundList.forEach(loadSound);

/*
 * カウント表示/非表示判定
 */

/*
 * クリックイベント
 * ・初期読み込み
 * ・pushイベント検知
 */
refTitle.on("child_added", function (snapshot) {
  // データベースと同期
  //titleObj[snapshot.key] = snapshot.val();
  //renderTitle(titleObj);
  defRenderTitle({
    id: snapshot.key,
    value: snapshot.val()
  });
});

refTitle.on("value", function (snapshot) {
  renderTitle(snapshot.val());
});

refName.on("child_added", function (snapshot) {
  // データベースと同期
  //nameObj[snapshot.key] = snapshot.val();

  defRenderName({
    id: snapshot.key,
    value: snapshot.val()
  });
});

refName.on("value", function (snapshot) {
  renderName(snapshot.val());
});

refCount.on("child_added", function (snapshot) {
  // データベースと同期
  //countObj[snapshot.key] = snapshot.val();

  defRenderCount({
    id: snapshot.key,
    value: snapshot.val()
  });
});

refCount.on("value", function (snapshot) {
  renderCount(snapshot.val());
});

refSound.on("child_added", function (snapshot) {
  defSound({
    id: snapshot.key,
    value: snapshot.val()
  });
});

refSound.on("value", function (snapshot) {
  sound(snapshot.val());
});

refPushComment.on("child_added", function (snapshot) {
  // データベースと同期
  //pushCommentObj[snapshot.key] = snapshot.val();
  // DBのテキストが空だったら何もしない
  if (snapshot.val() === '') {
    return;
  }
  defRenderPushComment({
    id: snapshot.key,
    value: snapshot.val()
  });
});

refPushComment.on("value", function (snapshot) {
  // DBのテキストが空だったら何もしない
  if (snapshot.val().pushComment === '') {
    return;
  }
  renderPushComment(snapshot.val());
});

refView.on("child_added", function (snapshot) {
  if (snapshot.val() === true) {
    $count.removeClass('is-hide');
  } else {
    $count.addClass('is-hide');
  }
});

refView.on("value", function (snapshot) {
  if (snapshot.val().view === true) {
    $count.removeClass('is-hide');
  } else {
    $count.addClass('is-hide');
  }
});

refCountStop.on("child_added", function (snapshot) {
  if (snapshot.val() === true) {
    countStop = true;
    showCountStop();
  } else {
    countStop = false;
    hideCountStop();
  }
});

refCountStop.on("value", function (snapshot) {
  if (snapshot.val().countStop === true) {
    countStop = true;
    showCountStop();
  } else {
    countStop = false;
    hideCountStop();
  }
});

$pushComment.on('animationend', function (e) {
  $pushComment.text('');
  refPushComment.update({
    pushComment: ''
  });
  $(e.currentTarget).removeClass('is-animate');
});

/*
 * その他
 */
var showCountStop = function showCountStop() {
  $layer.removeClass('dn');
  $layerCountStop.removeClass('dn');
  $layer.addClass('is-show');
};

var hideCountStop = function hideCountStop() {
  $layer.removeClass('is-show').one(TRANSITION_END, function () {
    $layerCountStop.addClass('dn');
    $layer.addClass('dn');
  });
};

$post.on(ANIMATION_END, function (e) {
  $(e.currentTarget).removeClass('is-animated');
});

/***/ }

/******/ });
//# sourceMappingURL=maps/screen.map