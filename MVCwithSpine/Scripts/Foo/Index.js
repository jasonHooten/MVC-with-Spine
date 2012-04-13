(function() {
  var FooController, FooModel;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  $(function() {
    var fooController;
    fooController = new FooController({
      el: $('#foo-wrapper')
    });
    return fooController.renderTemplate();
  });
  FooModel = (function() {
    __extends(FooModel, Spine.Model);
    FooModel.configure('Foo', 'value');
    function FooModel() {
      FooModel.__super__.constructor.apply(this, arguments);
    }
    FooModel.postSerialize = function() {
      var foo, list, _i, _len, _ref;
      list = [];
      _ref = FooModel.toJSON();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        foo = _ref[_i];
        list.push({
          id: foo.id,
          value: foo.value
        });
      }
      return list;
    };
    return FooModel;
  })();
  FooController = (function() {
    __extends(FooController, Spine.Controller);
    FooController.prototype.events = {
      'click :button[name="add"]': 'addFoo',
      'click :button[name="delete"]': 'deleteFoo',
      'click :button[name="save"]': 'saveFoo',
      'change :input': 'updateFoo'
    };
    function FooController() {
      this.updateFoo = __bind(this.updateFoo, this);
      this.saveFoo = __bind(this.saveFoo, this);
      this.deleteFoo = __bind(this.deleteFoo, this);
      this.addFoo = __bind(this.addFoo, this);      FooController.__super__.constructor.apply(this, arguments);
      $("#foo-item-template").template("fooTemplate");
    }
    FooController.prototype.addFoo = function(event) {
      var foo;
      foo = new FooModel({
        value: "0"
      });
      foo.save();
      return this.renderTemplate();
    };
    FooController.prototype.deleteFoo = function(event) {
      var fooId;
      fooId = $(event.currentTarget).closest('.foo-item').data("id");
      FooModel.destroy(fooId);
      return this.renderTemplate();
    };
    FooController.prototype.saveFoo = function(event) {
      var item, items;
      items = (function() {
        var _i, _len, _ref, _results;
        _ref = FooModel.postSerialize();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          _results.push(" { id: " + item.id + ", value: " + item.value + " }");
        }
        return _results;
      })();
      return alert(items.join(","));
    };
    FooController.prototype.updateFoo = function(event) {
      var foo, fooId;
      fooId = $(event.currentTarget).closest('.foo-item').data("id");
      foo = FooModel.find(fooId);
      foo.value = $(event.currentTarget).val();
      foo.save();
      return this.renderTemplate();
    };
    FooController.prototype.renderTemplate = function() {
      var sortedList;
      $('#foo-list').empty();
      sortedList = FooModel.all().sort(FooCompare);
      return $('#foo-list').append($.tmpl("fooTemplate", sortedList));
    };
    return FooController;
  })();
}).call(this);
