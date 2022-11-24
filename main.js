
$(function() {
   const thisDate = document.getElementById('date');
   const thisName = document.getElementById('name');
   const thisTest= document.getElementById('test');
   const thisTest1 = document.getElementById('test1');
   const arr = ['임광민1', '임광민2', '임광민3', '임광민4'];
   const date = new Date();


   var currentDay = new Date();  
   var theYear = currentDay.getFullYear();
   var theMonth = currentDay.getMonth();
   var theDate  = currentDay.getDate();
   var theDayOfWeek = currentDay.getDay();
   
   var thisWeek = [];
   
   for(var i=0; i<7; i++) {
      var resultDay = new Date(theYear, theMonth, theDate + (i - theDayOfWeek));
      var yyyy = resultDay.getFullYear();
      var mm = Number(resultDay.getMonth()) + 1;
      var dd = resultDay.getDate();
      
      mm = String(mm).length === 1 ? '0' + mm : mm;
      dd = String(dd).length === 1 ? '0' + dd : dd;
      
      thisWeek[i] = yyyy + '-' + mm + '-' + dd;
   }


   function formatDate(date) {
      const y = date.getFullYear();
      const m = ("0" + (date.getMonth() + 1)).slice(-2);
      const d = ("0" + (date.getDate())).slice(-2);

      return y+'-'+m+'-'+d;
   };

   function getDateDiff(dateString1, dateString2) {
      const date1 = new Date(dateString1);
      const date2 = new Date(dateString2);
      const msDiff = date1.getTime() - date2.getTime();
      return Math.ceil(msDiff / (1000 * 60 * 60 * 24)) + 1;
   };




   console.log(`${getDateDiff(formatDate(date), '2022-11-01') } 일`)

   const getData = async () => {
      await $.ajax({
         url: "./db.json",
         async: false,
      })
      .done( res => {
         const { data } = res;

         console.log(data)
      });
   };

   const postData = async ({ count, date }) => {
      await $.ajax({
         method: "PATCH",
         url: "./db.json/data",
         async: false,
         data : { count, date }
      })
      .done( res => {

         console.log(res)
         
      });
   };

postData(1, '123')
   
   thisDate.innerText = `${formatDate(date)}`;
   thisName.innerText = `${getDateDiff(formatDate(date), '2022-11-01') } 일`;




   getData();
});



