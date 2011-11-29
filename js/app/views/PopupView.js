var PopupView = Backbone.View.extend({
  className: 'popup',

  events: {
    'click .popup-close': 'close',
    'mousedown': 'raise'
  },
  
  initialize: function () {
    this.template = $('#popup-template').html();
    
    this.width = '400px';
    this.height = '350px';
    this.top = getRandomInt(100, 400) + 'px';
    this.left = getRandomInt(200, 500) + 'px';
    
    this.context = {
      title: 'Default Title',
      content: 'Lorem ipsum dolor sit amet.'
    }
    
    $(this.el).css({
      'width': this.width,
      'height': this.height,
      'top': this.top,
      'left': this.left,
      'position': 'absolute'
    });
    
    $(this.el).draggable();
  },
  
  /**
   * �������� ����� � ����������� ��� ������ ���������.
   */
  render: function () {
    $(this.el).html(_.template(this.template, this.context));
    
    // ������ ������� ����� ��������
    $('.popup-active').removeClass('popup-active');
    $(this.el).addClass('popup-active');
    
    // ��������� z-index, ����������� �������� ������� ����� �������� �����
    var max_z = 100;
    
    $('.popup').each(function () {
      var curr_z = parseInt($(this).css('z-index'));
      if (curr_z > max_z) {
        max_z = curr_z;
      }
    });
    
    $(this.el).css({ 'z-index': max_z + 10 });
    
    return this;
  },
  
  /**
   * ��������� ����� ������ � ������ ��� ��������
   * �� ������� ������ ����.
   */
  raise: function (e) {
    if (!$(this.el).hasClass('popup-active')) {
      var max_z = 0;
      
      $('.popup-active').removeClass('popup-active');
      
      $('.popup').each(function () {   
        var curr_z = parseInt($(this).css('z-index'));
        if (curr_z > max_z) {
          max_z = curr_z;
        }
      });
      
      $(this.el).css({ 'z-index': max_z + 10 });
      $(this.el).addClass('popup-active')
    }
  },
  
  /**
   * ������� ����� �� DOM.
   */
  close: function () {
    $(this.el).remove();
    
    var max_z = 0;
    var top = null;
    
    
    // �������� ����� ������� �� ���������� �������
    $('.popup').each(function () {
      var curr_z = parseInt($(this).css('z-index'));
      if (curr_z > max_z) {
        max_z = curr_z;
        top = this;
      }
    });
    
    // ������ ��� ��������
    if (top) {
      $(top).addClass('popup-active');
    }
  }
});
