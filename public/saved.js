$( document ).ready(function() {
    populateArticles();
    $('.modal').modal();
 });
 
 function populateArticles(){
     $.get( "/showSaved", function( data ) {
 
         if(data.length>0){
             $("#noarticle").hide();
             $("#articleslist").show();
             $("#articleslist").empty();
             for(i=0; i<data.length; i++){
                     if(data[i].isSaved){
            $("#articleslist").append("<tr><td>"+ data[i].Headline+
            "</td><td>"+
            "<button data-target=\"modal1\" data-id=\""+data[i]._id+"\" class=\"btn modal-trigger right blue\">Add Note</button>"+
            "<a class=\"btn right red\" data-id=\""+data[i]._id+"\" href=\"/save/"+data[i]._id+"\">Unsave Article</a></td></tr>"); 
 
                     }else{
             $("#articleslist").append("<tr><td>"+ data[i].Headline+
             "</td><td><a class=\"btn right green\" data-id=\""+data[i]._id+"\" href=\"/save/"+data[i]._id+"\">Save Article</a></td></tr>"); 
 
                     }
             }
         }else{
             $("#noarticle").show();
             $("#articleslist").hide();
         }
     
       });
     
 
 
 
 }


 $("#articleslist").on("click", ".btn.right.red", function(){
    var thisob = $(this);
    var url = "/unsave/"+ thisob.attr("data-id");

    $.get(url, function(data){
        thisob.parent().parent().hide();
        thisob.attr("class", "btn right green");
        thisob.html("Save Article");
    })
    return false; 
 });

 $("#articleslist").on("click", ".btn.right.blue", function(){
    var thisob = $(this);
    var thisid  = $(this).attr("data-id");
    $("#noteId").val(thisid);
    $("#thenote").val("");
    populateNotes(thisid);
 });

 function populateNotes(id){
    $("#pNotes").empty();
     $("#pNotes").append(`<div>
     <span class="flow-text">${id}....</span>
     <button class="btn red right del">X</button>
 </div>`);
     return false;
 }