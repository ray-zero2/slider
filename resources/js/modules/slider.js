// import velocity from 'velocity-animate';
export default class {
  constructor() {
    this.$previousButton = document.querySelector('[data-order="before"]');
    this.$nextButton = document.querySelector('[data-order="after"]');
    this.$sliderWindow = document.querySelector('.slider_window');
    this.$sliderList = document.querySelector('.slider_list');
    this.$slides = this.$sliderList.querySelectorAll('.slider_items');
    this.$image1 = document.querySelector('.slider_image1');
    this.$image5 = document.querySelector('.slider_image5');
    this.$dotIndicators = this.createDotIndicators({
      dotsToShow: this.$sliderList.childElementCount
    });

    // 指スワイプで反応するレート
    this.fps = 30;
    // スライダー画像サイズ[vw]
    this.slideWidth = 70;
    // アニメーション動作時間[ms]
    this.duration = 200;
    // 表示しているスライダーのインデックス
    this.currentSlideIndex = 0;
    // スライドの数
    this.slideLength = this.$slides.length;
    // 最大のインデックス
    this.maxIndex = this.slideLength - 1;
    // タッチしたときの動きに関する部分
    this.isFinger = false;
    this.fingerPosition = {
      previous: 0,
      current: 0
    };
    this.frameTime = 1000 / this.fps;

    //イベント生成
    this.bind();
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

  getSliderTranslateX(slideNumber, slideWidth) {
    return -(slideNumber * slideWidth) + 'vw';
  }

  next() {
    this.currentSlideIndex++;
    if (this.currentSlideIndex > this.maxIndex) {
      this.currentSlideIndex = 0;
      this.$slides[this.maxIndex].style.transform = `translateX(${-this
        .slideWidth *
        (this.maxIndex + 1)}vw)`;
      this.jump({
        translateX: this.getSliderTranslateX(-1, this.slideWidth)
      });
    }
    this.update();
  }

  previous() {
    this.currentSlideIndex--;
    if (this.currentSlideIndex < 0) {
      this.currentSlideIndex = this.maxIndex;
      this.$slides[0].style.transform = `translateX(${this.slideWidth *
        (this.maxIndex + 1)}vw)`;
      this.jump({
        translateX: this.getSliderTranslateX(
          this.currentSlideIndex + 1,
          this.slideWidth
        )
      });
    }
    this.update();
  }

  update() {
    this.updateActiveIndicator();
    this.slide();
  }

  updateActiveIndicator() {
    const activeClass = 'current-image-dot';
    [...this.$dotIndicators].forEach(($dotIndicator, index) => {
      $dotIndicator.classList.remove(activeClass);
      if (index === this.currentSlideIndex)
        $dotIndicator.classList.add(activeClass);
    });
  }

  slide() {
    velocity(
      this.$sliderList,
      {
        translateX: this.getSliderTranslateX(
          this.currentSlideIndex,
          this.slideWidth
        )
      },
      {
        duration: this.duration,
        queue: 'goTo',
        complete: () => {
          this.$slides[0].style.transform = 'initial';
          this.$slides[this.maxIndex].style.transform = 'initial';
        }
      }
    );

    velocity.Utilities.dequeue(this.$sliderList, 'goTo');
  }

  jump({ translateX }) {
    velocity(this.$sliderList, { translateX }, { duration: 0, queue: 'goTo' });
  }

  // trackingFinger() {
  //   if (!this.isFinger) return;

  //   // スワイプ距離計算[px]
  //   const DISTANCE = this.fingerPosition.current - this.fingerPosition.previous;
  //   // スワイプ距離変換[vw]
  //   this.DISTANCE_VW = (DISTANCE * 100) / window.innerWidth;
  //   // 移動量計算
  //   this.moveTo =
  //     -(this.currentSlideIndex * this.slideWidth) + this.DISTANCE_VW + 'vw';

  //   velocity(this.$sliderList, { translateX: this.moveTo }, { duration: 0 });

  //   setTimeout(() => {
  //     this.trackingFinger();
  //   }, this.frameTime);
  // }

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
        this.currentSlideIndex = SELECT_NUMBER;
        this.updateActiveIndicator();
        this.slide();
      });
    });

    // this.$sliderWindow.addEventListener('touchstart', () => {
    //   const TOUCH_OBJECT = event.changedTouches[0];
    //   this.fingerPosition.previous = TOUCH_OBJECT.pageX;
    //   this.fingerPosition.current = TOUCH_OBJECT.pageX;
    //   // 指に追従させる
    //   this.isFinger = true;
    //   this.trackingFinger();
    // });

    // this.$sliderWindow.addEventListener('touchmove', () => {
    //   // 座標更新
    //   const TOUCH_OBJECT = event.changedTouches[0];
    //   this.fingerPosition.current = TOUCH_OBJECT.pageX;
    // });

    // this.$sliderWindow.addEventListener('touchend', () => {
    //   velocity(this.$sliderList, 'stop', true);
    //   this.isFinger = false;

    //   // スライド移動実行
    //   this.render();
    //   this.fingerPosition.previous = 0;
    //   this.fingerPosition.current = 0;
    // });
  }

  // render() {
  //   // スワイプ距離が半分超えたら次のスライドへ
  //   if (this.DISTANCE_VW < -(this.slideWidth / 2)) {
  //     // 最後のスライドから最初へ飛ぶ場合
  //     if (this.currentSlideIndex === this.slideLength) {
  //       // 最後の位置に複製した画像１へ送る
  //       this.currentSlideIndex++;
  //       this.slide();
  //       // 最後の場所から本来の1番目の場所へジャンプ
  //       this.currentSlideIndex = 1;
  //       this.updateActiveIndicator();
  //       velocity(
  //         this.$sliderList,
  //         {
  //           translateX: this.getSliderTranslateX(
  //             this.currentSlideIndex,
  //             this.slideWidth
  //           )
  //         },
  //         {
  //           duration: 0
  //         }
  //       );
  //       // 通常通りの移動
  //     } else {
  //       this.next();
  //     }
  //   } else if (this.DISTANCE_VW > this.slideWidth / 2) {
  //     // 最初のスライドから最後へ飛ぶ場合
  //     if (this.currentSlideIndex === 1) {
  //       //最初の位置に複製した最終画像へ送る
  //       this.currentSlideIndex--;
  //       this.slide();
  //       // 本来の場所へジャンプ
  //       this.currentSlideIndex = this.slideLength;
  //       this.updateActiveIndicator();
  //       velocity(
  //         this.$sliderList,
  //         {
  //           translateX: this.getSliderTranslateX(
  //             this.currentSlideIndex,
  //             this.slideWidth
  //           )
  //         },
  //         {
  //           duration: 0
  //         }
  //       );
  //       // 通常通りの移動
  //     } else {
  //       this.previous();
  //     }
  //   } else {
  //     // 画像移動ない場合は元に戻す
  //     this.slide();
  //   }
  // }
}
