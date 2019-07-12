const SLIDE_TYPE = {
  TO_LAST_FROM_FIRST: 'TO_LAST_FROM_FIRST',
  TO_FIRST_FROM_LAST: 'TO_FIRST_FROM_LAST',
  TO_LEFT_OR_RIGHT: 'TO_LEFT_OR_RIGHT'
};

const outerWidth = el => {
  let width = el.offsetWidth;
  const style = getComputedStyle(el);

  width += parseInt(style.marginLeft) + parseInt(style.marginRight);
  return width;
};

export default class {
  constructor() {
    this.$slider = document.querySelector('.slider_wrapper');
    this.$sliderWrapper = this.$slider.querySelector('.slider_window');
    this.$sliderList = this.$slider.querySelector('.slider_list');
    this.$slides = this.$sliderList.querySelectorAll('.slider_items');
    this.$previousButton = this.$slider.querySelector('[data-order="before"]');
    this.$nextButton = this.$slider.querySelector('[data-order="after"]');
    this.$dotIndicators = this.createDotIndicators({
      dotLength: this.$slides.length
    });

    // スライドの幅[width]
    this.slideWidth = outerWidth(this.$slides[0]);

    // 表示しているスライドのインデックス
    this.currentSlideIndex = 1;

    // 現在から1つ前に指定されていたスライドのインデックス
    this.lastSlideIndex = this.currentSlideIndex;

    // スライドの最大インデックス
    this.maxIndex = this.$slides.length - 1;

    // スライダーのポジション
    this.currentTranslateX = -(this.slideWidth * this.currentSlideIndex);

    // スライダーをタッチ中か
    this.touching = false;

    // スライダーをタッチ中にジャンプしたか（無限ループ処理が実行されたか）
    this.jumpedWhenTouching = false;

    // タッチ情報
    this.touches = {
      startX: 0,
      currentX: 0
    };

    this.cloneSlide();
    this.updateActiveIndicator(this.currentSlideIndex);
    this.jump(this.currentSlideIndex);
    this.bind();
  }

  // クローンしたスライド以外の先頭のスライドのインデックス
  indexOfFirstSlide() {
    return 1;
  }

  // クローンしたスライド以外の末尾のスライドのインデックス
  indexOfLastSlide() {
    return this.maxIndex - 1;
  }

  /**
   * 無限ループを実現するため先頭と末尾のスライドをクローンする
   */
  cloneSlide() {
    this.$sliderList.appendChild(this.$slides[0].cloneNode(true));
    this.$sliderList.insertBefore(
      this.$slides[this.maxIndex].cloneNode(true),
      this.$sliderList.querySelectorAll('.slider_items')[0]
    );
    // スライドの数が増えたのでDOMを再取得して最大インデックスを更新
    this.$slides = this.$sliderList.querySelectorAll('.slider_items');
    this.maxIndex = this.$slides.length - 1;
  }

  /**
   * ドットのインジケータを生成し、生成したドットのインジケータのDOMを返す
   * @param {number} dotLength 表示させるドットの数
   * @returns {HTMLElement} 生成したドットのインジケータのDOM
   */
  createDotIndicators({ dotLength }) {
    const dotFragment = document.createDocumentFragment();
    for (let index = 0; index < dotLength; index++) {
      const $item = document.createElement('li');
      $item.dataset.index = index;
      dotFragment.appendChild($item);
    }
    const $indicatorWrapper = document.querySelector('.indicator');
    $indicatorWrapper.appendChild(dotFragment);
    return $indicatorWrapper.querySelectorAll('li');
  }

  /**
   * イベントハンドラをバインドする
   */
  bind() {
    this.$previousButton.addEventListener('click', this.previous.bind(this));
    this.$nextButton.addEventListener('click', this.next.bind(this));

    [...this.$dotIndicators].forEach($element => {
      $element.addEventListener('click', this.handleDotClick.bind(this));
    });

    this.$sliderWrapper.addEventListener(
      'touchstart',
      this.handleTouchStart.bind(this)
    );

    this.$sliderWrapper.addEventListener(
      'touchmove',
      this.handleTouchMove.bind(this)
    );

    this.$sliderWrapper.addEventListener(
      'touchend',
      this.handleTouchEnd.bind(this)
    );
  }

  next() {
    const newIndex = this.currentSlideIndex + 1;
    this.currentSlideIndex = newIndex > this.maxIndex ? 2 : newIndex;
    this.update(this.currentSlideIndex);
  }

  previous() {
    const newIndex = this.currentSlideIndex - 1;
    this.currentSlideIndex = newIndex < 0 ? this.maxIndex - 2 : newIndex;
    this.update(this.currentSlideIndex);
  }

  update(newSlideIndex) {
    this.currentTranslateX = -(newSlideIndex * this.slideWidth);
    this.updateActiveIndicator(newSlideIndex);
    this.slide(newSlideIndex);
    this.lastSlideIndex = newSlideIndex;
  }

  updateActiveIndicator(newSlideIndex) {
    const activeClass = 'current-image-dot';
    let targetIndex;
    if (newSlideIndex === 0) {
      targetIndex = this.maxIndex - 2;
    } else if (newSlideIndex === this.maxIndex) {
      targetIndex = 0;
    } else {
      targetIndex = newSlideIndex - 1;
    }
    [...this.$dotIndicators].forEach(($dotIndicator, index) => {
      $dotIndicator.classList.remove(activeClass);
      if (index === targetIndex) $dotIndicator.classList.add(activeClass);
    });
  }

  async slide(newSlideIndex) {
    const slideType = this.getSlideType(newSlideIndex);
    if (slideType === SLIDE_TYPE.TO_LAST_FROM_FIRST)
      await this.jump(this.indexOfLastSlide());
    if (slideType === SLIDE_TYPE.TO_FIRST_FROM_LAST)
      await this.jump(this.indexOfFirstSlide());

    velocity(
      this.$sliderList,
      { translateX: this.currentTranslateX },
      { duration: 250, queue: false }
    );
  }

  /**
   * スライドアニメーションの処理を分岐するためのスライドのタイプを取得する
   * @param {number} newSlideIndex 更新されたスライドのインデックス
   * @returns {string} スライドのタイプ
   *                   SLIDE_TYPE.TO_LAST_FROM_FIRST : 先頭から末尾にスライド
   *                   SLIDE_TYPE.TO_FIRST_FROM_LAST : 末尾から先頭にスライド
   *                   SLIDE_TYPE.TO_LEFT_OR_RIGHT   : 左右にスライド
   */
  getSlideType(newSlideIndex) {
    const shouldGoToLastFromFirst =
      this.lastSlideIndex === 0 &&
      newSlideIndex === this.maxIndex - 2 &&
      !this.jumpedWhenTouching;
    const shouldGoToFirstFromLast =
      this.lastSlideIndex === this.maxIndex &&
      newSlideIndex === 2 &&
      !this.jumpedWhenTouching;

    if (shouldGoToLastFromFirst) {
      return SLIDE_TYPE.TO_LAST_FROM_FIRST;
    } else if (shouldGoToFirstFromLast) {
      return SLIDE_TYPE.TO_FIRST_FROM_LAST;
    } else {
      return SLIDE_TYPE.TO_LEFT_OR_RIGHT;
    }
  }

  jump(slideIndex) {
    return velocity(
      this.$sliderList,
      { translateX: -(slideIndex * this.slideWidth) },
      { duration: 0, queue: false }
    );
  }

  handleDotClick(event) {
    this.currentSlideIndex = Number(event.target.dataset.index);
    this.update(this.currentSlideIndex);
  }

  handleTouchStart(event) {
    this.touching = true;

    const startX = event.changedTouches[0].pageX;
    this.touches.startX = startX;
    this.touches.currentX = startX;
  }

  async handleTouchMove(event) {
    if (!this.touching) return;

    const currentX = event.changedTouches[0].pageX;
    this.touches.currentX = currentX;
    this.diffX = this.touches.currentX - this.touches.startX;

    // タッチ中のスライドのポジション
    const translateXWhenTouching = this.currentTranslateX + this.diffX;

    // 先頭にクローンしたスライドからクローン元のスライドにジャンプする
    if (translateXWhenTouching > 0) {
      this.jumpedWhenTouching = true;
      this.currentTranslateX = -(this.slideWidth * this.indexOfLastSlide());
      this.currentSlideIndex = this.indexOfLastSlide();
      this.touches.startX = currentX;
      await this.jump(this.currentSlideIndex);
      return;
    }

    // 末尾にクローンしたスライドからクローン元のスライドにジャンプする
    if (translateXWhenTouching < -(this.slideWidth * this.maxIndex)) {
      this.jumpedWhenTouching = true;
      this.currentTranslateX = -this.slideWidth;
      this.currentSlideIndex = this.indexOfFirstSlide();
      this.touches.startX = currentX;
      await this.jump(this.currentSlideIndex);
      return;
    }

    velocity(
      this.$sliderList,
      { translateX: translateXWhenTouching },
      { duration: 0, queue: false }
    );
  }

  handleTouchEnd() {
    velocity(this.$sliderList, 'stop', true);

    const threshold = 30;
    if (this.diffX < -threshold) {
      this.next();
    } else if (this.diffX > threshold) {
      this.previous();
    } else {
      this.update(this.currentSlideIndex);
    }

    this.touches.startX = 0;
    this.touches.currentX = 0;
    this.touching = false;
    this.jumpedWhenTouching = false;
  }
}
