const UserView = {
  Load : function(){
    UserController.LoadUser();
    TableEvent.User.Remove();
    TableEvent.User.Save();
  },
  LoadData : function(page){
    UserController.LoadUser(page);
  },
  LoadEvent : function(){
    TableEvent.User.Remove();
    TableEvent.User.Save();
  }
}