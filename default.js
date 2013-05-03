/*** Browser upgrade message by webmaster.org.il ***/
// TODO: multilanguage

var WMBU = {
	sUserAgent		: navigator.userAgent.toLowerCase(),
	bWin7			: navigator.userAgent.indexOf("Windows NT 6")>=0,
	sBrowser		: "",
	bShouldUpgrade	: false,
	hide			: function(){
		document.getElementById("WMBU").style.display="none";
	},
	ShownToday		: function(){
		var str = document.cookie;
		if( str &&  str.indexOf("WMBU")>=0 )
			return true;
		else
			return false;
	}
}

if( WMBU.sUserAgent.indexOf("firefox") > 0 ){
	WMBU.sBrowser = "Firefox";
	WMBU.bShouldUpgrade = (
		WMBU.sUserAgent.indexOf("firefox/5")>=0
		|| WMBU.sUserAgent.indexOf("firefox/4")>=0
		|| WMBU.sUserAgent.indexOf("firefox/3")>=0
		|| WMBU.sUserAgent.indexOf("firefox/2")>=0
	);
}
else{
	if( WMBU.sUserAgent.indexOf("msie") > 0 ){
		WMBU.sBrowser = "Explorer";
		WMBU.bShouldUpgrade = (
			WMBU.sUserAgent.indexOf("msie 8")>=0
			|| WMBU.sUserAgent.indexOf("msie 7")>=0
			|| WMBU.sUserAgent.indexOf("msie 6")>=0
			|| WMBU.sUserAgent.indexOf("msie 5")>=0
		);
	}
}

if( !WMBU.ShownToday() && WMBU.bShouldUpgrade ){
	var sUpgradeLink = ""
	if( WMBU.sBrowser=="Firefox" ){
		sUpgradeLink = "http://www.mozilla.org/en-US/firefox/update/";
	}
	else{ // explorer
		if( WMBU.bWin7 )
			sUpgradeLink = "http://windows.microsoft.com/he-IL/internet-explorer/downloads/ie";
		else
			sUpgradeLink = "https://www.google.com/chrome?hl=iw";
	}

	var str = '<div id="WMBU" style="display:none; position:absolute; position:fixed!important; left:0; top:0; height:35px; width:100%; z-index:1000; background:#fff79d;">';
	str += '<div style="width:960px; color:#404040; font-size:14px; font-weight:bold; text-align:center; margin:auto; padding-top:8px; direction:rtl;">';
	str += '<div style="float:right; font-family:Arial; font-size:16px; line-height:12px; cursor:pointer; cursor:hand; padding:3px 3px 2px 3px; border:1px solid #808080;" onclick="WMBU.hide()">X</div>';
	str += 'אתה משתמש בדפדפן '+ WMBU.sBrowser +' ישן, ולכן לא תוכל להנות מכל הפיצ\'רים של האתר. אנו ממליצים לשדרג את הדפדפן עוד היום! &nbsp; <a href="'+ sUpgradeLink +'" target="_blank" style="color:blue">לחץ כאן לשדרוג הדפדפן</a>';
	str += '</div>';
	str += '</div>';

	document.write(str);
	setTimeout(function(){
		document.getElementById("WMBU").style.display="block";
		setTimeout(WMBU.hide,60000);
	},1000);
	
	// set cookie for one day
	var d = new Date();
	d.setDate(d.getDate() + 1);
	document.cookie = "WMBU=1; path=/; expires="+ d.toUTCString();
}