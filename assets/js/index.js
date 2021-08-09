// Insert
$("#add_user").submit(function (event) {
  alert("Data Inserted Successfilly!");
});

// Update

$("#update_user").submit(function (event) {
  console.log("object");
  event.preventDefault();
  // this = #update_user
  var unindexed_array = $(this).serializeArray();

  var data = {};

  $.map(unindexed_array, function (n, i) {
    data[n["name"]] = n["value"];
  });

  var request = {
    url: `http://localhost:8080/api/users/${data.id}`,
    method: "PUT",
    data: data,
  };

  $.ajax(request).done(function (response) {
    alert("Data updated successfully!");
  });
});

// Delete
if (window.location.pathname == "/") {
  // Create a variable
  $ondelete = $(".table tbody td a.delete");
  //   Adding function
  $ondelete.click(function () {
    //   Grab the ID
    var id = $(this).attr("data-id");
    // Making delete request from here to router.js
    var request = {
      url: `http://localhost:8080/api/users/${id}`,
      method: "DELETE",
    };

    if (confirm("Do you reallly want to delete this?")) {
      $.ajax(request).done(function (response) {
        alert("Data Deleted Successfilly");
        location.reload();
      });
    }
  });
}
