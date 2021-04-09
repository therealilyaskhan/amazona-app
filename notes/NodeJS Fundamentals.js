'use strict';
/*
ONE THING ABOUT THE SERVER:
  A server only has one ear (port), and it listens through that, the http request from the client side isn't connected to any file directly on the server in any way , it's the responsibility of the server to decide based upon the url information in the http request to associate that request or more precisely "ROUTE" that request to the requested file; for example if a client requests: 
      www.xyz.com/assets/style.css
  The request isn't going to hit that file directly in fact the request has no connection with the file, it is the server which establishes the connection of the request with the file based on the URL and routes the request to the proper file and streams back the file;

  So server is something which is like a proctor or a monitor that monitors different requests to different URLs by standing at a singleton Gate(PORT) and therefore routes different requests to different resources on the server; SERVER IS A DIRECTOR

BASICS:
  JavaScript is just text which is passed to a program created in C plus plus called V8.h , think of the v8 as a function implemented in C++ which takes as argument some text as per a standard called ECMAScript Standard and that C++ function called v8 parses the text and in turn runs the equivalent C++; so basically the v8 is like a middle man which sort of transforms our javascript code into C++ code which does the same c++  job for us but using a javascript syntax;

  Nodejs is not javascript but it is built on the top of v8 that's why not only it accepts all valid javascript but also extends the standard javascript which let us write sever code; so node is an addon to the native js

FUNDAMENTALS:
          JavaScript --> v8.cc --> MachineCode
          
          Now this v8 engine is implemented in c++, the source code of the v8 has hooks onto which you can chain or say attach any of your c++ program;

          Node is a program that is written in c++ and is built on the top of v8, means it can process all valid JS and also in addition extends the syntax of the core javascript that was previously not available;

          For example the core javascript is never able to work with files but node made it possible. How ?

          Answer: The library 'fs' which is written in c++ enables you to work with files, now it is not the Node (not ryan dahl) who also wrote this 'fs' library but it was already available before the node so ryan dahl just utilized this 'fs' library and embedded into node, similarly there are other libraries such as "http_parser" (works with parsing http requests) , the "libuv" (works with OS events and system events), now ryan dahl took advantage of all these and extended the v8 by embedding these say "plugins" into the the core v8;

          now of course, for example say you want to work with files or want to parse http requests, you wouldn't directly import these c++ libraries into you dot .js javascript files , that won't work of course, but what ryan dahl has done is that he used a method called:

                      "process.binding"

          The process.binding() goes and grabs the c++ feature and wraps it into a javascript file; the javascript file further may extend this feature by adding on some extra code; e:g the zlib c++ library can is wrapped by node inside a file name zlib.js via: var binding = process.binding('zlib');

          So when we want to use the zlib feature we don't import the c++ library rather we import the js file wrapping this c++ library;

          and via the above method he wrapped all these features offered by c++ libraries such as working with files, parsing http requests, working with events, he wrapped all these c++ code inside javascript files, which you can easily require() inside your dot .js javascript files and can enjoy these features;

HOW DOES THE JAVASCRIPT WRAPS THE NODEJS C++ FEATURES ?
Remember that when writing server side code in nodeJS we never import inside our javascript files a c++ library. We always require('xyz.js'); files. but let's suppose that if there is a feature that is not available in the javascript language and is available in the c++ such as working with files then will we import the c++ library that has to do with files ? NO!!! what nodeJS has done for us is that NodeJS has wrapped such features coming from C++ side of the core inside javascript files via a mechanism called or we should say a method called process.binding(); this method grabs that c++ feature from the c++ side of the NodeJS code and brings it onto the JavaScript side of the node core where we can then use that feature and add on to that feature some other things and concepts from inside of the javascript file and thus allowing us to indirectly import the c++ feature by importing directly a js file; so when we import the javascript file, we actually are grabbing the c++ feature by requiring the javascript file;

#HANDLING SYSTEM LEVEL EVENTS IN NODE JS (LIBUV):- 
NodeJS is made up of:
1) V8: deals with the javascript side of NodeJS
2) libuv: C language library that is part of the C++ side of NodeJS core and this libuv library is there in node JS to handle the system level events and handle the jobs happening at the lower level (OS) For example it is the job of the libuv part of the NodeJS to handle the requests by the script for opening a file stream on the server : such a request is handled by the libuv; 
SYSTEM LEVEL I/O EVENTS ARE HANDLED BY THE libuv LIBRARY:
       System level events are handled by the libuv via a mechanism called EVENT LOOP and EVENT QUEUE; Whenever inside our script we associate a handler function with a system level event such as if a file is opened then execute this particular function or if a file download completes then executes that function and so on..., so whenever such types of (OS level) events completes a notification of that event occurrance is pushed inside the EVENT QUEUES which the libuv is constantly monitoring via the EVENT LOOP; and so as soon as a particular event completes the queue gets something and the associated handler for the event is passed to the V8 by the libuv for execution;
       So this asynchronous behaviour of the libuv and the v8 engine both working at the same time (though everything inside the v8 is synchronous) brings to the table NON-BLOCKING I/O operations , which means that the I/O operations wouldn't block our currently executing code inside the v8 but rather the libuv would wait for the v8 engine to finish what's currently executing and only then it would send the associated callback function to the v8 when the execution stack is empty and therefore the main execution of our javascript program is not blocked by the I/O events occurring in our app or website;
       So in short: the c++ core of the node handles the asynchronous OS level operations while the v8 is running the synchronous code;

#STREAMS AND BUFFERS:-
  Data is transferred from one computer to another locally or over the internet or from one unit to another (inside a computer) in form of bits; so a sequence of bits travelling / moving from one place to another is called a STREAM OF DATA; The stream is received bit after bit by the receiver and is either processed immediately or gather bit after bit to eventually form into a whole (such as downloading a video or file from internet) and then process that whole at once etc etc... A BUFFER is a small temporary storage over the network which is used to gather some bits coming from the sender in form of stream for a small fraction of time such that when the bits are enough for to be processed by the receiver or to be read by the receiver or eligible enough that the receiver can take some decision on its behalf, the data in the BUFFER is delivered to the receiver; Such as when the stream of video on youtube is coming so the data isn't delivered to us until there is enough data gathered by the BUFFER from the youtube's computer for us to be able to process and watch; 
  SO: the concept of BUFFERS AND STREAMS is sometimes combined!!!
*/
//WHATEVER WE WRITE INSIDE A NODE SCRIPT IS ACTUALLY THE BODY OF AN IMMEDIATELY INVOKED FUNCTION EXPRESSION AND INSIDE THE IIFEE THE VARIABLES WE DECLARE INSIDE THIS SCRIPT ARE NOT THE ONLY VARIABLES BUT SOME OTHER VARIABLES ALSO BY DEFAULT COMES ALONG THE WAY ONE OF WHICH IS "module.exports"
/* 
Every node.js file that you write is not run directly inside the main global execution context but is rather ran inside an IIFE; even the current script is being run by the Node js wrapped inside of an IIFE and to that IFEE is  passed as arguments the following things:
1) module.exports property 
2) module object
3) require function
4) __filename
5) __dirname

that's why in the current node script we have these things available as shown below:
*/
console.log(module.exports); //{}

// remember that the only thing the require function returns is a property called exports from the module and we then destruct it as below to get the property of our choice:
const { Buffer } = require('buffer');

//in the line below the require function returns is a property called exports on the module object (module.exports)
let catchTheModuleDotExports = require('./module');
// in the above line whatever is inside the module.js file will be wrapped inside an IIFE and will be executed if the body of the IIFE is making some changes to the exports property on the module object then require function is of some good otherwise not cuz that's the only thing the require function returns;

//point to note is that an instance of the Module class is created for each node script that you write and each instance is different from each other having independent exports property and so on... on it;

//the current script that we are writing inside is being executed inside an IIFE and that IIFE makes the module object naturally available to the code we are writing here; now if in some other module some changes have been made to the exports property on the module object. this change won't effect the export property on the module object (instance of the Module class) that was created by the Node JS for the current node script cuz each IIFE has its own execution context; 

//the require function simply returns the current value held by the exports property of the module object that's available to the current node script; 

console.log(module.exports); //{}
// and that's the reason why the exports property on the current module object still holds empty object even though the require function above returns a filled exports property from the module.js module file cuz for each script instance of Module class (the 'module') is different;

// now if we explicitly make some changes to the module.exports for this particular file , then if some else node script require this file via the require function then the current situation of the export property of this module will be returned to that call by the require() and whatsoever is inside our exports property will be captured there; 

////////////////////////////////////////////////////////////////
// What's returned by the require() function is cached:-
////////////////////////////////////////////////////////////////
//The require function below returns reference to an object which is referred by the module.exports inside the attock.js file;;;
require('./attock').greet(); //welcome to attock
//on again requiring the same module (attock) , reference to the cached module.exports is returned (note that the object resides inside the memory and reference to that object is cached and is returned on another require() call to the same file):
require('./attock').greeting = 'Modified welcome to attock';
//we modified a greeting property inside that object so:
require('./attock').greet(); //Modified welcome to attock
console.log(
  require('./attock')
  ===
  require('./attock')
); //true 

//The code below proves that when we required a js module for the first time in our code ; the body of that module (the code inside that file) is wrapped inside an IIFE and that IIFE is only executed once by the Node JS and then value inside the module.exports is returned at the end of the execution of the IIFE but then after that no matter how much ever times you require that same module (js file name) via the require function the body of the module will never be executed and the previously returned value inside the module.exports will be returned on each subsequent call to the require for the same module;
console.log(require('./random')); //0.58888888888
console.log(require('./random')); //0.58888888888
console.log(require('./random')); //0.58888888888
console.log(require('./random')); //0.58888888888
console.log(require('./random')); //0.58888888888

class Person {
  constructor(fname, lname) {
    this.fname = fname;
    this.lname = lname;
  }

  greet() {
    console.log(this.fname + ' ' + this.lname);
  }
}

let person1 = new Person('ilyas', 'khan');
let person2 = new Person('khan', 'jee');

console.log(person1.__proto__);
console.log(person1.__proto__ === Person.prototype);
console.log(Person.prototype.greet);

//BUFFERS AND STRINGS:-
let buf = new Buffer.from('Hello', 'utf8');
console.log(buf);
console.log(buf.toString()); //Hello
console.log(buf.toJSON());
console.log(buf[2]);

//NEED OF BUFFER (THE Buffer Class) IN JAVASCRIPT BY THE NODE JS AS AN EXTENSION TO THE JS FROM THE C++ SIDE OF THE NODE CORE;
/*
Vanilla JavaScript itself doesn't has much methods and functionality to deal with the raw binary data, Buffer class offered by the NodeJS allows us to create objects that can hold the binary data temporarily and offers us methods on that object to deal with the currently possessing data by the given buffer;
*/

//ES6 NATIVE WAYS OF DEALING WITH BINARY RAW DATA (NO NEED OF NODEJS BUFFERS):
//first define a buffer array that is basically a buffer but an indexed buffer:
let bfr = new ArrayBuffer(8); //here 8 means bytes
//so the above array(buffered array) can hold 64 sequences of bits ;
//now let's define a view (which is also an array) and can be used in conjunction with a buffered array which we declared above; so we define a view and to that view is passed a buffered array of a certain capacity; for example an Int32Array means that each index position has a 32-bit weight and this Int32 means integer at each index will be a 32-bit integer means that integer is supposed to be encoded as 32 0 and 1's;  so this means that the buffered array ArrayBuffer(8) = 64-bit that we are having will only allow the view array to have 2 numbers weighting 32-bit each since it only has a capacity of 64 bits and each number in the view is 32-bit; 
let view = new Int32Array(bfr);
console.log(bfr);
console.log(view);
view[0] = 12;
view[1] = 34;
console.log(bfr);
console.log(view);

//WHAT IS A STREAM ? STREAMS
/*
ONE THING TO BE CLEAR BEFORE DISCUSSION:
TOWARDS:- A stream is a path to a source in case of Readable stream from the node's perspective
OUTWARDS:- A stream is a path to a destination in case of Writable nature of stream from the node's perspective

So when you open a stream to a file, if the stream you opened/connected to a file is a ReadStream then the server should get something from that file;
And
When you open a Writable Stream to a file, then the server is supposed to send chunks to that file;

So streams are means via which you can get or send data in chunks from the source or to the destination respectively;

STREAMS AND BUFFERS WORK TOGETHER:-
In Case of Readable Stream:
          Think of a Stream as a pipeline connecting to a WaterTank (the source file) and a buffer as a Bucket put under the pipeline waiting for some water(chunks) to be drawn from the Tank(file) via the Stream(pipeline), now if the bucket(buffer) is 10 liter, then only 10 liters of water(10bytes chunk) will be drawn from the Tank(source file) at one time and the bucket (buffer) will be filled up with that chunk of water and as soon as the bucket is filled, the 'data' event will be emitted and the data in the bucket will be passed as a chunk to the callback function listening for the event;

In Case of Writeable Stream:
          Think of stream still as a pipeline connecting to a WaterTank (but this time the WaterTank is not a source but is like a destination file); but rather this time we are going to provide the watertank (the dest file) with some water(data) from some sort of watersoure(data source); The source can be a Readable stream (another pipeline connected via .pipe method to this writable pipeline); we get data from the source pipeline chunks after chunks and put it onto the Writeable stream(the pipeline connected to the tank) and will fill the tank chunks after chunks; no need of buffer(bucket) here cuz the data here is already coming in chunks from the Readable stream via buckets(buffers);

A stream is a channel or a pipeline or a path through which bits / chunks of data can travel and these chunks or bits of data are caught up inside the buffer and then released as the defined buffer size is reached. 

It is not the nature or the data permissions that's restricting you from either only reading or writing the data but is rather the nature of the channels (the stream lines) that you have opened to  a WaterTank(a file) which defines what you can do with the streams of data travelling through it;

1) WRITEABLE STREAM: NodeJS can send chunks through such the stream but can't receive so if you open a writable stream to a file you can send chunks only to that file no receive from it;
2) READABLE STREAM: NodeJS can read / receive chunks from such a stream but can't send to it so if you open a readable stream to a file you can only receive chunks from that file but can send to it;
3) DUPLEX: NodeJS can both send and receive though such a stream, if you open a duplex or transform stream to a file, you can both read and write to and from to that file via such a stream;

*/

let fs = require('fs');

let grabText = fs.readFileSync(__dirname + '/greet.txt', 'utf8');
console.log(grabText);
console.log('File Read Synchronously!!');

//but the code above has a problem it stops the main global execution of our program and hence blocks the v8 engine so if a file is long enough it will keep our program blocked until one user is entertained since the server would be busy in fetching the data for one user and after that user is entertained only then the server can move on to continue the further execution of the program and listen to further users;

let grabText2 = fs.readFile(__dirname + '/greet.txt', 'utf8', function (err, data) {
  console.log(data);
});
console.log('I got the data Asynchrnously from the file: ');

// the code above is asynchrnous and non blocking but still has a problem, it doesn't care about the buffer size limit and no matter how much ever big a file is , it will cramp it whole all at once inside the buffer and then returns the buffer to us inside the data argument to our callback function which could lead to low heap memory inside the v8 engine , the v8 engine stores data like variables values and other data needed for the program execution inside the heap memory and the buffer also sits inside this heap memory so if the heap memory is low on memory due to a buffer then it could slow down our program drastically;

//solution: STREAMS (Readable and Writable) (define a buffer size limit):
let readstream = fs.createReadStream(__dirname + '/lorem.txt', { highWaterMark: 1024 * 10, encoding: 'utf8' });

//we are putting the chunk of data received via the Readable Stream into the Writeable Stream to write that data to another file via the Writeable stream;
let writestream = fs.createWriteStream(__dirname + '/loremcopy.txt');

//via the 'data' event we are listening to the Readable stream to receive some data through and as the buffer is filled and the data from the buffer is sent via the stream line the 'data' event is triggered and put into the QUEUE;
readstream.on('data', function (chunk) { console.log(chunk.length); writestream.write(chunk); });

//PIPE
/*
Streams are paths to waterTanks depends upon the nature of the given stream you can either draw or fill water into or from the waterTank(files);

.pipe() is used to connect two streams , so we draw water(data) in chunks from one waterTank(source) via the Readable stream and pass over that chunks of data to another stream via which the chunk can make its way into another waterTank(destination)

The .pipe() method returns the destination streamline now if the destination stream by nature is a writable only stream then you can't chain that stream via a pipe to another stream since you can draw data from the file the returned writable stream is connected/opened to , but in case the returned destination stream is a DUPLEX one then this means that the watertank that this duplex stream is connected to can both write to or read from the file it is opened to; so you can chain or say pipe this returned stream to another stream and so on and thus forming a FLOW OF STREAMS...

*/

//THE DOT .PIPE METHOD
/*
The NodeJS Readable interface implements a method on its prototype called ".pipe" which takes in as arguments a destination(a writable stream)

So any indirect instance of the Readable interface e:g an instance of the ReadStream class (a read stream) will have the .pipe method which takes a destination stream(which should be an instance of the WriteStream class), and the .pipe method will automatically tack onto the instance of the ReadStream class upon 'data' Event a callback and inside the callback will pass the data to the destination we passed to it which should be a Writable;
*/

let source = fs.createReadStream(__dirname + '/lorem.txt');
let dest = fs.createWriteStream(__dirname + '/loremcopy2.txt');

//let's pipe the destination stream to the source stream; and thus the data(water) will be drawn from the source and passed to the dest stream chunks after chunks on the 'data' event and the dest stream will carry on the chunks to the destination file.txt;
source.pipe(dest);

//the .pipe method will automatically tack onto the instance of the ReadStream class upon 'data' Event a callback and inside the callback will pass the data to the destination writable stream we passed to it and remember that the 'data' event is emitted on the bucket(buffer) fill, and also remember that buffers only works with the Readable Streams not the writeable streams, so as soon as the buffer gets filled by receiving data from a Readable stream, the 'data' event is emitted and the chunk inside from the buffer is passed as an argument to the callback function which was tacked onto the ReadStream object by the .pipe() method and inside the callback the chunk is passed to the Writable Stream's instance which was passed as argument to the .pipe() method; 

//the following code explains the above concept:
let zlib = require('zlib');
//the zlib returns an object which lets us create a Transform(duplex) stream and that stream compresses the data packets passed through it using the "gzip" algorithm;
let gzipStream = zlib.createGzip();

let readableStream = fs.createReadStream(__dirname + '/lorem.txt');

let writableStream = fs.createWriteStream(__dirname + '/lorem.gz');

readableStream.pipe(gzipStream).pipe(writableStream);

//////////////////////////////////////////////////////////////
//PORTS, TCP/IP AND SOCKETS EXPLAINED:-
//////////////////////////////////////////////////////////////
/*
KEY POINTS:
WELL KNOWN PORTS: 0 to 1023 are used by client as the destination ports depending upon the nature of the request the client is making to the server if it's an https request then the client will use the port 443 as the destination port number;

DYNAMIC AND PRIVATE PORT NUMBERS AS SOURCE PORT NUMBERS:
REGISTERED PORTS: from 1024 to 49151 operating system will choose any one of the available number dynamically to be used as the source port number. means that if you are on a web browser and open a new tab and send a request to say www.shopify.com (23.227.38.65) then the operating system will dynamically assign a port number to that particular tab as a source port number which will receive data back from the shopify server perspective as the destined port to which response data will be returned to and thus you see your data as a result on no other tab but that very tab;
So server is going to respond to the source port of the client as the destined port number;

CLIENT (initiating a web communation with a server):
Destination port = 443 (HTTPS): client requesting access to an https service from the server
Source port = 2234 (dynamically assigned by OS): request sent from this particular port number;

SERVER (responding to the web https request):
Destination port = 2234 (source port of the client): respond the data in return to https request to this specific port on the client side
Source port = 443 (HTTPS reserverd port)


In networking every machine that is sending or receiving data via the internet is called a "host" wether it is a server computer or a client side computer;

When information(wether as a request or a response) is sent by a host computer via a particular application on a host computer(e:g a web browser or a mail app or a file-transfer app such as bitorrent etc), depending upon what is the structure and nature of information the application is trying to transfer over the internet; wether the information being transferred is assembled via HTTP protocol or the infromation is structured using the FTP; depending on which application the information is coming from the information will be passed through a particular port number from the application to the TCP layer of the TCP/IP network model; after the TCP layer receives the information through a particular port , that port is going to be the source port number and when the server responds back to the client this particular port number is going to be the destination port number then. Anyway, the Transmission Control Protocol will split the information got through the port number from the application layer into small pieces called "packets" and on each packet it will slap the port number the information came through as the source port number; and then after that each packets will be passed to the IP layer, The IP layer will slap a logical address address on each packet identifying the source host and thus the result of the combination of the "PORT NUMBER" and the "IP ADDRESS" is what forms a "SOCKET";

And not only that the IP layer not only on each packet slaps the source IP address but also slaps the combination of the destination host IP address and the "DESTINATION PORT NUMBER" which also results in another ENDPOINT / SOCKET OF THE COMMUNICATION CHANNEL;

REMEMBER THAT: the destination port number attached to a packet in case of when the request is going from the client side to the server side will be a port number from one of the most common reserved post numbers and will be totally dependent on the type of protocol the data structure is following , for example if it's an http request from client to server then the IP layer will slap the destination port number as: 80 on each packet, for each kind of request different port numbers will be slapped on each packet by the IP layer:
FTP: 21
SMTP:25
HTTP: 80
HTTPS:443

And then when the data is coming back to the client as a response then the port numbers 80 as a response to an http request will act as a source port and the port from which the request came as a destined port this time;

So, common reserved destination port numbers are slapped by the sender on each packet, to tell the receiver which application the receiver should use for the 'data';

And as a result since on each packet we are having the SOURCE SOCKET and the DESTINATION SOCKET , now each packet knows exactly where to head towards;
Also the TCP layer makes sure the order of the "packets";
So on a Packet we have the following things at the end of the day:
==> Calling Port Number (Assigned by sending host)
==> Called Port Number (What application you are connecting to on the receiving host)
==> IP Address of the Calling host
==> IP Address of the Called host
==> Sequence number (Identifies the position of the packet in the sender's byte stream of data)

AND REMEMBER:
When this packet is going to be received at the Receiving host, The packet has to go through the TCP/IP Model in the reverse order; first the packet is going to arrive at the Network layer, then the IP layer is going to identify the Addresses on each each packet using the Internet Protocols , then if that stage is qualified the Packet will be transferred to the TCP layer where the Packet will ordered based on the sequence number and as all the packets are received the TCP layer will decide based on the destination Port number to which application the data should be passed to; if the port:80 then the data will be passed to the Web browser;

////////////////////////////////////////////////////////////
CLIENT AND SERVER COMMUNICATION AND ROLE OF PORTS
////////////////////////////////////////////////////////////
When a client host sends a request to a server; the client port at request time is regarded as the "SOURCE PORT", And the server port as the "DESTINED PORT". And as the server responds to the request and wants to send some data back to the client host, then the server port becomes "SOURCE PORT" and the client port "DESTINED PORT" and the data is sent to the window / application on the client side the the destined port represents from the server host perspective;
*/
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////
//          SEMANTIC VERSIONING (SEMVER)
//////////////////////////////////////////////////////////////
/*
Each npm package that your application rely on has a version number in the following format / pattern:
                  Major.Minor.Patch
                      7 . 2 . 1
Now this versioning pattern is not a normal versioning pattern but something called "SEMANTIC VERSIONING" , which means that the versioning is in a specific format or pattern that conveys some meaning itself;

Which means that let's say that your application depends on an npm package having a version 7.2.1 and the author of the package makes some bug fixes to his package then he will release a new version of his package by incrementing the PATCH part of the semantic version of his package and the newer SemVer is going to be: 7.2.2, This means that if i update to the latest version then "NO HARM CAUSED", my app is not gonna break by updating this package to the latest version of the particular package;

Now if the author adds some new features to this package then he is going to release a new Semantic Version of his package by incrementing the "MINOR" part of the current package version and so the new version is going to be: 7.3.0; So the newer SEMANTIC VERSION still conveys that no breaking changes are made to the package only some additional features are added to the package so i can safely update to the latest version of the package and still "NO HARM CAUSED" cause no breaking changes were made to the package;

BUT Now say if the author of the package releases a new version of his package and the newer version of the package has an increment to the "MAJOR" Part of the Semantic Version of his package such that the newer version is 8.0.0 , then in this case the author must have made some MAJOR AND BREAKING CHANGES to the code of his package and before even thinking of updating to the latest version of the package, we must READ THE DOCUMENTED CHANGES that he made to his package and if you are utilizing any one of those features coming from his package which he made changes to, then you should review properly or make changes to your application in accordance to the newer version of the package before updating to the new major version of that package;


///////////////////////////////////////
            STATIC FILES
///////////////////////////////////////
We define a middleware to take care of all those requests for static files;

Static files are the once which are not dynamically evaluated but they are rather placed inside a directory (usually named "public") on the server and are downloaded simply when requested; You don't need to do any extra work while handing such kind of static file back over to an http request, you just simply use a middleware to deal with static files such that when a static file is requested (as your static files are gonna live under the same folder) so if something from that folder is requested we tell the server to simply hand that over;

////////////////////////////////////////
              middleware
////////////////////////////////////////
middleware is a code which sits between the request and response, there are certain common type requests and tasks which can be handled via a middleware code, there are a lot of open source middleware codes readily available which you can easily plugin between request and response;

Multiple levels of middleware:
            A request is handled by a middleware(callback func) and then via a method called "next()" that request is passed to another *QUALIFYING* middleware to be further handled by that and so on until the request is finally responded.

            BY QUALIFYING I MEAN:
                  That whenever an http request comes onto the server, the request has a certain method and route, we define different express routers to handle each request; Now lets suppose we define a middleware that should run on each and every fucking request like follows:

                  app.use(customMiddleware);

                  The above customMiddleWare must be able to accept three parameters: req, res, next;

                  Now this customMiddleWare is a function which is going to run on each and every fucking request; and remember a middleware function is not supposed to dot .send() or dot .end() the request response cycle, rather the only purpose of its existence is to play it's role in the middle of the request response cycle that's why named: "middleware" and after performing its role, it should at the end call the "next()" function;

                  What the next() function is going to do is that it will let the http request go out of the current middleware and look for lexically next qualifying routers;

                  Notice the word LEXICALLY above; what that means is that let suppose we have http get request for the following route(api):

                  "/api/products/123"

                  Then in the given case below, considering how we have lexically put our middleware, only middleware1, middleware2, middleware3 will be run for the above http get request;

                  app.use(middleware1);

                  app.use(middleware2);

                  app.use('/api/products/:id', middleware3)

                  app.use('/api/users/:id', middleware4)

                  app.get('/api/products/:id', (req, res)=>{
                    res.status(200).send('here is your product');
                  })

                  app.use('/api/products/:id', middleware5)

                  middleware4 will not run because it doesn't qualify for the get request's route, and middleware5 will not run because till then the req  res cycle will be ended :D

/////////////////////////////////////////////
        "error handler middleware"
/////////////////////////////////////////////
You might be wondering why we put the error handler middleware Lexically at the very end of all other middleware ?

Well, each and every request handler in express is not only a controller/ a request handler function but also a middleware function which means that they have a function called "next()" available onto them, which means that if they don't want to end the request response cycle they may not and pass the req after making some tinkers to it onto the next LEXICALLY qualifying middleware, which means that if we call upon an error the:
                      "next(error) function"
That would mean that we are not ending the cycle but rather we got some error and we can't handle it so we want to pass it over like a football to the next qualifying middleware which is going to be an errorhandler middleware function and let that function handle the request response cycle further onward, BUT UNFORTUNATELY SUPPOSE THAT our errorHandler middleware was lexically above the request handler controller function, and the request response cycle has already passed through it uselessly, NOW this is where the term LEXICALLY WORKS, this means there would be no next qualifying middleware since no qualifying errorHandler middleware lies lexically;

Also note that we don't mention a route for errorHandler middlwares, that's because we want them to be executed for each and every route and type of client request;

AND ALSO NOTE THAT: 
              if you pass something as an argument to the next() function like next(err), the next lexically qualifying middleware is going to receive this argument in its first parameter like so:

              app.use((err, req, res, next)=>{
                //handle error;
              });

              The first param is going to receive the argument passed to the next() function and then the req, the res, the next like usual;

////////////////////////////////////////////////
SOME BASIC CONCEPTS ABOUT ENDPOINTS AND APIs
////////////////////////////////////////////////
ENDPOINT:
      is a URL that is routed/directed by the server to a particular resource on a server. so basically each endpoint requests something unique from the server and on each different endpoint server returns as response something back, any URL which is being routed by the server to a specific resource on the server , that URL is basically an endpoint;

ROUTING:
      Routing in simple words is the process of associating or mapping a particular handler function with a particular URL(route), Each route can have one or more handler functions, which are called when the upon the route match.

      Routing is done using the following syntax:
      app.METHOD(PATH, HANDLER)
      HERE:
      app is an instance of express.
      METHOD is an HTTP request method, in lowercase.
      PATH is any path that you want to associate with a handler.
      HANDLER is the function executed when the route is matched.

The routing methods (.get() .post() .put() .delete() ) all these are used to do routing (means to associate a path with a handler) so they are used to specify a callback function (sometimes called “handler functions”) called when the application receives a request to the specified route (endpoint) and HTTP method. In other words, the application “listens” for requests that match the specified route(s) and method(s), and when it detects a match, it calls the specified callback function.


/////////////////////////////////
the dot .use() method
/////////////////////////////////
it will apply to all the GETs, POSTs, etc

it is useful for "middlewares" means to associate some middleware functions with a base path; which will always be executed when the specified base matches a URL;

The  dot .use() method is used to mount the specified callback function or functions at the specified route. the middleware function is executed when the base of the requested path matches path. for example:
app.use('/apple', ...) will match “/apple”, “/apple/images”, “/apple/images/news”, and so on.

Since path defaults to “/”, middleware mounted without a path will be executed for every request to the app.
For example, this middleware function will be executed for every request to the app:

app.use(function (req, res, next) {
  console.log('Time: %d', Date.now())
  next()
})

Middleware functions are executed sequentially, therefore the order of middleware inclusion is important.

// this middleware will not allow the request to go beyond it cuz the res.send() terminates the request by responding;

app.use(function (req, res, next) {
  res.send('Hello World')
})

// requests will never reach this route
app.get('/', function (req, res) {
  res.send('Welcome')
})


/////////////////////////////////////////////
            EXPRESS JS
/////////////////////////////////////////////
ON A Quicker Note:
          "Request handler", "Router function", "Route Handler" and "Controller" are all names of same thing;

//Express is a routing and middleware web framework that has minimal functionality of its own: An Express application is essentially a series of middleware function calls.

Middleware functions are functions that have access to the request object (req), the response object (res), and a function named next;

Middleware functions can perform the following tasks:
    Execute any code.
    Make changes to the request and the response objects.
    End the request-response cycle.
    Call the next middleware function using next().

Remember that, Middleware functions are executed sequentially

If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

///////////////////////////////////////
      GET METHOD AND POST METHOD
///////////////////////////////////////
Data sent over to server side via GET method using the URL is included inside the request header. ExpressJS already parses the request header for us and turn those name=value pairs in the URL into object properties (req.query.name: value);

But data sent via the POST method to server isn't sent through the URL and is rather sent inside the request body instead of the request header but ExpressJS doesn't turns the request body into object properties for us so we will  need a middleware function that simply turns for us the whole body of a request into an object and attach that to the request object such that then we can access the body object as req.body which isn't available out of the box;

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// the urlencodedParser returned by the bodyParser.urlencoded() is one such middleware function that parses the body of any request and turns it into a javascript object; you can basically attach this middleware function (the urlencodedParser) to any path and if an http request hits that path the body of that http request will be turned into object;

For example if a user fills out a form and submits the form so the data he sends over to the server will be sent inside the request body now express and node doesn't provide this feature out of the box to create an object for the data sent over inside the request body, so the middleware "urlencodedParser" that we have injected in-between the actual response handler and the request, this middleware will parse the body and will convert the data came from form fields inside the body of the request into an object:

app.post('/login/user', urlencodedParser, (req, res) => {
    console.log(req.body.firstName);
    console.log(req.body.firstName);
    console.log(req.body.email);
});


///////////////////////////////////////
            RESTful APIs
//////////////////////////////////////
By combining the verb(method) and the given requested URL structure we conclude what action to be taken. that's all what RESTful means, it has standardized the way you should structure or design your api by blending both the meaning of the VERB and URL to perform a particular response in reaction to a request.

//////////////////////////////////////////////////////////////
ROUTERS (also known as route handlers) and the app OBJECT
                            or
Different between "express.Router" function object and the "app" Object; 
//////////////////////////////////////////////////////////////
A Router instance (the router) is a complete middleware and routing system; the instance of a express.Router class has everything (methods and props) that can be used to associate a set of middleware functions with a specific path; Think of the express.Router as a subset of the "app" object that the express() returns; cuz the "app" object can also achieve all these functionalities. what the "router" can't do is that it can't listen to a port; it is just used for the sake of routing URLs to middleware functions;

SO:  Think of "app" as the main app AND 'router' as mini app;

The express.Router() was introduced in express version 4.0 and the documentation says:
          "The express.Router class can be used to create modular mountable route handlers. A Router instance is a complete middleware and routing system; "

Remember:
    Express is a routing and middleware web framework that has minimal functionality of its own: An Express application is essentially a series of middleware function calls.

Now we can bind to each instance of express.Router() a stack of middleware function by using either the .use() or the .METHOD() methods on the "router" function object. and after these stack of functions(the middlewares) are bind to the unique instance of Router (the router) , we via the "router" object can mount this stack of functions on a path;

So the middleware functions are mounted onto a path via a router function object.

To skip the rest of the middleware functions from a router middleware stack, call next('route') to pass control to the next router and then the middleware function stack of the next qualifying router for the requested path will start executing.

A router (instance of the express.Router) is something which is used to associate a specific route with a set of callbacks or a middlewares.
A router behaves like middleware itself, so you can use it as an argument to app.use() or as the argument to another router’s use() method.
The top-level express object has a Router() method that creates a new router function object.

*/
const express = require('express');
const app = express();
const router = express.Router();

console.log('the app and router , both are same thing but app is just a default router which is used to associate a route with a specific handler or a middleware that is the job of a router basically so both does the same job: ' + typeof router + '  and  ' + typeof app + ' ' + app.prototype.constructor + ' ' + router.prototype.constructor);

/************************************************************
 ////////////////////////////////////////////////////////////
              FIRST SERVER EXPLAINED
 ////////////////////////////////////////////////////////////
 ************************************************************/
/*
here the createServer() comes from the http.js module from the javascript side of the node's core. this http.js module wraps a c++ library called 'http_parser', we simply import this http.js module to utilize this feature in our code and the method createServer(reqHandler) on this http module lets us create a server object. When we 'step into' this expression: http.createServer(callback), we see that it runs the following expression:- "new Server(callback)" which means it will return to us an object which is actually a server because this object is what is basically going to listen to a certain port on the our machine via the listen() method; The function that you pass to the createServer is going to be a handler for an event called 'request'. 

Under the hood the Server() constructor function at the time of object creation attaches a handler function to the current object upon the 'request' event via something as below:
        this.on('request', yourPassedFunction);
So what the dot .on() is going to do is that it will create sort of an 'events' property inside the *this* current object; and the 'events' property created by the dot .on() method is going to have an object as its value. and that object inside the *this* object is going to have different registered event names; so the ultimate picture is going to be something as follows:
(suppose *this* object is anonymous)

*this* = {
  events: {
    'request': [collection of handlers]
  }
}

So when a client makes an http request through this particular port to which *this* object is listening to, a 'request' event is going to be emitted on *this* object and thus the associated handlers will be invoked along with 2 arguments (req, res) 
< see below about the req, res arguments >

so this object returned by the createServer method is already handling the 'request' event; 

Now, When a client sends an http request through the socket to which this particular object is listening via the listen() method, a 'request' event will be emitted on *this* very object such that: "this.emit('request')" , and since a handler is already associated for the 'request' event on this object (this.on('request', Handler)); so the function that you are passing below will be run each time someone sends a request via the port number you specify in the listen() method;

Now upon a request through the socket to which this object is listening, a 'request' event will be emitted on *this* object and the associated handler will be invoked along with **req** and **res** as two arguments to the handler as follows:
          this.emit('request', req, res);

REMEMBER: that the req and the res objects are both streams, the req is an instance of the ReadableStream and the res is an instance of the WritableStream;

/////////////////////////////////////////////
Now what are the "req" and "res" arguments ?
/////////////////////////////////////////////
remember that the res object is a Writable stream;

so you can connect a readable stream to files (e:g index.html) on your server and then pipe them to a writable res object; so the data from the server will be sent over onto the client side in form of chunk at a time; the browser is already used to receiving data in form of chunks so it will assemble all these chunks at the TCP layer and after the stream is completed and all the chunks are collected the data will be pushed to your application program (browser) via the sockets at the Application layer;

or the chunks would be processed and sent to your browser as they comes by the TCP/IP network protocols, just like if you are streaming a video on youtube;

Both the *req* and the *res* are Objects; the *req* is a JavaScript literal object which is the request text parsed and split and converted into a JavaScript object by the http_parser feature of the C++ side of the node's core and the *res* is and instance object which is an instance of the ServerResponse interface offered by the _http_server.js module of the NodeJS; this *res* object has many methods on its interface which lets us fill this *res* object with head and body cuz this is what is going to be sent back to the client side;

/////////////////
req Object
/////////////////
When someone sends an http request to our server the C++ feature called the http_parser will parse the request and will convert the different possible parts of the request into a javascript object having different possible parts as its the properties of that object such as the header part , the user_agent part etc...

/////////////////
res Object
/////////////////
and the *res* object is the one which we are going to fill with the different parts i:e The ResponseHead and the response header, the status code inside the ResponseHead, and the MIME type and the Content-Type inside the response header, the response body and so on... and this is the object which is going to be sent back as a response over to the client side application
*/
let http = require('http');
http.createServer(function (req, res) {

  console.log(req.headers['user-agent']);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\n');

}).listen(1337, '127.0.0.1');
//localhost:1337 in the browser address bar means that look for a program/object that's listening on this socket and give it an http request and let's see what it gives us back in response;

//Just creating the server (object) via the createServer() method is not enough, the server should also listen to a particular port or more precisely a socket(combination of port and ip numbers) for it to receive and send things through; so whenever some information comes through this very specific socket , this object is gonna be there to entertain the request;

/*
///////////////////////////////////////////////////
SO WE CAN CONCLUDE THAT:
///////////////////////////////////////////////////
==> A server is nothing but an anonymous object that listens to a port;
==> This server object has an event handler registered onto it for the 'request' event;
==> when this port is hit by someone to which this object is listening, the 'response' event is going to be triggered and the event handler will fire;
==> this event handler is passed as arguments a req object that contains certain information about the request, and a res object which can be filled via certain methods present on it;
==> and at the end of the (from the point of request till we have a full fledged response object in place), we can return the response object to the client side via the res.send() method or the res.end() method;

//////////////////////////////////////
HOW TO START A SERVER ?
//////////////////////////////////////
simply install node on your machine to let your machine understand the extended syntax added by nodeJS onto the core javascript, such as creating a server;

then open cmd and type 'node'

the node runtime will start

you can now type all valid javascript + extra node features and syntaxes

now all you have to do is to create a server object via the createServer() method available on the 'http' Interface , so it means first you have to import the 'http' interface;

the createServer() will return you with an object which is capable of listening to a port and this object is basically your server;

and you created a server!!!!

1) open cmd
2) type 'node'
3) type 'var http = require('http');'
4) then: 'http.createServer(function(req,res){res.writeHead(200, {'Content-Type': 'text/plain'}); res.end('Hello World!\n');}).listen(5425, '127.0.0.1');'
5) and you created a running  server;

//////////////////////////////////////////////////
HOW TO RUN A NODE SCRIPT SUCH THAT YOU DON'T HAVE TO RESTART THE SERVER IN CASE YOU MAKE CHANGES BUT RATHER THE SERVER REFRESHES ITSELF IN CASE YOU MAKE A CHANGE
//////////////////////////////////////////////////
install a package named "nodemon" globally,
then open in cmd or terminal the directory where the script that you want to learn lives
and run the following command: nodemon filename.js

/////////////////////////////////////////////////////////
HOW TO START A NEW NODE PROJECT ?
/////////////////////////////////////////////////////////
1) Create a new folder
2) open in terminal or cmd
3) npm init
4) npm install express --save
5) now create new js files require the express and start writing server side code;

/////////////////////////////////////////////////////////
What happens when you require a module or file;
/////////////////////////////////////////////////////////
When you require('file') inside node , since whenever you run a script or a piece of code via the node filename.js command that code is run via node and since node wraps each and every scripts inside an IIFE and to that IIFE is passed that file has a module object and a property on that object called "exports", now whenever you require a file inside your code, the file is going to have a module.exports property and that property is all that's being transferred over to you!

/////////////////////////////////////////////
STATIC FILES:
/////////////////////////////////////////////
FROM THE DISCUSSION BELOW WE COME TO KNOW WHAT STATIC FILES REALLY ARE:
        static files are those files which doesn't need to be processed on the server side, rather they are served over to the client side as it is as they are on the server without any change, in case of react the static files are the: index.html, css stylesheets, javascript bundle (containing react and other needed javascripts), images, font styles etc..., the html is static file because it contains only a single root container in its body when it is on the server side and it is sent over to the client side as it is without any change; the browser then parses this html and this html has links to css and javascript files which are also static files and the server serves them as it is too, it is the job of the javascript on the client side to construct the markup and fill it with dynamic data by grabbing data from API endpoints; that's it!

First of all let's clear the following concept:
        1) The browser first needs markup
        2) when it parses the markup the markup links to css
        3) after the browser downloads the css from the server
        4) the browser is ready to paint the UI
        5) so it means that the page is technically ready to be rendered once html and css are loaded
        6) the browser doens't has to load javascript in order to render the page
        7) it just loads and parses the javascript to enhance the UI though it isn't needed

                            "BUT"

        UNFORTUNATELY, SINGLE PAGE APPS LIKE REACT ONES ARE NOT TAKING ADVANTAGE OF THIS BEHAVIOR OF THE BROWSER BECAUSE IN CASE OF REACT APPLICATION THE WHOLE APPLICATION ENTIRELY DEPENDS UPON THE JAVASCRIPT TO BE LOADED;

REMEMBER THAT:
        Both the css and javascript are render blocking which means that when they are being loaded into the browser the browser can't paint the UI; so that's the reason that we always put the links to css stylesheets at the top of the markup because we need css for our markup look though we could put it at the bottom; and we put the javscript always at the end of our body right before the closing body tag just because the browser parses html character after character from the start; BUT WITH IMAGES AND OTHER CONTENT BESIDES THE CSS AND JS this isn't the case, they are loaded in parallel to the render; they are not render blocking; that's the reason we say that when the browser has got html and css it is ready to paint the UI;

        but again, react is not taking advantage of this fact;

        BECAUSE:
              in case of multipage applications the javscript is only used to enhance the interface and interactivity;

              but in single page applications: your entire UI depends upon javascript; cuz the markup is constructed by the JS;

CLIENT SIDE RENDERING:
        In client side applications, on your initial request the server serves you a single static index.html document;

        This index html file is initially empty and has no content

        The index html file the browser receives initially has nothing inside it except a single root div;

        So the actual markup is constructed by javascript(react);

        The browser parses that html and this html file links to other static files such as images, javascript, css stylesheets, and font files etc. so the browsre parses this html file and downloads all these static files from the server;

        The javascript bundle downloaded contains react; after this point react takes over and starts filling this html file with dynamic content on the client side;

        React mounts different elements onto the html file and pulls the content of these html elements from an API endpoint;

        So in short:-
        your initial request downloads static files to the browser from the server, such as the markup file, the css, the javascript, the images etc... the javascript then takes over; your markup isn't filled with any elements and CONTENT at this stage; it is the javascript that starts filling it with elements and in case the content of those elements is dynamic so javascript will make requests to some API endpoints to fetch dynamic data and fill it in there; so it means that all the rendering and filling is done on the client side dynamically;
        And then for any subsequent updates to the page, like if the state of a component changes in reaction to some user action or if another page is requested, the request will be intercepted by the javascript in the browser and will do client side rendering;

SERVER SIDE RENDERING:
        Every single html page is rendered on the server and then sent back to the browser;

        By render we mean that the markup is made ready on the server side and all the content of the html elements is calculated on the server side and then the full fledged html is sent over to the browser

        The browser gets the html document and starts parsing it

        The html links to static files such as css, images, js

        So the browser first loads the css so that it becomes ready to paint the UI

        and then at last loads the javascript to enhance the UI

        each time a new page is requested, the request goes to the server and once again the html markup is finalized on the server side and then served;

        With server-side rendering your initial request downloads from the server: the markup, css, javascript and more importantly the "CONTENT" used by the html elements; all the dynamic content is going to be pre-processed on the server side before it is passed over to the client; so all the documents are fully developed first and then transferred to the client side;
        The browser in the client machine just simply plays a role of displaying that document, without any calculation.
        Server returns ready to be rendered HTML with filled content;

REACT CAN DO BOTH CLIENT SIDE RENDERING AND SERVER SIDE RENDERING;

////////////////////////////////////////////
STRUCTURING EXPRESS APP:
////////////////////////////////////////////
==> First install the express application generator tool globally that would let you create a skeleton express app, just like you would install and run the react application generator tool via the npx create-react-app:
                npm install express-generator -g
==> Then Create an application skeleton via the command:
                express myapp
==> Then goto the myapp project folder the express project generator creates for you and run the following command to install the required dependencies and the devdependencies mentioned in the package.json:
                npm install
==> now you may uninstall some of the packages that you don't want;

/////////////////////////////////////////////////////////////
DIFFERENCE BETWEEN res.send() , res.end() , res.json() , res.render() etc...
/////////////////////////////////////////////////////////////
res.end():-
      this method comes from the node's core, when using this method while sending response to the client ; you have to write response headers by yourself such as the content type of the response etc and then the res.end() is only used to write the response body along with ending the response;

ON THE OTHER HAND:

res.send() , res.json() , res.render() all these methods are not part of the node's core, they belong to Express and while sending the response via one of these methods you don't have to write write headers by yourself, seeing the structure of your response body, these method from express will automatically set the headers for your response;

Moreover, the res.json() , and the res.render() are methods which are specially implemented by express to send json data and html markup back as a response respectively; you don't have to convert js object by yourself into a json first and then stream it back , you just need to pass the js object to it and it will do all the work for you!

///////////////////////////////////////////////////////////
Proxying API Requests in Development
///////////////////////////////////////////////////////////
Proxying: giving or providing authority or power to act for another!

ONLY DURING DEVELOPMENT:
              "YOUR BACKEND AND FRONT END FOLDERS ARE HOSTED ON DIFFERENT SERVERS"
              Normally during the development of your application both your front-end react application and the backend nodejs server are served on different sockets i:e different ports, so it won't be wrong saying that both of your project folders are served on entirely different machines and have no connection with one another; e:g:-
              1) react application on localhost:3000 <machine1>
              2) and nodejs server on localhost:5000 <machine2>

      1)
              Now your browser has the ability to automatically make http(s) requests when you access a particular URL, that's what your browser is trained for!!!

              Now whenever you go to your react app root project folder and run cmd command npm start, the create-react-app tool creates a local server which listens to port 3000 and your react app is temporarily hosted/served by the create-react-app on this local server; now whenever you visit this URL:
                    localhost:3000
              The local server will serve you with the static files (index html, js bundles , css , images etc)

      2)
              And of course when creating a backend server via nodejs and express, you yourself make it to listen on a particular port on your local computer and put different files on your backend and direct different route via Routers to those files which upon request from the client side will return some data as a response;

Now imagine a case scenario:
              Your front-end application is hosted by the create react app on the local server that is listening to port 3000;

              Now suppose one of your components is making a request for data fetch to the following URL:

                      "/api/todos"

              Now since the forward slash at the start means root so the url requested by the client side javascript (the react) is going to be:

                    "localhost:3000/api/todos"

              Now since during development, the backend files of lives in a different house than that of the front end files of your application, so it means that there is no such route on the server on which your front end application is hosted, so when the above request goes to the server on which your front end is hosted, (if you are not proxying it) the request is going to be a 404 one and the server is not going to recognize it because the files that are served via the port 3000 are not routing this route nowhere;

      SOLUTION:
              To tell the development server to proxy any unknown requests to your API server in development, add a proxy field to your package.json, for example:

                "proxy": "http://localhost:4000",

              This way: the development server port 3000 will recognize that it’s not a static asset and is an unknown request so it will go and check if any proxies are set, and will proxy your request to http://localhost:4000/api/todos as a fallback.

              Keep in mind that proxy only has effect in development (with npm start), and in production this is not going to be the case, there is no proxying in production as your whole project is going to be served under the same umbrella; and proper routing would be done;

////////////////////////////////////////////////
          express-async-handler
////////////////////////////////////////////////
ON A SIDE NOTE:
        "Request Handler", "Router Handler", "Controller" all are names of same thing;

        An if your "controller" is an async function and if your async handler throws an error then express is not good at handling errors thrown by asynchronous controllers or functions in general

        So you need to fill this gap and make express to handle errors emerged by async controllers;

Remember that higher order functions are those functions that takes in as argument another function;

The purpose of a HOF is normally to supercharge your function that you pass to it with some extra functionality;

express async handler is one higher order middleware function that takes in your route handler function as an argument, fully loads it with entire error handling functionality and then returns its supercharged definition;

and then that feature-wise extended function returned by the express-async-handler is the one that executes as your request handler;

And that is capable enough to handle any errors;

/////////////////////////////////////////////////////
Only wrapping your controller function inside the express-async-handler will not be enough!!!!!
/////////////////////////////////////////////////////
Also in your main server.js file which listens to the user request on a particular port:

Put the following app.use() router at the very bottom of all your routings;

Why ?
Because:-

//app.use() with no mount path will cause the middleware function to execute every time the app receives a request. That's the reason express suggests to put it right at the very bottom of all your routings because all the above routings upon a match will end the response by either executing res.end() res.send() or res.json etc but in case none of the paths is matched, this middleware is gonna get executed alwaysss*; So when a path is not matched that path will be routed to this middleware:-

app.use((err, req, res, next) => {
  //res.status is chainable cuz it returns the response object with updated header
  res.status(500).send(err.message);
});

/////////////////////////////////////////////////////////////////
                      require() caching
                      require() cache
                      require cache
                      require caching
                      import caching
                      import cache
/////////////////////////////////////////////////////////////////
  NodeJS Backend Runtime Environment Will Cache The Results Of The require() call Or The Import Keyword For A Particular Module When Imported For The First Time, And will maintain These Cached Instances In A Sort Of Global Array That's Available Across Your Entire Backend Server So That Then Whenever You Require() or Import The Same Module Again, You Are Not Served With A New Export "no matter wether it's a Primitive Export Or A Composite Export from inside of the module", It is For sure that the First Require of The file Will cache the exports from that file;

  So on requiring that module somewhere else in your program , you will be served from that global cache array in which the "first time exports" are all saved against each module's name;

REMEMBER AND ALWAYS REMEMBER THIS:
                        Wether you use require('module') call or the import ES6 keyword to import one of the:
                          1) 'Node's core module' such as 'http'
                          2) third party npm module such as mongoose
                          3) or even a user defined module

For all of the above mentioned cases:-
          once you import a particular module wether its a core one or an npm one or a user defined module, once you import a module wether that's using require or import, the "node runtime environment that's running your whole backend server" will cache your import, and then onward no matter "wherever" , "no matter in the same file or in a different file" on your server , if you ever again import a same module that you had already imported in the same file before or in some other file that is already executed by nodeJS before the current given file inside which you are again importing the module, you will not be served with a new fresh export from the file you are importing;

          Rather you will be served with the same instance that was cached by the nodeJS for the first time the file was imported;

*/
