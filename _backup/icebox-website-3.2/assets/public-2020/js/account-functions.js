
function errorMessage(msg){
    $('#error_modal_msg').html(msg);
    $('#error_modal').modal('show');
}


function successMessage(msg){
    $('#success_modal_msg').html(msg);
    $('#success_modal').modal('show');
}

$('#loginPageForm').on('submit',function(e){
e.preventDefault();
var formId = 'loginPageForm';
var form = $('#'+formId);
$('#'+formId+'_loading').show();
    $.ajax({
                url: form.attr("action"),
                type: form.attr("method"),
                data:form.serialize(),
                success: function (data)
                {
                    var result = $.parseJSON(data);
                    if(!result.error){
                        if(result.redirect == '' || result.redirect === undefined){
                            location.reload();
                        }else{
                            window.location = result.redirect;
                        }

                    }else{
                        showMessage('error','Error',result.msg);
                        //$('#error_modal_msg').text(result.msg);
                        //$('#error_modal').modal('show');
                        $('#'+formId+'_loading').hide();
                    }
                }

    });
});

$('#signUpForm').on('submit',function(e){
e.preventDefault();
var formId = 'signUpForm';
var form = $('#'+formId);
$('#'+formId+'_loading').show();
    $.ajax({
                url: form.attr("action"),
                type: form.attr("method"),
                data:form.serialize(),
                success: function (data)
                {
                    var result = $.parseJSON(data);
                    if(!result.error){
                        if(result.redirect == '' || result.redirect === undefined){
                            location.reload();
                        }else{
                            window.location = result.redirect;
                        }

                    }else{
                        //$('#error_modal_msg').text(result.msg);
                        //$('#error_modal').modal('show');
                        showMessage('danger','Error',result.msg);
                        $('#'+formId+'_loading').hide();
                    }
                }

    });
});

function processForm(formId){
    var form = $('#'+formId);
    if(form.validator('validate').has('.has-error').length === 0){
            $('#'+formId+'_text').hide();
            $('#'+formId+'_loading').show();
             $.ajax({
                url: form.attr("action"),
                type: form.attr("method"),
                data:form.serialize(),
                success: function (data)
                {
                    var result = $.parseJSON(data);
                    if(!result.error){
                        if(result.redirect == '' || result.redirect === undefined){
                            location.reload();
                        }else{
                            window.location = result.redirect;
                        }

                    }else{
                        $('#error_modal_msg').text(result.msg);
                        $('#error_modal').modal('show');
                        $('#'+formId+'_loading').hide();
                        $('#'+formId+'_text').show();
                    }
                }

            });
    }

}