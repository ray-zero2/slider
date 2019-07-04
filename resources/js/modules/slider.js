// import velocity from 'velocity-animate';
export default class {
  constructor() {
    this.$sliderButton = document.querySelectorAll('.slider_btn');
    this.$sliderWindow = document.querySelector('.slider_window');
    this.$slider_list = document.querySelector('.slider_list');
    this.$image1 = document.querySelector('.slider_image1');
    this.$image5 = document.querySelector('.slider_image5');
    this.$indicator = document.querySelector('.indicator');

    //アニメーション動作時間[ms]
    this.duration = 200;
    //最初の画像枚数取得
    this.numberOfImages = this.$slider_list.childElementCount;

    let $firstImage = this.$slider_list.firstElementChild.cloneNode(true);
    let $lastImage = this.$slider_list.lastElementChild.cloneNode(true);

    this.$slider_list.appendChild($firstImage);
    this.$slider_list.insertBefore(
      $lastImage,
      this.$slider_list.firstElementChild
    );

    this.createIndicator();
    this.$DOT_ITEMS = this.$indicator.childNodes;
    //最初と最後の余分なの追加したあとの画像枚数
    this.sliderCounter = 1;
    this.previousCounter = this.sliderCounter;

    this.sliderSize = 70;
    //最初に何枚目を表示するか、初期値

    velocity(this.$slider_list, { translateX: '-70vw' }, { duration: 0 });

    this.bind();
  }
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

  changeActiveIndicator() {
    [...this.$DOT_ITEMS][this.previousCounter].classList.remove(
      'current-image-dot'
    );
    [...this.$DOT_ITEMS][this.sliderCounter].classList.add('current-image-dot');
  }

  render() {
    this.changeActiveIndicator();
    const POSITION = -(this.sliderCounter * this.sliderSize) + 'vw';
    // console.log(`move to ${POSITION}`);
    velocity(this.$slider_list, 'finish', true);

    velocity(
      this.$slider_list,
      { translateX: POSITION },
      {
        duration: this.duration,
        complete: () => {
          console.log(`render - complete`);
        }
      }
    );
  }

  bind() {
    [...this.$sliderButton].forEach(element => {
      element.addEventListener('click', event => {
        // if (this.isAnimation) return;
        this.isAnimation = true;
        this.previousCounter = this.sliderCounter;
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
        this.render();
      });
    });
  }

  nextData() {
    this.sliderCounter++;
    if (this.sliderCounter > this.numberOfImages) {
      this.sliderCounter = 1;
      velocity(
        this.$slider_list,
        { translateX: 0 },
        {
          duration: 0,
          complete: () => {
            this.render();
          }
        }
      );
    } else {
      this.render();
    }
  }
  previousData() {
    this.sliderCounter--;
    if (this.sliderCounter < 1) {
      velocity(this.$slider_list, 'stop', true);
      this.sliderCounter = this.numberOfImages;
      velocity(
        this.$slider_list,
        { translateX: '-420vw' },
        {
          duration: 0,
          complete: () => {
            this.render();
          }
        }
      );
    } else {
      this.render();
    }
  }
}
