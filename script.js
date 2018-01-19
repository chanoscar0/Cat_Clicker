//Model
  var model = {
    currentCat : null,
    cats: [
          {
            clickCount: 0,
            name: 'James',
            imgSrc: "/Users/oscarchan/Downloads/pexels-photo-617278.jpeg"
          },
          {
            clickCount: 0,
            name: 'Jackie',
            imgSrc: "/Users/oscarchan/Downloads/cat-pet-animal-domestic-104827.jpeg"
          },
          {
            clickCount: 0,
            name: 'Sam',
            imgSrc: "/Users/oscarchan/Downloads/pexels-photo-170356.jpeg"
          },
          {
            clickCount: 0,
            name: 'Adrian',
            imgSrc:  "/Users/oscarchan/Downloads/pexels-photo-13937.jpeg"
          },
          {
            clickCount: 0,
            name: 'Jamison',
            imgSrc: "/Users/oscarchan/Downloads/cat-face-close-view-113741.jpeg"
          }
    ],
    adminMode : false
  };

//Octopus
/* ======= Octopus ======= */

var octopus = {

    init: function() {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // tell our views to initialize
        catListView.init();
        catView.init();
        adminView.init();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    },
    openAdminView: function() {
        model.adminMode = true;
        adminView.render();
    },
    closeAdminView: function() {
        model.adminMode = false;
        $('#adminForm').css({"display" : "none"})

    },
    updateCat: function(){
        var catNameInput = $('#catNameInput');
        var catImageInput = $('#catImageInput');
        var clickCountInput = $('#clickCountInput');

        model.currentCat.name = catNameInput.val();
        model.currentCat.imgSrc = catImageInput.val();
        model.currentCat.clickCount = clickCountInput.val();
        catNameInput.attr('placeholder',model.currentCat.name);
        catImageInput.attr('placeholder', model.currentCat.imgSrc);
        clickCountInput.attr('placeholder', model.currentCat.clickCount);
        catView.render();
        catListView.render();
    }
};


/* ======= View ======= */
var adminView = {
    init: function() {
        var currentCat = octopus.getCurrentCat();

        //Getting elements from the DOM
        this.catNameInput = $('#catNameInput');
        this.catImageInput = $('#catImageInput');
        this.clickCountInput = $('#clickCountInput');

        this.adminButton = $('#adminButton');
        //Entering Placeholders
        this.catNameInput.attr('placeholder',currentCat.name);
        this.catImageInput.attr('placeholder', currentCat.imgSrc);
        this.clickCountInput.attr('placeholder', currentCat.clickCount);
        //Creating event listeners for the buttons
        this.adminButton.click(function(){
          octopus.openAdminView();
        });
        this.cancelButton = $('#cancelButton');
        this.cancelButton.click(function(){
          octopus.closeAdminView();

        });
        this.saveButton = $('#saveButton');

        this.saveButton.click(function(){
          //Form Elements from the DOM
          this.catNameInput = $('#catNameInput');
          this.catImageInput = $('#catImageInput');
          this.clickCountInput = $('#clickCountInput');
          //Update the Model through the Octopus
          octopus.updateCat();

          //Clear contents of form for next use
          this.catNameInput.val('');
          this.catImageInput.val('');
          this.clickCountInput.val('');
          //Close Admin View after the form submits
          octopus.closeAdminView();
        });
  },
  render: function() {
    $('#adminForm').css({"display" : "block"})

  }
};
var catView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        //this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('catName');
        this.catImageElem = document.getElementById('catImage');
        this.countElem = document.getElementById('clickCounter');

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
    }
};

var catListView = {

    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('catList');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var cat, elem, i;
        // get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    var currentCat = octopus.getCurrentCat();
                    this.catNameInput = $('#catNameInput');
                    this.catImageInput = $('#catImageInput');
                    this.clickCountInput = $('#clickCountInput');

                    this.catNameInput.attr('placeholder',currentCat.name);
                    this.catImageInput.attr('placeholder', currentCat.imgSrc);
                    this.clickCountInput.attr('placeholder', currentCat.clickCount);
                    catView.render();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    }
};

// make it go!
octopus.init();
