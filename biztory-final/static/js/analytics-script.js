/**
 * Function to get url parameters by name
 * @param name
 * @param url
 * @returns {*}
 */
//global variable
var optionsBigChart = {}
var optionsPieChart = {}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(document).on({
    ajaxStart: function () {
        $("body").addClass("loading");
    },
    ajaxStop: function () {
        $("body").removeClass("loading");
    }
});

$(function () {
    var id = getParameterByName('biz_id');
    if (id == null) {
        window.location.href = '../';
    }
    else {
        $.getJSON("/getJsonAnalytics", {biz_id: id}, function (data) {

            $("#business-name").text(data.biz_name);
            var address = data.address.replace('\n', " <br> ");
            $("#business-address").html(address);
            $("#tot_reviews").text(data.tot_reviews);
            $("#tot_checkins").text(data.tot_checkins);
            //if(Number($("#tot_reviews"))>30){
                $("#tot_reviews").addClass("count");
            //}
            //if(Number($("#tot_checkins")>30)){
                $("#tot_checkins").addClass("count");
            //}


            setoptionsBigChart();
            setOPtionsPieChart();

            /**
             * Add series addition function(s) here
             */

            $('#chart-1').highcharts(optionsBigChart);
            $('#chart-2').highcharts(optionsPieChart);

            //animate count numbers
            $('.count').each(function () {
                $(this).prop('Counter', 0).animate({
                    Counter: $(this).text()
                }, {
                    duration: 4500,
                    easing: 'swing',
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    }
                });
            });


        });
    }
})


function setoptionsBigChart() {
    optionsBigChart = {
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: 'Over the time'
        },
        subtitle: {
            text: 'Source: Yelp-dataset'
        },
        xAxis: [{
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            crosshair: true
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: 'Average stars',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }, { // Secondary yAxis
            title: {
                text: 'Total reviews',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 120,
            verticalAlign: 'top',
            y: 100,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        series: [{
            name: 'Total reviews',
            type: 'column',
            yAxis: 1,
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],


        }, {
            name: 'Average stars',
            type: 'spline',
            data: [3.0, 2.9, 3.5, 4.5, 3.2, 2.5, 2.2, 2.5, 2.3, 1.3, 3.9, 4.6],

        }]
    };
}

function setOPtionsPieChart() {
    optionsPieChart = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: 'Check-ins<br>in a<br>week',
            align: 'center',
            verticalAlign: 'middle',
            y: 40
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white',
                        textShadow: '0px 1px 2px black'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%']
            }
        },
        series: [{
            type: 'pie',
            name: 'Check-ins in a week',
            innerSize: '50%',
            data: [
                ['Monday', 10.38],
                ['Tuesday', 56.33],
                ['Wednesday', 24.03],
                ['Thursday', 4.77],
                ['Friday', 0.91],
                {
                    name: 'Proprietary or Undetectable',
                    y: 0.2,
                    dataLabels: {
                        enabled: false
                    }
                }
            ]
        }]
    };
}
