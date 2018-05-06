$( document ).ready(function() {
    populateArticles();

 });
 
 function populateArticles(){
     $.get( "/showAll", function( data ) {
 
         if(data.length>0){
             $("#noarticle").hide();
             $("#articleslist").show();
             $("#articleslist").empty();
             for(i=0; i<data.length; i++){
                     if(data[i].isSaved){
            $("#articleslist").append("<tr><td>"+ data[i].Headline+
            "</td><td><a class=\"btn right red\" data-id=\""+data[i]._id+"\" href=\"/save/"+data[i]._id+"\">Unsave Article</a></td></tr>"); 
 
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

 $("#articleslist").on("click", ".btn.right.green", function(){
    var thisob = $(this);
    var url = "/save/"+ thisob.attr("data-id");

    $.get(url, function(data){
        thisob.attr("class", "btn right red");
        thisob.html("Unsave Article");
    })
    return false; 
 });

 $("#articleslist").on("click", ".btn.right.red", function(){
    var thisob = $(this);
    var url = "/unsave/"+ thisob.attr("data-id");

    $.get(url, function(data){
        thisob.attr("class", "btn right green");
        thisob.html("Save Article");
    })
    return false; 
 });