import 'reflect-metadata';

@controller
class plane {
    color:string = 'red'

    @get('/login')
    fly():void{
        console.log('vrrrrrrr');
    }

}

function get(path:string) {
    return function (target: plane, key: string) {
        Reflect.defineMetadata('path', path, target, key);
    }
}

function controller(target:typeof plane){
    for(let key in target.prototype){
        const path = Reflect.getMetadata('path',target.prototype,key)
        console.log(path);
    }
}



// const secret = Reflect.getMetadata('secret',plane.prototype,'fly');
// console.log(secret);
