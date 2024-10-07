// Add event listener for the button to trigger the AJAX request
document.getElementById("update-button").addEventListener("click", function () {
  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Open a GET request to fetch data from 'data.txt'
  xhr.open("GET", "data.txt", true);

  // Define the callback function to handle the response
  xhr.onload = function () {
    if (xhr.status == 200) {
      // If successful, update the content of the dynamic-content element
      document.getElementById("dynamic-content").innerHTML = xhr.responseText;
    } else {
      // If there is an error, show a message in the dynamic-content area
      document.getElementById("dynamic-content").innerHTML =
        "Failed to load content.";
    }
  };

  // Send the request
  xhr.send();
});
