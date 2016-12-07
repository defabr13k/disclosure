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
          this._slideCurrentContentBlockImageResizeIndex = 0;
          this._slidePadding = 0;

          this.updateDimensionsSlides();
          
          this.registerEventListeners();
        },
        "registerEventListeners": function() {
          var self = this;

          window.addEventListener('resize', function(ev) {
            self._slideCurrentContentBlockResizeIndex = 0;
            self._slideCurrentContentBlockImageResizeIndex = 0;
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
          this.resizeContentBlockImages();

        },
        "resizeContentBlockImages": function() {
          if(this._slideCurrentContentBlockImageResizeIndex < document.querySelectorAll('.dc-content-block-image').length) {
            this.resizeContentBlockImage(this._slideCurrentContentBlockImageResizeIndex);
          }
        },
        "resizeContentBlockImage": function(index) {
          var slideContentBlockImageElement = document.querySelectorAll('.dc-content-block-image')[index];
          var parentElement = slideContentBlockImageElement.parentElement;
          var fittedHeight = parentElement.offsetHeight;
          slideContentBlockImageElement.style.height = fittedHeight + 'px';
          this._slideCurrentContentBlockImageResizeIndex++;
          this.resizeContentBlockImages();
        },
        "resizeContentBlocks": function() {
          if(this._slideCurrentContentBlockResizeIndex < document.querySelectorAll('.dc-content-block-text').length) {
            this.resizeContentBlock(this._slideCurrentContentBlockResizeIndex);
          }
        },
        "resizeContentBlock": function(index) {
          var slideContentBlockElement = document.querySelectorAll('.dc-content-block-text')[index];
          var fontSize = slideContentBlockElement.style.fontSize, fitted = false, remSize = (fontSize == '')?1.0:parseFloat(fontSize.substring(0, fontSize.indexOf('r'))), parentElement = slideContentBlockElement.parentElement, effElementHeight = slideContentBlockElement.querySelector('.dc-content-block-text__inner').clientHeight, fittedHeight = (parentElement.offsetHeight - 2*this._slidePadding), scale = Math.floor((fittedHeight/effElementHeight)*100), direction = (scale >= 100)?1.0:-1.0, tolerance = 20;

          console.log(index + 'CH: ' + slideContentBlockElement.querySelector('.dc-content-block-text__inner').clientHeight + '> EH: ' + effElementHeight + ', > FH: ' + fittedHeight + ' RS: ' + scale);

          if(scale < 95 || scale > 100) {

            //console.log(index + ' > EH: ' + effElementHeight + ', > FH: ' + fittedHeight + ' RS: ' + scale);
            
            while(!fitted) {
              effElementHeight = slideContentBlockElement.querySelector('.dc-content-block-text__inner').clientHeight;
              fittedHeight = (parentElement.offsetHeight - 2*this._slidePadding);
              scale = Math.floor((fittedHeight/effElementHeight)*100);

              if( (scale >= 95 && scale <= 105) || (direction == 1 && scale < 95) || (direction == -1 && scale > 105) ) {
                fitted = true;
              } else {
                remSize += direction*(scale/1000);
                slideContentBlockElement.style.fontSize = `${remSize}rem`;
              }

            }
            
          }
          
          this._slideCurrentContentBlockResizeIndex++;
          this.resizeContentBlocks();
          
        }
    };

    App.init();
    
});