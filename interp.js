var felicity = [ "sorry", "ok", "yes", "no" ];
var reply = [ "i don't understand", "i don't know" ];
var clickMe = null;
function clickClickMe() {
	if (clickMe != null) {
		clickMe.click()
		clickMe = null;
}	}
function clickOn( cmd ) { // click on X
	if (cmd.length == 0)
		return felicity[0] + ", "+ reply[ 0 ] +": click on ";
	else {
	    var errMsg = cmd.join( " " );
	    var      the = "";
	    if (cmd[ 0 ] == "the") {
	        the = "the ";
	        cmd.shift();
	    }
	    if (cmd.length == 0)
	    	return felicity[0] + ", "+ reply[ 0 ] +": click on the";
	    else {
		    var buttons = null, links = null, inputBt = null;
		    var elemType = cmd[ cmd.length -1 ];
		    if (elemType == "link") {
		        links = document.getElementsByTagName( "a" );
		        cmd.pop();
		    } else if (elemType == "button" ) {
		        buttons = document.getElementsByTagName( "button" );
		        inputBt = document.getElementsByTagName( "input" );
		        cmd.pop();
		    } else {
		        elemType = "";
		        buttons = document.getElementsByTagName( "button" );
		        inputBt = document.getElementsByTagName( "input" );
		        links   = document.getElementsByTagName( "a" );
		    }
		    if (cmd.length == 0)
		    	return felicity[0] + ", "+ reply[ 0 ] +": click on "+ the + elemType;
		    else {
			    var name = cmd.join( " " ).toLowerCase();
			    var clickable;
			    var candidates = [];
                var clickables = [];
			    if (buttons != null) for (i=0; i<buttons.length; i++) candidates.push( buttons[ i ]);
			    if (links   != null) for (i=0; i < links.length; i++) candidates.push(   links[ i ]);
			    if (inputBt != null) for (i=0; i<inputBt.length; i++)
			        if (inputBt[ i ].type == "button" || inputBt[ i ].type == "submit")
			            candidates.push( inputBt[ i ]);
			    for (clickable of candidates)
			        if ((clickable.title != undefined     &&
                         clickable.title.trim().toLowerCase().includes( name )) 
                     || (clickable.value != undefined     &&
                         clickable.value.trim().toLowerCase().includes( name ))
                     || (clickable.innerText != undefined &&
                         clickable.innerText.trim().toLowerCase().includes( name ))
                     || (clickable.tagName == "INPUT"     && // need to check this too(!)
                         clickable.type    != undefined   &&
                         clickable.type    == "submit"    &&
                         name              == "submit"     )) clickables.push( clickable );
                        
                switch (candidates.length) {
                    case 0:
                        return felicity[0] + ", no clickable items match: "+ errMsg;
                    case 1:
                        clickMe = clickables[ 0 ];
                        setTimeout( clickClickMe, 1800 );
                        return felicity[1] +", "+ the + name +" "+ elemType +" is clicked";
                    default:
                        return felicity[0] +", several clickable items match "+ the + name +" "+ elemType;
}   }	}	}	}
function shift( cmd, n ) {
    for (i=0; i<n; i++) cmd.shift();
    return cmd;
}
function setValueTo( cmd ) { // set the value of X to Y
    if (cmd.length >= 3) {
    	var name = cmd[ 0 ]; cmd.shift();
	    while (cmd.length >= 2 && cmd[ 0 ] != "to") {
	        name += " "+ cmd[ 0 ];
	        cmd.shift(); // to?
	    }
	    if (cmd.length > 1) {
		    cmd.shift(); // to
            var value = cmd.join( " " );
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
    return felicity[0] +", "+ reply[ 0 ] +" "+ cmd.join(" ");
}
function getValueOf( cmd ) { // get the value of ...
    var rc = felicity[0] +", "+ reply[ 0 ];
    var name = cmd.join( " " );
    if (name.length > 0) {
    	var elem = document.getElementById( name );
	    rc = elem == null ?
	        felicity[ 0 ] + ", "+ name +" is not a value"
	        : felicity[ 1 ] + ", "+ name +" is "+
	            elem.value == undefined ? "unset" : "set to " + elem.value;
    }
    return rc;
}
function go( cmd ) { // go ...
	var response = felicity[0] +", "+ reply[ 0 ] +": "+ cmd;
	if (cmd.length > 0) {
		if (cmd[ 0 ] == "to") {
			cmd.shift();
			if (cmd.length > 0) {
				address = cmd.join("");
				window.location.href="http://" + address.toLowerCase();
				response = felicity[ 1 ];
			}
		} else if (cmd[ 0 ] == "back") {
			window.history.back();
			response = felicity[ 1 ] +", gone back";
		} else if (cmd[ 0 ] == "forward") {
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
function query ( cmd, imp ) { //is there [a|an].../do you have [a|an]...
	var response = [];
	var article = cmd[ 0 ]; cmd.shift();
	var type = cmd[ cmd.length -1 ];
	if (type == "link" || type == "button" || type == "value")
		cmd.pop();
	else
		type = "value";
	str = cmd.join(" ").toLowerCase();
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
function read( cmd ) { // read .../read from/read from main heading
    var response = felicity[0] + ", "+ reply[ 0 ] +" "+ cmd.join( " " );

    //do we have to read from something
    var readPHn = true;
    var findMe = "";
    var fromIndex = cmd.indexOf( "from" );
    if (fromIndex > -1) { // we've to find something
        for (i=0; i <= fromIndex; i++) cmd.shift();
        findMe = cmd.join( " " ).toLowerCase();
        if (findMe == "main heading") {
            findMe = "";
            readPHn = false;
    }   }

    // gather text - headings and paragraphs
    response = "";
    var elems = document.getElementsByTagName( "*" );
    for (elem of elems)
        if ((readPHn && ( elem.tagName == "P" ||
                         (elem.tagName.startsWith( "H" ) && elem.tagName.length == 2)))
         || elem.tagName == "H1")
        {   response += elem.innerText.toLowerCase() +" ; ; ;  \n";
            readPHn = true;
        }

    // jump to a point in the text if required
    if (findMe != "") {
        fromIndex = response.indexOf( findMe );
        response = fromIndex == -1 ?
            felicity[ 0 ] +", "+ "i can't find the passage beginning with "+ findMe :
            response.substr( fromIndex );
    }
    return response; 
}
function titleValue( cmd ) { // what is the title of this page
    var elem = document.getElementsByTagName( "title" );
    return elem.length == 0 ?
            felicity[ 0 ] +", "+ reply[ 1 ]
            : "the title of this page is: "+ elem[ 0 ].innerText;
}
function hidden( elem ) {
    return elem.hasAttribute( "aria-hidden" ) == true &&
           elem.getAttribute( "aria-hidden" ) == "true";
}
function howMany( cmd ) { // how many X [are there [on this page]]
    var name = cmd[ 2 ];
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
function whatNames( cmd ) { // what .. [buttons|links|values] ..
    var response = felicity[ 0 ] +", "+ reply[ 0 ];
    var x;
    if (-1 != cmd.indexOf("checkboxes"))
        response = felicity[ 0 ] +", checkboxes are not supported yet";
    else if (-1 != (x = cmd.indexOf("radio")) && x+1 == cmd.indexof( "buttons" ))
        response = felicity[ 0 ] +", radio buttons are not supported yet";
    else {
        var type = "";
             if (-1 != cmd.indexOf( "buttons" )) type = "button";
        else if (-1 != cmd.indexOf(  "values" )) type =  "value";
        else if (-1 != cmd.indexOf(   "links" )) type =   "link";
        else if (-1 != cmd.indexOf( "figures" )) type = "figure";
        
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
function headingValues( cmd ) { // what headings are there
    var headings = [];
    var levelIndex = cmd.indexOf( "level" );
    var level = "1";
    if (levelIndex != -1 && levelIndex+1 < cmd.length-1)
        level = toNumerics( cmd[ levelIndex + 1 ]);
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
function paragraphValues( cmd ) { // what paragraphs are there
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
    var cmds = utterance.split( "and then" );

    for (i=0; i<cmds.length; i++) {
        
        cmds[i]=cmds[i].trim();
        cmd=cmds[i].split( " " );
        while (cmd.length > 0 && felicity.includes( cmd[ 0 ] )) 
            cmd.shift();
        
        // Basic Interpretation...
        if (cmd.length == 0)
            response = "ok";

        // Page interaction/navigation
        else if (cmd[ 0 ] == "click"
              && cmd[ 1 ] == "on")
            response = clickOn( shift( cmd, 2 ));
        else if (cmd[ 0 ] ==   "set"
              && cmd[ 1 ] ==   "the"
              && cmd[ 2 ] == "value"
              && cmd[ 3 ] ==    "of")
            response = setValueTo( shift( cmd, 4 ));
        else if (cmd[ 0 ] ==   "get" 
              && cmd[ 1 ] ==   "the"
              && cmd[ 2 ] == "value"
              && cmd[ 3 ] ==    "of")
            response = getValueOf( shift( cmd, 4 ));
        else if (cmd[ 0 ] == "go")
            response = go( shift( cmd, 1 ));
		else if (cmd[ 0 ] == "read")
        	response = read( shift( cmd, 1 ));

        // Interaction Help...
        else if (cmds[i] == "hello" ||
                 cmds[i] == "help"  ||
                 (cmd[1] == "what" && cmd.indexOf( "say" ) != -1))
            response = help();
        // ... how [should/do I/you] ...
        else if (cmd[ 0 ] ==  "how" &&
                 cmd.indexOf( "navigate" ) != -1)
            response = toNavigate( true );
        else if (cmd[ 0 ] ==  "how" &&
                 cmd.indexOf( "query"    ) != -1)
            response = toQuery( true );
        else if (cmd[ 0 ] ==  "how" &&
                 cmd.indexOf( "interact" ) != -1)
            response = toInteract( true );

        // Page Description
        else if (cmd[ 0 ] == "describe" &&
                 cmd.indexOf(    "page" ) != -1)
			response = describeThePage();
		else if (cmd[ 0 ] == "is" &&
                 cmd[ 1 ] == "there" &&
                (cmd[ 2 ] == "a" || cmd[ 2 ] == "an"))
			response = query( shift( cmd, 2 ), true );
		else if (cmd[ 0 ] == "do" &&
                 cmd[ 1 ] == "you" &&
                 cmd[ 2 ] == "have" &&
                (cmd[ 3 ] == "a" || cmd[ 3 ] == "an"))
            response = query( shift( cmd, 3 ), false );
        else if (cmd[ 0 ] ==  "what" && 
                 cmd.indexOf( "title" ) != -1)
        	response = titleValue( cmd );
        else if (cmd[ 0 ] ==  "what" &&
                 cmd.indexOf( "headings" ) != -1)
            response = headingValues( cmd );
        else if (cmd[ 0 ] ==  "what" &&
                 cmd.indexOf( "paragraphs" ) !=-1)
            response = paragraphValues( cmd );
        else if (cmd[ 0 ] == "what") // catch-all: values, links and buttons
            response = whatNames( cmd );
        else if (cmd[ 0 ] == "how" &&
                 cmd[ 1 ] == "many" )
            response = howMany( cmd );

        // Configuring Interaction: nothing supported a yet!
		else if (cmds[i] == "keep listening")
			response = felicity[ 0 ] + ", " +"listening mode not supported yet";
		else if (cmds[i] == "stop listening")
			response = felicity[ 0 ] + ", " +"listening mode not supported yet";
		else if (cmds[i] == "verbose")
			response = felicity[ 0 ] + ", " +"verbosity mode not supported yet";

        // default error response:
	    else
            response = felicity[0] + ", "+ reply[ 0 ] +" "+ cmds[i];

        if (response.startsWith( felicity[ 0 ] + "," )) break;
    }
    return response;
}