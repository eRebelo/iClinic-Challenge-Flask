$(document).ready(function () {

    function HomeViewModel() {

        // MASK FOR THE CEP FIELD
        $("#cep_value").mask('00000-000');

        // INITIALIZING THE VARIABLES KNOCKOUT
        var self = this, public_place, neighborhood, city, istate, zip_code, zip_code_temp, full_address;
        self.public_place = ko.observable("");
        self.neighborhood = ko.observable("");
        self.city = ko.observable("");
        self.istate = ko.observable("");
        self.zip_code = ko.observable("");
        self.full_address = ko.observable("");
        self.url_maps = ko.observable("");
        self.details_maps = ko.observable("");

        // EVENT BY THE CLICKED CEP BUTTON
        $("#cep_button").click(function () {

            enableLoading();
            clearLocation();

            // GET THE CEP VALUE
            var cep = $.trim($("#cep_value").val());
            cep = cep.replace("-", "");

            // CHECK IF CEP IS VALID
            if (cep == "" || cep.length < 7) {

                disabledLoading();

                $("#cep_error").css("display", "block");
                setTimeout(function () {
                    $("#cep_error").css("display", "none");
                }, 10000);

            } else {
                // GET THE LOCATION BY CEP
                getCEP(cep, function (data) {
                    if (data) {
                        if (data.logradouro != null && data.bairro != null) {
                            public_place = data.logradouro;
                            neighborhood = data.bairro;
                            full_address = public_place + ", " + neighborhood + ", ";
                        } else {
                            public_place = "";
                            neighborhood = "";
                            full_address = "";
                        }
                        city = data.cidade;
                        istate = data.estado;
                        zip_code = data.cep;
                        zip_code = zip_code.substr(0, 5) + "-" + zip_code.substr(5, 8);
                        full_address += city + " - " + istate + ", " + zip_code;

                        setInputsLocation();

                        disabledLoading();
                        $("#save_cep_button").css("display", "initial");
                    } else {
                        alerts_warning();
                    }
                });
            }
        });

        // EVENT BY THE CLICKED SAVE BUTTON
        $("#save_cep_button").click(function () {
            enableLoading();

            var jsonToSend = {
                "public_place": public_place,
                "neighborhood": neighborhood,
                "city": city,
                "istate": istate,
                "zip_code": zip_code
            };

            // CALL FUNTION TO SAVE LOCATION
            saveCEP(jsonToSend, function (data) {
                disabledLoading();
                if (data) {
                    $("#cep_success").css("display", "block");
                    setTimeout(function () {
                        $("#cep_success").css("display", "none");
                    }, 10000);
                } else {
                    $("#cep_info").css("display", "block");
                    setTimeout(function () {
                        $("#cep_info").css("display", "none");
                    }, 10000);
                }
            });
        });

        // FUNCTION FOR LOCATION BY THE CEP INFORMED
        function getCEP(param, callback) {
            $.getJSON('/cep', {cep_value: param}, function (data) {
                callback(data.result);
            }).fail(function (jqxhr, textStatus, error) {
                alerts_warning();
            }); //.always(function () {});
        }

        // FUNCTION FOR SAVE LOCATION BY THE CEP INFORMED
        function saveCEP(jsonToSend, callback) {
            $.ajax({
                url: '/savecep',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(jsonToSend),
                type: 'POST',
                success: function (data) {
                    callback(data.result);
                },
                error: function (jqxhr, textStatus, error) {
                    alerts_warning();
                }
            });
        }

        // FUNCTION TO SET VALUE IN INPUTS
        function setInputsLocation() {
            self.public_place(public_place);
            self.neighborhood(neighborhood);
            self.city(city);
            self.istate(istate);
            self.zip_code(zip_code);
            self.full_address(full_address);
            self.url_maps("http://maps.google.com/?q=" + zip_code);
            self.details_maps("Location in Google Maps");
        }

        // FUNCTION ENABLE LOADING
        function enableLoading() {
            $("#cep_loading").css("display", "block");
            $("#cep_success").css("display", "none");
            $("#cep_info").css("display", "none");
            $("#cep_warning").css("display", "none");
            $("#cep_error").css("display", "none");
            $("#cep_button").attr('disabled', true);
            $("#save_cep_button").attr('disabled', true);
        }

        // FUNCTION DISABLED LOADING
        function disabledLoading() {
            $("#cep_loading").css("display", "none");
            $("#cep_button").attr('disabled', false);
            $("#save_cep_button").attr('disabled', false);
        }

        // FUNCTION TO CLEAR VARIABLES KNOCKOUT
        function clearLocation() {
            self.public_place(public_place);
            self.neighborhood(neighborhood);
            self.city(city);
            self.istate(istate);
            self.zip_code(zip_code);
            self.full_address("");
            $("#save_cep_button").css("display", "none");
        }

        // FUNCTION TO SHOW WARNING MESSAGE
        function alerts_warning() {
            //self.full_address("");
            disabledLoading();

            $("#cep_warning").css("display", "block");
            setTimeout(function () {
                $("#cep_warning").css("display", "none");
            }, 10000);
        }
    }

    ko.applyBindings(new HomeViewModel());

});
