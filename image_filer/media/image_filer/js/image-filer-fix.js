
(function($) {
    $(document).ready(function($) {
        /*
        The element we are attaching the click event too is written to dom after this javascript file,
        so we have to use the live function and mouseover on it's parent container.
        */
    	$("div.add-row").live('mouseover',function() {
    	    $("a",this).unbind("click.fixit");
    	    $("a", this).bind("click.fixit",function() {
    	        fix_widget($(this));
    	        set_delete_click();
    	    });
    	});
    	
    	
    	
    });
    
    function set_delete_click() {
        $("a.inline-deletelink").unbind("click.deleteclick");
        $("a.inline-deletelink").bind("click.deleteclick", function() {
    	    fix_delete_widget();
    	})
    }
    
    function fix_delete_widget() {
        $("div.inline-group").each(function() {
            var prefix = $(this).attr("groupprefix");
            var new_inlines = $(this).find("div.last-related").not(".empty-form");
            new_inlines.each(function() {
                var to_change = $(this).find(".filer");
                var new_row_id = to_change.siblings("input:hidden").attr("id");
                var id_regex = new RegExp(prefix + "-(\\d+)");
                var id = new_row_id.match(id_regex)[1];
                
                to_change.each(function() {
                    updateElementIndex(this,prefix,id);
                })
                
            })
        })
    }
    
    function fix_widget(add_button) {
        var add_row = add_button.closest("div.add-row");
        var last_inline = add_row.prevAll(":not(.empty-form):first");
        var to_change = last_inline.find(".filer");
        var new_row_id = to_change.siblings("input:hidden").attr("id");
        var prefix = add_row.closest("div.inline-group").attr("groupprefix");
        var id_regex = new RegExp(prefix + "-(\\d+)");
        var id = new_row_id.match(id_regex)[1];
        to_change.each(function() {
            updateElementIndex(this,prefix,id);
        });
    }
    
    function updateElementIndex(el, prefix, ndx) {
		var id_regex = new RegExp("(" + prefix + "-\\d+)");
		var replacement = prefix + "-" + ndx;
		if ($(el).attr("for")) {
			$(el).attr("for", $(el).attr("for").replace(id_regex, replacement));
		}
		if (el.id) {
			el.id = el.id.replace(id_regex, replacement);
		}
		if (el.name) {
			el.name = el.name.replace(id_regex, replacement);
		}
	};
    
})(jQuery.noConflict());