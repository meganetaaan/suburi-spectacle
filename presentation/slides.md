# Chapter10
Perfect JavaScript p.266-280


## 10-1 イベントドリブンプログラミング


## 10-2 イベントハンドラ/イベントリスナの設定

下記はあまり使われない。
* 10-2-1 HTML要素の属性に指定する
* 10-2-2 DOM要素のプロパティに指定する
- 同時に一つの関数しか登録できない

addEventListener()を使う方法が主流（次スライド）


### 10-2-3 EventTarget.addEventListener()を利用する

#### イベントリスナの登録

<input type="button" id="sample10-2-3" value="sample10-2-3 button"/>
```JavaScript
var btn = document.getElementById('sample10-2-3');
btn.addEventListener('click', function() { alert('hi!')}, false);
```


#### イベントリスナの実行順序
<input type="button" id="sample10-2-3-2" value="sample10-2-3-2 button"/>
<input type="button" id="sample10-2-3-3" value="sample10-2-3-3 button"/>

```JavaScript
var btn = document.getElementById('sample10-2-3-2');
function sayHello() { alert('hello!!')};
btn.addEventListener('click', sayHello, false);
// 同じイベントリスナは無視される
btn.addEventListener('click', sayHello, false);
// フェーズが異なれば別のものとして登録される
btn.addEventListener('click', sayHello, true);
```

```JavaScript
var btn = document.getElementById('sample10-2-3-3');
btn.addEventListener('click', function() { alert('foo!')});
btn.addEventListener('click', function() { alert('bar!')});
btn.addEventListener('click', function() { alert('baz!')});
```



#### イベントリスナオブジェクト

| 用語 | 説明 |
| :- | :- |
| イベントターゲット | イベントが発火した要素<br>イベントオブジェクトのtargetプロパティで参照 |
| リスナーターゲット | イベントリスナが登録されている要素<br>イベントオブジェクトのcurrentTargetプロパティで参照 |



### 10-2-4 イベントハンドラ/イベントリスナ内でのthis（p.271）

thisはイベントハンドラを設定した要素自身になる
<input type="button" id="sample10-2-4" value="sample10-2-4 button"/>

```JavaScript
document.getElementById('sample10-2-4').onclick = function(){console.log(this)};

var obj = {
name: 'hoge',
val: 1,
handleClick: function(){console.log(this)}
};
document.getElementById('sample10-2-4').onclick = obj.handleClick
// undefined
```


## 10-3 イベント発火

mousemoveイベントが最も高頻度で発生する
<div id="sample10-3" style="width: 500px; height: 100px; border: 1px solid black">mosuemove: <span id="mouseMoveCount"></span></div>

```JavaScript
var elem = document.getElementById('sample10-3');
var mouseMoveCount = document.getElementById('mouseMoveCount');
var i = 0;
elem.addEventListener('mousemove', function(){mouseMoveCount.innerText = i++;});
```

* 標準処理のキャンセル<br>→preventDefault

<a id="fooLink" href="http://example.com">example.com</a>

```html
<a id="fooLink" href="http://example.com">example.com</a>
<script>
var link = document.getElementById('fooLink');
function sayFoo(ev) {
alert('foo');
ev.preventDefault();
}
link.addEventListener('click', sayFoo, false);
</script>
```



## 10-4 イベントの伝播

```html
<html>
<body>
<div id="foo">
<button id="bar">sample</button>
</div>
</body>
</html>
```

* キャプチャリングフェーズ(外→内)
* ターゲットフェーズ
* バブリングフェーズ(内→外)

ただし、イベントの種類によってはバブリングフェーズが無い



<div class="sample" id="sample-10-4-a">
a
<div id="sample-10-4-b">
b
<div id="sample-10-4-c">
c
</div>
</div>
</div>

```JavaScript
var sampleA = document.getElementById('sample-10-4-a');
var sampleB = document.getElementById('sample-10-4-b');
var sampleC = document.getElementById('sample-10-4-c');

sampleC.addEventListener('click', function(){console.log('c clicked');});
sampleB.addEventListener('click', function(){console.log('b clicked');});
sampleA.addEventListener('click', function(){console.log('a clicked');});
```



### 10-4-1 キャプチャリングフェーズ

* 使い所はそれほど多くないが「こういうフェーズがある」ということは知っておこう
* バブリングしないイベントを親DOMから監視したい場合など
- http://qa.itmedia.co.jp/qa7482362.html



<div class="sample" id="sample-10-4-1-a">
a
<div id="sample-10-4-1-b">
b
<div id="sample-10-4-1-c">
c
</div>
</div>
</div>

```JavaScript
var sampleA = document.getElementById('sample-10-4-1-a');
var sampleB = document.getElementById('sample-10-4-1-b');
var sampleC = document.getElementById('sample-10-4-1-c');

sampleC.addEventListener('click', function(){console.log('c clicked');});
sampleB.addEventListener('click', function(ev){
console.log('b clicked');
ev.stopPropagation();
}, true);
sampleA.addEventListener('click', function(){console.log('a clicked');});

```



### 10-4-4 キャンセル

* 伝播のキャンセル<br>→stopPropagation/stopImmediatePropagation
- Immediate~は同じターゲットに登録された<br>他のイベントリスナもキャンセルされる

<input type="button" id="foo" value="foo" />
```JavaScript
var btn = document.getElementById('foo');
function sayFoo(ev) {
alert('foo');
ev.stopPropagation();
}
function sayBar(ev) {
alert('bar');
ev.stopImmediatePropagation();
}
function sayBaz(ev) {
alert('baz');
}
btn.addEventListener('click', sayFoo, false);
btn.addEventListener('click', sayBar, false);
btn.addEventListener('click', sayBaz, false);
```





### 10-5 イベントが持つ要素

#### イベントインターフェースのプロパティ一覧

| プロパティ | 説明 |
| : | : |
| type | イベントタイプの名前 |
| target | イベントを発火した要素への参照 |
| currentTarget | 現在処理を行っているイベントリスナが登録されている要素 |
| eventPhase | イベント伝播のどのフェーズにあるか |
| timeStamp | イベントの発生時間 |
| bubbles | バブリングフェーズならtrue |
| cancelable | preventDefault()が実行できればtrue |



### 10-6 標準イベント

書籍を参照

* submitのデフォルト挙動



### 10-7 独自イベント

* dispatchEventは同期的に実行される点に注意
* なぜイベントを使うか?
- モジュール間の密結合を防ぐ
- 他のモジュールとの連携
