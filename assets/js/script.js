//const APIKey = `` //<--insert own API key here
const searchHistory = $(`#history`)
const searchArr = [];
const clearAllButton = $(`.clearAll`);
const listenedButton = $(`#listenedButton`);
const lyricsButton = $(`#lyricsButton`);
const sudokuButton = $(`#sudokuButton`);
const sudokuTable = $(`.sudokuTable`)
const revealSudoku = $(`#revealSudoku`)


//__________________
//Rowan :

//Get any locally stored search history
  searchHistory.empty()
if (Object.entries(localStorage) != ``){
  const storedArr = localStorage.getItem(`searchArr`).split(`,`)
  // prepend search history buttons
  if (storedArr != null){
    for (let i=0; i<storedArr.length; i++){
      song = storedArr[i]
      prependSongButton()
    }
  // load music info function()
}}

//prepend searched for songs as buttons in a function:
function prependSongButton(){
  if (song != ``){
    const songButton = $(`<button>`).text(song).addClass(`btn btn-outline-primary m-1`).attr(`song-name`, song)
    const songDiv = $(`<div>`).append(songButton)
    searchHistory.prepend(songDiv);
}}

//SUBMIT event when a user searches for a song
$(`#search-form`).on(`submit`, function(e){
  e.preventDefault()
  song = $(`#search-input`).val().trim().toUpperCase()
    // load the music info for that song
        //call load music info function
    //if the searchArr is longer than 5, remove the 5th and push the most recent
    if (searchArr.length>=5){
      searchArr.splice(0, 1);}
    // push song to searchArr
    searchArr.push(song)
    // prepend search button
    prependSongButton();
    // set the array in local storage
    localStorage.setItem(`searchArr`, searchArr)
    //clear form search bar
    $(`#search-input`).val(``)
    //make search form hidden
    $(`#searchForm`).addClass(`hide`)
    $(`#songDisplay`).removeClass(`hide`)
      }
)

//CLICK event when a user has listened to the song
listenedButton.on(`click`, function(e){
  e.preventDefault()
  $(`#songDisplay`).addClass(`hide`)
  $(`#lyricsDisplay`).removeClass(`hide`)
})

//CLICK event when a user has read the lyrics
lyricsButton.on(`click`, function(e){
  e.preventDefault()
  $(`#lyricsDisplay`).addClass(`hide`)
  $(`#activityDisplay`).removeClass(`hide`)
})


//sudoku fetch
const queryURL = `https://sudoku-api.vercel.app/api/dosuku`
fetch(queryURL)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  $(`.difficulty`).text(`difficulty: ${data.newboard.grids[0].difficulty}`)
  const newTable = data.newboard.grids[0].value
  const solution = data.newboard.grids[0].solution


  //for loop to print array to html
  function printSudoku(sudoku){
  for (let i=0; i<9; i++){
    const row = sudoku[i]
    const rowEl = $(`<tr>`)
    if (i===2 || i===5){
      rowEl.addClass(`borderBottom`)
    }
    sudokuTable.append(rowEl)
    for(let j=0; j<9; j++){
      if (row[j] === 0){
        var boxEl =$(`<td class="p-0"></td>`)
        const boxInputEl = $(`<input type="text" class="form-control sudokuValue" value=""/>`)
        boxEl.append(boxInputEl)
      } else {
        const boxSolutionEl = $(`<div>`).text(row[j])
        var boxEl =$(`<td class="p-0"></td >`).append(boxSolutionEl)
      }
      rowEl.append(boxEl)
      if (j===2 || j===5){
        boxEl.addClass(`borderSide`)
      }
    }
  }
  } 
  printSudoku(newTable)
  // printSudoku(solution)
  revealSudoku.on(`click`, function(e){
    e.preventDefault()
    sudokuTable.empty()
    printSudoku(solution)
  })

})
//CLICK event when sudoku finished
sudokuButton.on(`click`, function(e){
  e.preventDefault()
  $(`#activityDisplay`).addClass(`hide`)
  $(`#songRecsDisplay`).removeClass(`hide`)
})

//CLICK event when a user clicks to clear search
clearAllButton.on(`click`, function(e){
  e.preventDefault()
  localStorage.clear()
  searchHistory.empty()
})



//music search API
const lyrics = `sticking with you`
const url = `https://genius-song-lyrics1.p.rapidapi.com/search/?q=${lyrics}&per_page=10&page=1`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2fc1062518msh547988416741708p14b7bbjsne75cb82bac04',
		'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
	}
};
fetch(url, options)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log(data)
})





//_____________________
// Nikoleta:
