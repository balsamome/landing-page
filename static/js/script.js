/* TYPED */
var typed = new Typed("#typed", {
  strings: [
  	"companies",
  	"individuals",
  	"businesses",
  	"corporations",
  	"agencies",
  	"bureaus",
  	"institutions",
  	"organizations"
  ],
  typeSpeed: 90,
  backSpeed: 80,
  loop: true
});

/* LINKS */
$("#discover, #product-link").click(function() {
    scrollToSection("#product");
});

$("#charts-link").click(function() {
    scrollToSection("#charts");
});

$("#maps-link").click(function() {
    scrollToSection("#maps");
});

$("#contact-link").click(function() {
    scrollToSection("#contact");
});

function scrollToSection(section) {
  $('html,body').animate({
        scrollTop: $(section).offset().top},
        2000);
}



/* CIRCLE CHART */
function generateCircleChart() {
  var ctx = document.getElementById("circleChart").getContext('2d');
  var circleChart = new Chart(ctx, {
  	type: 'doughnut',
  	data: {
  		datasets: [{
  			data: [74, 26],
  			backgroundColor: ["#f49842", "#ffffff"],
  			borderWidth: 1
  		}]
  	},
  	options: {
  		responsive: false,
  		animation: {
  			animateRotate: true,
  			animateScale: true
  		},
  		cutoutPercentage: 85,
  		tooltips: {
  			enabled: false,
  		},
  		elements: {
  			center: {
  				text: '74%',
  				color: '#f49842',
  				fontStyle: 'Helvetica',
  				sidePadding: 50
  			}
  	 	},
  	 	hover: {mode: null},
  	}
  });
}

/* BAR CHART */
function generateBarChart() {
  ctx = document.getElementById("barChart").getContext('2d');
  var gradientFill = ctx.createLinearGradient(500, 0, 100, 0);
  gradientFill.addColorStop(0, "rgba(128, 182, 244, 0.6)");
  gradientFill.addColorStop(1, "rgba(244, 144, 128, 0.6)");

  var barChart = new Chart(ctx, {
      data: {

          datasets: [
          {
  			label: '% usage',
  			data: [13, 27, 24, 44, 30, 43, 10],
            	type: 'line',
            	pointBorderWidth: 3,
            	backgroundColor: gradientFill,
            	borderColor: 'rgba(250, 250, 250, 0.9)'
          },
          {
  			label: '% sales',
  			data: [25, 10, 40, 27, 55, 18, 34],
            	type: 'line',
            	backgroundColor: 'rgba(100, 101, 102, 0.25)',
            	borderColor: 'rgba(100, 101, 102, 1)'
          }],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      },
      options: {
      	legend: {
      		display: false,
      	},
      	animation: {
  		    easing: "easeInOutBack"
  		  },
      	responsive: true,
        maintainAspectRatio: false,
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true,
                      min: 0,
  		            max: 80,
  		            stepSize: 20
                  }
              }],
              xAxes: [{
              	position: "bottom",
              	barThickness: 100,
                  ticks: {
                      beginAtZero:true
                  },
  	            gridLines: {
  		            display:false
  		        }
              }]
          }
      }
  });
}

/* CIRCLE CHAR LABEL */
Chart.pluginService.register({
  beforeDraw: function (chart) {
    if (chart.config.options.elements.center) {
      //Get ctx from string
      var ctx = chart.chart.ctx;

      //Get options from the center object in options
      var centerConfig = chart.config.options.elements.center;
      var fontStyle = centerConfig.fontStyle || 'Arial';
      var txt = centerConfig.text;
      var color = centerConfig.color || '#000';
      var sidePadding = centerConfig.sidePadding || 20;
      var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
      //Start with a base font of 30px
      ctx.font = "30px " + fontStyle;

      //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
      var stringWidth = ctx.measureText(txt).width;
      var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

      // Find out how much the font can grow in width.
      var widthRatio = elementWidth / stringWidth;
      var newFontSize = Math.floor(30 * widthRatio);
      var elementHeight = (chart.innerRadius * 2);

      // Pick a new font size so it will not be larger than the height of label.
      var fontSizeToUse = Math.min(newFontSize, elementHeight);

      //Set font settings to draw it correctly.
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
      var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
      ctx.font = fontSizeToUse+"px " + fontStyle;
      ctx.fillStyle = color;

      //Draw text in center
      ctx.fillText(txt, centerX, centerY);
    }
  }
});


/* MAPS */
var map = L.map('map', {
  maxBounds: [[51.06, -0.90], [51.72, 0.44]]
}).setView([51.502, -0.125], 14);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 16,
  minZoom: 13,
  useCache: true,
  crossOrigin: true
}).addTo(map);

options = {
    icon: 'store',
    iconSize: [36, 36],
    customClasses: 'custom-marker',
    iconShape: 'marker'
};

var markers = [];
markers.push(L.marker([51.491058,  -0.129489], {
    icon: L.BeautifyIcon.icon(options)
    }).addTo(map)
      .bindPopup('<b>Atterbury Street, London</b><br>Monday to Friday 10:00 - 17:00<br>546-183-1085'));
markers.push(L.marker([51.494273,  -0.110695], {
    icon: L.BeautifyIcon.icon(options)
    }).addTo(map)
    .bindPopup('<b>141 Kennington Road, London</b><br>Monday to Friday 10:00 - 14:00<br>303-143-6495'));
markers.push(L.marker([51.511705,  -0.125208], {
    icon: L.BeautifyIcon.icon(options)
    }).addTo(map)
    .bindPopup('<b>25 Floral Court, London</b><br>Monday to Friday 10:00 - 17:00<br>154-600-3360'));
markers.push(L.marker([51.49971,  -0.116922], {
    icon: L.BeautifyIcon.icon(options)
    }).addTo(map)
    .bindPopup('<b>Lambeth Palace Road, London</b><br>Monday to Sunday 09:00 - 14:00<br>166-802-1763'));
markers.push(L.marker([51.507403,  -0.108349], {
    icon: L.BeautifyIcon.icon(options)
    }).addTo(map)
    .bindPopup('<b>12 Broadwall, London</b><br>Saturday to Sunday 10:00 - 13:00<br>341-944-0806'));

$(".list-group-item").on("click", function() {
    markers[$(".list-group-item").index(this)].openPopup();
});


/* FORM */
$("#contact-form").on("submit", function(e) {
  e.preventDefault();
  $("#form").removeClass("slideInUp").addClass("zoomOutRight");
  swal("Sent!", "Your message has been sent successfully", "success");
});

/* ANIMATIONS */
$(document).ready(function() {

  function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  }

  $(window).scroll(function() {
    $('.animated.start-animation').each(function() {
      if (isScrolledIntoView(this) === true) {
        $(this).addClass($(this).attr("data-anim")).removeClass("start-animation");
        if(this.id == "barContainer")
          generateBarChart();
        if(this.id == "circleContainer")
          generateCircleChart();
      }
    });
  });

  $(window).scroll();
});


/* TOOLTIPS */
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})




