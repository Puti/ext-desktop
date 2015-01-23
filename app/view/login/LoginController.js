/**
 * This View Controller is associated with the Login view.
 */
Ext.define('Desktop.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',
    
    loginText: '登录中，请稍后...',

    onSpecialKey: function(field, e) {
        if (e.getKey() === e.ENTER) {
            this.doLogin();
        }
    },
    
    onLoginClick: function() {
        this.doLogin();
    },
    
    
    doLogin: function() {
        var form = this.lookupReference('form');
        var vm = this.getView().getViewModel();
        //Ext.getBody().mask(this.loginText);
        form.getForm().submit({
            clientValidation: true,
            url: 'loginController/login.do',
            waitMsg : this.loginText,
            waitTitle : '提示',
            params: {
                //newStatus: 'delivered'
            },
            success: function(form, action) {
               Ext.Msg.alert('Success', action.result.msg);
            },
            failure: function(form, action) {
                switch (action.failureType) {
                	//客户端验证失败造成action提交中止时返回的Failure类型。
                    case Ext.form.action.Action.CLIENT_INVALID:
                        Ext.Msg.alert('失败!', '请正确填写用户名和密码!');
                        break;
                    //当一个通讯错误发生在准备发送一个请求到服务端时返回的Failure类型。    
                    case Ext.form.action.Action.CONNECT_FAILURE:
                        Ext.Msg.alert('Failure', 'Ajax communication failed');
                        break;
                    //服务端处理失败并且 result的 success 属性被设置为false时返回的Failure类型。
                    case Ext.form.action.Action.SERVER_INVALID:
                       Ext.Msg.alert('Failure', action.result.msg);
               }
            }
        });            
        /*Ext.Ajax.request({
            url: 'loginController/login',
            params: {
            	username : form.getValues()['username'],
            	password : form.getValues()['password']
            },
            success: function(response, options){
                var text = response.responseText;
                // process server response here
            },
            failure: function (response, options) {
                Ext.MessageBox.alert('失败!', '请求超时或网络故障,错误编号：' + response.status);
            }                
        });
        if(form.getValues()['password'] == vm.get(form.getValues()['username']))
        	this.onLoginSuccess();
        else 
        	this.onLoginFailure();*/
    },
    
    onLoginFailure: function() {
        // Do something
        Ext.getBody().unmask();
    },

    onLoginSuccess: function() {
        Ext.getBody().unmask();

        localStorage.setItem("LOGGEDIN", true);
        
        this.getView().destroy();
        
        Ext.widget('app-main');
    }
});
