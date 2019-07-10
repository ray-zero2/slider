export default class {
  constructor() {
    this.$slider = document.querySelector('.slider_wrapper');
    this.$sliderWrapper = this.$slider.querySelector('.slider_list');
    this.$slides = this.$sliderWrapper.querySelectorAll('.slider_items');
    this.$previousButton = this.$slider.querySelector('[data-order="before"]');
    this.$nextButton = this.$slider.querySelector('[data-order="after"]');
    this.$dotIndicators = this.createDotIndicators({
      dotLength: this.$slides.length
    });

    // this.$sliderWindow = document.querySelector('.slider_window');

    // スライドの幅[vw]
    this.slideWidth = 70;

    // 表示しているスライドのインデックス
    this.currentSlideIndex = 0;

    // スライドの数
    this.slideLength = this.$slides.length;

    // スライドの最大インデックス
    this.maxIndex = this.slideLength - 1;

    // アニメーション動作時間[ms]
    this.duration = 200;

    // タッチしたときの動きに関する部分
    // 指スワイプで反応するレート
    // this.fps = 30;
    // this.isFinger = false;
    // this.fingerPosition = {
    //   previous: 0,
    //   current: 0
    // };
    // this.frameTime = 1000 / this.fps;

    //イベント生成
    this.bind();
  }

  /**
   * ドットのインジケータを生成する
   * @param {number} dotLength 表示させるドットの数
   * @returns {HTMLElement} 生成したドットのインジケータのDOm
   */
  createDotIndicators({ dotLength }) {
    let dotFragment = document.createDocumentFragment();
    for (let index = 0; index < dotLength; index++) {
      let $item = document.createElement('li');
      $item.dataset.index = index;
      if (index === 0) $item.classList.add('current-image-dot');
      dotFragment.appendChild($item);
    }
    const $indicatorWrapper = document.querySelector('.indicator');
    $indicatorWrapper.appendChild(dotFragment);
    return $indicatorWrapper.querySelectorAll('li');
  }

  getSliderTranslateX(slideNumber, slideWidth) {
    return -(slideNumber * slideWidth) + 'vw';
  }

  next() {
    this.currentSlideIndex++;
    if (this.currentSlideIndex > this.maxIndex) {
      this.currentSlideIndex = 0;
      this.setMostLeftPosition(this.$slides[this.maxIndex]);
      this.addSlideQueue(
        {
          translateX: this.getSliderTranslateX(-1, this.slideWidth)
        },
        { duration: 0 }
      );
    }
    this.update();
  }

  setMostLeftPosition($element) {
    $element.style.transform = `translateX(${this.getSliderTranslateX(
      this.maxIndex + 1,
      this.slideWidth
    )})`;
  }

  previous() {
    this.currentSlideIndex--;
    if (this.currentSlideIndex < 0) {
      this.currentSlideIndex = this.maxIndex;
      this.setMostRightPosition(this.$slides[0]);
      this.addSlideQueue(
        {
          translateX: this.getSliderTranslateX(
            this.currentSlideIndex + 1,
            this.slideWidth
          )
        },
        { duration: 0 }
      );
    }
    this.update();
  }

  setMostRightPosition($element) {
    $element.style.transform = `translateX(${this.getSliderTranslateX(
      this.maxIndex + 1,
      -this.slideWidth
    )})`;
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
      this.$sliderWrapper,
      {
        translateX: this.getSliderTranslateX(
          this.currentSlideIndex,
          this.slideWidth
        )
      },
      {
        duration: this.duration,
        queue: 'slide',
        complete: () => {
          this.$slides[0].style.transform = 'initial';
          this.$slides[this.maxIndex].style.transform = 'initial';
        }
      }
    );

    velocity.Utilities.dequeue(this.$sliderWrapper, 'slide');
  }

  addSlideQueue(properties, options) {
    velocity(this.$sliderWrapper, properties, { ...options, queue: 'slide' });
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

  //   velocity(this.$sliderWrapper, { translateX: this.moveTo }, { duration: 0 });

  //   setTimeout(() => {
  //     this.trackingFinger();
  //   }, this.frameTime);
  // }

  handlePreviousClick() {
    velocity(this.$sliderWrapper, 'stop', true);
    this.previous();
  }

  handleNextClick() {
    velocity(this.$sliderWrapper, 'stop', true);
    this.next();
  }

  handleDotClick(event) {
    this.currentSlideIndex = Number(event.target.dataset.index);
    this.update();
  }

  bind() {
    this.$previousButton.addEventListener(
      'click',
      this.handlePreviousClick.bind(this)
    );
    this.$nextButton.addEventListener('click', this.handleNextClick.bind(this));
    [...this.$dotIndicators].forEach($element => {
      $element.addEventListener('click', this.handleDotClick.bind(this));
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
    //   velocity(this.$sliderWrapper, 'stop', true);
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
  //         this.$sliderWrapper,
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
  //         this.$sliderWrapper,
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
