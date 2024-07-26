/*
* Release Notes:
* Encapsulated the Class to prevent namespace contamination.
* Added a SP method getTermSetAsTree().
* Added integral namespaceing copability, Utls.core.ns.
* Fixed undefined object error coming from function onQuerySuccess in method Utls.sp.getUserProfileByName().
* Patched method $.getTermSetAsTree() with $.getTopLevelTermset(). Consider removing $.getTermSetAsTree() in next major release.
* Added methods $.sharePointDecode() and $.sharePointEncode(); 
* Added method spAjaxRequest() to replace the method getSpListData().
*/

~function($){
	var Utls = Utls || { core:{}, dom:{}, sp:{}, local:{} };
	
	Utls.core.ns = Utls.core.ns || {};
	
	Utls.core.err = function(msg){
		if(console && console.error){
			console.error(msg);
		}else if(console && console.log){
			console.log(msg);
		}
	}
	Utls.core.transformArgs = $.transformArgs || function(args, bool){
		var x = [];
		for( var i=args.length; i--; ) x.push(args[i]);
		x.reverse();
		return ( bool ) ? x : x.slice(2);
	}
	Utls.core.itr = $.itr || function(cb, collection){
		var result = Utls.transformArgs( arguments )
			, actions = {
				object: function (){
				var i = 0;
					for( var k in collection ) {
						if ( collection.hasOwnProperty( k ) )
							cb(k, collection[k], i, result);
						i++;
					}
				},
				array: function (){
					var x=0;
					collection.reverse();
					for ( var i=collection.length; i--; ){
						cb(collection[i], x, result);
						x++;
					}				  
				}
			};
		Utls.sw( actions, Utls.typeOf( collection ) );
		return ( result.length > 1 ) ? result : result[0];	
	}
	Utls.core.sw = $.sw || function(obj, itr){
		var def = obj['default'] || function(){};
		( obj[ itr ] || def )( Utls.transformArgs( arguments ) );
	}
	Utls.core.typeOf = $.typeOf || function(operand){
		if ( !Array.isArray )
			Array.isArray = function( array ) {
				return Object.prototype.toString.call( array ) === '[object Array]';
			}
		return ( Array.isArray( operand ) ) ? 'array' : typeof operand;		
	}
	Utls.core.prettyPrint = $.prettyPrint || function(str){
		return JSON.stringify(str,null,2)	
	}
	Utls.core.getObj = function( collection, target ){
		var tmp = []
			, collection = collection || [];
		for( var i=collection.length; i--; ){
			collection[i]['origionalPos'] = i;
			tmp.push( collection[i] );
		}
			for( var key in target ){
			for( var i=tmp.length; i--; ){
				if( tmp[i][ key ] === undefined || tmp[i][ key ] !== target[ key ] )
					tmp.splice(i, 1);
				}
			}
		if( tmp.length < 1 ) return undefined;
		return ( tmp.length === 1 ) ? tmp[0] : tmp;
	};
	Utls.core.uid = function( arg ) {
		var type = !arg || Utls.typeOf( arg )
			, params = { arg : arg, prefix : "", length : "", id : "" };

		Utls.sw({
			object : function() {
				params.prefix = arg.prefix || "";
				params.length = arg.length || 8;
				params.id 		= arg.id || "";
			}
		, array : function() {
				var key = uid + arg[0];
				params[ key ] = arg[1];
			}
		, string : function() {
				params.prefix = arg;
				params.length = 8;
			}
		, number : function() {
				params.length = arg;
				params.prefix = "";
			}
		, 'default' : function() {
				params.prefix = "";
				params.length = 8;
			}
		}, type );

		var object = {
				randomBank : ""
			 , id : ""
			 , generateId : function( size, prefix, id ) {
					var arr  = ["0123456789", "abcdefghijklmnopqrstuvwxyz", "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "!$#@_"]
						, bank = ( this.randomBank.length ) ? this.randomBank : arr;
						if(id){ arr[3] = '_' };
						var i=15; while(i--){ this.randomize( bank ); };
						return prefix + this.buildResult( size, this.id );
				}
			, buildResult : function( length, bank ) {
					var result = "";
					while( length-- ) {
						selector = Math.floor( Math.random() * ( bank.length - 0 + 1 ) ) + 0;
						result += bank.charAt( selector );
					}
					return result;
				}
			, randomize : function( chars ) {
					var setA = ""
						, setB = "";
					for( var i=0; i<chars.length; i++ ) {
						setA += this.buildResult( Math.floor( chars[i].length/67*100 ), chars[i] );
						if( i == chars.length -1 ) {
							setB += this.buildResult( setA.length, setA );
							this.randomBank = [ setB.substr(0,15), setB.substr(15,37), setB.substr(37,59), setB.substr(59,67) ];
						}
					}
					this.id = setB;
				}
			}
		return object.generateId( params.length, params.prefix, params.id );
	};
	Utls.core.zMax = function(){
		return Math.max.apply(null,
				$.map($('body *'), function(e,n) {
					if ($(e).css('position') !== 'static')
					return parseInt($(e).css('z-index'))+1 || 1;
		}));
	}	
	/**
	* @param action, boolean, If passed a false the file type(s) will be removed from the existing list. 
	* @param types, Array, An array of Strings representing file extentions to add to /remove from the RE.
	* @param types, String, a String representing a file extention to add to /remove from the RE.
	* @param flags, String, RE Flags.
	* @return RegExp, A regular expression that will match various potentionally harmful file extention types. 
	*/
	Utls.core.fileExtRegExp = function( action, types, flags ){
		var type = ( arguments.length == 2 ) ? action : types
		, begin = "^(.*\\.(?!("
		, end = ")$))?[^.]*$"
		, re = ""
		, extList = ['DOCM','DOTM','XLSM','XLTM','XLAM','PPTM','POTM','PPAM','PPSM','SLDM','REG','INF','lnk','scf','MSH','MSH1','MSH2','MSHXML','MSH1XML','MSH2XML','WSC','WSH','WS','WSF','JSE','js','vbe','VB','VBS','cmd','bat','jar','msc','cpl','hta','scr','com','msp','msi','gadget','application','pif','exe'
		];
		
		function removeFromList( item ){
			var tmp  = [];
			for(var i=extList.length;i--;)
				if(extList[i] != item )
					tmp.push( extList[i] )
			extList = tmp;
		}		
		if(type){
			$.sw({
				'string':function(){
					
					if(action===false) removeFromList( type );
					else extList.push(type);
				},
				'array':function(){
					for(var i=type.length;i--;)
						if(action===false) removeFromList( type[i] ); 
						else extList.push(type[i]);
				}
			},Utls.core.typeOf(type));
		}

		for(var i=extList.length;i--;)
			begin+=extList[i]+"|";

		re = begin.slice(0,-1)+end;
		flags = flags || "i";
		return new RegExp(re,flags);
	}
	
	/* DOM Manipulation Methods.
	---------------------------*/
	Utls.dom.elements = []
		, Utls.dom.templates = [];
		
	Utls.dom.el = $.el || function ( options ) {
		var type = options.el || "div"
			, el   = $("<" + type + " />");
		function setProperty( key, val ){
			(val=='true' || val == true) ? el.prop( key , true ) : null;
		}
		Utls.itr(function (key, val, i) {
			Utls.sw({
				'text': function () {
					el.text( val )
				},
				'val': function () {
					el.val( val )
				},
				'checked': function () {
					setProperty( key, val )
				},
				'selemected': function () {
					setProperty( key, val )
				},
				'multiple': function () {
					setProperty( key, val )
				},
				'disabled': function () {
					setProperty( key, val )
				},
				'css' : function(){
					el.css( val )
				},
				'children' : function(){
					Utls.itr(function( obj ){
					el.append( Utls.el( obj ) );
					},val);
				},
				'data' : function(){
					Utls.itr(function(attr, value){
					el.attr( "data-"+attr, value );
					}, val );
				},
				'on' : function(){
					Utls.itr(function( evt, fn ){

					if(evt == 'hover'){
						el.on( 'mouseenter', fn );
						el.on( 'mouselemeave', fn );
					}
					else{
						el.on( evt, fn );
					}
					},val)
				},
				'append' : function(){
					if( Utls.typeOf( val ) == 'array' ){
					Utls.itr(function( b ){
						el.append( b )
					}, val);
					} else{
					el.append( val );
					}
				},
				'animate': function(){
					var animate = options.animate
						, properties = animate.properties				
						, duration = animate.duration
						, complete = animate.complete;
					el.animate( properties, duration, complete );
				},
				'default':function(){
					el.attr( key, val );
				}
				}, key);
		}, options);
		el.removeAttr('el');
		el.removeAttr('dom_state');
		el.removeAttr('elemement');
		el.removeAttr('uid');
		return el;
	};
	/** Adds a style tag to the document head element.
  * @param {object} selector == css selector, props == css properties as an object literal; 
	* @return nothing. 
  */
	Utls.dom.addTag = $.addTag || function( opts ){
		var head = $('head')
			, defaultTag = $.el({'el': 'style','data':{'style_tag_name':'default'},'text':''})
			, result = defaultTag
			, html=""
			, append = true;
			
		head.find('style').each(function(){
			if( $(this).data('style_tag_name')!==undefined && $(this).data('style_tag_name') == "default"){
				result = $(this);
				append = false;
			}
		});	
		if(append) head.append(result);
		html=result.html();
		html+=(opts.selector+"{");
		Utls.itr(function( prop, value ){
			html += (prop+':'+value+';');
		},opts.props);
		html += "}";
		result.html(html);
	}
	Utls.dom.template = function(){
		var opts = ( Utls.typeOf(arguments[0]) === 'boolean' ) ? arguments[2] : arguments[1]
			, isGet = ( Utls.typeOf(arguments[0]) !== 'object' ) ? true : false;

		function parse( model, object ){
			var rs={};
			Utls.sw({
				'string': function(){
					rs = ( isGet && object.charAt(0) === "?" )
						? opts[object.slice(2)]
						: object;
				},
				'object': function(){
					var model = {};
					for( var key in object )
						if(object.hasOwnProperty(key))
							model[key] = parse({},object[key]);
					rs = model;
				},
				'array': function(){
					var tmp = [];
					for( var i=0; i< object.length; i++ ){
						tmp.push( parse({},object[i]) );
					}
					rs = tmp;
				},
				'function': function(){
					rs = object;
				},
				'default': function(){
					// drop the array property position.
				}
			}, Utls.typeOf(object) );
				return rs;
			}

		// Return an Object from the models collection.
		if( Utls.typeOf(arguments[0]) !== "object" ){
			var rs = {}
				, asElem = (Utls.typeOf(arguments[0]) === "boolean") ? true : false
				, model = (asElem) ? arguments[1] : arguments[0];
			rs = parse( {}, Utls.getObj( Utls.dom.templates, {'modelID': model} ) );
			delete rs.modelID;
			delete rs.origionalPos;
			return (asElem) ? rs : Utls.el( rs );
		}

		// Add an Object to the models collection.
		for(var i=arguments.length; i--;)
			Utls.dom.templates.push( parse( {}, arguments[i] ) );
	}
	/* SharePoint Specific methods
	------------------------------*/	
	Utls.sp.crud = $.crud || function( str,title,action ){
		var url = _spPageContextInfo.webAbsoluteUrl
			, spContext =_spPageContextInfo
			, result
			, api = {
					'create': function(){
						result = (!title)
							? undefined
							: url+"/_api/web/lists/GetByTitle('"+title+"')/items";
					},
					'retrieve':  function(){
						var query = action || "";
						result = url+"/_api/web/lists/GetByTitle('"+title+"')/Items"+query;
					},
					'update':  function(){
						result = (!title || !action)
							? undefined
							: url+"/_api/web/lists/GetByTitle('"+title+"')/items("+action+")";
					}
			};
		Utls.sw(api,str);
		return result;
	}
	Utls.sp.getSpListData = function(listName, item ){
		var getListItemType = function(name) {
				return"SP.Data." + name[0].toUpperCase() + name.substring(1) + "ListItem";
			}
		return $.ajax({
			url: $.crud('retrieve', listName, item), 
			cache: false,
			headers: { 		
				"ACCEPT": "application/json;odata=verbose", 
				"Content-Type": "application/json;odata=verbose", 
				"IF-MATCH": "*",
				"X-HTTP-Method": "POST",
				"X-RequestDigest": document.getElementById("__REQUESTDIGEST").value,
			}
		});
	}
	Utls.sp.getUserProfileByName= function(username,cb){
		var _users=[];
		if(SP.SOD !== undefined ){
			SP.SOD.executeFunc('sp.js', 'SP.ClientContext',function() {
				var clientContext = new SP.ClientContext.get_current()
					, keywordQuery = new Microsoft.SharePoint.Client.Search.Query.KeywordQuery(clientContext)
					, queryOptions = {
							'set_queryText':username,
							'set_sourceId':'B09A7990-05EA-4AF9-81EF-EDFAB16C4E31',
							'set_rowLimit':50,
							'set_trimDuplicates': false
						}
					, searchExecutor = new Microsoft.SharePoint.Client.Search.Query.SearchExecutor(clientContext);
							 
				for( key in queryOptions) keywordQuery[ key ]( queryOptions[key] );
				results = searchExecutor.executeQuery(keywordQuery);
				clientContext.executeQueryAsync(onQuerySuccess);
			});
				
			function onQuerySuccess() {
				if( results.m_value.ResultTables[0] ){
					$.itr(function( user ){
						_users.push( user );
					}, results.m_value.ResultTables[0].ResultRows);								
				}
				cb( _users );
			}
		}
	}
    /** Returns an array object of terms as a tree
    * @param {string} id - Termset ID
    * @param {object} callback - Callback function to call upon completion and pass termset into
    */
	Utls.sp.getTermSetAsTree = function (id, callback) {
        Utls.local.getTermSet(id, function (terms) {
            var termsEnumerator = terms.getEnumerator()
			  , tree = { term: terms, children: [] };
 
            // Loop through each term
            while (termsEnumerator.moveNext()) {
                var currentTerm = termsEnumerator.get_current();
                var currentTermPath = currentTerm.get_pathOfTerm().split(';');
                var children = tree.children;
 
                // Loop through each part of the path
                for (var i = 0; i < currentTermPath.length; i++) {
                    var foundNode = false;
 
                    for (var j = 0; j < children.length; j++) {
                        if (children[j].name === currentTermPath[i]) {
                            foundNode = true;
                            break;
                        }
                    }
 
                    // Select the node, otherwise create a new one
                    var term = foundNode ? children[j] : { name: currentTermPath[i], children: [] };
 
                    // If we're a child element, add the term properties
                    if (i === currentTermPath.length - 1) {
                        term.term = currentTerm;
                        term.title = currentTerm.get_name();
                        term.guid = currentTerm.get_id().toString();
                    }
 
                    // If the node did exist, let's look there next iteration
                    if (foundNode) {
                        children = term.children;
                    }
                    // If the segment of path does not exist, create it
                    else {
                        children.push(term);
 
                        // Reset the children pointer to add there next iteration
                        if (i !== currentTermPath.length - 1) {
                            children = term.children;
                        }
                    }
                }
            }
 
            tree = Utls.local.sortTermsFromTree(tree);
            callback(tree.children);
        });
    };
    /** Patch for the getTermSetAsTree() method
	 * @param {string} id - Top Level Termset ID
     * @param {object} callback - Callback function to call upon completion and pass termset into
    */
    Utls.sp.getTopLevelTermset = function( id, cb ){
    	Utls.sp.getTermSetAsTree( id, cb )
    }
    /** Returns an array object of terms as a tree from a child object.
	 * @param {string} parentID - Top Level Termset ID
	 * @param {string} childID - child Level Termset ID
     * @param {object} callback - Callback function to call upon completion and pass termset into
    */    
	Utls.sp.getChildLevelTermset = function( parentID, childID, cb ){
		Utls.sp.getTopLevelTermset(parentID, function (terms){
			cb( Utls.local.getTermset( terms, {'guid':childID}) )
		});
	}
    /** Accepts a String with SharePoint Encoding and returns a String with the encoding stripped out. 
	 * @param {String} str - The String to be decoded.
    */  	
	Utls.sp.sharePointDecode = function( str ){
		var response = str,	next = "";		  
		for(var i=Utls.local.sharePointEncoding.length;i--;){		
			for( code in Utls.local.sharePointEncoding[i] ){		
			 	var re = RegExp(code,'g');
				next = response.replace(re,Utls.local.sharePointEncoding[i][code]);
				response = next;
			}
		}		
		return response;
	}
	/** Accepts a String and returns a String with SharePoint Encoding. 
	 * @param {String} str - The String to be encoded.
    */ 
	Utls.sp.sharePointEncode = function( str ){
	var response = "";
		for(var i=0;i<str.length;i++){
			var character = str.charAt(i)
			  , clean = character;
			for(var j=Utls.local.sharePointEncoding.length;j--;){		
				for( code in Utls.local.sharePointEncoding[j] ){		
					if( (character==Utls.local.sharePointEncoding[j][code]) )
						clean = code;											
				}
			}
			response+=clean;
		}  
		return response;
	}
	/** Makes either a GET or POST request to SharePoint to interact with a list. 
	* If the data property is left out a GET request will be sent, otherwise
	* a POST request will be sent along with the data.
	* @param {String} list - Name of the list ot be interacted with.
	* @param {String} data - Object literal containing the data to be added to the list. 
  */ 
	Utls.sp.spAjaxRequest = function( options ){
		var root = options.root || _spPageContextInfo.webAbsoluteUrl;
		function formatItemType( name ){
			var eName = $.sharePointEncode(name);
		    return "SP.Data." + eName.charAt(0).toUpperCase() + eName.slice(1) + "ListItem";
		}
		
		var metadata = { 
			__metadata:{ type: formatItemType(options.list) } 
		}
		
		var query = options.query || "";
		
		var request = {
			url: root + "/_api/web/lists/GetByTitle('"+options.list+"')/items"+query, 
			type: "GET",
			cache: false,
			headers:{
				'Accept': 'application/json;odata=verbose', 
				'Content-Type': 'application/json;odata=verbose',  
				'X-RequestDigest': document.getElementById("__REQUESTDIGEST").value,
				'X-HTTP-Method': 'GET' 
			}
		};
		
		if(options.data){
			request.data = JSON.stringify( $.extend(options.data, metadata) );
			request.type = "POST";
			request.headers['X-HTTP-Method'] = (options.method == 'POST')?"POST":"MERGE";
      request.headers['If-Match'] = "*";
		}
		return $.ajax( request );
	}

	Utls.sp.spMail = function( opts ){
		var props = {properties: $.extend({__metadata:{'type':'SP.Utilities.EmailProperties'}},opts) };	
		return $.ajax({
			url: _spPageContextInfo.webAbsoluteUrl +"/_api/SP.Utilities.Utility.SendEmail",
			type: "POST",
			data: JSON.stringify(props),
			headers: { 		
				"ACCEPT": "application/json;odata=verbose", 
				"Content-Type": "application/json;odata=verbose", 
				"X-HTTP-Method": "POST",
				"X-RequestDigest": document.getElementById("__REQUESTDIGEST").value,
			}
		});
	}

	/**
	* @param {DOM} element == The file input DOM element.
	* @param {String} list == Name of the SP List being uploaded to.
	* @param {String} lib == Name of the SP Document Library being uploaded to.
	* @param {Object} data == Object, key val pairs to be added to the documents properties.
	* @return {Object} fn, done/fail. ajax done/fail results. 
	*/
	Utls.sp.spUploadDocument = function( opts ) {
		var requestDigest = document.getElementById("__REQUESTDIGEST").value
			, root = _spPageContextInfo.webAbsoluteUrl
			, files = opts.element.files
			, folder = []
			, count = 0;

		if (!window.FileReader) {
			alert("This browser does not support the HTML5 File APIs");
			return;
		}

		for( var i in files ){
			if( !isNaN(parseInt(i)) ){
				folder.push(files[i]);
			}
		}
		
		initReader( folder[0] );
			
		function initReader( file ){
			var reader = new FileReader();
			
			reader.onload = function (e) {
				addItem(e.target.result, file.name );
			}
				
			reader.onerror = function (e) {
				alert(e.target.error);
			}
				
			reader.readAsArrayBuffer(file);
			count++;
		}
		
		function formatItemType( name ){
			var eName = $.sharePointEncode(name);
			return "SP.Data." + eName.charAt(0).toUpperCase() + eName.slice(1)+"Item";
		}		
		
		function addItem(buffer, fileName){
			uploadDocument(buffer, fileName)
			.done(function( data ){
				var item = data.d
					, webUrl = item.__metadata.id
					, sourceFileUrl = item.Name
					, ext = sourceFileUrl.slice(sourceFileUrl.lastIndexOf("."), sourceFileUrl.length )
					, name = sourceFileUrl.slice(0, sourceFileUrl.lastIndexOf(ext))
					, targetFileUrl = opts.url + "/" + opts.lib + "/" + name + "_" + $.uid() + ext;
				
				getItem(item)
					.done(function( data ){
						updateItemFields(data, name)
							.done(function( data ){
								rename(webUrl,sourceFileUrl,targetFileUrl)
								.done(function(){
									if(folder.length>count)
										initReader( folder[count] );
								})
							})
							.fail(function( err ){
								console.log("[ERROR] getItem ", err );
							});
					}).fail(function( err ){
						console.log("[ERROR] getItem ", err );
					})
				
			});	
		}

		function rename(webUrl,sourceFileUrl,targetFileUrl){
			 return executeJson(webUrl + "/moveto(newurl='" + targetFileUrl + "',flags=1)","POST");
		}

		function executeJson(url,method,headers,payload){
			headers = headers || {};
			method = method || 'GET';
			headers["Accept"] = "application/json;odata=verbose";
			if(method == "POST") 
				headers["X-RequestDigest"] = requestDigest;

			var ajaxOptions = {       
				url: url,   
				type: method,  
				contentType: "application/json;odata=verbose",
				headers: headers
			};
			if(method == "POST") 
				ajaxOptions.data = JSON.stringify(payload);
			return $.ajax(ajaxOptions);
		}
				
		function uploadDocument(buffer, fileName) {
			var url = String.format(
				"{0}/_api/Web/Lists/getByTitle('"+$.sharePointEncode( opts.list )+"')/RootFolder/Files/Add(url='{1}', overwrite=true)",
				_spPageContextInfo.webAbsoluteUrl, fileName);
			return jQuery.ajax({
				url: url,
				type: "POST",
				data: buffer,
				processData: false,
				headers: {
					'Accept': 'application/json;odata=verbose',
					'X-RequestDigest': requestDigest,
					'Content-Length': buffer.byteLength
				}
			});
		}

		function getItem( file ) {
			return jQuery.ajax({
				url: file.ListItemAllFields.__deferred.uri,
				type: "GET",
				dataType: "json",
				headers: {
					Accept: "application/json;odata=verbose"
				}
			});
		}

		function updateItemFields( data, name ) {
			var item = data.d
				, metadata = { '__metadata': { type: formatItemType(opts.lib) } };
				return jQuery.ajax({
						url: _spPageContextInfo.webAbsoluteUrl +
								"/_api/Web/Lists/getByTitle('"+opts.list+"')/Items(" +
								item.Id + ")",
						type: "POST",
						data: JSON.stringify( $.extend(opts.data,{'Title':name},metadata) ),
						headers: {
								Accept: "application/json;odata=verbose",
								"Content-Type": "application/json;odata=verbose",
								"X-RequestDigest": document.getElementById("__REQUESTDIGEST").value,
								"IF-MATCH": item.__metadata.etag,
								"X-Http-Method": "MERGE"
						}
				});
		}		
	}

	
	/* Locally used methods
	-----------------------*/	

	/** Returns a termset, based on ID
	* @param {string} id - Termset ID
	* @param {object} callback - Callback function to call upon completion and pass termset into
	*/	
	Utls.local.getTermSet = function (id, callback) {
			var ctx = SP.ClientContext.get_current()
				, taxonomySession = SP.Taxonomy.TaxonomySession.getTaxonomySession(ctx)
				, termStore = taxonomySession.getDefaultSiteCollectionTermStore()
				, termSet = termStore.getTermSet(id)
				, terms = termSet.getAllTerms();
			ctx.load(terms); 
			ctx.executeQueryAsync(Function.createDelegate(this, function (sender, args) {
				callback(terms);
			}), 
			Function.createDelegate(this, function (sender, args) { }));
  };
	/** Sort children array of a term tree by a sort order
    * @param {obj} tree The term tree
    * @return {obj} A sorted term tree
    */
	Utls.local.sortTermsFromTree = function (tree) {
        if (tree.children.length && tree.term.get_customSortOrder) {
            var sortOrder = null;
            if (tree.term.get_customSortOrder()) {
                sortOrder = tree.term.get_customSortOrder();
            }
            if (sortOrder) {
                sortOrder = sortOrder.split(':');
 
                tree.children.sort(function (a, b) {
                    var indexA = sortOrder.indexOf(a.guid);
                    var indexB = sortOrder.indexOf(b.guid);
 
                    if (indexA > indexB) {
                        return 1;
                    } else if (indexA < indexB) {
                        return -1;
                    }
 
                    return 0;
                });
            }
            else {
                tree.children.sort(function (a, b) {
                    if (a.title > b.title) {
                        return 1;
                    } else if (a.title < b.title) {
                        return -1;
                    }
 
                    return 0;
                });
            }
        }
 
        for (var i = 0; i < tree.children.length; i++) {
            tree.children[i] = Utls.local.sortTermsFromTree(tree.children[i]);
        }
 
        return tree;
    };
	Utls.local.itrGrandChildren = function( collection, target ){
		var terms = [];
		for( var key in target ){
			$.itr(function( item ){					
					if( item[key] == target[key] ){
						terms.push(item);
					} 
			},collection );
		}
		if( terms.length < 1 ) return undefined;
		return ( terms.length === 1 ) ? terms[0] : terms;

	}
	Utls.local.itrChildren = function( collection, target ){
		var terms = [];
		for( var key in target ){
			$.itr(function( item ){					
					if( item[key] == target[key] ){
						terms.push(item);
					} else if( item.children.length >0 ){
						if( Utls.local.itrGrandChildren( item.children, target )){
							terms.push( Utls.local.itrChildren( item.children, target ) )
						}
					}
			},collection );
		}

		if( terms.length < 1 ) return undefined;
		return ( terms.length === 1 ) ? terms[0] : terms;
	}
	Utls.local.getTermset = function( collection, target ){
		var terms = [];
		for( var key in target ){
			$.itr(function( item ){					
					if( item[key] == target[key] ){
						terms.push(item);
					} else if( item.children.length >0 ){
						if( Utls.local.itrChildren( item.children, target )){
							terms.push( Utls.local.itrChildren( item.children, target ) )
						}
					}
			},collection );			
		}
		if( terms.length < 1 ) return undefined;
		return ( terms.length === 1 ) ? terms[0] : terms;

	}

	Utls.local.sharePointEncoding = [
	  {'_x0020_':' '},
	  {'_x005f_':'_'}
  	];
  	
  	
	$.extend( Utls, Utls.core, Utls.dom, Utls.sp );
	$.extend( Utls );
}(jQuery);


// Pulls the EIS banner out of the css stack so the page doesn't move. You're welcome.  
jQuery(function($){ $('#status_preview').css({'position':'absolute','zIndex': $.zMax(),'width':'100%'}); })
