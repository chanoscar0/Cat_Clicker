var initialCats = [
      {
        clickCount: 0,
        name: 'James',
        imgSrc: "/Users/oscarchan/Downloads/pexels-photo-617278.jpeg",
        catNickNames: ['Jimmy']
      },
      {
        clickCount: 0,
        name: 'Jackie',
        imgSrc: "/Users/oscarchan/Downloads/cat-pet-animal-domestic-104827.jpeg",
        catNickNames: ['JackAttack']

      },
      {
        clickCount: 0,
        name: 'Sam',
        imgSrc: "/Users/oscarchan/Downloads/pexels-photo-170356.jpeg",
        catNickNames : ['Sammy']

      },
      {
        clickCount: 0,
        name: 'Adrian',
        imgSrc:  "/Users/oscarchan/Downloads/pexels-photo-13937.jpeg",
        catNickNames : ['Adr']

      },
      {
        clickCount: 0,
        name: 'Jamison',
        imgSrc: "/Users/oscarchan/Downloads/cat-face-close-view-113741.jpeg",
        catNickNames : ['James']

      }
]
var Cat = function(data) {
  this.clickCount = ko.observable(data.clickCount);
  this.name = ko.observable(data.name);
  this.imgSrc = ko.observable(data.imgSrc);
  this.catNickNames = ko.observable(data.catNickNames);
  this.catLevel = ko.computed(function(){
    if (this.clickCount() < 10){
      return ('Newborn');
    }
    else if (this.clickCount() < 100){
      return ('Infant');
    }
    else if (this.clickCount() < 200){
      return ('Teen');
    }
    else if (this.clickCount() < 300){
      return ('Adult');
    }
  }, this);
}
var ViewModel = function() {
  var self = this;

  this.catList = ko.observableArray([]);
  initialCats.forEach(function(catItem){
    self.catList.push( new Cat(catItem) );
  });

  this.currentCat = ko.observable(this.catList()[0]);

  this.incrementCounter = function(){
    self.currentCat().clickCount(self.currentCat().clickCount() + 1);
  };
  this.setCurrentCat = function(clickedCat){
    self.currentCat(clickedCat);
  };
}

ko.applyBindings(new ViewModel());
