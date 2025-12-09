class People{
    name:string
    age:number
    addr:string
    static count:number = 0
    constructor(_name:string,_age:number,_addr:string,){
        this.name = _name
        this.addr = _addr
        this.age = _age
    }
    doEat(who:string,where:string){
        console.log(`who:${who},where:${where}`)
    }
    doStep(){}
}
class StringUtil{
    static trimSpace(str:string){
        return str.replace(/\s+/g,"")
    }
}

const dataprop1 = Object.getOwnPropertyDescriptor(People.prototype,"doEat")
const targetMethod = dataprop1!.value
dataprop1!.value = function (...args: any[]){
    args = args.map((arg) => {
        if (typeof arg === "string") return StringUtil.trimSpace(arg)
            return arg
    })
    console.log("前置拦截...")
    targetMethod.apply(this,args)
    console.log("后置拦截")
}
Object.defineProperty(People.prototype,"doEat",dataprop1!)
let p = new People("peter",23,"发货的")
p.doEat("王武","杨万宝")

export{}
