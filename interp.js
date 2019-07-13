var felicity = [ "sorry", "okay", "yes", "no" ];
var reply = [ "i don't understand", "i don't know" ];
var clickMe = null;
function clickClickMe() {
	if (clickMe != null) {
		clickMe.click()
		clickMe = null;
}	}
function clickOn( ua ) { // click on X
	if (ua.length == 0)
		return felicity[0] + ", "+ reply[ 0 ] +": click on ";
	else {
	    var errMsg = ua.join( " " );
	    var      the = "";
	    if (ua[ 0 ] == "the") {
	        the = "the ";
	        ua.shift();
	    }
	    if (ua.length == 0)
	    	return felicity[0] + ", "+ reply[ 0 ] +": click on the";
	    else {
		    var buttons = null, links = null, inputBt = null;
		    var elemType = ua[ ua.length -1 ];
		    if (elemType == "link") {
		        links = document.getElementsByTagName( "a" );
		        ua.pop();
		    } else if (elemType == "button" ) {
		        buttons = document.getElementsByTagName( "button" );
		        inputBt = document.getElementsByTagName( "input" );
		        ua.pop();
		    } else {
		        elemType = "";
		        buttons = document.getElementsByTagName( "button" );
		        inputBt = document.getElementsByTagName( "input" );
		        links   = document.getElementsByTagName( "a" );
		    }
		    if (ua.length == 0)
		    	return felicity[0] + ", "+ reply[ 0 ] +": click on "+ the + elemType;
		    else {
			    var name = ua.join( " " ).toLowerCase();
			    var clickable;
			    var clickables = [];
			    if (buttons != null) for (i=0; i<buttons.length; i++) clickables.push( buttons[ i ]);
			    if (links   != null) for (i=0; i < links.length; i++) clickables.push(   links[ i ]);
			    if (inputBt != null) for (i=0; i<inputBt.length; i++)
			        if (inputBt[ i ].type == "button" || inputBt[ i ].type == "submit")
			            clickables.push( inputBt[ i ]);
			    for (clickable of clickables) {
			        if ((clickable.title != undefined &&
                         clickable.title.trim().toLowerCase().includes( name )) 
                     || (clickable.value != undefined &&
                         clickable.value.trim().toLowerCase().includes( name ))
                     || (clickable.innerText != undefined &&
                         clickable.innerText.trim().toLowerCase().includes( name ))
                     || (clickable.tagName == "INPUT"   && // need to check this too(!)
                         clickable.type    != undefined &&
                         clickable.type    == "submit"  &&
                         name              == "submit" ))
                    {   clickMe = clickable;
                        setTimeout( clickClickMe, 1800 );
                        return felicity[1] +", "+ the + name +" "+ elemType +" is clicked";
                }   }
			    return felicity[0] + ", "+ reply[ 0 ] +": click on "+ errMsg;
}	}	}	}
function shift( ua, n ) {
    for (i=0; i<n; i++) ua.shift();
    return ua;
}
function setValueTo( ua ) { // set the value of X to Y
    if (ua.length >= 3) {
    	var name = ua[ 0 ]; ua.shift();
	    while (ua.length >= 2 && ua[ 0 ] != "to") {
	        name += " "+ ua[ 0 ];
	        ua.shift(); // to?
	    }
	    if (ua.length > 1) {
		    ua.shift(); // to
            var value = ua.join( " " );
            var elements = document.getElementsByTagName( "*" );
            for (el of elements) {
                if (el.tagName == "INPUT" &&
                    el.type == "text" &&
                    el.placeholder.toLowerCase().trim().includes( name ))
                {
                    el.value = value;
                    return felicity[ 1 ] +", "+ name +" set to "+ value;
            }    }
            return felicity[ 0 ] +", "+ name +" is not a value";
    }	}
    return felicity[0] +", "+ reply[ 0 ] +" "+ ua.join(" ");
}
function getValueOf( ua ) { // get the value of ...
    var rc = felicity[0] +", "+ reply[ 0 ];
    var name = ua.join( " " );
    if (name.length > 0) {
    	var elem = document.getElementById( name );
	    rc = elem == null ?
	        felicity[ 0 ] + ", "+ name +" is not a value"
	        : felicity[ 1 ] + ", "+ name +" is "+
	            elem.value == undefined ? "unset" : "set to " + elem.value;
    }
    return rc;
}
function go( ua ) { // go ...
	var response = felicity[0] +", "+ reply[ 0 ] +": "+ ua;
	if (ua.length > 0) {
		if (ua[ 0 ] == "to") {
			ua.shift();
			if (ua.length > 0) {
				address = ua.join("");
				window.location.href="http://" + address.toLowerCase();
				response = felicity[ 1 ];
			}
		} else if (ua[ 0 ] == "back") {
			window.history.back();
			response = felicity[ 1 ] +", gone back";
		} else if (ua[ 0 ] == "forward") {
			window.history.forward();
			response = felicity[ 1 ] +", gone forward";
	}	}
	return response;
}
function articled( str ) {
	lett = str.toLowerCase().split(" ");
	if (lett[0].length == 1) {
		return (lett[0] == "a" || lett[0] == "e" || lett[0] == "f" || lett[0] == "h"
			 || lett[0] == "i" || lett[0] == "l" || lett[0] == "m" || lett[0] == "n"
			 || lett[0] == "o" || lett[0] == "r" || lett[0] == "s" || lett[0] == "x"
			 ? " an " : " a ")+ str;
	}
	switch (str[ 0 ]) {
		case 'a': case 'e': case 'i': case 'o': case 'u':
		case 'A': case 'E': case 'I': case 'O': case 'U':
			return " an "+ str;
		default: return " a "+ str;
}	}
function describeThePage() {
	var response = "";
	var elements = document.getElementsByTagName( "*" );
	for (el of elements)
		if (el.tagName ==      "A")
			if (el.title.trim() != "")
				response += articled( el.title ) +" link, ";
			else if (el.innerText.trim() != "")
				response += articled( el.innerText ) +" link, ";
			else
				response += articled( "unknown" ) +" link, ";
		else if (el.tagName == "BUTTON")
			response += articled( el.innerText ) +" button, ";
		else if (el.tagName ==  "INPUT" && (el.type ==   "text" ))
			response += articled( el.placeholder ) +" value, ";
		else if (el.tagName ==  "INPUT" && (el.type == "button"   ))
			if (el.innerText.trim() != "")
				response += articled( el.innerText ) +" button, ";
			else if (el.value.trim() != "")
				response += articled( el.value ) +" button, ";
			else
				response += articled( "unknown" ) +" button, ";
    return felicity[ 1 ] +", on this page there is "+
                    (response == "" ? "nothing" : response);
}
function query ( ua, imp ) { //is there [a|an].../do you have [a|an]...
	var response = [];
	var article = ua[ 0 ]; ua.shift();
	var type = ua[ ua.length -1 ];
	if (type == "link" || type == "button" || type == "value")
		ua.pop();
	else
		type = "value";
	str = ua.join(" ").toLowerCase();
	var elements = document.getElementsByTagName( "*" );
	for (el of elements) if (!hidden( el )) {
		if ((el.tagName == "A" && type == "link" &&
				(el.title.toLowerCase().trim().includes( str ) ||
				 el.innerText.toLowerCase().trim().includes( str )))
         || ((el.tagName == "BUTTON" ||
             (el.tagName == "INPUT" && el.type == "button"))
             && type == "button" &&
				 (el.innerText.toLowerCase().trim().includes( str )))
         || (el.tagName == "INPUT" && el.type == "text"
             && type == "value" &&
                 (el.innerText.toLowerCase().trim().includes( str )))
				 )
			return felicity[ 2 ] + " , "
					+ (imp ? "there is " : "I have ")
					+ article +" "+ str +" "+ type;
        else if (((el.tagName == "BUTTON" ||
                  (el.tagName == "INPUT" && el.type == "button"))
                  && type == "link" &&
					(el.innerText.toLowerCase().trim().includes( str )))
			 ||  (el.tagName == "A" && type == "button" &&
					(el.title.toLowerCase().trim().includes( str ) ||
					 el.innerText.toLowerCase().trim().includes( str ))))
			response.push( article +" "+ str +" "+ (type=="link"?"button":"link" ));		
	}
	return felicity[ 3 ] + " , " + (response.length > 0 ?
                (imp ? "but there is " : "but I have ") + response.join( " and " )
				:  (imp ? "there is not " : "I don't have ")
					+ article +" "+ str +" "+ type );
}
function read( ua ) { // read ...
    var response = felicity[0] + ", "+ reply[ 0 ] +" "+ ua.join( " " );
    var fromIndex = ua.indexOf( "from" );
    if (fromIndex > -1) {
        for (i=0; i <= fromIndex; i++) ua.shift();
        var findMe = ua.join( " " );
        response = "";
        var elems = document.getElementsByTagName( "p" );
        for (elem of elems)
            response += elem.innerText.toLowerCase() +". ";
        fromIndex = response.indexOf( findMe );
        response = fromIndex == -1 ?
            felicity[ 0 ] +", "+ "i can't find this passage" :
            response.substr( fromIndex );
    } else if (-1 != ua.indexOf( "page" )) {
        response = "";
        var elems = document.getElementsByTagName( "p" );
        for (elem of elems)
            response += elem.innerText +".\n";
    }
    return response; 
}
function titleValue( ua ) { // what is the title of this page
    var elem = document.getElementsByTagName( "title" );
    return elem.length == 0 ?
            felicity[ 0 ] +", "+ reply[ 1 ]
            : "the title of this page is: "+ elem[ 0 ].innerText;
}
function hidden( elem ) {
    return elem.hasAttribute( "aria-hidden" ) == true &&
           elem.getAttribute( "aria-hidden" ) == "true";
}
function howMany( ua ) { // how many X [are there [on this page]]
    var name = ua[ 2 ];
    var e, elems = null;
    var number = 0;
    switch (name) {
        case "paragraphs" : elems = document.getElementsByTagName( "p" );     break;
        case "headings"   : elems = document.getElementsByTagName( "h*" );    break;
        case "values"     : elems = document.getElementsByTagName( "input" ); break;
        case "buttons"    : elems = document.getElementsByTagName( "*" );     break;
        case "links"      : elems = document.getElementsByTagName( "a" );     break;
        case "figures"    : elems = document.getElementsByTagName( "figure" );break;
    }
    if (elems != null) 
        switch (name) {
            case "values"     :
                for (e of elems)
                    if (e.type == "text" || e.type == "textarea")
                        if (!hidden( e ))
                            number++;
                break;
            case "buttons"     :
                for (e of elems)
                    if ( e.tagName == "BUTTON" ||
                        (e.tagName == "INPUT" && e.type == "button"))
                        if (!hidden( e ))
                            number++;
                break;
            default       :
                for (e of elems)
                    if (!hidden( e ) &&
                        ( e.innerText.trim() != "" ||
                         (e.title != null && e.title != "")))
                        number++;
                break;
        }
    return number == 0 ? 
        felicity[ 0 ]+ ", there are no "+ name
        : felicity[ 1 ]+ ", there are "+ number +" "+ name;
}
function whatNames( ua ) { // what .. [buttons|links|values] ..
    var response = felicity[ 0 ] +", "+ reply[ 0 ];
    var x;
    if (-1 != ua.indexOf("checkboxes"))
        response = felicity[ 0 ] +", checkboxes are not supported yet";
    else if (-1 != (x = ua.indexOf("radio")) && x+1 == ua.indexof( "buttons" ))
        response = felicity[ 0 ] +", radio buttons are not supported yet";
    else {
        var type = "";
             if (-1 != ua.indexOf( "buttons" )) type = "button";
        else if (-1 != ua.indexOf(  "values" )) type =  "value";
        else if (-1 != ua.indexOf(   "links" )) type =   "link";
        else if (-1 != ua.indexOf( "figures" )) type = "figure";
        
        var widgets = [];
        var elems;
        switch (type) {
            case "button":
                elems = document.getElementsByTagName( "*" );
                for (el of elems)
                    if (el.tagName == "BUTTON") {
                        if (!hidden( el ))
                            widgets.push( articled( el.innerText.toLowerCase().trim()) +" "+type );
                    } else if (el.tagName == "INPUT" && el.type == "button"){
                        if (!hidden( el ))
                            widgets.push( articled( el.title.toLowerCase().trim()) +" "+type );
                    }
                response = widgets.length == 0 ?
                            felicity[ 0 ] +", "+ "there are no buttons."
                            : felicity[ 1 ] + " , there is: " + widgets.join( " ; and, there is " );
                break;
            case "value":
                elems = document.getElementsByTagName( "input" );
                for (el of elems)
                    if (el.type == "text" || el.type == "textarea")
                        if (!hidden( el ))
                            widgets.push( articled( el.title.toLowerCase().trim()) +" "+type );
                response = widgets.length == 0 ?
                            felicity[ 0 ] +", "+ "there are no values."
                            : felicity[ 1 ] + " , there is: " + widgets.join( " ; and, there is " );
                break;
            case "figure":
                elems = document.getElementsByTagName( "figcaption" );
                for (el of elems)
                    if (!hidden( el ))
                        widgets.push( articled( el.innerText.toLowerCase().trim()) );
                response = widgets.length == 0 ?
                            felicity[ 0 ] +", "+ "there are no figures."
                            : felicity[ 1 ] + " , there is: " + widgets.join( " ; and, there is " );
                break;
            case "link":
                elems = document.getElementsByTagName( "a" );
                for (el of elems)
                    if (!hidden( el )) {
                        var name = el.hasAttribute( "title" ) ?
                                el.getAttribute( "title" ) :
                                el.innerText.toLowerCase().trim();
                        if (name != "")
                            widgets.push( articled( name ) +" "+type );
                    }
                response = widgets.length == 0 ?
                                felicity[ 0 ] +", "+ "there are no links."
                                : felicity[ 1 ] + " , there is: " + widgets.join( " ; and, there is " );
                break;
            default : response = felicity[ 0 ] +", type not found.";
    }   }
	return response;
}
function toNumerics( str ) {
    switch (str) {
        case "won" : return "1";
        case "too" :
        case "two" :
        case "to"  : return "2";
        case "for" : return "4";
        default: return str;
}   }
function headingValues( ua ) { // what headings are there
    var headings = [];
    var levelIndex = ua.indexOf( "level" );
    var level = "1";
    if (levelIndex != -1 && levelIndex+1 < ua.length-1)
        level = toNumerics( ua[ levelIndex + 1 ]);
    var elems = document.getElementsByTagName( "h"+ level );
    for (elem of elems)
        if(!hidden( elem ))
            headings.push( elem.innerText );
    return headings.length == 0 ?
            felicity[ 0 ] +", "+ "there don't appear to be any level "+ level +" headings"
            : felicity[ 1 ] +", "+ "this page includes the heading:" + headings.join( " , and the heading " );
}
function upto7words( str ) {
    var sa = str.split( " " );
    var out = [];
    for (i=0; i<7; i++) {
        out.push( sa[ i ]);
        if (sa[ i ] == ".") break;
    }
    return out.join( " " );
}
function paragraphValues( ua ) { // what paragraphs are there
    var paragraphs = [];
    var body = document.getElementsByTagName( "body" );
    var elems = body[ 0 ].getElementsByTagName( "p" );
    for (elem of elems)
        if (!hidden( elem ))
            paragraphs.push( upto7words( elem.innerText ));
    return elems.length == 0 ?
            felicity[ 0 ] +", "+ "there don't appear to be any paragraphs"
            : felicity[ 1 ] +", "+ paragraphs.join( " , " );
}
function toNavigate( felicious ) {
    return (felicious ? felicity[ 1 ] +", ":"")+
            " To navigate, you can say: "+
            " go to website dot com; or, you can say, "+
            " click on x, or click on the x link.\n";
}
function toQuery( felicious ) {
    return  (felicious ? felicity[ 1 ] +", ":"")+
            "To query this page, you can say: "+
            "describe the page ; or, you can say, "+
            "what, or how many, buttons, links ,values, headings, or paragraphs are there; or, you can say, "+
            "is there an x button, or is there a y link.\n";
}
function toInteract( felicious ) {
    return (felicious ? felicity[ 1 ] +", ":"")+
            "To interact with this page, you can say: "+
            "click on x, or click on the x button; or, you can say, "+
            "set the value of x to y; or, you can say, "+
            "get the value of x.\n";
}
function help() {
    return toQuery( true ) + toNavigate( false ) + toInteract( false );
}
function interp( utterance ) {
    var response = felicity[0] +", "+ reply[ 0 ] +": "+ utterance;
    if (utterance == null) return felicity[0] +", "+ "i didn't catch that";
    var u = utterance.replace( "and then", "/" );
    var uas = u.split( "/" );
    for (i=0; i<uas.length; i++) {
        response = felicity[0] + ", "+ reply[ 0 ] +" "+ uas[i];
        uas[i]=uas[i].trim();
        ua=uas[i].split( " " );
    
        // basic interpretation...
        if (ua[0] == "ok") {
            response = "ok";
        } else if (uas[i] == "hello" ||
                   uas[i] == "help"  ||
                   (ua[i] == "what" && -1 != ua.indexOf( "say" ))) {
            response = help();
        } else if (ua[i] == "how" &&
                    -1 != ua.indexOf( "navigate" )) {
            response = toNavigate( true );
        } else if (ua[i] == "how" &&
                    -1 != ua.indexOf( "query" )) {
            response = toQuery( true );
        } else if (ua[i] == "how" &&
                    -1 != ua.indexOf( "interact" )) {
            response = toInteract( true );
        } else if (ua[0] == "click" && ua[ 1 ] == "on") {
            response = clickOn( shift( ua, 2 ));
        } else if (ua[ 0 ] ==   "set"
                && ua[ 1 ] ==   "the"
                && ua[ 2 ] == "value"
                && ua[ 3 ] ==    "of") {
            response = setValueTo( shift( ua, 4 ));
        } else if (ua[ 0 ] ==   "get" 
                && ua[ 1 ] ==   "the"
                && ua[ 2 ] == "value"
                && ua[ 3 ] ==    "of") {
            response = getValueOf( shift( ua, 4 ));
        } else if (ua[ 0 ] == "go") {
            response = go( shift( ua, 1 ));
		} else if (ua[i] == "describe" &&
                      -1 != ua.indexOf( "page" )) {
			response = describeThePage();
		} else if (ua[ 0 ] == "is" &&
		           ua[ 1 ] == "there" &&
	              (ua[ 2 ] == "a" || ua[ 2 ] == "an")) {
			response = query( shift( ua, 2 ), true );
		} else if (ua[ 0 ] == "do" &&
		           ua[ 1 ] == "you" &&
		           ua[ 2 ] == "have" &&
		          (ua[ 3 ] == "a" || ua[ 3 ] == "an")) {
            response = query( shift( ua, 3 ), false );
        } else if (ua[i] == "what" && 
              -1 != ua.indexOf( "title" )) {
        	response = titleValue( ua );
        } else if (ua[ 0 ] == "what" &&
              -1 != ua.indexOf( "headings" )) {
            response = headingValues( ua );
        } else if (ua[ 0 ] == "what" &&
              -1 != ua.indexOf( "paragraphs" )) {
            response = paragraphValues( ua );
        } else if (ua[ 0 ] == "what") { // values, links and buttons
            response = whatNames( ua );
        } else if (ua[ 0 ] == "how" &&
                   ua[ 1 ] == "many" ) {
            response = howMany( ua );
        } else if (ua[ 0 ] == "read") { 
        	response = read( shift( ua, 1 ));
		} else if (uas[i] == "keep listening") {
			response = felicity[ 0 ] + ", " +"listening mode not supported yet";
		} else if (uas[i] == "stop listening") {
			response = felicity[ 0 ] + ", " +"listening mode not supported yet";
		} else if (ua[i] == "verbose") {
			response = felicity[ 0 ] + ", " +"verbosity mode not supported yet";
	}	}
    return response;
}