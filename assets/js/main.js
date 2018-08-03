var selectedCheckboxesCount = 0;
var resultsCount = 0;
var googleKey = "AIzaSyDHAzBIc3qqYR0v060Qlpd4I8MzzO8L7qM";
var isVerticalAlignment = true;

function searchForCountry()
{
    if ($("#checkboxes-container input:checked").length < 3)
    {
        // TODO on back button click to prevent making request without three selected checkboxes
        $("#alert").show();
    }
    else
    {
        $("#alert").hide();
        var country = $("#country").val();
        search(country);
    }
}

function showResult(response)
{
    showInfo(response);
}

function removeCountry(event, id)
{
    $(event.currentTarget).parent().parent().remove();
    $("#detailed-country-information").find(id).remove();

}


function showInfo(response)
{
    var checkedBoxes = $("#checkboxes-container input:checked");
    var resultSet = $(".result-set").last().clone();
    resultSet.find("h2").html(response.name);
    for (var i = 0; i < checkedBoxes.length; i++)
    {
        var row = resultSet.find(".checkbox-key-information").last().clone();
        row.find(".key").html($(checkedBoxes[i]).attr("name") + ": ");
        row.find(".value").html(response[$(checkedBoxes[i]).attr("name")]);
        row.appendTo(resultSet.find(".country-information")).show();

    }
    resultSet.appendTo($("#countries")).show();

}


// functions for different type of search

function search(country)
{
    var url = "https://restcountries.eu/rest/v1/name/" + country + "?fullText=true";
    $.ajax({
        method: "GET",
        url: url,
        dataType: "json"
    }).done(function (response)
    {
        $(".no-country-found").hide();
        showResult(response[0]);
    }).fail(function ()
    {
        $(".no-country-found").show();
    });
}

function alignment()
{
    isVerticalAlignment = !isVerticalAlignment;
    if (isVerticalAlignment)
    {
        $("#alignment-button").html("Вертикална подредба");
        $(".result-set").each(function ()
        {
            $(this).css("margin-right", "0px");
        });
    }
    else
    {
        $("#alignment-button").html("Хоризонтална подредба");
        $(".result-set").each(function ()
        {
            $(this).css("margin-right", "5px");
        });
    }
    $(".result-set").each(function ()
    {
        $(this).toggleClass("col-xs-3");
    });

}