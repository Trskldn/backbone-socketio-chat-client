define([
    'backbone',
    './RoomsListView',
    './MessagesView',
    './UsersView',
    'text!./../templates/MainView.html',
    'core/common'
  ],
  function(Backbone, RoomsListView, MessagesView, UsersView, MainViewTemplate, Common) {

    var MainView = Common.Layout.extend({

      template: MainViewTemplate,

      regions: {
        rooms: ".rooms",
        messages: ".messages",
        users: ".users"
      },

      initialize: function(options) {
        this.options = options;
        _.defaults(this, options);
        Common.Layout.prototype.initialize.apply(this, arguments);
        this.roomsListView = new RoomsListView({
          collection: this.roomsList
        });
        this.listenTo(app.vent, 'message:send', this._onMessageSend, this);
      },

      render: function() {
        Common.Layout.prototype.render.apply(this, arguments);
        this.getRegion('rooms').show(this.roomsListView);
      },

      _onMessageSend: function(text) {
        this.sendMessageToRoom(text);
      },

      sendMessageToRoom: function(text, id /*?*/ ) {
        var curRoom = this.roomsList.get(id || this.roomsList.currentSelected),
          message = {
            text: text,
            threadId: curRoom.get('id')
          };

        app.socket.emit("message", message);
      },

      showMessageAndUsersView: function() {
        var curRoom = this.roomsList.getSelected();

        this.messagesView = new MessagesView({
          collection: curRoom.messages,
          model: curRoom
        });
        this.usersView = new UsersView({
          collection: curRoom.users
        });
        this.getRegion('messages').show(this.messagesView);
        this.getRegion('users').show(this.usersView);
        this.messagesView.scrollToLastItem();
      },

      showMessagesForRoom: function(id) {

      }
    });

    return MainView;
  });