console.log('JS');

$(document).ready(function () {
    console.log('Jquery');
    setupClickListeners();  //delete set up... complete still needed AND SUBMIT 
    getList();  //get existing list

});

function setupClickListeners() {
    $(`#toDoTableBody`).on(`click`, `.deleteBtn`, deleteListItem); //DELETE WORKS 
}

function deleteListItem() {
    console.log('inside Delete btn');
    let idToDelete = $(this).closest(`tr`).data(`id`);
    console.log(idToDelete);

    $.ajax({
        method: `DELETE`,
        url: `/list/${idToDelete}`
    }).then(function (response) {
        console.log(response);
        getList();
    }).catch(function (error) {
        alert(`Error`, error)
    });
}; //end deleteListItem 

function renderList(response) {
    $("#toDoTableBody").empty();

    for (let i = 0; i < response.length; i++) {
        let idToCheck = response[i].id;
        let completeBtn = ``;
        if (!response[i].complete) {
            completeBtn = `<button class="completeBtn"> COMPLETE </button>`;
        }

        //data-id="${id}" add to <tr>
        let display = $(`
        <tr data-id="${idToCheck}"> 
        <td>${response[i].item} </td>
        <td>${response[i].complete} </td>
        <td> <button class="completeBtn"> COMPLETE</button></td>
        <td> <button class="deleteBtn"> DELETE</button></td>
        </tr>`);
        $("#toDoTableBody").append(display);
    };
}
function getList() {
    console.log('in GetList');
    $.ajax({
        method: "GET",
        url: "/list",
    })
        .then(function (response) {
            console.log(response);
            renderList(response);
        }).catch(function (error) {
            console.log('error', error);
        });
} //END GET LIST 

function saveItem(newListItem) {
    console.log('In saveItem on Client ', newListItem);
    $.ajax({
        method: "POST",
        url: "/list",
        data: newListItem,
    })
    .then(function (response) {
        $(`#toDoInput`).val(``);
        $(`#completeIn`).val(``);
        getList();
    })
    .catch(function (err) {
        console.log('ERROR', err);        
    });
}