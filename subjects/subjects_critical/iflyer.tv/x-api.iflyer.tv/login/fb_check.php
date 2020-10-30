<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script type="text/javascript" src="/js/jquery.cookie.js?v=v1.4.1m"></script>
<script>
var iFLYERXAPI = "https://x-api.iflyer.tv/v1.0";
/* LIST OUT REQUIRED PERMS */
var fbscopes = new Object();
var fbscopeAlert = false;
var FBload = null;
var holdIflyerId = null;
var devMode = false;
var BBCookieDomain = "iflyer.tv";
fbscopes['user_birthday']=true;fbscopes['user_location']=true;fbscopes['user_events']=true;fbscopes['email']=true;fbscopes['user_likes']=true;fbscopes['user_friends']=true;
xapi = function(path,method,vars,callback,mycontext){
    if(typeof(method)=='undefined'){ method = "GET"; }
    if(typeof(callback)=='undefined'){ callback = function(data){debug(data)}; }
    if(typeof(vars)=='undefined'){ vars = ""; }
    mycontext = typeof mycontext !== 'undefined' ? mycontext : '';
    $.ajax({
        type:method,
        url:iFLYERXAPI+'/'+path,
        dataType:"json",
        success: callback,
        context: mycontext,
        xhrFields: {
          withCredentials: true
        }
    });
}

updateFB = function(){
    passdata = new Object();
    passdata.fbtoken = FBload;
    if(holdIflyerId){
        passdata.iflyer_id = holdIflyerId;
    }
    $.ajax({
        type:'POST',
        url:'fb_check.php',
        data:passdata,
        dataType:"json",
        success: function(data){
            if(!data.error){
                poster({action: "ok",data:data});
            }else{
                // something went wrong... redirect to fb login
                debug('could not update');
            }
        },
       xhrFields: {
          withCredentials: true
       }
    });
}

poster = function(data){
    data.command = 'fb_cheker';
    if (typeof(window.parent)!=='undefined' && window.parent != window) {
        window.parent.postMessage(data, '*');
    } else if (typeof(window.opener)!=='undefined' && window.opener) {
        window.opener.postMessage(data, '*');
    }else{
        debug('no parent to post');
        debug(data);
    }
}


var fbauthResponse = null;

checkfb = function(data){
    if(!data || data.status!='connected'){
        return;
    }
    fbauthResponse = data.authResponse;
    xapi('fbuser:'+data.authResponse.userID+'/?fields=iflyer_id,img','GET','',updateFBuser)
}


updateFBuser = function(data){
    if(!fbauthResponse){return false;}
    if(data.iflyer_id){
        holdIflyerId = data.iflyer_id;
        poster({action:"iflyer_user",iflyer_user:data.iflyer_id});
    }
    if(fbscopeAlert){
        poster({action:"bad_scopes"});
    }
    FBload = fbauthResponse.accessToken;
    updateFB();
}


/* CATCH IF LOGGED IN */
window.fbAsyncInit = function() {
    FB.init({
      appId      : '285617126486',
      xfbml      : true,
      version    : 'v2.4'
    });
    FB.getLoginStatus(
        function(data){
            if(data.authResponse){
                checkfb(data);
                FB.api('/me/permissions', 'GET', '' , function(data){
                    testscopes = fbscopes;
                    if(data && data.data){
                        for (var key in data.data) {
                          if(data.data[key]['status']=='granted' &&  testscopes[data.data[key]['permission']]){
                            delete testscopes[data.data[key]['permission']];
                          }
                        }
                    }
                    var len = 0;
                    for (var key in testscopes) {
                        len ++;
                    }
                    if(len>0){
                        fbscopeAlert = true;
                    }
                });
            }
        },true
    );
};


/* INIT FB SDK */
(function(d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = "//connect.facebook.net/en_US/sdk.js";
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function debug(msg){
    if(typeof(devMode)=='undefined' || !devMode){
        return false;
    }
    console.log(msg);
}

</script>
