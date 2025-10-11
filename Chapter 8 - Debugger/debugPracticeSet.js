
const debugPracticeSet = () => {

 function calculateArea(width, height){
  console.log(width*height)
  return width*height;
 }

 let width = 10;
 let height = 52;
 const area = calculateArea(width, height);
 if(area > 100) {
  console.log('This area is large.');
 }else {
  console.log('This area is small.')
 }

 if( width*height > 100) {
  console.log("Area is greater then or equal to 100 ");
 }

}

module.exports = debugPracticeSet