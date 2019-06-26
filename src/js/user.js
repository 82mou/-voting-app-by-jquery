const TRANSITION_END = 'transitionend';// 2つ指定していると2回バインドされる
const ANIMATION_END = 'animationend';// 2つ指定していると2回バインドされる

/*
 * 初期化
 */
let database = firebase.database();
let refTitle = database.ref('title');
let refCount = database.ref('count');
let refName = database.ref('name');
let refComment = database.ref('comment');
let refCountStop = database.ref('countStop');
let refView = database.ref('view');
let $title = $('.js-title');
let titleObj = {};
let nameObj = {};
let $post = $('.js-post');
let $submit = $('.js-submit');
let $form = $('#js-form');
let countObj = {};
let commentObj = {};

let $count = $('.js-count');

let countStop = false;

let $layer = $('.js-layer');
let $layerLoading = $('.js-layer-loading');
let $layerCountStop = $('.js-layer-count-stop');

/*
 * View
 * ・タイトル表示
 * ・カウント表示
 * ・名前表示
 */

let defRenderTitle = (titleObj) => {
  $title.text(titleObj.value);
};

let renderTitle = (titleObj) => {
  $title.text(titleObj.title);
};

let defRenderCount = (countObj) => {
  let $targetCountObj = $(`.js-count-${countObj.id}`);

  $targetCountObj.text(countObj.value);
  checkFontSize($targetCountObj);
};

let renderCount = (countObj) => {
  for (let key in countObj){
    if(parseInt($(`.js-count-${key}`).text(), 10) !== countObj[key]) {
      let $targetCountObj = $(`.js-count-${key}`);
      let $targetCountObjPost = $targetCountObj.closest('.js-post');

      $targetCountObjPost.addClass('is-animated');
      $targetCountObj.text(countObj[key]);
      checkFontSize($targetCountObj);
    }
  }
};

let defRenderName = (nameObj) => {
  $(`.js-name-${nameObj.id}`).text(nameObj.value);
};

let renderName = (nameObj) => {
  for (let key in nameObj){
    $(`.js-name-${key}`).text(nameObj[key]);
  }
};

let postActionCount = (initial, countVal) => {
  let arg = {};
  arg[initial] = countVal;
  show();
    refCount.update(arg)
      .then((res)=>{
        setTimeout(() => {
          hide();
        }, 300);
      });
};

let postActionComment = (commentVal) => {
  let arg = {};
  arg['comment'] = commentVal;

  refComment.push(arg)
    .then((res)=>{
      //console.log(res);
    });
};

/*
 * カウント表示/非表示判定
 */

/*
 * 集計停止判定
 */

/*
 * クリックイベント
 * ・アルファベット桜花
 * ・コメント送信
 * ・初期読み込み
 * ・pushイベント検知
 */
$post.on('click', (e) => {
  if (countStop) {
    return;
  }
  let initial = $(e.currentTarget).data('initial');
  countObj[initial] = countObj[initial] + 1;
  postActionCount(initial, countObj[initial]);
});

$form.on('submit', (e) => {
  e.preventDefault();
  let commentVal = $(e.currentTarget).find('.js-comment').val();

  postActionComment(commentVal);

  // データベースに送信後は値を空にする
  $(e.currentTarget).find('.js-comment').val('');
});

refTitle.on("child_added", (snapshot) => {
  // データベースと同期
  //titleObj[snapshot.key] = snapshot.val();
  //renderTitle(titleObj);
  defRenderTitle({
    id: snapshot.key,
    value: snapshot.val()
  });
});

refTitle.on("value", (snapshot) => {
  renderTitle(snapshot.val());
});

//refName.on("child_added", (snapshot) => {
//  // データベースと同期
//  nameObj[snapshot.key] = snapshot.val();
//  renderName(nameObj);
//});

refName.on("child_added", (snapshot) => {
  // データベースと同期
  //nameObj[snapshot.key] = snapshot.val();

  defRenderName({
    id: snapshot.key,
    value: snapshot.val()
  });
});

refName.on("value", (snapshot) => {
  renderName(snapshot.val());
});

refCount.on("child_added", (snapshot) => {
  console.log('hoge');
  // データベースと同期
  countObj[snapshot.key] = snapshot.val();

  defRenderCount({
    id: snapshot.key,
    value: snapshot.val()
  });
});

refCount.on("value", (snapshot) => {
  console.log('fuga');
  let snapshotObj = snapshot.val();

  // データベースと同期
  for (let key in snapshotObj){
    countObj[key] = snapshotObj[key];
  }

  renderCount(snapshot.val());
});

refView.on("child_added", (snapshot) => {
  if(snapshot.val() === true) {
    $count.removeClass('is-hide');
  } else {
    $count.addClass('is-hide');
  }
});

refView.on("value", (snapshot) => {
  if(snapshot.val().view === true) {
    $count.removeClass('is-hide');
  } else {
    $count.addClass('is-hide');
  }
});

refCountStop.on("child_added", (snapshot) => {
  if(snapshot.val() === true) {
    countStop = true;
    showCountStop();
  } else {
    countStop = false;
    hideCountStop();
  }
});

refCountStop.on("value", (snapshot) => {
  if(snapshot.val().countStop === true) {
    countStop = true;
    showCountStop();
  } else {
    countStop = false;
    hideCountStop();
  }
});

/*
 * その他
 */
let checkFontSize = (targetCountObj) => {
  let $countTextLength = targetCountObj.text().length;
  if($countTextLength > 3) {
    targetCountObj.addClass('count__num--long');
  } else {
    targetCountObj.removeClass('count__num--long');
  }
};

let show = () => {
  $layer.removeClass('dn');
  $layerLoading.removeClass('dn');
  $layer.addClass('is-show');
};

let hide = () => {
  $layer.removeClass('is-show').one(TRANSITION_END, () => {
    $layerLoading.addClass('dn');
    $layer.addClass('dn');
  });
};

let showCountStop = () => {
  $layer.removeClass('dn');
  $layerCountStop.removeClass('dn');
  $layer.addClass('is-show');
};

let hideCountStop = () => {
  $layer.removeClass('is-show').one(TRANSITION_END, () => {
    $layerCountStop.addClass('dn');
    $layer.addClass('dn');
  });
};

$post.on(ANIMATION_END, (e) => {
  $(e.currentTarget).removeClass('is-animated');
});
