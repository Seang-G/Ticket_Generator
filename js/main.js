class movie {
  constructor(name, age, date, day, time, theater) {
    this.name = name;
    this.age = age;
    this.day = day;
    this.date = date;
    this.time = time;
    this.theater = theater;
  }
}

// const addBtn = document.querySelector("#add");
const submitBtn = document.querySelector("#submit");
const movieName = document.querySelector("#movieName");
const age = document.querySelector("#age");
const date = document.querySelector("#date");
const time = document.querySelector("#time");
const theater = document.querySelector("#theater");
const imageDiv = document.querySelector("#imges");

const dict = {
  "morning": "09:00 ~ ",
  "afternoon": "14:00 ~ ",
  "evening": "19:00 ~ ",
  "theater1": "1관",
  "theater2": "2관",
  "theater3": "3관",
  0: "일",
  1: "월",
  2: "화",
  3: "수",
  4: "목",
  5: "금",
  6: "토",
  "age1": "전체관람가",
  "age2": "12세 이상 관람가",
  "age3": "15세 이상 관람가",
  "age4": "청소년 관람불가",
};

let lst = [];

// addBtn.addEventListener("click", (e)=>{
//   lst.push(new movie(movieName.value, age.value, date.value, date.valueAsDate.getDay(), time.value, theater.value));
// });

submitBtn.addEventListener("click", (e)=>{
  let lst = [];
  lst.push(new movie(movieName.value, age.value, date.value, date.valueAsDate.getDay(), time.value, theater.value));
  for(m of lst){
    var styleName = {
      "font": "FontAwesome,'Helvetica Neue',Helvetica,Arial,sans-serif",
      "align": "left",
      "color": "darkorange",
      "size": 36,
      // "background": '',
      "stroke": 0,
      "strokeColor": "rgba(255, 255, 255, 1)",
      "lineHeight": "1.2em",
      "bold": true,
      "italic": false
    };
    var textImage = TextImage(styleName);
    var imgName = textImage.toImage(m.name);
  
    var styleAge = {
      "font": "FontAwesome,'Helvetica Neue',Helvetica,Arial,sans-serif",
      "align": "left",
      "color": "orange",
      "size": 32,
      // "background": '',
      "stroke": 0,
      "strokeColor": "rgba(255, 255, 255, 1)",
      "lineHeight": "1.2em",
      "bold": true,
      "italic": false
    };
    var textImage = TextImage(styleAge);
    var imgAge = textImage.toImage(dict[m.age]);

    var messageEtc = `${m.date} ${dict[m.day]}\n${dict[m.time]}\n${dict[m.theater]}`;
    var styleEtc = {
      "font": "FontAwesome,'Helvetica Neue',Helvetica,Arial,sans-serif",
      "align": "left",
      "color": "orange",
      "size": 50,
      // "background": '',
      "stroke": 0,
      "strokeColor": "rgba(255, 255, 255, 1)",
      "lineHeight": "1.2em",
      "bold": true,
      "italic": false
    };
    var textImage = TextImage(styleEtc);
    var imgEtc = textImage.toImage(messageEtc);

    var zip = new JSZip();
    var img = zip.folder("tickets");
    
    for(i of ['A', 'B', 'C', 'D']){
      for(j of [1, 2 ,3 , 4, 5]){
        var messageSeat = `${i}${j}`;
        var styleSeat = {
          "font": "FontAwesome,'Helvetica Neue',Helvetica,Arial,sans-serif",
          "align": "center",
          "color": "tomato",
          "size": 50,
          // "background": '',
          "stroke": 0,
          "strokeColor": "rgba(255, 255, 255, 1)",
          "lineHeight": "1.2em",
          "bold": true,
          "italic": false
        };
        var textImage = TextImage(styleSeat);
        var imgSeat = textImage.toImage(messageSeat);

        let b64 = mergeImages([
          {src: './ticket.png'}, 
          {src: imgName.src, x:100, y:100}, 
          {src: imgAge.src, x:100, y:300},
          {src: imgEtc.src, x:100, y:750},
          {src: imgSeat.src, x:280, y:1050},
        ]).then(b64 => {return dataURItoBlob(b64)})
        img.file(`ticket${i}${j}.png`, b64, {base64:true});
      }
    }

    zip.generateAsync({type:"blob"})
      .then((content)=>{
        saveAs(content, "tickets.zip");
      });
  }
})

function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  var ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], {type: mimeString});
  return blob;
}