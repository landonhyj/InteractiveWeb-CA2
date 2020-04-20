// Function that print out table 
function draw_table(){
    $("#results").empty();
    $.getJSONuncached = function(url) {
        return $.ajax({
            url: url,
            type: 'GET',
            cache: false,
            success: function(html) {
                $("#results").append(html);
                select_row();
            }
        });
    };
    $.getJSONuncached("/get/html")
}

// Function that able to select row before deleting a row 
function select_row()
{
	$("#bookTable tbody tr[id]").click(function ()
	{
        
		$(".selected").removeClass("selected");
		$(this).addClass("selected");
		var book = $(this).prevAll("tr").children("td[colspan='5']").length - 1;
		var details = $(this).attr("id") - 1;
		delete_row(book, details);
	})
};

// Function that delete a row 
function delete_row(bk, det)
{
	$("#delete").click(function ()
	{
		$.ajax(
		{
			url: "/post/delete",  
			type: "POST",
			data:
			{
				book: bk,
				details: det
			},
			cache: false,
			success: setTimeout(draw_table, 1000)
		})
	})
};

//Function that is ready to draw a method
$(document).ready(function(){
    draw_table();
})