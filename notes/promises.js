/**************************************************************************/
//a promise is nothing but a special javascript object that represents the eventual result of an asynchronous task/job/process/action. or in more straightforward words a promise is the eventual result of an asynchronous task in form of an object!
//the asynchronous task can be doubling 1million elements inside of an array and thus the whole task divided into chunks while each chunk dealt asynchronously, and each asynchronous process calls the next asynchronous function by passing it its result until the final chunk is reached and at the end the whole task is sort of dealt asynchronously and the result of the whole task is saved inside this promise object;
//if the asynchronous function/task/job finishes successfully we will have the status of the Promise as FULFILLED and the value inside the Promise will be the result of the asynchronous task.
//if the asynchronous function/task/job fails, then we will have the status of the Promise as REJECTED and the value inside the Promise will be the reason to failure.
//before the asynchronous task has finished, meanwhile the asynchronous task is still underway and is under progress and hasn't completed yet, the promise object will have a status of PENDING , and will have a value of UNDEFINED!
/*****************************************************************************/

//LET'S IMAGINE A USE CASE:     suppose we have an asynchronous function: readFileContents(){...} , that reads the contents from an external text file. The process of reading from external files takes a lot of time. let's say it takes the asynchronous readFileContents function 3 seconds to finish its job of reading from the text file. Now as we know that the function readFileContents is an asynchronous function so it means that it won't block the calling thread. so the readFileContents will take 3 seconds to complete the task of reading from the text file and the rest of our code will keep on going.
//after 3 seconds the readFileContents function will finish its job ending up having the text that it read from that file as a result. 
//HERE ARISES THE PROBLEM:
/*
how would we now utilize the results of that asynchronous function? what if we want to display to the user the results of the asynchronous function?
*/
//TO HANDLE THIS SITUATION WE HAVE TWO OPTIONS:
/*
1- to attach a callback function to our asynchronous function which will be invoked after 3 seconds with the results of the asynchronous function as arguments to the callback function and then inside the callback function we can do anything we want with the results.
*/

/************************************************************************
 * THE SECOND OPTION TO HANDLE THIS SITUATION IN ES6 IS TO:
            "update a PROMISE object's properties immediately after the task finishes!"

-> this Promise object will represent the result of the asynchronous task
************************************************************************/

///////////////////////////////////////////
/*****************************************
 * the PROMISE OBJECT
*****************************************/
//////////////////////////////////////////
//a promise object always(at any instant) has two properties:                1- PROMISE STATUS                                                              2- PROMISE VALUE                                 

//A PROMISE CAN BE IN ONE OF THE FOLLOWING THREE STATES:                      1- PENDING                                                                    2- FULFILLED                                                                   3- REJECTED                                                                
/*
PENDING PROMISE:
  If the asynchronous task(e:g the process of reading from external file or some other big computational process) is underway, the STATE of the promise during that time would be PENDING. e:g util and unless either of the resolved or the reject functions is called the the promise will remain in pending state.
            When a promise is in pending state, its status property has a value of "pending";
            and the value property of a pending promise holds: "undefined".
*/
/*
FULFILLED PROMISE:
            fulfilled state of a promise means that the asynchronous job/task completed successfully i:e in case of the readFileContents function a promise object will be in a fulfilled state if the 3 seconds has passed and our asynchronous readFileContents function has successfully read data from the external file. after the successful completion of an asynchronous task the status of the promise will be changed from PENDING to FULFILLED.

            the status property of a FULFILLED PROMISE has a value of "resolved";
            and the value property of a fulfilled promise holds:             "A REAL VALUE"(the result of the successful task).
*/
/*
REJECTED PROMISE:
            when an asynchronous function fails to complete/perform a task for some reason its status is changed from PENDING to Rejected! REJECTED PROMISE in simple plain words means that our asynchronous function had promised us that i will read data from the external file(or perform some other task) for you but it failed to do so and thereby it called the reject function to let us know that by updating the promise object that the status of the promise is set to REJECTED and the value property of the Promise object holds the REASON FOR WHY THE PROMISE WAS REJECTED(means the reason for the task failure).
*/


///////////////////////////////////////////////////////////////////////////////
/***************************************************************************
 //LET'S CREATE A PROMISE:

      (raza che da executer function na qawal wakhlu che da kaar ba rala kay, aw wrta ba wayu che kala rala kaar waky nu resolve ta ba call waky che zamung da promise status update shi aw mung ta pata walagi che ta wada pura kra aw in case ka hum bewafa hargiz na thay par hum wafa kar na sakay , wada de chrta nashwa pura kawaly due to some circumstances nu bya ba reject function ta call waky che aghe case k hum zamung da promise object status update she aw mung ta pata walagi che ta wada pura na kray shwa, khu wrsara wrsara ba reason um rawalege che ta wada wle pura na kra.)

  ***************************************************************************/
///////////////////////////////////////////////////////////////////////////////

//LET'S IMPLEMENT THE calculateSquare function via Promises WHICH WE EARLIER HAD IMPLEMENTED THROUGH THE SIMPLE CALLBACKS TO HANDLE THE RESULT OF THE ASYNC OPERATION(calculation of square). This time since we will use promises so we will just need to consume the promise: let the show begin:

/*
USING CALLBACKS:

function calculateSquare(number, synchronousCallback) {
    setTimeout(() => {
        const result = number * number;
        synchronousCallback(result);
    }, 1000);
}
// this is called callback hell:
calculateSquare(
    2,
    catchResult => {
        console.log(catchResult);
        calculateSquare(
            catchResult,
            updatedResult => {
                console.log(updatedResult);
                calculateSquare(
                    updatedResult,
                    finalResult => console.log(finalResult)
                );
            }
        );
    }
);

*/

//this time we don't need to pass a callback to the function to handle the result of the asynchronous  operation, rather since we are using promises so we can attach an asynchronous callback further down the road via the dot .then() method to consume the value inside the promise, and then the callback passed to the .then method will continue the leftover task asynchronously:
function calculateSquare(number) {
    let myPromiseObj = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof number !== 'number') {
                return reject(new Error('Argument of Type number was expected.'));
            }
            let resultOfAsyncOperation = number * number;
            resolve(resultOfAsyncOperation);
        }, 1000);
    });

    return myPromiseObj;
}

//calling the function with valid arguments:
// calculateSquare(3).then(value => console.log(value), reason => console.log(reason));

//calling the function with invalid non numeral arguments:
// calculateSquare('blablabla').then(value => console.log(value), reason => console.log(reason));

////////////////////////////////////////////////////////////////////////
/**********************************************************************
                    "CHAINING PROMISE OBJECTS"
    now what if i want to utilize the result of the first asynchronous
    function in such a way that i want to forward the result of the
    first asynchronous function to another asynchronous chunk and then
    perform some actions over it there.
    e:g what if i want to take again the square of the result returned
    by the asynchronous calculation operation:

    i can achieve this by means of a method called: chaining.
**********************************************************************/
///////////////////////////////////////////////////////////////////////

//the calculateSquare function returns a Promise object;
//the dot .then() method accepts two callbacks (onFulfilled, onReject) , but to avoid passing each of the .then() method an onReject we simply chain at the end of the chain a dot .catch() method which takes in an onReject function;
calculateSquare(2)
    .then(
        value => {
            console.log(value);
            throw Error('cant calculateSquare');
        }
    )
    .then(
        value => {
            console.log(value);
            return calculateSquare(value);
        }
    )
    .then(
        value => {
            console.log(value);
            return calculateSquare(value);
        }
    )
    .then(
        value => console.log(value)
    )
    .catch(reason => console.log('i got the resaon: ' + reason));

/*
///////////////////////////////////////////////////////////////////////
PROMISES PROPERLY EXPLAINED BELOW
///////////////////////////////////////////////////////////////////////

the above program returns:
4
i got the resaon: cant calculateSquare

and if we replace the line: "throw Error('cant calculateSquare');" in the first onFulfilled callback with "return calculateSquare(value)" then each dot .then() method is going to return a Promise Object with a status 'resolved' and a value squared the value of the previous Promise object with an interval of 1000 ms like so:
4
16
256
65536

Thus it means that when an error is thrown and out of the dot .then() chaining one of the promise returns a rejected promise object, the whole chain is going to break and the error is going to be caught by the dot .catch() method and the reason for the error would be passed to the onReject callback passed to the dot .catch();

Remember that the dot .then() returns a promise object but the status and value of that promise object is equal to the status and value of the promise returned by the onFulfilled callback passed to it; and if the onFulfilled callback returns no promise object then there is a whole case scenario that what is going to be the status and the value of the Promise object returned by the dot .then();

VERY IMPORTANT THING NOTE:
NOTE THAT: "the each dot .then() method in the chain returns a Promise Object instantly while concurrently also executing the onFulfilled or the onReject callback function passed to it based upon the status of the Promise Object returned by the previous dot .then() method in the chain (i:e based upon the status of the Promise Object in context of which this current dot .then() method is being invoked); which ever callback function is executed wether the onFulfilled or the onReject (we will suppose that the onFulfilled one is executed) the value of the Promise Object on which this dot .then() is being executed is also passed to it", NOW DON'T FORGET THAT: a Promise Object was right away returned by this dot .then() method and the status and the value of this Promise Object is going to be totally in accordance and in sync with the Status and the Value of the promise object which is going to be processed by the onFulfilled callback passed to it;

Now if: the status and the value of the Promise Object being processed and returned by the onFulfilled or the onReject callback changes, here the status and the value of the Promise object which was returned by the dot .then() method will also be changed;

So this is how the status and value of the Promise Object returned by the dot .then() method that we say depends upon the status and the value of the Promise Object returned by the onFulfilled callback.

Above the onFulfilled callbacks to the dot .thens() returns a call to the calculateSquare function which in turn creates a brand new UNSETTLED promise object having status = pending PromiseValue = undefined INITIALLY.

But this promise object's value being processed by the calculateSquare function will be updated over time and as soon as it reaches one of the final states by getting resolved or rejected it will be returned from there and the same Promise object's reference will be returned by onFulfilled callback.

But note that during the time period when it being processed and was not yet returned to where it was called from (from inside of the onFulfilled), at that time it will have a pending state and undefined value; and therefore the Promise Object returned by the dot .then() method is going to have the same state;

By the time the state of this promise object (one being processed by the calculateSquare function ) gets settled(either resolved or rejected) the promise object that was returned by the dot then method will also have the values of its properties updated consistently, and as we know that:
*/
/* "UPON THE RESOLUTION OF A PROMISE OBJECT THE NEXT DOT THEN METHOD PUSHES ONE OF THE HANDLERS (EITHER THE onFulfilled OR THE onReject) INTO THE JOB QUEUE GIVING IT THE VALUE OF THE PROMISE OBJECT AS ARGUMENT"

SO: as soon as the promise object that was returned by the dot .then() method have its status update "resolved" (as a result of the being proportional to the values of the object returned by the onFulfilled method), the next dot .then() method would be waiting till now and as it sees that the Promise object on which it is being invoked will push one of its handlers (onFulfilled or onReject) into the job queue (depending upon the status of the Promise Object) and so on the chain will grow like this thus letting us to divide a huge task into chunks by allowing different callbacks to process the previously returned value from the previous onFulfilled callback asynchronously....... THIS IS HOW WE IMPLEMENT PROMISE CHAINS...... FEWWWWWW pretty complex han ? not quite

IN SIMPLE WORDS: the onFulfilled function of the next dot .then() method will be pushed into the job queue when the promise object which was returned from the onFulfilled function of the previous dot .then() method gets resolved. and that resolves after a delay of our mentioned milliseconds !

ONE LAST IMPORTANT POINT:
            remember that it is not the "callback passed to the Promise() constructor while creating a new promise" that executes asynchronously BUT it is the onFulfilled or onReject callback (which is passed to the dot .then() method while consuming the promise) that is added to the JOB QUEUE and executed Asynchronously;

            Once a Promise is fulfilled or rejected, the respective handler function (onFulfilled or onRejected) will be called asynchronously (scheduled in the job queue).

            If a handler function:
            1) RETURNS A VALUE (i:e return 1; return [1,2,3]; return {age: 18}):-
            => the promise returned by dot .then() gets resolved with the returned value as its value.

            2) DOESN'T RETURN ANYTHING:-
            => the promise returned by then gets resolved with an undefined value.

            3) THROWS AN ERROR:-
            => the promise returned by then gets rejected with the thrown error as its value.

            4) RETURNS AN ALREADY FULFILLED PROMISE:-
            => the promise returned by then gets fulfilled with that promise's value as its value.

            5) RETURNS AN ALREADY REJECTED PROMISE:-
            => the promise returned by then gets rejected with that promise's value as its value.

            6) RETURNS ANOTHER PENDING PROMISE OBJECT:-
            => the resolution/rejection of the promise returned by then will be subsequent(means as the returned promise resolves right away the one returned by the dot then will also get resolve) and will resolve to the resolution/rejection of the promise returned by the handler. Also, the resolved value of the promise returned by then will be the same as the resolved value of the promise returned by the handler.


function constructPromise(){
    const myPromise = new Promise((resolve, reject)=>{
        if(true)
            resolve('I am executed Synchronously');
        else
            reject(new Error('promise status is rejected'));
    });

    return myPromise;
}

=> when the above function 'constructPromise' is called, it will all execute synchronously from top to bottom and at the end of the synchronous execution it will return to us a Promise Object, remember that the Promise object is properly constructed whenever the "new Promise()" is encountered; the function passed to it the constructor of the Promise() is executed all synchronously and the status plus the value of the "new Promise()" object is decided upfront and then at the end of the execution of the 'constructPromise' function a full fledged Promise instance is returned with a fully developed status and value which is ready to be consumed via the dot .then() method:

let full_Fledged_Promise = constructPromise();

now let us consume this promise:-

full_Fledged_Promise.then(value=>{
    console.log('THIS onFulfilled CALLBACK IS THE FUNCTION WHICH IS ACTUALLY EXECUTED ASYNCHRONOUSLY!!!! AND IS FULLY PRIVILEGED TO DO ANYTHING WITH THE VALUE ARGUMENT PASSED TO IT THAT CAME FROM THE PREVIOUS DOT .THEN() CALL ASYNCHRONOUSLY!!!');
});

////////////////////////////////////////////////////////////////
FETCH API
////////////////////////////////////////////////////////////////
The fetch api is just a function: fetch();

This fetch() function returns a Promise Object which you can then consume via the dot .then() method;
NOTE THAT: The value of the Promise Object returned by the fetch() function is not the actual content that you are fetching but the value of the Promise object returned by the fetch() function is something called the "RESPONSE OBJECT", Which is basically an instance of a built-in class "Response"

THE RESPONSE OBJECT: this is an instance of the Response class that holds information and details about an http response such as the status , target URL, status text and code etc ....;

Now this response object has a method up its prototypal chain method call dot .json() , this method when used on the Response Object which itself is the value of the Promise Object returned by the fetch method, so we were saying that when this method is called on this Response object, this method returns another "Promise Object" which inside the value contains the actual content that we were hitting; and we further can consume this via another dot .then method;

the dot .json() method parses the json data that we are fetching from a URL endpoint and transforms it into a JS object and then returns to us that object as a value inside a Promise Object so basically the dot .json() returns a Promise;


syntax:

fetch('folder/subfolder/file.json')
.then((response)=>{
    return respons.json();
})
.then((data)=>{
    console.log(data);
})
.catch((err)=>{
    return err;
})

//remember that the dot .then() and the dot .catch() method themselves returns a promise object which's status and value totally depends upon what is returned from inside of the onFulfilled or onReject function; [CASE SCENARIOS MENTIONED ABOVE >> SEARCH FOR "If a handler function:"]

////////////////////////////////////////////////////////////////
                    ASYNC AWAIT / ASYNC AWAITS
////////////////////////////////////////////////////////////////
syntactical sugar around promises;
omits dot .then() and dot .catch() which were used in promises for asynchronous execution of functions (onFulfilled , onReject);

Async and Await are two different things:

            "async and await make promises easier to write"

                    DIFFERENCE BETWEEN THESE KEYWORDS:

/////////////////////////////////////////////////////////
                            async
(just a keyword to make a function eligible to have the use of await keyword inside it and make a function return a Promise object, just these two things)
/////////////////////////////////////////////////////////

An async function is a function declared with the async keyword, and the await keyword is permitted within them.
async makes a function return a Promise Asynchronously at the end.
An async function returns A Promise which will be resolved with the value returned by the async function, or rejected with an exception thrown from, or uncaught within, the async function.
Async functions always return a promise object.

If the return value of an async function is not explicitly a promise, it will be implicitly wrapped in a promise.

REMEMBER THAT:
            The body of an async function can be thought of as being split by zero or more await expressions. Top-level code, up to and including the first await expression (if there is one), is run synchronously. In this way, an async function without an await expression will run synchronously

            "an async function is a synchronous function just like other normal functions which upon invocation has all its statements and expressions inside the function body executed synchronously, all the async keyword is doing is that it is making a function to return a Promise Object at the end of the day and to allow a function have the use of the await keyword BUT THE MAGIC HAPPENS WITH THE USE OF THE await KEYWORD inside an async function. Due to the use of the await keyword, not all the expressions are executed synchronously inside an async function, the following example will clarify it:"

async function abc(){
    console.log('executed synchronously');
    console.log('executed synchronously');
    let x = await 2 + 2; //also executed synchronously
    //abc() function execution context suspends from execution stack right after the above await expression is executed and all the expressions coming after it (uptil the next await expression) will be treated as an asynchronous chunk of code and is going to be pushed into the job queue right after the Promise object next to the await keyword gets resolved and therefore the value of the resolved promise object is also made available to this "later chunk".
    console.log('part of the later chunk');
    console.log('part of the later chunk');
    let y = await 3 + 3; //part of the later chunk
    //the above three expressions will be executed synchronously (though they as a whole will be executed asynchronously since they are part of the later chunk which was pushed into the job queue due to the await keyword encounter). Here right at the 3rd expression when once again an await expression is encountered again the process is repeated and the subsequent expressions once again will be treated as a another later chunk which is to be executed asynchronously

    console.log('another later chunk');
    console.log('another later chunk');

    return 3; //remember the return statement from inside of an async function will always be wrapped inside an asynchronous anonymous function and is always going to be executed asynchronously no matter what (it is an exception)
}
                        ---------WHILE--------

        //////////////////////////////////////////////////
                             await
            (A syntactical sugar to dot .then() method)
        //////////////////////////////////////////////////

The await keyword takes a function next to it that returns a Promise and returns the resolved value of that promise. The await keyword sorts of grabs/pulls the value from a resolved promise object and lets you utilize that value;

Think of the await keyword as the dot .then() method that when called upon a resolved Promise object passes to the given onFulfilled or onReject callback the value of the resolved promise object;

Think of the rest of the function body coming after an await expression as the body of the callback function passed to the dot .then() or the dot .catch() method which is also executed asynchronously while the value of the promise object is made available to the callback function's body by passing the value of the resolved promise to these callbacks as argument;

SO FOLLOWING POINTS CAN BE CONCLUDED:
        ==> await keyword does not return a promise
        ==> await keyword rather works over a promise
        ==> If the value of the expression following the await operator is not a Promise , it's converted to a resolved Promise because at the end of the day the await operator only is applicable to Promises.
        ==> whenever an await expression is executed, the function inside which this await was executed is suspended from the execution stack and the rest of the body of this function is scheduled and pushed at the end of the job queue for later execution;
        ==> await keyword waits for the promise next to it to get resolved in background
        ==> it suspends the execution of your async function
        ==> it makes rest of the function body wait until the promise next to it resolves
        ==> it waits for for the promise resolution in background and doesn't stop your main program execution, and as soon as the promise resolves it pushes the rest of the function body as a later chunk into the job queue by making the value of the resolved promise available to this chunk
        ==> it doesn't stop the global execution context from running;
        ==> it only suspends the current execution context from the execution stack
        ==> the rest of your function body that was suspended due to the await keyword will be put at the end of the job queue and will be executed as a later chunk
        ==> the await keyword gives the "async function" (which as a matter of fact is a synchronous function) the ability to have Asynchronous chunks inside it;
        ==> the code chunk between two consecutive await calls is an asynchronous chunk
        ==> as soon as the promise next to an await keyword gets resolved, it grabs the value from the promise object and returns it so as to make it available to the rest of your function body
        ==> Think of the rest of the function body coming after an await expression as the body of the callback function passed to the dot .then() or the dot .catch() method which is also executed asynchronously while the value of the promise object is made available to the callback function's body by passing the value of the resolved promise to these callbacks as argument;

The await keyword can only be used inside an async function. The await statement operates on a Promise, waiting until the Promise resolves or rejects and uptil that it suspends the execution of the rest of the function body coming after it.

The "async" and "await" keywords enable asynchronous plus promise-based behavior to be written in normal function style;

TRY UNDERSTANDING THE FOLLOWING CODE:
(async function blahh(){
    console.log(await new Promise((resolve, reject)=>{resolve('3')}));
})();

it prints to the console 3; ignore what it returns (of course it returns a promise)
 */















