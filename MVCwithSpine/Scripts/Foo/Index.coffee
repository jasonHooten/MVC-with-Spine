$ ->
  fooController = new FooController(el: $('#foo-wrapper'))
  fooController.renderTemplate()

# /////////////////////////////////////////
# Model - Foo
# /////////////////////////////////////////
class FooModel extends Spine.Model
  @configure 'Foo', 'value'

  constructor: () ->
    super

  @postSerialize: ->
    list = []
    for foo in FooModel.toJSON()
      list.push { id: foo.id, value: foo.value }
    list

# /////////////////////////////////////////
# Controller - Foo
# /////////////////////////////////////////
class FooController extends Spine.Controller
  events:
    'click :button[name="add"]'      : 'addFoo'
    'click :button[name="delete"]'   : 'deleteFoo'
    'click :button[name="save"]'     : 'saveFoo'
    'change :input'                  : 'updateFoo'

  constructor: () ->
    super
    $("#foo-item-template").template "fooTemplate"
    
  addFoo: (event) =>
    foo = new FooModel( value: "0" )
    foo.save()
    @renderTemplate()

  deleteFoo: (event) =>
    fooId = $(event.currentTarget).closest('.foo-item').data("id")
    FooModel.destroy fooId
    @renderTemplate()

  saveFoo: (event) =>
    items = for item in FooModel.postSerialize()
      " { id: #{item.id}, value: #{item.value} }"
    alert items.join ","
    
  updateFoo: (event) =>
    fooId = $(event.currentTarget).closest('.foo-item').data("id")
    foo = FooModel.find fooId
    foo.value = $(event.currentTarget).val()
    foo.save()
    @renderTemplate()

  renderTemplate: ->
    $('#foo-list').empty()
    sortedList = FooModel.all().sort FooCompare
    $('#foo-list').append $.tmpl("fooTemplate", sortedList)
