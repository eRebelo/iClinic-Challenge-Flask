$(document).ready(function () {

    function RecordsViewModel() {

        // INITIALIZING THE VARIABLES KNOCKOUT
        var self = this;
        self.ceps = ko.observableArray([]);

        // INITIALIZING MESSSAGES
        $("#tbody_none").hide();
        enableLoading();

        // GET THE RECORDS
        getRecords(function (data) {
            self.ceps([]);
            self.ceps(data);
            if (data.length == 0) {
                $("#tbody_none").show();
            }
            disabledLoading();
        });

        // EVENT BY CLICKING THE DELETE BUTTON
        $("#delete_cep").click(function () {
            cepsChecked = [];
            $("input:checkbox[name=cep_id]:checked").each(function () {
                cepsChecked.push($(this).val());
            });

            if (cepsChecked.length > 0) {
                /* for (i = 0; i < cepsChecked.length; i++) {
                 console.log(cepsChecked[i]);
                 } */
                enableLoading();
                deleteCEP(cepsChecked, function (data) {
                    // GET THE RECORDS
                    setTimeout(function () {
                        getRecords(function (data) {
                            self.ceps([]);
                            self.ceps(data);
                            if (data.length == 0) {
                                $("#tbody_none").show();
                            }
                            disabledLoading();
                        });
                    }, 1000);
                });
            } else {
                $("#records_warning").css("display", "block");
                setTimeout(function () {
                    $("#records_warning").css("display", "none");
                }, 10000);
            }
        });

        // FUNCTION ENABLE LOADING
        function enableLoading() {
            $("#records_loading").css("display", "block");
            $("#records_warning").css("display", "none");
            $("#records_error").css("display", "none");
            $("#delete_cep").attr('disabled', true);
        }

        // FUNCTION DISABLED LOADING
        function disabledLoading() {
            $("#records_loading").css("display", "none");
            $("#delete_cep").attr('disabled', false);
        }

        // FUNCTION GET RECORDS
        function getRecords(callback) {
            $.getJSON('/getrecords', function (data) {
                callback(data.result);
            }).fail(function (jqxhr, textStatus, error) {
                $("#records_error").css("display", "block");
                setTimeout(function () {
                    $("#records_error").css("display", "none");
                }, 10000);
            });
        }

        // FUNCTION DELETE RECORDS
        function deleteCEP(jsonToSend, callback) {
            $.ajax({
                url: '/deletecep',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(jsonToSend),
                type: 'POST',
                success: function (data) {
                    callback(data.result);
                },
                error: function (jqxhr, textStatus, error) {
                    $("#records_error").css("display", "block");
                    setTimeout(function () {
                        $("#records_error").css("display", "none");
                    }, 10000);
                }
            });
        }
    }

    ko.applyBindings(new RecordsViewModel());

});

