// import velocity from 'velocity-animate';
export default class {
  constructor() {
    this.$sliderButton = document.querySelectorAll('.slider_btn');
    this.$sliderWindow = document.querySelector('.slider_window');
    this.$slider_list = document.querySelector('.slider_list');
    this.$image1 = document.querySelector('.slider_image1');
    this.$image5 = document.querySelector('.slider_image5');
    this.$indicator = document.querySelector('.indicator');

    this.initialize();
    this.$DOT_ITEMS = this.$indicator.childNodes;

    this.bind();
  }
  calcSliderPosition(number) {
    return -(number * this.sliderSize) + 'vw';
  }

  /**
   * インジケーターの要素を作成してDOMに追加する
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
   * インジケーターの表示切り替え
   */
  changeActiveIndicator() {
    [...this.$DOT_ITEMS][this.previousCounter].classList.remove(
      'current-image-dot'
    );
    [...this.$DOT_ITEMS][this.sliderCounter].classList.add('current-image-dot');
  }

  render() {
    const POSITION = -(this.sliderCounter * this.sliderSize) + 'vw';
    velocity(
      this.$slider_list,
      { translateX: POSITION },
      {
        duration: this.duration,
        begin: () => {
          // console.log(`move begin : ${this.sliderCounter}`);
        },
        complete: () => {
          // console.log(`move complete : ${this.sliderCounter}`);
        }
      }
    );
  }

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
          begin: () => {
            console.log(`jump begin : ${this.sliderCounter}`);
          },
          complete: () => {
            console.log(`jump complete : ${this.sliderCounter}`);
            this.changeActiveIndicator();
            this.render();
          }
        }
      );
    } else {
      this.changeActiveIndicator();
      this.render();
    }
  }

  previousData() {
    this.previousCounter = this.sliderCounter;
    this.sliderCounter--;
    if (this.sliderCounter < 1) {
      // velocity(this.$slider_list, 'stop', true);
      this.sliderCounter = this.numberOfImages;
      velocity(
        this.$slider_list,
        { translateX: '-420vw' },
        {
          duration: 0,
          begin: () => {
            console.log(`jump begin : ${this.sliderCounter}`);
          },
          complete: () => {
            console.log(`jump complete : ${this.sliderCounter}`);
            this.changeActiveIndicator();
            this.render();
          }
        }
      );
    } else {
      this.changeActiveIndicator();
      this.render();
    }
  }

  trackingFinger() {
    if (!this.isFinger) return;

    const DISTANCE = this.fingerPosition.current - this.fingerPosition.previous;
    this.DISTANCE_VW = (DISTANCE * 100) / window.innerWidth;
    this.moveTo = this.sliderPosition + this.DISTANCE_VW + 'vw';
    // console.log(`distance ${this.DISTANCE_VW}`);
    // console.log(`move to ${this.moveTo}`);
    velocity(this.$slider_list, { translateX: this.moveTo }, { duration: 0 });

    setTimeout(() => {
      this.trackingFinger();
    }, this.frameTime);
  }

  bind() {
    [...this.$sliderButton].forEach(element => {
      element.addEventListener('click', event => {
        velocity(this.$slider_list, 'stop', true);
        // velocity(this.$slider_list, 'finish', true);
        if (element.dataset.order === 'after') {
          this.nextData();
        } else {
          this.previousData();
        }
      });
    });

    [...this.$DOT_ITEMS].forEach($element => {
      $element.addEventListener('click', event => {
        const SELECT_NUMBER = event.target.dataset.number;
        this.previousCounter = this.sliderCounter;
        this.sliderCounter = SELECT_NUMBER;
        this.changeActiveIndicator();
        this.render();
      });
    });

    this.$sliderWindow.addEventListener('touchstart', () => {
      console.log('touchstart');
      let touchObject = event.changedTouches[0];
      this.isFinger = true;
      this.fingerPosition.previous = touchObject.pageX;
      this.fingerPosition.current = touchObject.pageX;
      this.sliderPosition = -(this.sliderCounter * this.sliderSize);
      this.trackingFinger();
    });

    this.$sliderWindow.addEventListener('touchmove', () => {
      console.log('touchmove');
      let touchObject = event.changedTouches[0];
      this.fingerPosition.current = touchObject.pageX;
    });

    this.$sliderWindow.addEventListener('touchend', () => {
      console.log('touchend');
      velocity(this.$slider_list, 'stop', true);
      this.isFinger = false;

      if (this.DISTANCE_VW < -(this.sliderSize / 2)) {
        if (this.sliderCounter === this.numberOfImages) {
          this.previousCounter = this.sliderCounter;
          this.sliderCounter++;
          this.render();
          this.sliderCounter = 1;
          this.changeActiveIndicator();
          velocity(
            this.$slider_list,
            { translateX: '-70vw' },
            {
              duration: 0
            }
          );
        } else {
          this.nextData();
        }
      } else if (this.DISTANCE_VW > this.sliderSize / 2) {
        if (this.sliderCounter === 1) {
          this.previousCounter = this.sliderCounter;
          this.sliderCounter--;
          this.render();
          this.sliderCounter = this.numberOfImages;
          this.changeActiveIndicator();
          velocity(
            this.$slider_list,
            { translateX: '-350vw' },
            {
              duration: 0
            }
          );
        } else {
          this.previousData();
        }
      } else {
        this.render();
      }
      this.fingerPosition.previous = 0;
      this.fingerPosition.current = 0;
    });
  }

  /**
   * 初期準備
   */
  initialize() {
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

    //タッチしたときの動きに関する部分
    this.isFinger = false;
    this.fingerPosition = {
      previous: 0,
      current: 0
    };
    this.frameTime = 1000 / this.fps;
  }
}
