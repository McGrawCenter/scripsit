jQuery(document).ready(function(){


	  $( function() {
	    $( "#slider-range" ).slider({
	      range: true,
	      min: 800,
	      max: 1800,
	      values: [ 800, 1800 ],
	      slide: function( event, ui ) {
		$( "#amount" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
	      }
	    });
	    $( "#amount" ).val( $( "#slider-range" ).slider( "values", 0 ) +
	      " - " + $( "#slider-range" ).slider( "values", 1 ) );
	  } );






	(function($){
	    jQuery.fn.serializeObject = function() {
		var o = {};
		var a = this.serializeArray();

		jQuery.each(a, function() {
		    this.value = encodeURIComponent(this.value);

		    if (o[this.name] !== undefined) {
		        if (!o[this.name].push) {
		            o[this.name] = [o[this.name]];
		        }
		        o[this.name].push(this.value || '');
		    } else {
		        o[this.name] = this.value || '';
		    }
		});
		return JSON.parse(JSON.stringify(o));
	    };
	})(jQuery);




	var filter_fields = [
	    {"column":"DateAfter",		"type":"select", values:[]},
	    {"column":"DateBefore",		"type":"select", values:[]},
	    {"column":"Century",		"type":"checkboxes", values:[]},
	    {"column":"ManuscriptLanguage",	"type":"checkboxes", values:[]},
	    {"column":"HoldingInstitution",	"type":"checkboxes", values:[]},
	    {"column":"Type",			"type":"checkboxes", values:[]}
	    ];

	var perpage = 50;
	var page = 1;


/*
	var dates = [];
	var langs = [];
	
	
	jQuery.each(filter_fields, function(i,v){
	   v = {"title":v,"values":[]}
	});
*/



	
	/***
	* add all possible values to the values array for each filter_field
	******************************************************************/
	jQuery.each(csvdata, function(i,v){
	  jQuery.each(filter_fields, function(j,w){
	    w.values.push(v[w.column]); 
	  });
	});
	
	/***
	* reduce those values to only unique values
	******************************************************************/
	jQuery.each(filter_fields, function(i,v){
	    v.values = v.values.filter(onlyUnique).sort();
	    populateFilter(v);
	});


	/***
	* triggers
	******************************************************************/
	jQuery("#searchform").submit(function(e){ 
	   e.preventDefault();
	});
	 
	 
	jQuery("#search_go").click(function(e){
	  //showresults();
	  e.preventDefault();
	});
	
	jQuery(".filter").change(function(e){
	  showresults();
	});	
	
	
	jQuery(document).on("click",".pager", function(e){
	  page = jQuery(this).attr('rel');
	  showresults();
	  e.preventDefault();
	});		
	
	
	/***
	* end triggers
	******************************************************************/	 
	 
	 
	 
	 
	 
	 
	 showresults();
	 
	 



	function showresults() {
	

	  var r = [];
	  
	  var results = csvdata;
	  
	  
	  
	  var f = jQuery('#ManuscriptLanguage .filter:checked');
	  var evalstr = []
	  jQuery.each(f, function(i,v){
	    evalstr.push('val.ManuscriptLanguage === "'+v.value+'"');
	  });
	  evalstr = evalstr.join(" || ");
	  results = jQuery.grep(csvdata, function(val) { return eval(evalstr); });

	  var f = jQuery("#DateAfter").val();
	  var evalstr = "val.DateAfter >= '"+f+"'";
	  results = jQuery.grep(results, function(val) { return val.DateAfter >= 1100; });
	  
	  
	  
	  
	   //var formData = jQuery('#searchform').serializeObject();
	   /*
	   jQuery.each(formData, function(i,v){
	     
	     if(v !== "") {
	        var eval_string = [];
	        
	        jQuery.each(v, function(ind,val){
	          eval_string.push(i+" === "+val);
	        })
	        eval_string = eval_string.join(" && ");
	        console.log(eval_string);
	        //Institution == "oo" && Institution == "ee"
	        //var eval_str = v.join(i+" && ");
	        //console.log(eval_str);
	        //var eval_string = "ManuscriptLanguage === 'English'";
	        //results = jQuery.grep(csvdata, function(val) { return eval(eval_string); });
	        
	      }

	   });
	  */
	  /*
	  var active_filters = jQuery(".filter:checked");
	  
	  
	  if(active_filters.length > 0) {
	     var eval_string = [];
	     jQuery.each(active_filters, function(i,v){
	        var s = v.value.replace("_"," ").split(":");
	        eval_string.push("val."+s[0]+" === '"+s[1]+"'");
	        
	     });
	     eval_string = eval_string.join(" && ");
	     //console.log(eval_string);
	     // this magic function does the filtering
	     results = jQuery.grep(csvdata, function(val) { return eval(eval_string); });
	  }
	*/
	  displaySearchResults(results, csvdata); // We'll write this in the next section

	}




	 
	function populateFilter( filter_field ) {
	
	  if(filter_field.type=="select") {
	    jQuery.each(filter_field.values, function(i,v){
	      jQuery("#"+filter_field.column).append("<option value='"+v+"'>"+v+"</option>");
	    });
	  }

	  if(filter_field.type=="checkboxes") {
	    jQuery.each(filter_field.values, function(i,v){
	      jQuery("#"+filter_field.column).append("<label><input type='checkbox' name='"+filter_field.column+"' class='filter' value='"+v+"'/> "+v+"</label><br />");
	    });	  
	  }

	  return true;
	}
	 
	/****
	* reduce array to only unique value
	*********************************************/
	function onlyUnique( value, index, self ) {
	  return self.indexOf(value) === index;
	}	 


	/****
	* template for result items
	*********************************************/
	function template(o) { 	   
	  return "<tr><td class='hit'><a href='detail?id="+o.ID+"'>"+o.MS+"</a> ("+o.Date+"): "+o.Type+"</td></tr>";
	}



	/****
	* show the search results
	*********************************************/
	function displaySearchResults(results, csvdata) {
	  jQuery('#search-results').empty();
	  
	  var hits = results.length;
	  
	  jQuery("#hits").html(hits+" records");
	  
	  var pages = parseInt(hits/perpage) + 1;
	  
	  jQuery("#pagination").html(pagination(pages));
	  
	  //slice the results for the current page
	  var start = (page-1) * perpage;
	  var end = start + perpage;
	  results = results.slice(start,end);

	  jQuery.each(results, function(i,v) {
	      jQuery('#search-results').append(template(v));
	  });	  
	  
	}
	
	
	
	
	

	function pagination(pages) {
	  if(pages > 1) {
	     var html = "";
	     for(var x=1;x<=pages;x++) { 
	        if(x==page) { html += "<a href='#' class='pager selected' rel='"+x+"'>"+x+"</a>"; }
	        else { html += "<a href='#' class='pager' rel='"+x+"'>"+x+"</a>"; }
	     }

	     return html;
	  }
	  else { return ""; }
	}


/*
  $( ".target" ).keyup(function(){

	var node_title = $('#searchname').val();
	var node_class_id = $('.class_id').val();

	$.getJSON( "json.php?a=nodes&node_title="+node_title, function( data ) {

	  $('#searchresults').html("");
	  $.each( data, function( key,obj ) {
	    $('#searchresults').append("<li id='" + obj.ID + "'>" + obj.node_title + "</li>");
	  });

	});
});
*/



});


