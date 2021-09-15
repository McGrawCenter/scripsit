jQuery(document).ready(function(){






	var filter_fields = [
	    {"column":"DateAfter",		"type":"number", "operator":">=", values:[]},
	    {"column":"DateBefore",		"type":"number", "operator":"<=", values:[]},
	    {"column":"ManuscriptLanguage",	"type":"array",  "operator":"===", values:[]},
	    {"column":"HoldingInstitution",	"type":"array",  "operator":"===", values:[]},
	    {"column":"Location",		"type":"array",  "operator":"===", values:[]},
	    {"column":"Type",			"type":"array",  "operator":"===", values:[]}
	    ];

	var perpage = 50;
	var page = 1;


	function populateFilter(column, type) {
	  // column must match the ID of the select input or the div containing the checkboxes
	
	  var t = [];
	  
	  jQuery.each(csvdata, function(i,v){
	      if(v[column] != null) {
		      if(v[column].indexOf('|')) { 
			var parts = v[column].split('|');
			jQuery.each(parts,function(ii,vv){
			  t.push(vv);
			});
		      }
		      else { t.push(v[column]); }
	      }
	      });

	  t = t.filter(onlyUnique).sort();
	  
	  if(type=="select") {
	    jQuery.each(t, function(i,v){
	      jQuery("#"+column).append("<option value='"+v+"'>"+v+"</option>");
	    });
	  }

	  if(type=="checkboxes") {
	    jQuery.each(t, function(i,v){
	      jQuery("#"+column).append("<label><input type='checkbox' class='filter' value='"+v+"'/> "+v+"</label><br />");
	    });
	  }	   
	}
	
	
	populateFilter("ManuscriptLanguage","checkboxes");
	populateFilter("HoldingInstitution","checkboxes");
	populateFilter("Location","checkboxes");


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
	 
	 
	 function filterResults(results, column, operator) {
	 
	   var evalstr = "";
	   
	   var x = jQuery("#"+column+" .filter");
	   
	   if(x.length > 0) {
	         var checked = jQuery("#"+column+" .filter:checked");
	         if(checked.length > 0) {
	           var e = [];
	           jQuery.each(checked, function(i,v){
	             e.push("val."+column+" "+operator+" '"+v.value+"'");
	           });
	           evalstr = e.join(" || ");
	         }
	         else {
	           return results;
	         }
	   }
	   else { 
	       var value = jQuery("#"+column).val();
	       if(!value) { 
	         return results;
	        }
	       else {
	         var evalstr = "val."+column+" "+operator+" "+value;   
	       }  
	   }
	   results = jQuery.grep(results, function(val) { return eval(evalstr); });
	   return results;
	 }





	function showresults() {
	

	  var r = [];
	  
	  var results = csvdata;
	  
	  results = filterResults(results, "DateAfter", ">=");
	  results = filterResults(results, "DateBefore", "<=");
	  results = filterResults(results, "ManuscriptLanguage", "===");
	  results = filterResults(results, "HoldingInstitution", "===");
	  displaySearchResults(results, csvdata); // We'll write this in the next section

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


	  /***
	  * Range slider
	  ******************************/

	  $( function() {
	    $( "#slider-range" ).slider({
	      range: true,
	      min: 400,
	      max: 1800,
	      values: [ 400, 1800 ],
	      slide: function( event, ui ) {
		$( "#amount" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
		$( "#DateAfter" ).val( ui.values[ 0 ] );
		$( "#DateBefore" ).val( ui.values[ 1 ] );
		showresults();
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





});


