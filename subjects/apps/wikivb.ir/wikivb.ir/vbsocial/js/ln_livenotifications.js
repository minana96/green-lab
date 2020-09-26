var ajaxRequestSent = false,
	ajaxFormRequest = null;

$.ajaxSetup({
    beforeSend: function() {
        // TODO: show your spinner
        $('#ajaxreq_loading').css('visibility', 'visible');
		//ajaxRequestSent = true;
    },
    complete: function() {
        // TODO: hide your spinner
        $('#ajaxreq_loading').css('visibility', 'hidden');
		ajaxRequestSent = false;
    }
});

var handleEvents = {
	start: function(eventType, args) {
		$('#ajaxreq_loading').css('visibility', 'visible');
    },
 
	complete: function(eventType, args) {
		$('#ajaxreq_loading').css('visibility', 'hidden');
	}
};

YAHOO.util.Connect.startEvent.subscribe(handleEvents.start);
YAHOO.util.Connect.completeEvent.subscribe(handleEvents.complete);

jQuery(document).ready(function() {
	jQuery("#show_online_status").change(function(e) {
		var status = (this.checked) ? 1 : 0;		
		jQuery.post(fetch_ajax_url("ajax.php"), {status: status, securitytoken: SECURITYTOKEN, ln: 1, 'do': "show_online_status" });
	});	
	
	jQuery(".logo-dropdown").click(function(){
		if(jQuery("#menuOrder").css("display") == "block")
		{
			jQuery("#menuOrder").attr("style", "display:none");	 
		}
		else
		{
			var position = jQuery(this).offset();
			jQuery("#menuOrder").attr("style", "display:block");
			jQuery("#menuOrder").css("left", position.left / 2 + 'px');
			jQuery("#menuOrder").css("top", multix_height_value + 'px');
		}							
	});

	jQuery(".edit_user_avatar").click(function(e) {
		checkBubble(e);	
		if (YAHOO.util.Connect.isCallInProgress(ajaxFormRequest))
		{
			return;
		}
		
		hidelnModal();
		
		if (jQuery("#edit_avatar_container").find('form').length)
		{
			jQuery("#edit_avatar_container").show();
			show_ln_overlay();
			return;
		}
		
		var responseSuccess = function(o)
		{
			if (o.responseXML)
			{
				// check for error first
				var error = o.responseXML.getElementsByTagName('error');
				if (error.length)
				{
					alert(error[0].firstChild.nodeValue);
					return;
				}	
			}
		
			if(o.responseText !== undefined)
			{
				jQuery("#edit_avatar_container").html(o.responseText).show();
				show_ln_overlay();
				
				jQuery('#edit_avatar_container').find('form').submit(function(e) {	
					submitAvatarForm(this);
				});
			}
		}
		
		ajaxFormRequest = YAHOO.util.Connect.asyncRequest('POST', fetch_ajax_url("ajax.php"), {
			success: responseSuccess,
			failure: vBulletin_AJAX_Error_Handler,
			timeout: vB_Default_Timeout,
			scope: this
		}, "ln=1&do=editavatar&securitytoken=" + SECURITYTOKEN);	
	});
	
	jQuery(".view_rating_log").click(function(e) {
		checkBubble(e);				
		$('#rate_log_'+ $(this).data('postid')).show();
	});
	
	
	jQuery('#send_new_pm_frm').submit(function(e) {	
		if (YAHOO.util.Connect.isCallInProgress(ajaxFormRequest))
		{
			return;
		}
			
		var responseSuccess = function(o)
		{
			if (o.responseXML)
			{
				// check for error first
				var error = o.responseXML.getElementsByTagName('error');
				if (error.length)
				{
					alert(error[0].firstChild.nodeValue);
					return;
				}	
			}
			
			if(o.responseText !== undefined)
			{
				if (o.responseText == spmrmsg)
				{
					hidelnModal();
					this.reset();
				}		
				
				alert(o.responseText);
			}
		}
		
		YAHOO.util.Connect.setForm(this);
		ajaxFormRequest = YAHOO.util.Connect.asyncRequest('POST', fetch_ajax_url("ajax.php"), {
			success: responseSuccess,
			failure: vBulletin_AJAX_Error_Handler,
			timeout: vB_Default_Timeout,
			scope: this
		});
		return false;
	});
});


function submitAvatarForm(form)
{	
	if (ajaxFormRequest == true)
	return;
	
	ajaxFormRequest = true;
	
	var responseSuccess = function(o)
	{
		ajaxFormRequest = false;
		if($(o).find("error").length)
		{
			alert($(o).find("error").text());
		}
		
		if($(o).find("aurl").length)
		{
			var url = $(o).find("aurl").text();
			$('.avatarimg').find('span').css('background-image', 'url(' + url + ')');
			$('.icon-userimage').find('img').attr('src', url);
			hidelnModal();
			$(form).remove();
		}
	}
	
	var formData = new FormData(form);
	jQuery.ajax(
	{
		url: fetch_ajax_url("ajax.php"),
		type: "POST",
        data : formData,
		mimeType:"multipart/form-data",
		contentType: false,
        cache: false,
		processData: false,
		dataType: "xml",
		success:function(data) 
        {
			responseSuccess(data);
		}
	});

	return false;
}

function unhighlightLN()
{
	$("li.livenotificationbit.unread").each(function() {
		$(this).removeClass("unread");
	});
}

function hidelnModal()
{
	jQuery(".modal-overlay").hide();
	jQuery(".modal-container").hide();
	jQuery("#send_message_container").hide();
	jQuery("#reply_message_container").hide();
	jQuery("#edit_avatar_container").hide();
}

function newPmMessage(e)
{
	checkBubble(e);
	
	hidelnModal();
	jQuery("#send_message_container").show();
	
	show_ln_overlay();
	
	return false;
}

function replyPmMessage(e, o)
{
	checkBubble(e);	
	var pmid = $(o).data('pmid');
	
	if (pmid)
	{
		$.post(fetch_ajax_url("ajax.php"), {ln: 1, 'do': 'replypm', pmid: pmid, 'securitytoken': SECURITYTOKEN}).done(function(data) {
			hidelnModal();
			jQuery("#reply_message_container").html(data);
			jQuery("#reply_message_container").show();
				
			show_ln_overlay();
			
			$(".modal-container").find('form').submit(function(e) {	
				if (YAHOO.util.Connect.isCallInProgress(ajaxFormRequest))
				{
					return;
				}
					
				var responseSuccess = function(o)
				{
					if (o.responseXML)
					{
						// check for error first
						var error = o.responseXML.getElementsByTagName('error');
						if (error.length)
						{
							alert(error[0].firstChild.nodeValue);
							return;
						}	
					}
					
					if(o.responseText !== undefined)
					{
						if (o.responseText == spmrmsg)
						{
							hidelnModal();
							this.reset();
						}		
						
						alert(o.responseText);
					}
				}
				
				YAHOO.util.Connect.setForm(this);
				ajaxFormRequest = YAHOO.util.Connect.asyncRequest('POST', fetch_ajax_url("ajax.php"), {
					success: responseSuccess,
					failure: vBulletin_AJAX_Error_Handler,
					timeout: vB_Default_Timeout,
					scope: this
				});
				return false;
			});
					
		});
		
	}
}
	
function checkBubble(e)
{
	if(e != null  )
	{		
		if ('bubbles' in e) {   // all browsers except IE before version 9
            if (e.bubbles) {
                e.stopPropagation ();
            }       
        }
        else {  // Internet Explorer before version 9
                // always cancel bubbling
            e.cancelBubble = true;
        }
	}
}

function hidenotification(e, id)
{
	checkBubble(e);	
	
	if(id>0)
	{		
		jQuery("#livenotification_" + id).remove();
		jQuery("#livenotification_" + id).parent(".ln_scrollpane").mCustomScrollbar("update");
		jQuery.post(fetch_ajax_url("ajax.php"), {id: id, securitytoken: SECURITYTOKEN, ln: 1, 'do': "hidenotification" });
	}
	else
	{
		$('.new-notification').hide();
	}
	
	return false;
}

function ln_checknotifications_more(type,count,scroller,e) 
{	
	checkBubble(e);
		
	if (ajaxRequestSent)
	{
		return;
	}
	
	ajaxRequestSent = true;
	
	var $parent = scroller.find("ul._feeds");
	$parent.find("li.livenotifications_more").appendTo($parent).css("display", "block");
	scroller.mCustomScrollbar("disable", false);
	
	enc=(document.characterSet||document.charset);
	jQuery.post(fetch_ajax_url("ajax.php"), {numonly: 1, securitytoken: SECURITYTOKEN, ln: 1, 'do': "ln_getcount", type: type, count: count, charset: enc }).done(
		function(data) {
			ajaxRequestSent = false;
			$parent.find("li.livenotifications_more").remove();
			$parent.find("li.livenotifications_more_process").remove();
			ln_onsuccess_more(scroller, type, data);
	});
	scroller.mCustomScrollbar("update");	
}

function ln_onsuccess_more(scroller, type, data)
{
	if(data == "logout" && ln_timer != "") {
		window.clearInterval(ln_timer);
		return;
	}
	
	var num = 0;
	var num_pm = 0;
	var num_friend = 0;
	var num_moderation = 0;
	
	if (data != 'undefined') 
	{
		//scroller.find('ul._feeds').append(data);
		var $parent = scroller.find('ul._feeds');
		$($(data).get().reverse()).each(function() {
			if ($parent.find('#' + $(this).attr('id')).length == 0)
			$parent.append($(this));
		});
		
		scroller.mCustomScrollbar("update");
		var $more = scroller.find("ul._feeds li.livenotifications_more");	
		if ($more.length)
		{
			if (scroller.find("ul._feeds").height() <= 300)
			{	
				ln_checknotifications_more($more.data('type'), $more.data('offset'), scroller);						
			}
			else
			{
				$parent.find("li.livenotifications_more").appendTo($parent);
				scroller.mCustomScrollbar("update");
			}
		}
	}
}

function ln_checknotifications(jewelCountOnly) 
{	
	var enc=(document.characterSet||document.charset);
	var numonly = (!jewelCountOnly) ? 1 : 0;	
	
	var updateNewNotification = function($parent, $data)
	{
		if ($parent.find('li.livenotificationbit').length == 0 && $data.filter('.nomore').length == 0)
		{
			return;
		}
		
		$($data.get().reverse()).each(function() {
			if ($parent.find('#' + $(this).attr('id')).length == 0)
			{
				$parent.prepend($(this));
			}
			else
			{
				$parent.find('#' + $(this).attr('id')).replaceWith( $(this));
			}
		});
		
		$parent.find('li.livenotifications_loading').remove();
		$parent.find("li.livenotifications_more").appendTo($parent);
		
		$parent.parent("li.ln_scrollpane").mCustomScrollbar("update");
	};
	
	jQuery.post(fetch_ajax_url("ajax.php"), {charset: enc, numonly: numonly, securitytoken: SECURITYTOKEN, ln: 1, 'do': "ln_getcount"}, function(data) {
		ajaxRequestSent = false;
		
		if(data == "logout" && ln_timer != "") 
		{
			window.clearInterval(ln_timer);
			return;
		}
		
		var num = 0;
		var num_pm = 0;
		var num_friend = 0;
		var num_moderation = 0;
		if (data.indexOf("|") > -1) 
		{
			var num_array = data.split("|");
			num = num_array['0'];
			num_pm = num_array['1'];
			num_friend = num_array['2'];
			num_moderation = num_array['3'];
			
			if (jewelCountOnly)
			{
				if (typeof num_array['4'] != 'undefined')
				{
					document.getElementById("livenotifications_list").innerHTML = num_array['4'];
				}
				
				if (typeof num_array['5'] != 'undefined')
				{
					document.getElementById("livenotifications_list_pm").innerHTML = num_array['5'];
				}
				if (typeof num_array['6'] != 'undefined')
				{
					document.getElementById("livenotifications_list_friend").innerHTML = num_array['6'];
				}
				if (typeof num_array['7'] != 'undefined')
				{
					document.getElementById("livenotifications_list_moderation").innerHTML = num_array['7'];
				}
			}
			else
			{
				if (typeof num_array['4'] != 'undefined' && num > 0)
				{
					updateNewNotification($("#livenotifications_list ul._feeds"), $(num_array['4']));
					if ($(num_array['4']).hasClass('unread'))
					{
						$('.new-notification').html($(num_array['4']).first().html());
						showNewNotification($(num_array['4']).first().attr('id'));
					}
				}
				
				if (typeof num_array['5'] != 'undefined' && num_pm > 0)
				{
					updateNewNotification($("#livenotifications_list_pm ul._feeds"), $(num_array['5']));
					if ($(num_array['5']).hasClass('unread'))
					{
						$('.new-notification').html($(num_array['5']).first().html());
						showNewNotification($(num_array['5']).first().attr('id'));
					}
				}
				
				if (typeof num_array['6'] != 'undefined' && num_friend > 0)
				{
					updateNewNotification($("#livenotifications_list_friend ul._feeds"), $(num_array['6']));
				}
				if (typeof num_array['7'] != 'undefined' && num_moderation > 0)
				{
					updateNewNotification($("#livenotifications_list_moderation ul._feeds"), $(num_array['7']));
				}
			}
			
			document.getElementById("livenotifications_num").innerHTML = num;
			document.getElementById("livenotifications_num").style.visibility = num > 0 ? "visible" : "hidden";
			document.getElementById("livenotifications_num_pm").innerHTML = num_pm;
			document.getElementById("livenotifications_num_pm").style.visibility = num_pm > 0 ? "visible" : "hidden";
			document.getElementById("livenotifications_num_friend").innerHTML = num_friend;
			document.getElementById("livenotifications_num_friend").style.visibility = num_friend > 0 ? "visible" : "hidden";
			document.getElementById("livenotifications_num_moderation").innerHTML = num_moderation;
			document.getElementById("livenotifications_num_moderation").style.visibility = num_moderation > 0 ? "visible" : "hidden";
			
			if(jewelCountOnly && $(".ln_scrollpane").length > 0)
			$(".ln_scrollpane").each(function() {
				var $this = $(this);		
				$this.css('max-height', 300 + 'px');
				
				$this.mCustomScrollbar("destroy");
				
				$this.mCustomScrollbar({			
					advanced:{
						updateOnContentResize: true,
						mouseWheel: true,
						scrollButtons: {
							enable:true
						}
					},
					theme:"dark-thick",
					callbacks:{
					  onTotalScroll:function(){
						if ($this.find("ul._feeds li.livenotifications_more").length)
						{					
							var $more = $this.find("ul._feeds li.livenotifications_more");
							$more.removeClass("livenotifications_more").addClass("livenotifications_more_process");
							ln_checknotifications_more($more.data('type'), $more.data('offset'), $this);
						}	
					  }
					}
				});		
			});
		}
	});
}

function ln_fetchnotifications(link, type, containerId) 
{		
	if ($(link).hasClass("selected"))
	{
		$(link).removeClass("selected");
		return;
	}
	else
	{
		$(link).addClass("selected");
		var enc=(document.characterSet||document.charset);
		var is_first = jQuery("#"+containerId).find('ul._feeds li.livenotificationbit').length ? 0 : 1;
			
		if (!is_first)
		{
			window.setTimeout(unhighlightLN, 2000);
			ajaxRequestSent = false;
			var $more = jQuery("#"+containerId).find("ul._feeds li.livenotifications_more");	
			if ($more.length)
			{
				if (jQuery("#"+containerId).find(".ln_scrollpane").height() <= 300)
				{	
					ln_checknotifications_more($more.data('type'), $more.data('offset'), jQuery("#"+containerId).find(".ln_scrollpane"));						
				}
			}
		}
		
		jQuery.post(fetch_ajax_url("ajax.php"), {type: type, first: is_first, charset: enc, securitytoken: SECURITYTOKEN, ln: 1, 'do': "ln_getcount" }).done(function(data) {
			if (data.indexOf("|") > -1) 
			{
				if (is_first)
				{
					jQuery("#"+containerId).find('li.livenotifications_loading').remove();
				}
				
				var num_array = data.split("|"),
				num = num_array[0],
				type = num_array[1];
							
				if(type == "comment")
				{
					document.getElementById("livenotifications_num").innerHTML = num;
					document.getElementById("livenotifications_num").style.visibility = num > 0 ? "visible" : "hidden";
					if (typeof num_array[2] != 'undefined')
					{
						jQuery('#livenotifications_list').find('li.livenotifications_loading').remove();
						jQuery('#livenotifications_list').find('ul._feeds').prepend(num_array['2']);
					}
				}
				else if(type == "pm")
				{
					document.getElementById("livenotifications_num_pm").innerHTML = num;
					document.getElementById("livenotifications_num_pm").style.visibility = num > 0 ? "visible" : "hidden";		
					if (typeof num_array[2] != 'undefined')
					{
						jQuery('#livenotifications_list_pm').find('li.livenotifications_loading').remove();
						jQuery('#livenotifications_list_pm').find('ul._feeds').prepend(num_array['2']);
					}
				}
				else if(type == "friend")
				{
					document.getElementById("livenotifications_num_friend").innerHTML = num;
					document.getElementById("livenotifications_num_friend").style.visibility = num > 0 ? "visible" : "hidden";
					if (typeof num_array[2] != 'undefined')
					{
						jQuery('#livenotifications_list_friend').find('li.livenotifications_loading').remove();
						jQuery('#livenotifications_list_friend').find('ul._feeds').prepend(num_array['2']);
					}
				}
				else if(type == "moderation")
				{
					document.getElementById("livenotifications_num_moderation").innerHTML = num;
					document.getElementById("livenotifications_num_moderation").style.visibility = num > 0 ? "visible" : "hidden";
					if (typeof num_array[2] != 'undefined')
					{
						jQuery('#livenotifications_list_moderation').find('li.livenotifications_loading').remove();
						jQuery('#livenotifications_list_moderation').find('ul._feeds').prepend(num_array['2']);
					}
				}
				
				if (is_first)
				{
					$("#"+containerId).find('ul._feeds li.livenotifications_more').appendTo($("#"+containerId).find('ul._feeds'));
					jQuery("#"+containerId).find('li.ln_scrollpane').mCustomScrollbar("update");
				}
				//window.setTimeout(unhighlightLN, 2000);	
			}
			
			ajaxRequestSent = false;
			var $more = jQuery("#"+containerId).find("ul._feeds li.livenotifications_more");	
			if ($more.length)
			{
				var scroller = jQuery("#"+containerId).find('li.feedContainer');
				if (scroller.length && scroller.find("ul._feeds").height() <= 300)
				{	
					$more.removeClass("livenotifications_more").addClass("livenotifications_more_process");
					ln_checknotifications_more($more.data('type'), $more.data('offset'), scroller);						
				}
			}
		});
	}
}

function ln_friend_actions(containerId,act,userid_subj,e) 
{
	checkBubble(e);

	var action = "reject";
	if(act) action = "accept";
	enc=(document.characterSet||document.charset);
    var url = "ajax.php?securitytoken=" + SECURITYTOKEN + "&ln=1&do=ln_getcount&type=friend&action="+action+"&userid_subj="+userid_subj+"&charset="+enc;
    
	jQuery.get(fetch_ajax_url(url), function(data) 
	{
		ajaxRequestSent = false;
		$('#' + containerId).remove();
		if (data.indexOf("|") > -1) 
		{
			var num_array = data.split("|");
			num = num_array['0'];
			
			document.getElementById("livenotifications_num_friend").innerHTML = num;
			
			if (num > 0 && typeof num_array['1'] != 'undefined')
			{
				$parent = $('#livenotifications_list_friend ul._feeds');
				$($(num_array['1']).get().reverse()).each(function() {
					if ($parent.find('#' + $(this).attr('id')).length == 0)
					{
						$parent.prepend($(this));
					}
					else
					{
						$parent.find('#' + $(this).attr('id')).replaceWith( $(this));
					}
				});
			}
		} 
		else 
		{
			var num = data;
			document.getElementById("livenotifications_num_friend").innerHTML = num;
		}
			
		document.getElementById("livenotifications_num_friend").style.visibility = num > 0 ? "visible" : "hidden";	
	});
}

function ln_show_settings(e)
{
	checkBubble(e);	
	$("#livenotifications_list li.livenotifications_link").attr("style","display:none;");
	$("#livenotifications_list li.feedContainer").attr("style","display:none;");
	$("#ln_settings_window").slideDown();
}

function ln_back_to_notification()
{
	$("#livenotifications_list li.livenotifications_link").attr("style","display:block;");
	$("#livenotifications_list li.feedContainer").attr("style","display:block;");
	$("#ln_settings_window").attr("style","display:none;");
}

function ln_options_save_action() 
{
	var responseSuccess = function(o)
	{
		if (o.responseXML)
		{
			// check for error first
			var error = o.responseXML.getElementsByTagName('error');
			if (error.length)
			{
				alert(error[0].firstChild.nodeValue);
				return;
			}	
		}
		
		if(o.responseText !== undefined)
		{
			ln_back_to_notification();	
		}
	}
	
	var psuedoform = new vB_Hidden_Form('ajax.php');
	psuedoform.add_variable('ajax', 1);
	psuedoform.add_variable('ln', 1);
	psuedoform.add_variables_from_object($('#ln_settings_window').find('ul.checkradio').get(0));

	YAHOO.util.Connect.asyncRequest("POST", fetch_ajax_url("ajax.php?do=ln_save_option"), {
		success: responseSuccess,
		failure: vBulletin_AJAX_Error_Handler,
		timeout: vB_Default_Timeout
	}, SESSIONURL + "securitytoken=" + SECURITYTOKEN + "&" + psuedoform.build_query_string());
}

function ln_transfer_overview(url) {
	self.location.href = url ;
}

/* Thanks Scripts */
var ln_thanks_handleSuccess = function(o)
{
	if(o.responseText !== undefined)
	{
		if (ln_thanks_callback.object_name[o.tId] !== undefined)
		{
			fetch_object(ln_thanks_callback.object_name[o.tId]).innerHTML = o.responseText;
		}
	}
}

var ln_thanks_handleFailure = function(o)
{
	if(o.responseText !== undefined)
	{
		alert(o.responseText);
	}
}

var ln_thanks_callback =
{
	success: ln_thanks_handleSuccess,
	failure: ln_thanks_handleFailure,
	timeout: vB_Default_Timeout,
	cache: false,
	object_name: new Array()
};

function ln_thanks_give(postid, integrate)
{
	fetch_object('ln_thanks_button_' + postid).style.display = 'none';
	fetch_object('ln_thanks_separator_' + postid).style.display = 'none';

	if (integrate == true)
	{
		fetch_object('post_groan_button_' + postid).style.display = 'none';
	}

	var sUrl = 'ln_thanks.php';
	var postData = 'do=ln_thanks_add&using_ajax=1&p=' + postid + '&securitytoken=' + SECURITYTOKEN;

	var request = YAHOO.util.Connect.asyncRequest('POST', sUrl, ln_thanks_callback, postData);

	ln_thanks_callback.object_name[request.tId] = 'ln_thanks_box_' + postid;

	fetch_object('ln_thanks_box_' + postid).style.display = '';

	return false;
}

function ln_thanks_remove_all(postid, integrate)
{
	var sUrl = 'ln_thanks.php';
	var postData = 'do=ln_thanks_remove_all&using_ajax=1&p=' + postid + '&securitytoken=' + SECURITYTOKEN;

	var request = YAHOO.util.Connect.asyncRequest('POST', sUrl, ln_thanks_callback, postData);

	ln_thanks_callback.object_name[request.tId] = 'ln_thanks_box_' + postid;

	fetch_object('ln_thanks_button_' + postid).style.display = ''
	fetch_object('ln_thanks_separator_' + postid).style.display = '';

	if (integrate == true)
	{
		fetch_object('post_groan_button_' + postid).style.display = '';
	}

	fetch_object('ln_thanks_box_' + postid).style.display = 'none';

	return false;
}

function ln_thanks_remove_user(postid, integrate)
{
	var sUrl = 'ln_thanks.php';
	var postData = 'do=ln_thanks_remove_user&using_ajax=1&p=' + postid + '&securitytoken=' + SECURITYTOKEN;

	var request = YAHOO.util.Connect.asyncRequest('POST', sUrl, ln_thanks_callback, postData);

	ln_thanks_callback.object_name[request.tId] = 'ln_thanks_box_' + postid;

	fetch_object('ln_thanks_button_' + postid).style.display = ''
	fetch_object('ln_thanks_separator_' + postid).style.display = '';

	if (integrate == true)
	{
		fetch_object('post_groan_button_' + postid).style.display = '';
	}

	return false;	
}

function ln_show_hide_reputation(postid)
{
	if (document.getElementById('post_reputations_bit_'+postid).style.display == 'none')
	{
		document.getElementById('post_reputations_bit_'+postid).style.display = '';
		$('#ln_post_reputations_header_'+postid+' a').text('Pack');
	}
	else
	{
		document.getElementById('post_reputations_bit_'+postid).style.display = 'none';
		$('#ln_post_reputations_header_'+postid+' a').text('Expand');
	}
}

function ln_set_post_notify(postid, status)
{
	var url = "ajax.php?securitytoken=" + SECURITYTOKEN + "&ln=1&do=ln_set_post_notify&postid="+postid+"&status="+status;
	
	jQuery.get(url, function(raw) {
		var split = raw.split("|");
		var postid = split[0];
		var status = split[1];
		if (status == 'true')
		{
			$('#postset_'+postid+' .post_receive_notify').css("display","block");
			$('#postset_'+postid+' .post_notify_status').css("display","none");
		}
		else
		{
			$('#postset_'+postid+' .post_receive_notify').css("display","none");
			$('#postset_'+postid+' .post_notify_status').css("display","none");
		}
	});
}

function view_other_thanks(postid,e)
{
	checkBubble(e);
	$('#other_thanks_'+postid).show();
}

function close_log(postid)
{
	$('#rate_log_'+postid).hide();
}

function show_ln_overlay()
{	
	jQuery("div.modal-overlay").show("fast", function() {
		jQuery("div.modal-container").show("fast", function() {
			var topPos = ($(window).height() - $(this).find(".modal-box").outerHeight())/2,
				leftPos = ($(window).width() - $(this).find(".modal-box").outerWidth())/2;
			$(this).find(".modal-box").css({
				left: leftPos + "px",
				top: topPos > 0 ? topPos + "px" : 0
			});
			
			$(this).find(".close_popup").click(function() {		
					hidelnModal();
			});		
		});
	});
}

function showNewNotification(lnid)
{	
	if (typeof lnid != 'undefined')
	{
		if ($('.new-notification').data('lnid') == lnid)
		{
			return;
		}
		else
		{
			$('.new-notification').data('lnid', lnid);
		}
	}
	
	$('.new-notification').find('.hideNotification').attr("onClick", "hidenotification(event, 0)");
	$('.new-notification').show();
	window.setTimeout(function() {
		$('.new-notification').hide();
	}, 4000);	
}