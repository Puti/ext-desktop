/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Desktop.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.window.MessageBox'
    ],

    alias: 'controller.main',
    
    init : function() {  
    	//refs = this.getReferences();  
    	//console.log(refs.desktop);
    },      

    onClickButton: function () {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    },
    
    onLogout : function(){
       var me = this;
 	   Ext.Msg.confirm('Logout', 'Are you sure you want to logout?',function(){
 	       // Remove the localStorage key/value
 	       localStorage.removeItem('LOGGEDIN');

 	       // Remove Main View
 	       this.getView().destroy();

 	       // Add the Login Window
 	       Ext.widget('login'); 		   
 	   },me);
    }
   
});
