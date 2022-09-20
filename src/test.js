
data = [
   "can of beans",
   "shoes1" ,
   "shirt2" ,
   "shirt" ,
   "Super nickelodeon Shirts for men" ,
   "shirt" ,
   "extreme pants with hairholder",
   "men's superbike"
];

const searchTerms = "shirt"; // Change to test diff lengths

const eachString = searchTerms.split(" ")

if (eachString.length > 1) {
  var result = []
  eachString.forEach((thing) => {
    result.push(data.filter((item) =>
    thing ? item.toLowerCase().includes(thing.toLowerCase()) : true
    ))
  })
} else {
  data = data.filter((item) =>
    searchTerms ? item.toLowerCase().includes(searchTerms.toLowerCase()) : true
  );
}
console.log(result)
console.log(data)
