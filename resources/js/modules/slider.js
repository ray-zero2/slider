// import velocity from 'velocity-animate';
export default class {
  constructor() {
    this.$sliderButtons = document.querySelectorAll('.slider_btn');
    this.$sliderWindow = document.querySelector('.slider_window');
    this.$slider_list = document.querySelector('.slider_list');
    this.$indicator = document.querySelector('.indicator');

    //指スワイプで反応するレート
    this.fps = 30;
    //スライダー画像サイズ[vw]
    this.sliderSize = 70;
    //アニメーション動作時間[ms]
    this.duration = 200;
    //スライダー画像表示番号
    this.sliderCounter = 1;
    this.previousCounter = this.sliderCounter;

    //現在の画像枚数取得
    this.numberOfImages = this.$slider_list.childElementCount;
    //タッチしたときの動きに関する部分
    this.isFinger = false;
    this.fingerPosition = {
      previous: 0,
      current: 0
    };
    this.frameTime = 1000 / this.fps;
    //初期化
    this.initialize();
    this.$dotItems = this.$indicator.childNodes;

    //イベント生成
    this.bind();
  }

  /**
   * 初期準備
   */
  initialize() {
    //最初と最後の画像を複製してリストに追加
    let $firstImage = this.$slider_list.firstElementChild.cloneNode(true);
    let $lastImage = this.$slider_list.lastElementChild.cloneNode(true);
    this.$slider_list.appendChild($firstImage);
    this.$slider_list.insertBefore(
      $lastImage,
      this.$slider_list.firstElementChild
    );

    //インジケータ作成
    this.createIndicator();

    //スライダー初期位置に移動
    let sliderFirstPosition = this.calcSliderPosition(this.sliderCounter);
    velocity(
      this.$slider_list,
      { translateX: sliderFirstPosition },
      { duration: 0 }
    );
  }

  /**
   * インジケーターの要素を作成してDOMに追加する
   * 一度フラグメントに入れてまとめてDOMへ。
   */
  createIndicator() {
    let dotFragment = document.createDocumentFragment();
    for (let i = 1; i <= this.numberOfImages; i++) {
      let $item = document.createElement('li');
      $item.dataset.number = i;
      if (i === 1) $item.classList.add('current-image-dot');
      dotFragment.appendChild($item);
    }
    this.$indicator.appendChild(dotFragment);
  }

  /**
   * スライダーの位置を返す
   * @param {Number} number - 何番目のスライドか
   */
  calcSliderPosition(number) {
    return -(number * this.sliderSize) + 'vw';
  }

  /**
   * イベント設定
   */
  bind() {
    [...this.$sliderButtons].forEach($element => {
      $element.addEventListener('click', () => {
        velocity(this.$slider_list, 'stop', true);
        $element.dataset.order === 'after'
          ? this.nextData()
          : this.previousData();
      });
    });

    [...this.$dotItems].forEach($element => {
      $element.addEventListener('click', event => {
        const SELECT_NUMBER = event.target.dataset.number;
        this.previousCounter = this.sliderCounter;
        this.sliderCounter = SELECT_NUMBER;
        this.changeActiveIndicator();
        this.moveSlide();
      });
    });

    this.$sliderWindow.addEventListener('touchstart', () => {
      let touchObject = event.changedTouches[0];
      this.fingerPosition.previous = touchObject.pageX;
      this.fingerPosition.current = touchObject.pageX;
      //指に追従させる
      this.isFinger = true;
      this.trackingFinger();
    });

    this.$sliderWindow.addEventListener('touchmove', () => {
      //座標更新
      const TOUCH_OBJECT = event.changedTouches[0];
      this.fingerPosition.current = TOUCH_OBJECT.pageX;
    });

    this.$sliderWindow.addEventListener('touchend', () => {
      velocity(this.$slider_list, 'stop', true);
      this.isFinger = false;

      //スライド移動実行
      this.judge();
      this.fingerPosition.previous = 0;
      this.fingerPosition.current = 0;
    });
  }

  /**
   * 次のスライドへ
   */
  nextData() {
    this.previousCounter = this.sliderCounter;
    this.sliderCounter++;

    if (this.sliderCounter > this.numberOfImages) {
      this.sliderCounter = 1;
      velocity(
        this.$slider_list,
        { translateX: 0 },
        {
          duration: 0,
          complete: () => {
            this.changeActiveIndicator();
            this.moveSlide();
          }
        }
      );
    } else {
      this.changeActiveIndicator();
      this.moveSlide();
    }
  }

  /**
   * 前のスライドへ
   */
  previousData() {
    this.previousCounter = this.sliderCounter;
    this.sliderCounter--;
    if (this.sliderCounter < 1) {
      this.sliderCounter = this.numberOfImages;
      velocity(
        this.$slider_list,
        { translateX: this.calcSliderPosition(this.sliderCounter + 1) },
        {
          duration: 0,
          complete: () => {
            this.changeActiveIndicator();
            this.moveSlide();
          }
        }
      );
    } else {
      this.changeActiveIndicator();
      this.moveSlide();
    }
  }

  /**
   * インジケーターの表示切り替え
   */
  changeActiveIndicator() {
    [...this.$dotItems][this.previousCounter].classList.remove(
      'current-image-dot'
    );
    [...this.$dotItems][this.sliderCounter].classList.add('current-image-dot');
  }

  /**
   * slider移動
   */
  moveSlide() {
    const POSITION = this.calcSliderPosition(this.sliderCounter);
    velocity(
      this.$slider_list,
      { translateX: POSITION },
      {
        duration: this.duration
      }
    );
  }

  /**
   * 指に追従させる
   */
  trackingFinger() {
    if (!this.isFinger) return;

    //スワイプ距離計算[px]
    const DISTANCE = this.fingerPosition.current - this.fingerPosition.previous;
    //スワイプ距離変換[vw]
    this.DISTANCE_VW = (DISTANCE * 100) / window.innerWidth;
    //移動量計算
    this.moveTo =
      -(this.sliderCounter * this.sliderSize) + this.DISTANCE_VW + 'vw';

    velocity(this.$slider_list, { translateX: this.moveTo }, { duration: 0 });

    setTimeout(() => {
      this.trackingFinger();
    }, this.frameTime);
  }

  /**
   * スライドをどう動かすかの判定
   */
  judge() {
    //スワイプ距離が半分超えたら次のスライドへ
    if (this.DISTANCE_VW < -(this.sliderSize / 2)) {
      //最後のスライドから最初へ飛ぶ場合
      if (this.sliderCounter === this.numberOfImages) {
        this.previousCounter = this.numberOfImages;
        //最後の位置に複製した画像１へ送る
        this.sliderCounter++;
        this.moveSlide();
        //最後の場所から本来の1番目の場所へジャンプ
        this.sliderCounter = 1;
        this.changeActiveIndicator();
        velocity(
          this.$slider_list,
          { translateX: this.calcSliderPosition(this.sliderCounter) },
          {
            duration: 0
          }
        );
        //通常通りの移動
      } else {
        this.nextData();
      }
    } else if (this.DISTANCE_VW > this.sliderSize / 2) {
      //最初のスライドから最後へ飛ぶ場合
      if (this.sliderCounter === 1) {
        //最初の位置に複製した最終画像へ送る
        this.previousCounter = 1;
        this.sliderCounter--;
        this.moveSlide();
        //本来の場所へジャンプ
        this.sliderCounter = this.numberOfImages;
        this.changeActiveIndicator();
        velocity(
          this.$slider_list,
          { translateX: this.calcSliderPosition(this.sliderCounter) },
          {
            duration: 0
          }
        );
        //通常通りの移動
      } else {
        this.previousData();
      }
    } else {
      //画像移動ない場合は元に戻す
      this.moveSlide();
    }
  }
}
