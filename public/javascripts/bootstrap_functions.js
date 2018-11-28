$(document).ready(function () {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
    $('#show-modal').click(function (){
        $('#add-project').modal('show')
    });
});