
const getPromise = ()=>{
    return new Promise((res,rej)=>{
        setTimeout(()=>rej('123'),2000)
    })
}

const f = async()=>{
    await getPromise().catch(err=>{
        console.log(err)
        // return 
    })
    console.log(1)
}

f()