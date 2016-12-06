function ready(cb) {
    /in/.test(document.readyState)
    ? setTimeout(ready.bind(null, cb), 90)
    : cb();
};

ready(function(){

    var App = {
        "init": function() {
          this._slideRatio = SlideRatios.golden_section;
          this._slideCurrentContentBlockResizeIndex = 0;
          this._slidePadding = 0;

          this.updateDimensionsSlides();
          
          this.registerEventListeners();

          this.resizeContentBlocks();
        },
        "registerEventListeners": function() {
          var self = this;

          window.addEventListener('resize', function(ev) {
            self._slideCurrentContentBlockResizeIndex = 0;
            self.updateDimensionsSlides();
          });

        },
        "updateDimensionsSlides": function() {
          var slidesElement = document.querySelector('.dc-slides');
          var slideMaxWidth = slidesElement.offsetWidth;
          var slideMaxHeight = slidesElement.offsetHeight;
          var slideWidth = slideMaxWidth;
          var slideHeight = this._slideRatio*slideMaxWidth;
          if(slideHeight > slideMaxHeight) {
            slideHeight = slideMaxHeight;
            slideWidth = slideHeight/this._slideRatio;
          }

          var slides = document.querySelectorAll('.dc-slide');
          slides.forEach(function(slide) {
            slide.style.width = slideWidth + 'px';
            slide.style.left = (slideMaxWidth - slideWidth) / 2 + 'px';
            slide.style.height = slideHeight + 'px';
            slide.style.top = (slideMaxHeight - slideHeight) / 2 + 'px';
          });

          this.resizeContentBlocks();

        },
        "resizeContentBlocks": function() {
          if(this._slideCurrentContentBlockResizeIndex < document.querySelectorAll('.dc-content-block-text').length) {
            this.resizeContentBlock(this._slideCurrentContentBlockResizeIndex);
          }
        },
        "resizeContentBlock": function(index) {
          var slideContentBlockElement = document.querySelectorAll('.dc-content-block-text')[index];
          var fitted = false, remSize = 1, parentElement = slideContentBlockElement.parentElement, effElementHeight = Math.floor(slideContentBlockElement.scrollHeight), fittedHeight = Math.floor((parentElement.offsetHeight - 2*this._slidePadding)), direction = (effElementHeight <= fittedHeight)?1:-1, scale = 1;

          scale = (fittedHeight/effElementHeight);
          console.log(index + ' > EH: ' + effElementHeight + ', > FH: ' + fittedHeight + ' RS: ' + scale);

          if(effElementHeight != fittedHeight) {
            
            console.log(index + ' > DIFFERENT');

            /*while(!fitted) {
              effElementHeight = Math.floor(slideContentBlockElement.scrollHeight);
              fittedHeight = Math.floor((parentElement.offsetHeight - 2*this._slidePadding))

              if(direction == 1 && effElementHeight > fittedHeight) {
                fitted = true;
              } else if(direction == -1 && effElementHeight < fittedHeight) {
                fitted = true;
              } else {
                remSize += direction*0.005;
                slideContentBlockElement.style.fontSize = `${remSize}rem`;
              }
            }*/
            
          }
          
          this._slideCurrentContentBlockResizeIndex++;
          this.resizeContentBlocks();
          
        }
    };

    App.init();
    
});