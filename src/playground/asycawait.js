const myFunc = ()=>{
    doWork().then((work)=>{
        console.log(' Resolved:: Work Done! = ', work);
    }).catch((e)=>{
        console.log(' Rejected:: Work Done!');
    });
};

const doWork = ()=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve('Did work for 2 seconds');
        }, 2000)
    });
}

const myfuncAsync = async ()=>{
    const result = await doWork();
    console.log('from Async : ', result);
}

myfuncAsync();