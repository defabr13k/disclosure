function ready(cb) {
    /in/.test(document.readyState)
    ? setTimeout(ready.bind(null, cb), 90)
    : cb();
};

ready(function(){

    var App = {
        "init": function() {
          this._slideRatio = SlideRatios.golden_section;

          this.updateDimensionsSlides();
          
          this.registerEventListeners();
        },
        "registerEventListeners": function() {
          var self = this;

          window.addEventListener('resize', function(ev) {
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

        }
    };

    App.init();
    
});