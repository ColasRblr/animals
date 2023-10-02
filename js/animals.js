const parentElement = document.getElementById("cardSection");
let form = document.getElementById("addAnimals");

// Creating variables to customize labels and datas of charts from charts.js library
const labelsData = [];
const dataS = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    console.log(this);
  };

  xhr.open("GET", "async/script.php", true);
  xhr.send();

  return false;
});

function loadXMLDoc() {
  var xmlhttp = new XMLHttpRequest();

  // console.log(xmlhttp);

  xmlhttp.onreadystatechange = function () {
    // console.log(this);

    if (this.readyState == 4 && this.status == 200) {
      // console.log(this);
      fn_writeXML(this);
    }
  };

  xmlhttp.open("GET", "./animals.xml", true);
  xmlhttp.send();
}

loadXMLDoc();

function fn_writeXML(xml) {
  console.log("hellsscscso");
  let xmlDoc = xml.responseXML;
  let x = xmlDoc.getElementsByTagName("animalsInfo");
  let animalsInfoLength = x[0].children.length;
  let animalsHowMany = x.length;
  console.log(animalsInfoLength);
  console.log(x);

  for (let i = 0; i < animalsHowMany; i++) {
    var imgElement = x[i].children[animalsInfoLength - 1].innerHTML;

    var titreElement = x[i].children[0].innerHTML;
    var pWeight = x[i].children[1].innerHTML;
    var pSize = x[i].children[2].innerHTML;
    var pSpeed = x[i].children[3].innerHTML;
    var pDiet = x[i].children[4].innerHTML;
    var pLocation = x[i].children[5].innerHTML;

    let progressBarSpeed = document.querySelector(".progressBarSpeed");

    parentElement.innerHTML += `<div class="border border-light col-12 col-lg-5 d-flex flex-column no-wrap justify-content-center align-items-center m-1 p-2 text-light cardSectionElements">
        <div class="card text-bg-dark overflow-hidden cardsAnimals">
            <img src="${imgElement}" class="card-img" alt="${titreElement}picture">
                <div class="card-img-overlay d-flex flex-column">
                   <h5 class="card-title">${titreElement}</h5>
                    <div class="d-flex justify-content-between">
                      <div>
                        <p class="card-text">Weight: <br> ${pWeight} kg
                        <br> Size : <br> ${pSize} m</p>
                      </div>
                      <div>
                        <p class="card-text">Speed : <br> ${pSpeed} km/h</p>
                      </div>
                      <div>
                        <p class="card-text">Diet : <br> ${pDiet}
                        <br> Location : <br>${pLocation}</p>
                      </div>
                    </div>
              </div>
        </div>
        <div class="d-flex justify-content-around">  
        <button type="button" class="btn btn-dark" id="modifBtn" data-toggle="modal" data-target="#updateAnimal${titreElement}">Modify</button>  
        </form>
        <form action="./php/delete.php" method="post"  class="d-flex justify-content-center align-items-center">
        <input type="hidden" name="cardToDelete" value="${titreElement}"/>
        <button type="submit" class="btn btn-dark deleteButton">Delete</button>
      </form>            
        </div>
      </div>
      <div class="modal fade" id="updateAnimal${titreElement}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Modify this animal</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body d-flex justify-content-center">
              <form action="./php/update.php" method="post" class="updateForm">
                          <input class="formInput" type="hidden" placeholder="name" name="cardToUpdate"value="${titreElement}"><br>
                          <input class="formInput" type="text" placeholder="weight" name="weight"><br>
                          <input class="formInput" type="text" placeholder="size" name="size"><br>
                          <input class="formInput" type="text" placeholder="speed" name="speed"><br>
                          <input class="formInput" type="text" placeholder="diet" name="diet"><br>
                          <input class="formInput" type="text" placeholder="location" name="location"><br>
                          <input class="formInput" type="text" placeholder="picture url" name="picture"><br>
              
              <div class="modal-footer">
              <button type="submit" class="btn btn-secondary update">Update</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
              </div>
            </div>
          </div>
        </div>
       `;

    console.log(titreElement);

    // Bootstrap progress bar

    progressBarSpeed.innerHTML += `<div class="animalName text-light">${titreElement}</div>
    <div class="progress " role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
   <div class="progress-bar text-dark" id="bootstrapBars" style="width:${pSpeed}%">${pSpeed} km/h</div>
   </div>`;

    labelsData.push(titreElement);
    dataS.push(pWeight);
  }

  // Customize text color to white and font size
  Chart.defaults.color = "#fff";
  Chart.defaults.font.size = 16;
  // Creation of the weight comparison chart
  new Chart(columnChartWeight, {
    type: "bar",
    data: {
      labels: labelsData,
      datasets: [
        {
          label: "Weight in kilograms",
          data: dataS,
          borderWidth: 1,
          backgroundColor: "#8FFF67",
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
