// import velocity from 'velocity-animate';
export default class {
  constructor() {
    this.$previousButton = document.querySelector('[data-order="before"]');
    this.$nextButton = document.querySelector('[data-order="after"]');
    this.$sliderWindow = document.querySelector('.slider_window');
    this.$sliderList = document.querySelector('.slider_list');
    this.$image1 = document.querySelector('.slider_image1');
    this.$image5 = document.querySelector('.slider_image5');
    this.$dotIndicators = this.createDotIndicators({
      dotsToShow: this.$sliderList.childElementCount
    });

    //指スワイプで反応するレート
    this.fps = 30;
    //スライダー画像サイズ[vw]
    this.slideWidth = 70;
    //アニメーション動作時間[ms]
    this.duration = 200;
    //スライダー画像表示番号
    this.currentSlideNumber = 1;

    //現在の画像枚数取得
    this.numberOfImages = this.$sliderList.childElementCount;
    //タッチしたときの動きに関する部分
    this.isFinger = false;
    this.fingerPosition = {
      previous: 0,
      current: 0
    };
    this.frameTime = 1000 / this.fps;
    //初期化
    this.initialize();

    //イベント生成
    this.bind();
  }

  /**
   * 初期準備
   */
  initialize() {
    // 最初と最後の画像を複製してリストに追加
    this.cloneSlides();

    // スライダー初期位置に移動
    this.goToFirstPosition();
  }

  cloneSlides() {
    const $FIRST_IMAGE = this.$sliderList.firstElementChild.cloneNode(true);
    const $LAST_IMAGE = this.$sliderList.lastElementChild.cloneNode(true);
    this.$sliderList.appendChild($FIRST_IMAGE);
    this.$sliderList.insertBefore(
      $LAST_IMAGE,
      this.$sliderList.firstElementChild
    );
  }

  /**
   * ドットのインジケータを生成する
   * @param {number} dotsToShow 表示させるドットの数
   * @returns {HTMLElement} 生成したドットのインジケータのDOm
   */
  createDotIndicators({ dotsToShow }) {
    const $indicatorWrap = document.querySelector('.indicator');
    let dotFragment = document.createDocumentFragment();
    for (let i = 1; i <= dotsToShow; i++) {
      let $item = document.createElement('li');
      $item.dataset.number = i;
      if (i === 1) $item.classList.add('current-image-dot');
      dotFragment.appendChild($item);
    }
    $indicatorWrap.appendChild(dotFragment);
    return $indicatorWrap.querySelectorAll('li');
  }

  goToFirstPosition() {
    const SLIDER_FIRST_POSITION = this.calcSliderPosition(
      this.currentSlideNumber
    );
    velocity(
      this.$sliderList,
      { translateX: SLIDER_FIRST_POSITION },
      { duration: 0 }
    );
  }

  calcSliderPosition(number) {
    return -(number * this.slideWidth) + 'vw';
  }

  /**
   * インジケーターの表示切り替え
   */
  changeActiveIndicator() {
    [...this.$dotIndicators].forEach($dotIndicator => {
      $dotIndicator.classList.remove('current-image-dot');
    });
    [...this.$dotIndicators][this.currentSlideNumber - 1].classList.add(
      'current-image-dot'
    );
  }

  /**
   * slider移動
   */
  moveSlide() {
    const POSITION = this.calcSliderPosition(this.currentSlideNumber);
    velocity(
      this.$sliderList,
      { translateX: POSITION },
      {
        duration: this.duration,
        queue: 'goTo'
      }
    );

    velocity.Utilities.dequeue(this.$sliderList, 'goTo');
  }

  next() {
    this.currentSlideNumber++;
    if (this.currentSlideNumber > this.numberOfImages) {
      this.currentSlideNumber = 1;
      this.goTo({ translateX: 0 });
    }
    this.xxx();
  }

  previous() {
    this.currentSlideNumber--;
    if (this.currentSlideNumber < 1) {
      this.currentSlideNumber = this.numberOfImages;
      this.goTo({
        translateX: this.calcSliderPosition(this.currentSlideNumber + 1)
      });
    }
    this.xxx();
  }

  xxx() {
    this.changeActiveIndicator();
    this.moveSlide();
  }

  goTo({ translateX }) {
    velocity(this.$sliderList, { translateX }, { duration: 0, queue: 'goTo' });
  }

  trackingFinger() {
    if (!this.isFinger) return;

    //スワイプ距離計算[px]
    const DISTANCE = this.fingerPosition.current - this.fingerPosition.previous;
    //スワイプ距離変換[vw]
    this.DISTANCE_VW = (DISTANCE * 100) / window.innerWidth;
    //移動量計算
    this.moveTo =
      -(this.currentSlideNumber * this.slideWidth) + this.DISTANCE_VW + 'vw';

    velocity(this.$sliderList, { translateX: this.moveTo }, { duration: 0 });

    setTimeout(() => {
      this.trackingFinger();
    }, this.frameTime);
  }

  bind() {
    this.$previousButton.addEventListener('click', () => {
      velocity(this.$sliderList, 'stop', true);
      this.previous();
    });

    this.$nextButton.addEventListener('click', () => {
      velocity(this.$sliderList, 'stop', true);
      this.next();
    });

    [...this.$dotIndicators].forEach($element => {
      $element.addEventListener('click', event => {
        const SELECT_NUMBER = event.target.dataset.number;
        this.currentSlideNumber = SELECT_NUMBER;
        this.changeActiveIndicator();
        this.moveSlide();
      });
    });

    this.$sliderWindow.addEventListener('touchstart', () => {
      const TOUCH_OBJECT = event.changedTouches[0];
      this.fingerPosition.previous = TOUCH_OBJECT.pageX;
      this.fingerPosition.current = TOUCH_OBJECT.pageX;
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
      velocity(this.$sliderList, 'stop', true);
      this.isFinger = false;

      //スライド移動実行
      this.render();
      this.fingerPosition.previous = 0;
      this.fingerPosition.current = 0;
    });
  }
  render() {
    //スワイプ距離が半分超えたら次のスライドへ
    if (this.DISTANCE_VW < -(this.slideWidth / 2)) {
      //最後のスライドから最初へ飛ぶ場合
      if (this.currentSlideNumber === this.numberOfImages) {
        //最後の位置に複製した画像１へ送る
        this.currentSlideNumber++;
        this.moveSlide();
        //最後の場所から本来の1番目の場所へジャンプ
        this.currentSlideNumber = 1;
        this.changeActiveIndicator();
        velocity(
          this.$sliderList,
          { translateX: this.calcSliderPosition(this.currentSlideNumber) },
          {
            duration: 0
          }
        );
        //通常通りの移動
      } else {
        this.next();
      }
    } else if (this.DISTANCE_VW > this.slideWidth / 2) {
      //最初のスライドから最後へ飛ぶ場合
      if (this.currentSlideNumber === 1) {
        //最初の位置に複製した最終画像へ送る
        this.currentSlideNumber--;
        this.moveSlide();
        //本来の場所へジャンプ
        this.currentSlideNumber = this.numberOfImages;
        this.changeActiveIndicator();
        velocity(
          this.$sliderList,
          { translateX: this.calcSliderPosition(this.currentSlideNumber) },
          {
            duration: 0
          }
        );
        //通常通りの移動
      } else {
        this.previous();
      }
    } else {
      //画像移動ない場合は元に戻す
      this.moveSlide();
    }
  }
}
