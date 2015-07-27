
  var gimmeRandom = function() {
    return Math.floor(Math.random() * 5000);
  };

  var countSuccess = 0;
  var countFails = 0;



  var Door = function($el) {

    this.$el = $el;
    this.openTimeoutId = null;
    this.showSalamTimeoutId = null;
    this.stopTimeoutId = null;
    this.restartTimeout = null;

    this.closeDoor = function () {
      if(this.$el.hasClass('Door--closed')) return;
      if (this.openTimeoutId) clearTimeout(this.openTimeoutId);
      if (this.showSalamTimeoutId) clearTimeout(this.showSalamTimeoutId);
      if (this.stopTimeoutId) clearTimeout(this.stopTimeoutId);
      if (this.restartTimeout) clearTimeout(this.restartTimeout);
      this.$el.removeClass('Door--open Door--salamWantsIn Door--salamIsIn').addClass('Door--closed');
      countSuccess++;
      $('.success-score').html(""+ countSuccess);
      this.restartTimeout = setTimeout(this.start.bind(this), gimmeRandom());
    };

    this.start = function() {
      this.$el.removeClass('Door--open Door--salamWantsIn Door--salamIsIn').addClass('Door--closed');
      this.openTimeoutId = setTimeout(this.open.bind(this), gimmeRandom());
      this.restartTimeout = null;
    };

    this.open = function() {
      this.$el.removeClass('Door--closed').addClass('Door--open');
      this.showSalamTimeoutId = setTimeout(this.showSalam.bind(this), gimmeRandom());
      this.openTimeoutId = null;
    };

    this.showSalam = function() {
      this.$el.addClass('Door--salamWantsIn');
      this.stopTimeoutId = setTimeout(this.stop.bind(this), gimmeRandom());
      this.showSalamTimeoutId = null;
    };

    this.stop = function() {
      countFails++;
      $('.fails-score ').html(""+ countFails);
      this.restartTimeout = setTimeout(this.start.bind(this), gimmeRandom());
      this.$el.removeClass('Door--open Door--salamWantsIn').addClass('Door--closed Door--salamIsIn');
      this.stopTimeoutId = null;
      //clearAllTimeouts();
      //$('.RightPane-message').html('Game over: Salam is in your house... :-(');
    };

  };



  var $leftPane = $('.LeftPane');
  var collection = [];

  var clearAllTimeouts = function() {
    var model;
    for (var index = 0, length = collection.length; index < length; ++index) {
      model = collection[index];
      if (model.openTimeoutId) clearTimeout(model.openTimeoutId);
      if (model.showSalamTimeoutId) clearTimeout(model.showSalamTimeoutId);
      if (model.stopTimeoutId) clearTimeout(model.stopTimeoutId);
    };
  };



  for (var index = 0, length = 8; index < length; ++index) {

    var $door = $('<div onclick="closeDoor(' + index + ')"/>')
      .addClass('Door Door--closed')
      .append($('<div />').addClass('Door-left'))
      .append($('<div />').addClass('Door-placeholder'))
      .append($('<div />').addClass('Door-right'));

    $leftPane.append($door);

    var model = new Door($door);
    model.start();
    collection.push(model);

  }


 function closeDoor(index) {
   collection[index].closeDoor();
 }
