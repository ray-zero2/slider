// import velocity from 'velocity-animate';
export default class {
  constructor() {
    this.$sliderButton = document.querySelectorAll('.slider_btn');
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
    this.sliderSize = 70;
    //アニメーション動作時間[ms]
    this.duration = 200;
    //スライダー画像表示番号
    this.sliderCounter = 1;

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
    const SLIDER_FIRST_POSITION = this.calcSliderPosition(this.sliderCounter);
    velocity(
      this.$sliderList,
      { translateX: SLIDER_FIRST_POSITION },
      { duration: 0 }
    );
  }

  calcSliderPosition(number) {
    return -(number * this.sliderSize) + 'vw';
  }

  /**
   * インジケーターの表示切り替え
   */
  changeActiveIndicator() {
    [...this.$dotIndicators].forEach($dotIndicator => {
      $dotIndicator.classList.remove('current-image-dot');
    });
    [...this.$dotIndicators][this.sliderCounter - 1].classList.add(
      'current-image-dot'
    );
  }

  /**
   * slider移動
   */
  moveSlide() {
    const POSITION = this.calcSliderPosition(this.sliderCounter);
    velocity(
      this.$sliderList,
      { translateX: POSITION },
      {
        duration: this.duration
      }
    );
  }

  nextData() {
    this.sliderCounter++;

    if (this.sliderCounter > this.numberOfImages) {
      this.sliderCounter = 1;
      this.goTo({ translateX: 0 });
    } else {
      this.changeActiveIndicator();
      this.moveSlide();
    }
  }

  previousData() {
    this.sliderCounter--;
    if (this.sliderCounter < 1) {
      this.sliderCounter = this.numberOfImages;
      this.goTo({
        translateX: this.calcSliderPosition(this.sliderCounter + 1)
      });
    } else {
      this.changeActiveIndicator();
      this.moveSlide();
    }
  }

  goTo({ translateX }) {
    velocity(
      this.$sliderList,
      { translateX },
      {
        duration: 0,
        complete: () => {
          this.changeActiveIndicator();
          this.moveSlide();
        }
      }
    );
  }

  trackingFinger() {
    if (!this.isFinger) return;

    //スワイプ距離計算[px]
    const DISTANCE = this.fingerPosition.current - this.fingerPosition.previous;
    //スワイプ距離変換[vw]
    this.DISTANCE_VW = (DISTANCE * 100) / window.innerWidth;
    //移動量計算
    this.moveTo =
      -(this.sliderCounter * this.sliderSize) + this.DISTANCE_VW + 'vw';

    velocity(this.$sliderList, { translateX: this.moveTo }, { duration: 0 });

    setTimeout(() => {
      this.trackingFinger();
    }, this.frameTime);
  }

  bind() {
    [...this.$sliderButton].forEach(element => {
      element.addEventListener('click', event => {
        velocity(this.$sliderList, 'stop', true);
        if (element.dataset.order === 'after') {
          this.nextData();
        } else {
          this.previousData();
        }
      });
    });

    [...this.$dotIndicators].forEach($element => {
      $element.addEventListener('click', event => {
        const SELECT_NUMBER = event.target.dataset.number;
        this.sliderCounter = SELECT_NUMBER;
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
    if (this.DISTANCE_VW < -(this.sliderSize / 2)) {
      //最後のスライドから最初へ飛ぶ場合
      if (this.sliderCounter === this.numberOfImages) {
        //最後の位置に複製した画像１へ送る
        this.sliderCounter++;
        this.moveSlide();
        //最後の場所から本来の1番目の場所へジャンプ
        this.sliderCounter = 1;
        this.changeActiveIndicator();
        velocity(
          this.$sliderList,
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
        this.sliderCounter--;
        this.moveSlide();
        //本来の場所へジャンプ
        this.sliderCounter = this.numberOfImages;
        this.changeActiveIndicator();
        velocity(
          this.$sliderList,
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
