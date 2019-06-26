/*
 * 初期化
 */
let database = firebase.database();
let refComment = database.ref('comment');
let refTitle = database.ref('title');
let refCount = database.ref('count');
let refName = database.ref('name');
let refSound = database.ref('sound');
let refPushComment = database.ref('pushComment');
let refCountStop = database.ref('countStop');
let refView = database.ref('view');
let $titleForm = $('#js-title-form');
let $title = $('.js-title');
let $submitTitle = $('.js-submit-title');
let title;
let $nameFormA = $('#js-name-form-a');
let $nameA = $('.js-name-a');
let $submitNameA = $('.js-submit-name-a');
let nameA;
let $nameFormB = $('#js-name-form-b');
let $nameB = $('.js-name-b');
let $submitNameB = $('.js-submit-name-b');
let nameB;
let $nameFormC = $('#js-name-form-c');
let $nameC = $('.js-name-c');
let $submitNameC = $('.js-submit-name-c');
let nameC;
let $nameFormD = $('#js-name-form-d');
let $nameD = $('.js-name-d');
let $submitNameD = $('.js-submit-name-d');
let nameD;
let $commentPool = $('.js-comment-pool');
let commentObj = {};
let commentKey = 0;
let $pushCommentForm = $('#js-push-comment-form');
let $pushComment = $('.js-push-comment');
let $pushCommentSubmit = $('.js-push-comment-submit');
let pushComment;

let $countViewSwitch = $('#js-count-view-switch');
let $countSwitch = $('#js-count-switch');

let $btnClear = $('.js-btn-clear');
let $btnAllClear = $('.js-btn-all-clear');
let $btnCommentClear = $('.js-btn-comment-clear');

let $sound = $('.js-sound');

/*
 * View
 * コメントプール表示
 * エスケープ関数
 * ・サウンド設定
 */

let defSound = (soundObj) => {
  if(soundObj.id === 'soundA') {
    $('#js-name-form-a').find('.js-sound').each(function() {
      if(soundObj.value === '') {
        $(this).prop('checked', true);
      } else if(parseInt($(this).val(), 10) == soundObj.value) {
        $(this).prop('checked', true);
      }
    });
  } else if(soundObj.id === 'soundB') {
    $('#js-name-form-b').find('.js-sound').each(function() {
      if(soundObj.value === '') {
        $(this).prop('checked', true);
      } else if(parseInt($(this).val(), 10) == soundObj.value) {
        $(this).prop('checked', true);
      }
    });
  } else if(soundObj.id === 'soundC') {
    $('#js-name-form-c').find('.js-sound').each(function() {
      if(soundObj.value === '') {
        $(this).prop('checked', true);
      } else if(parseInt($(this).val(), 10) == soundObj.value) {
        $(this).prop('checked', true);
      }
    });
  } else if(soundObj.id === 'soundD') {
    $('#js-name-form-d').find('.js-sound').each(function() {
      if(soundObj.value === '') {
        $(this).prop('checked', true);
      } else if(parseInt($(this).val(), 10) == soundObj.value) {
        $(this).prop('checked', true);
      }
    });
  }
};

let sound = (soundObj) => {
  for (let key in soundObj){
    if(key === 'soundA') {
      $('#js-name-form-a').find('.js-sound').each(function() {
        if(soundObj[key] === '') {
          $(this).prop('checked', true);
        } else if(parseInt($(this).val(), 10) == soundObj[key]) {
          $(this).prop('checked', true);
        }
      });
    } else if(key === 'soundB') {
      $('#js-name-form-b').find('.js-sound').each(function() {
        if(soundObj[key] === '') {
          $(this).prop('checked', true);
        } else if(parseInt($(this).val(), 10) == soundObj[key]) {
          $(this).prop('checked', true);
        }
      });
    } else if(key === 'soundC') {
      $('#js-name-form-c').find('.js-sound').each(function() {
        if(soundObj[key] === '') {
          $(this).prop('checked', true);
        } else if(parseInt($(this).val(), 10) == soundObj[key]) {
          $(this).prop('checked', true);
        }
      });
    } else if(key === 'soundD') {
      $('#js-name-form-d').find('.js-sound').each(function() {
        if(soundObj[key] === '') {
          $(this).prop('checked', true);
        } else if(parseInt($(this).val(), 10) == soundObj[key]) {
          $(this).prop('checked', true);
        }
      });
    }
  }
};


let defRenderComment = (commentObj) => {
  $commentPool.append(`<li><p class="comment-pool__text">${escapeHtml(commentObj.value.comment)}</p><button type="button" class="btn btn-outline-primary comment-pool-btn js-comment-pool-btn" value="${commentObj.value.comment}">入力</button></li>`);
};
let renderComment = (commentObj) => {
  // 一旦全てを初期化
  $commentPool.empty();

  for (let key in commentObj){
    $commentPool.append(`<li><p class="comment-pool__text">${escapeHtml(commentObj[key].comment)}</p><button type="button" class="btn btn-outline-primary comment-pool-btn js-comment-pool-btn" value="${commentObj[key].comment}">入力</button></li>`);
  }
};

let escapeHtml = (string) => {
  if(typeof string !== 'string') {
    return string;
  }
  return string.replace(/[&'`"<>]/g, function(match) {
    return {
      '&': '&amp;',
      "'": '&#x27;',
      '`': '&#x60;',
      '"': '&quot;',
      '<': '&lt;',
      '>': '&gt;',
    }[match]
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
$titleForm.on('submit', (e) => {
  e.preventDefault();
  title = $title.val();

  refTitle.update({
    title: title
  })
    .then((res)=>{
      //console.log(res);
    });
});

$nameFormA.on('submit', (e) => {
  e.preventDefault();
  nameA = $nameA.val();
  refName.update({
    a: nameA
  })
    .then((res)=>{
      //console.log(res);
    });
});

$nameFormB.on('submit', (e) => {
  e.preventDefault();
  nameB = $nameB.val();

  refName.update({
    b: nameB
  })
    .then((res)=>{
      //console.log(res);
    });
});

$nameFormC.on('submit', (e) => {
  e.preventDefault();
  nameC = $nameC.val();

  refName.update({
    c: nameC
  })
    .then((res)=>{
      //console.log(res);
    });
});

$nameFormD.on('submit', (e) => {
  e.preventDefault();
  nameD = $nameD.val();

  refName.update({
    d: nameD
  })
    .then((res)=>{
      //console.log(res);
    });
});

$sound.on('change', (e) => {
  if($(e.currentTarget).prop('checked') === false) {
    return;
  }
  let alphabet = $(e.currentTarget).data('alphabet');
  let value = $(e.currentTarget).val();
  let arg = {};
  arg[`sound${alphabet}`] = value;

  refSound.update(arg)
    .then((res)=>{
      //console.log(res);
    });
});

$btnClear.on('click', () => {
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

$btnAllClear.on('click', () => {
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

$btnCommentClear.on('click', () => {
  refComment.set(null);

  refPushComment.update({
    pushComment: ''
  });
  $pushComment.val('');
});

$countViewSwitch.on('change', (e) => {
  if($(e.currentTarget).prop('checked') === true) {
    refView.update({
      view: true
    })
      .then((res)=>{
        //console.log(res);
      });
  } else {
    refView.update({
      view: false
    })
      .then((res)=>{
        //console.log(res);
      });
  }
});

$countSwitch.on('change', (e) => {
  if($(e.currentTarget).prop('checked') === true) {
    refCountStop.update({
      countStop: true
    })
      .then((res)=>{
        //console.log(res);
      });
  } else {
    refCountStop.update({
      countStop: false
    })
      .then((res)=>{
        //console.log(res);
      });
  }
});

$pushCommentForm.on('submit', (e) => {
  e.preventDefault();
  //pushComment = escapeHtml($pushComment.val());

  refPushComment.update({
    pushComment: $pushComment.val()
  })
    .then((res)=>{
      //console.log(res);
    });
});

$(document).on('click', '.js-comment-pool-btn', (e) => {
  $pushComment.val($(e.currentTarget).val());
});

refSound.on("child_added", (snapshot) => {
  defSound({
    id: snapshot.key,
    value: snapshot.val()
  });
});

refSound.on("value", (snapshot) => {
  sound(snapshot.val());
});

refComment.on("child_added", (snapshot) => {
  // データベースと同期
  //commentObj[snapshot.key] = snapshot.val();

  defRenderComment({
    id: snapshot.key,
    value: snapshot.val()
  });
});

refComment.on("value", (snapshot) => {
  renderComment(snapshot.val());
});

refView.on("child_added", (snapshot) => {
  if(snapshot.val() === true) {
    $countViewSwitch.prop('checked', true)
  }
});

refView.on("value", (snapshot) => {
  if(snapshot.val().countStop === true) {
    $countViewSwitch.prop('checked', true)
  }
});

refCountStop.on("child_added", (snapshot) => {
  if(snapshot.val() === true) {
    $countSwitch.prop('checked', true)
  }
});

refCountStop.on("value", (snapshot) => {
  if(snapshot.val().countStop === true) {
    $countSwitch.prop('checked', true)
  }
});
