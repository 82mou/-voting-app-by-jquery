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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


/*
 * 初期化
 */
var database = firebase.database();
var refComment = database.ref('comment');
var refTitle = database.ref('title');
var refCount = database.ref('count');
var refName = database.ref('name');
var refSound = database.ref('sound');
var refPushComment = database.ref('pushComment');
var refCountStop = database.ref('countStop');
var refView = database.ref('view');
var $titleForm = $('#js-title-form');
var $title = $('.js-title');
var $submitTitle = $('.js-submit-title');
var title = void 0;
var $nameFormA = $('#js-name-form-a');
var $nameA = $('.js-name-a');
var $submitNameA = $('.js-submit-name-a');
var nameA = void 0;
var $nameFormB = $('#js-name-form-b');
var $nameB = $('.js-name-b');
var $submitNameB = $('.js-submit-name-b');
var nameB = void 0;
var $nameFormC = $('#js-name-form-c');
var $nameC = $('.js-name-c');
var $submitNameC = $('.js-submit-name-c');
var nameC = void 0;
var $nameFormD = $('#js-name-form-d');
var $nameD = $('.js-name-d');
var $submitNameD = $('.js-submit-name-d');
var nameD = void 0;
var $commentPool = $('.js-comment-pool');
var commentObj = {};
var commentKey = 0;
var $pushCommentForm = $('#js-push-comment-form');
var $pushComment = $('.js-push-comment');
var $pushCommentSubmit = $('.js-push-comment-submit');
var pushComment = void 0;

var $countViewSwitch = $('#js-count-view-switch');
var $countSwitch = $('#js-count-switch');

var $btnClear = $('.js-btn-clear');
var $btnAllClear = $('.js-btn-all-clear');
var $btnCommentClear = $('.js-btn-comment-clear');

var $sound = $('.js-sound');

/*
 * View
 * コメントプール表示
 * エスケープ関数
 * ・サウンド設定
 */

var defSound = function defSound(soundObj) {
  if (soundObj.id === 'soundA') {
    $('#js-name-form-a').find('.js-sound').each(function () {
      if (soundObj.value === '') {
        $(this).prop('checked', true);
      } else if (parseInt($(this).val(), 10) == soundObj.value) {
        $(this).prop('checked', true);
      }
    });
  } else if (soundObj.id === 'soundB') {
    $('#js-name-form-b').find('.js-sound').each(function () {
      if (soundObj.value === '') {
        $(this).prop('checked', true);
      } else if (parseInt($(this).val(), 10) == soundObj.value) {
        $(this).prop('checked', true);
      }
    });
  } else if (soundObj.id === 'soundC') {
    $('#js-name-form-c').find('.js-sound').each(function () {
      if (soundObj.value === '') {
        $(this).prop('checked', true);
      } else if (parseInt($(this).val(), 10) == soundObj.value) {
        $(this).prop('checked', true);
      }
    });
  } else if (soundObj.id === 'soundD') {
    $('#js-name-form-d').find('.js-sound').each(function () {
      if (soundObj.value === '') {
        $(this).prop('checked', true);
      } else if (parseInt($(this).val(), 10) == soundObj.value) {
        $(this).prop('checked', true);
      }
    });
  }
};

var sound = function sound(soundObj) {
  var _loop = function _loop(key) {
    if (key === 'soundA') {
      $('#js-name-form-a').find('.js-sound').each(function () {
        if (soundObj[key] === '') {
          $(this).prop('checked', true);
        } else if (parseInt($(this).val(), 10) == soundObj[key]) {
          $(this).prop('checked', true);
        }
      });
    } else if (key === 'soundB') {
      $('#js-name-form-b').find('.js-sound').each(function () {
        if (soundObj[key] === '') {
          $(this).prop('checked', true);
        } else if (parseInt($(this).val(), 10) == soundObj[key]) {
          $(this).prop('checked', true);
        }
      });
    } else if (key === 'soundC') {
      $('#js-name-form-c').find('.js-sound').each(function () {
        if (soundObj[key] === '') {
          $(this).prop('checked', true);
        } else if (parseInt($(this).val(), 10) == soundObj[key]) {
          $(this).prop('checked', true);
        }
      });
    } else if (key === 'soundD') {
      $('#js-name-form-d').find('.js-sound').each(function () {
        if (soundObj[key] === '') {
          $(this).prop('checked', true);
        } else if (parseInt($(this).val(), 10) == soundObj[key]) {
          $(this).prop('checked', true);
        }
      });
    }
  };

  for (var key in soundObj) {
    _loop(key);
  }
};

var defRenderComment = function defRenderComment(commentObj) {
  $commentPool.append('<li><p class="comment-pool__text">' + escapeHtml(commentObj.value.comment) + '</p><button type="button" class="btn btn-outline-primary comment-pool-btn js-comment-pool-btn" value="' + commentObj.value.comment + '">\u5165\u529B</button></li>');
};
var renderComment = function renderComment(commentObj) {
  // 一旦全てを初期化
  $commentPool.empty();

  for (var key in commentObj) {
    $commentPool.append('<li><p class="comment-pool__text">' + escapeHtml(commentObj[key].comment) + '</p><button type="button" class="btn btn-outline-primary comment-pool-btn js-comment-pool-btn" value="' + commentObj[key].comment + '">\u5165\u529B</button></li>');
  }
};

var escapeHtml = function escapeHtml(string) {
  if (typeof string !== 'string') {
    return string;
  }
  return string.replace(/[&'`"<>]/g, function (match) {
    return {
      '&': '&amp;',
      "'": '&#x27;',
      '`': '&#x60;',
      '"': '&quot;',
      '<': '&lt;',
      '>': '&gt;'
    }[match];
  });
};

/*
 * Changeイベント
 * ・集計停止
 * ・投票数表示
 */

/*
 * クリックイベント
 * ・タイトル送信
 * ・名前送信
 * ・入力クリア
 * ・オールリセット
 * ・コメント送信
 * ・初期読み込み
 * ・pushイベント検知
 */
$titleForm.on('submit', function (e) {
  e.preventDefault();
  title = $title.val();

  refTitle.update({
    title: title
  }).then(function (res) {
    //console.log(res);
  });
});

$nameFormA.on('submit', function (e) {
  e.preventDefault();
  nameA = $nameA.val();
  refName.update({
    a: nameA
  }).then(function (res) {
    //console.log(res);
  });
});

$nameFormB.on('submit', function (e) {
  e.preventDefault();
  nameB = $nameB.val();

  refName.update({
    b: nameB
  }).then(function (res) {
    //console.log(res);
  });
});

$nameFormC.on('submit', function (e) {
  e.preventDefault();
  nameC = $nameC.val();

  refName.update({
    c: nameC
  }).then(function (res) {
    //console.log(res);
  });
});

$nameFormD.on('submit', function (e) {
  e.preventDefault();
  nameD = $nameD.val();

  refName.update({
    d: nameD
  }).then(function (res) {
    //console.log(res);
  });
});

$sound.on('change', function (e) {
  if ($(e.currentTarget).prop('checked') === false) {
    return;
  }
  var alphabet = $(e.currentTarget).data('alphabet');
  var value = $(e.currentTarget).val();
  var arg = {};
  arg['sound' + alphabet] = value;

  refSound.update(arg).then(function (res) {
    //console.log(res);
  });
});

$btnClear.on('click', function () {
  $title.val('');
  $nameA.val('');
  $nameB.val('');
  $nameC.val('');
  $nameD.val('');
  refSound.update({
    soundA: 0,
    soundB: 1,
    soundC: 2,
    soundD: 3
  });
});

$btnAllClear.on('click', function () {
  refTitle.update({
    title: ''
  });
  $title.val('');

  refName.update({
    a: '',
    b: '',
    c: '',
    d: ''
  });
  $nameA.val('');
  $nameB.val('');
  $nameC.val('');
  $nameD.val('');

  refSound.update({
    soundA: 0,
    soundB: 1,
    soundC: 2,
    soundD: 3
  });

  refCount.update({
    a: 0,
    b: 0,
    c: 0,
    d: 0
  });

  refComment.set(null);

  refPushComment.update({
    pushComment: ''
  });
  $pushComment.val('');

  refCountStop.update({
    countStop: false
  });
  $countSwitch.prop('checked', false);

  refView.update({
    view: false
  });
  $countViewSwitch.prop('checked', false);
});

$btnCommentClear.on('click', function () {
  refComment.set(null);

  refPushComment.update({
    pushComment: ''
  });
  $pushComment.val('');
});

$countViewSwitch.on('change', function (e) {
  if ($(e.currentTarget).prop('checked') === true) {
    refView.update({
      view: true
    }).then(function (res) {
      //console.log(res);
    });
  } else {
    refView.update({
      view: false
    }).then(function (res) {
      //console.log(res);
    });
  }
});

$countSwitch.on('change', function (e) {
  if ($(e.currentTarget).prop('checked') === true) {
    refCountStop.update({
      countStop: true
    }).then(function (res) {
      //console.log(res);
    });
  } else {
    refCountStop.update({
      countStop: false
    }).then(function (res) {
      //console.log(res);
    });
  }
});

$pushCommentForm.on('submit', function (e) {
  e.preventDefault();
  //pushComment = escapeHtml($pushComment.val());

  refPushComment.update({
    pushComment: $pushComment.val()
  }).then(function (res) {
    //console.log(res);
  });
});

$(document).on('click', '.js-comment-pool-btn', function (e) {
  $pushComment.val($(e.currentTarget).val());
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

refComment.on("child_added", function (snapshot) {
  // データベースと同期
  //commentObj[snapshot.key] = snapshot.val();

  defRenderComment({
    id: snapshot.key,
    value: snapshot.val()
  });
});

refComment.on("value", function (snapshot) {
  renderComment(snapshot.val());
});

refView.on("child_added", function (snapshot) {
  if (snapshot.val() === true) {
    $countViewSwitch.prop('checked', true);
  }
});

refView.on("value", function (snapshot) {
  if (snapshot.val().countStop === true) {
    $countViewSwitch.prop('checked', true);
  }
});

refCountStop.on("child_added", function (snapshot) {
  if (snapshot.val() === true) {
    $countSwitch.prop('checked', true);
  }
});

refCountStop.on("value", function (snapshot) {
  if (snapshot.val().countStop === true) {
    $countSwitch.prop('checked', true);
  }
});

/***/ }
/******/ ]);
//# sourceMappingURL=maps/controlpanel.map