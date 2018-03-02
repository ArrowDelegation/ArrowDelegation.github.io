window.Schedule = window.Schedule || {};

Schedule.Toolbox = Schedule.Toolbox || {
        self : false,
        // porchlightID : 'porchlight',
        // week : ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
        // standardStart : 0,
        // standardEnd : 4,
        deliveringNow : false,
        note : false,
        deliveryNoteClass : '.deliveryNote',
        deliveryImgClass : ".deliveryImg",
        deliveryImgOn : "./img/delivery-on.jpg",
        deliveryImgOff : "./img/delivery-off.jpg",
        deliveryCaptionMsg : "Delivering Now",
        deliveryCaptionClass : ".deliveryCaption",
        init : function() {
            self = this;
            self.getSheetData();

        },
        getSheetData : function () {
            //compile sheet url
            var $prefix = "https://spreadsheets.google.com/feeds/list/";
            var $sheetID = "1ilLxJevJ1ZrzlKofINQS8ynWVReK3psuRx1PvFN4f_0";
            var $postfix = "/od6/public/values?alt=json";
            var $url = $prefix+$sheetID+$postfix;
            //get data
            jQuery.getJSON($url, function(data) {
                self.deliveringNow = data.feed.entry[0].gsx$deliveringnow.$t;
                self.note = data.feed.entry[0].gsx$note.$t;
                self.setDeliveringNow();
                self.setNote()
            });
        },
        setDeliveringNow:function () {
            //if delivering now is true, turn on delivery and caption
            if(self.deliveringNow) {
                jQuery(self.deliveryImgClass).attr("src", self.deliveryImgOn);
                jQuery(self.deliveryCaptionClass).text(self.deliveryCaptionMsg);
            }
        },
        setNote: function () {
            //show delivery note if there is a note in the note section
            jQuery(self.deliveryNoteClass).show().text(self.note);
        },
        /*buildWeek : function() {
            self.week['sunday']['value'] = 0;
            self.week['monday']['value'] = 1;
            self.week['tuesday']['value'] = 2;
            self.week['wednesday']['value'] = 3;
            self.week['thursday']['value'] = 4;
            self.week['friday']['value'] = 5;
            self.week['saturday']['value'] = 6;

            self.week.friday.schedule0.start = 19;
            self.week.friday.schedule0.end = 22;
            Object.keys(self.week).forEach(function(key) {
                self.week[key]['schedule1']['start'] = self.standardStart;
                self.week[key]['schedule1']['end'] = self.standardEnd;
               // console.log(key, obj[key]);
            });

        },*/
        isActive : function() {
            if(1){
                return '';
            } else {
                return 'isActive';
            }
        }
    };

jQuery(window).load( function() {
    Schedule.Toolbox.init();
});
