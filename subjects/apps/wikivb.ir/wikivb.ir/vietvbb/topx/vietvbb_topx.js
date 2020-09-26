/*#########################################################################
#####  [AJAX]VietVBB - Advanced Forum Statistics for vbulletin 4.x.x  #####
#####  Linhnt - VietVBBTeam - www.vietvbb.vn                          #####
###########################################*#############################*/

function addLoadEventV(func)	{
	var oldload = window.onload;
	if (typeof window.onload != 'function')	{
		window.onload = func;
	}
	else	{
		window.onload = function()	{
			oldload();
			func();
			}
	}
}	


function topxInit() {
	var ul = document.getElementById('vietvbb_topstats_t');
	var li = ul.getElementsByTagName('li');
	for (var i=0; i < li.length-1; i++)	{
		li[i].onclick = function()	{
			viewTab(this);
			}
	}
	
	var select = document.getElementById('vietvbb_topstats_s');
	select.onchange= function()	{
		viewMenu(this.value);
		}	
	
	var result_menu = document.getElementById('vietvbb_topstats_result');
	if(result_menu)
		result_menu.onchange= function()	{
			topXReload();
			}	
}


function tabQuery(a)	{
	var id = a.id;
	var ul = document.getElementById('vietvbb_topstats_t');
	var li = ul.getElementsByTagName('li');
	for (var i=0; i < li.length-1; i++)	{
		li[i].className='';
	}
	
	a.className='current';
	
	document.getElementById('vietvbb_topstats_t_loading').style.display = 'inline';	
	return '&tab=' + id;
}

function viewTab(a) {
	sendRequest(tabQuery(a));
}

function menuQuery(a)	{
	document.getElementById('vietvbb_topstats_s_loading').style.display = 'inline';		
	return	'&menu=' + a;
}

function viewMenu(a) {
	sendRequest(menuQuery(a));
}


function topXReload()	{
	var query = '';
	var ul = document.getElementById('vietvbb_topstats_t');
	var li = ul.getElementsByTagName('li');
	for (var i=0; i < li.length-1; i++)	{
		if (li[i].className == 'current')
			query = tabQuery(li[i]);
	}	
	var select = document.getElementById('vietvbb_topstats_s');		
	query = query + menuQuery(select.value);
	sendRequest(query);
}

function sendRequest(query)	{
	top_request = new vB_AJAX_Handler(true);
	top_request.onreadystatechange(topxRespone);
	var url = 'ajax.php?do=gettop&ran=' + Math.random();
	query = 'do=gettop' + query;
	var result = document.getElementById('vietvbb_topstats_result');
	if (result)	{		
		query = query + '&result=' + result.value;
	}
	top_request.send(url,query);
}

function topxRespone()	{
	if (top_request.handler.readyState == 4 && top_request.handler.status == 200)	{
		document.getElementById('vietvbb_topstats_s_loading').style.display = 'none';
		document.getElementById('vietvbb_topstats_t_loading').style.display = 'none';
		eval(top_request.handler.responseText);
    }
}

function topxTip (content)	{
	Tip(content, PADDING, 1 , BORDERWIDTH, 0, BGCOLOR, '', STICKY, 1, DURATION, 10000, CLICKCLOSE, true);
}


addLoadEventV(topxInit);


/*#########################################################################
#####  [AJAX]VietVBB - Advanced Forum Statistics for vbulletin 4.x.x  #####
#####  Linhnt - VietVBBTeam - www.vietvbb.vn                          #####
###########################################*#############################*/