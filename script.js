// let historyDetails = document.getElementById("history-detail");

// const showDetails = (event) => {
//     let element = event.target;
//     if (element.style.display === "none") {
//         element.style.display = "block";
//     } else {
//         element.style.display = "none";
//     }
// };

function showDetails() {
  var x = document.getElementById("history-detail");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

// historyDetails.addEventListener("click", showDetails);
